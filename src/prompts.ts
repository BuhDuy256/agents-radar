/**
 * LLM prompt builders and item formatting.
 */

import type { RepoConfig, GitHubItem, GitHubRelease, GitHubDiscussion } from "./github.ts";
import type { Lang } from "./i18n.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RepoDigest {
  config: RepoConfig;
  issues: GitHubItem[];
  prs: GitHubItem[];
  releases: GitHubRelease[];
  discussions: GitHubDiscussion[];
  summary: string;
}

// ---------------------------------------------------------------------------
// Formatting
// ---------------------------------------------------------------------------

export function formatItem(item: GitHubItem, lang: Lang = "vi"): string {
  const labels = item.labels.map((l) => l.name).join(", ");
  const labelStr = labels ? ` [${labels}]` : "";
  const body = (item.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (item.body ?? "").length > 300 ? "..." : "";
  const t =
    lang === "en"
      ? {
          author: "Author",
          created: "Created",
          updated: "Updated",
          comments: "Comments",
          url: "URL",
          summary: "Summary",
        }
      : {
          author: "Tác giả",
          created: "Tạo",
          updated: "Cập nhật",
          comments: "Bình luận",
          url: "Liên kết",
          summary: "Tóm tắt",
        };
  // Extract "owner/repo" from html_url to avoid full GitHub URLs that trigger cross-references
  const repoSlug = item.html_url.replace(/^https:\/\/github\.com\//, "").replace(/\/(issues|pull)\/\d+$/, "");
  const itemKind = item.html_url.includes("/pull/") ? "PR" : "Issue";
  const refStr = `${repoSlug} ${itemKind} #${item.number}`;
  return [
    `#${item.number} [${item.state.toUpperCase()}]${labelStr} ${item.title}`,
    `  ${t.author}: ${item.user.login} | ${t.created}: ${item.created_at.slice(0, 10)} | ${t.updated}: ${item.updated_at.slice(0, 10)} | ${t.comments}: ${item.comments} | 👍: ${item.reactions?.["+1"] ?? 0}`,
    `  ${t.url}: ${refStr}`,
    `  ${t.summary}: ${body}${ellipsis}`,
  ].join("\n");
}

export function formatDiscussion(d: GitHubDiscussion, lang: Lang = "vi"): string {
  const body = (d.body ?? "").replace(/\n/g, " ").trim().slice(0, 300);
  const ellipsis = (d.body ?? "").length > 300 ? "..." : "";
  const t =
    lang === "en"
      ? { author: "Author", created: "Created", updated: "Updated", comments: "Comments", url: "URL" }
      : { author: "Tác giả", created: "Tạo", updated: "Cập nhật", comments: "Bình luận", url: "Liên kết" };
  const answered = d.answered ? (lang === "en" ? " [ANSWERED]" : " [ĐÃ GIẢI QUYẾT]") : "";
  // Same URL-shortening as formatItem: keep "owner/repo" only, so the rendered
  // issue body never contains a full github.com link that triggers back-refs.
  const repoSlug = d.html_url.replace(/^https:\/\/github\.com\//, "").replace(/\/discussions\/\d+$/, "");
  return [
    `#${d.number} [${d.category}]${answered} ${d.title}`,
    `  ${t.author}: ${d.author} | ${t.created}: ${d.created_at.slice(0, 10)} | ${t.updated}: ${d.updated_at.slice(0, 10)} | ${t.comments}: ${d.comments} | 👍: ${d.upvotes}`,
    `  ${t.url}: ${repoSlug} Discussion #${d.number}`,
    `  ${lang === "en" ? "Summary" : "Tóm tắt"}: ${body}${ellipsis}`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Sampling helpers (shared)
// ---------------------------------------------------------------------------

const CLI_ISSUE_LIMIT = 30;
const CLI_PR_LIMIT = 20;
// Higher than the issue/PR limits: for a repo with Issues/PRs disabled the
// discussion list is the entire report, not a supplement to them.
const CLI_DISCUSSION_LIMIT = 40;

/** Sort by comment count desc, take top N. */
export function topN(items: GitHubItem[], n: number): GitHubItem[] {
  return [...items].sort((a, b) => b.comments - a.comments).slice(0, n);
}

/**
 * Sort discussions by engagement (comments + upvotes) desc, take top N.
 * Unlike issues, upvotes are the primary signal on a discussion board — many
 * high-value threads are feature requests with votes but no replies.
 */
export function topDiscussions(items: GitHubDiscussion[], n: number): GitHubDiscussion[] {
  return [...items].sort((a, b) => b.comments + b.upvotes - (a.comments + a.upvotes)).slice(0, n);
}

/** What the top-N sample was ranked by, so the note doesn't misstate the sort. */
export type SampleBy = "comments" | "engagement";

const SAMPLE_BY_TEXT: Record<SampleBy, Record<Lang, string>> = {
  comments: { en: "comment count", vi: "số bình luận" },
  engagement: { en: "comments + upvotes", vi: "bình luận và lượt thích" },
};

export function sampleNote(
  total: number,
  sampled: number,
  lang: Lang = "vi",
  by: SampleBy = "comments",
): string {
  const criterion = SAMPLE_BY_TEXT[by][lang];
  if (lang === "en") {
    return total > sampled
      ? `(Total: ${total} items; showing top ${sampled} by ${criterion})`
      : `(Total: ${total} items)`;
  }
  return total > sampled
    ? `(Tổng: ${total} mục; hiển thị ${sampled} mục có ${criterion} nhiều nhất)`
    : `(Tổng: ${total} mục)`;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------

export function buildCliPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  discussions: GitHubDiscussion[],
  dateStr: string,
  lang: Lang = "vi",
): string {
  const sampledIssues = topN(issues, CLI_ISSUE_LIMIT);
  const sampledPrs = topN(prs, CLI_PR_LIMIT);
  const sampledDiscussions = topDiscussions(discussions, CLI_DISCUSSION_LIMIT);

  const issuesText =
    sampledIssues.map((i) => formatItem(i, lang)).join("\n") || (lang === "en" ? "None" : "Không có");
  const prsText =
    sampledPrs.map((p) => formatItem(p, lang)).join("\n") || (lang === "en" ? "None" : "Không có");
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : lang === "en"
      ? "None"
      : "Không có";

  const issueNote = sampleNote(issues.length, sampledIssues.length, lang);
  const prNote = sampleNote(prs.length, sampledPrs.length, lang);

  // Repos without discussions enabled get no section at all, rather than an
  // empty one the model would feel obliged to comment on.
  const discussionsSection = sampledDiscussions.length
    ? (lang === "en"
        ? `\n## Latest Discussions (updated in last 24h)${sampleNote(discussions.length, sampledDiscussions.length, lang, "engagement")}\n`
        : `\n## Discussions mới nhất (cập nhật trong 24 giờ qua)${sampleNote(discussions.length, sampledDiscussions.length, lang, "engagement")}\n`) +
      sampledDiscussions.map((d) => formatDiscussion(d, lang)).join("\n") +
      "\n"
    : "";

  if (lang === "en") {
    return `Write a short daily note about ${cfg.name} (${dateStr}) for developers who already use this tool. Use only the GitHub data below.

# Data source: github.com/${cfg.repo}

## Releases (last 24h)
${releasesText}

## Issues (updated in last 24h)${issueNote}
${issuesText}

## Pull requests (updated in last 24h)${prNote}
${prsText}
${discussionsSection}
---

Write these two sections, in English:

**What changed** — up to 4 bullets on releases and PRs that change how the tool is used: new features, breaking changes, and fixes for problems users actually hit. Use the shape "Added A to do B; useful when you need C." Copy version numbers, PR/issue numbers and links from the data.

**Worth knowing** — up to 3 issues or discussions that affect daily use: what breaks, for whom, and whether a fix exists in the data. Skip if nothing qualifies.

Rules:
- Fewer items is fine; do not pad.
- Only state what the data supports. Do not invent use cases, community reaction, or version comparisons.
- Comment counts may be quoted as numbers, but do not claim the community agrees or disagrees unless the item text says so.
- No overview paragraph, no PR/issue volume statistics, no conclusions.
- Keep it under 200 words.
`;
  }

  return `Viết một ghi chú ngắn hằng ngày về ${cfg.name} (${dateStr}) cho người đã dùng công cụ này. Chỉ dùng dữ liệu GitHub dưới đây.

# Nguồn dữ liệu: github.com/${cfg.repo}

## Bản phát hành (24 giờ qua)
${releasesText}

## Issue (cập nhật trong 24 giờ qua)${issueNote}
${issuesText}

## Pull request (cập nhật trong 24 giờ qua)${prNote}
${prsText}
${discussionsSection}
---

Viết hai mục sau bằng tiếng Việt:

**Có gì thay đổi** — tối đa 4 gạch đầu dòng về bản phát hành và PR làm thay đổi cách dùng công cụ: tính năng mới, thay đổi phá vỡ tương thích, và bản sửa cho lỗi người dùng thực sự gặp. Dùng dạng "Thêm A để làm B; hữu ích khi bạn cần C." Sao chép số phiên bản, số PR/issue và liên kết từ dữ liệu.

**Đáng lưu ý** — tối đa 3 issue hoặc discussion ảnh hưởng đến việc dùng hằng ngày: lỗi gì, ảnh hưởng ai, và dữ liệu có bản sửa chưa. Không có thì bỏ mục này.

Quy tắc:
- Ít mục vẫn tốt hơn; không độn thêm cho đủ.
- Chỉ viết điều dữ liệu hỗ trợ. Không bịa công dụng, phản ứng cộng đồng hay so sánh phiên bản.
- Được nêu số bình luận, nhưng không nói cộng đồng đồng tình/phản đối nếu nội dung mục không nói vậy.
- Không viết đoạn tổng quan, không thống kê lượng PR/issue, không kết luận.
- Dưới 200 từ.
`;
}

const INFRA_ISSUE_LIMIT = 30;
const INFRA_PR_LIMIT = 20;

export function buildInfraPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  lang: Lang = "vi",
): string {
  const sampledIssues = topN(issues, INFRA_ISSUE_LIMIT);
  const sampledPrs = topN(prs, INFRA_PR_LIMIT);

  const noneStr = lang === "en" ? "None" : "Không có";
  const issuesText = sampledIssues.map((i) => formatItem(i, lang)).join("\n") || noneStr;
  const prsText = sampledPrs.map((p) => formatItem(p, lang)).join("\n") || noneStr;
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : noneStr;

  const issueNote = sampleNote(issues.length, sampledIssues.length, lang);
  const prNote = sampleNote(prs.length, sampledPrs.length, lang);

  if (lang === "en") {
    return `You are a technical analyst focused on AI infrastructure — inference engines, model serving, LLM gateways and fine-tuning frameworks. Based on the following GitHub data, generate the ${cfg.name} digest for ${dateStr}.

# Data source: github.com/${cfg.repo}

## Latest Releases (last 24h)
${releasesText}

## Latest Issues (updated in last 24h)${issueNote}
${issuesText}

## Latest Pull Requests (updated in last 24h)${prNote}
${prsText}

---

Generate a structured English digest with the following sections:

1. **Today's Highlights** - 2-3 sentences summarizing the most important updates
2. **Releases & Breaking Changes** - New versions, API/config changes, migration notes; omit if none
3. **New Model & Hardware Support** - Newly supported models, architectures, backends (CUDA/ROCm/Metal/CPU), quantization formats
4. **Performance & Optimization** - Throughput, latency, memory and kernel work landed or in progress, with concrete numbers when available
5. **Stability & Regressions** - Crashes, correctness bugs, regressions reported today, ranked by severity, note if fix PRs exist
6. **What This Means for Application Developers** - Practical takeaways for people building agents/apps on top of this project

Style: concise and professional, suited for infrastructure engineers. Include GitHub links for each item.
`;
  }

  return `Bạn là chuyên viên phân tích kỹ thuật tập trung vào hạ tầng AI — công cụ suy luận, phục vụ mô hình, gateway LLM và khung tinh chỉnh. Dựa trên dữ liệu GitHub dưới đây, hãy tạo bản tin ${cfg.name} ngày ${dateStr}.

# Nguồn dữ liệu: github.com/${cfg.repo}

## Bản phát hành mới nhất (24 giờ qua)
${releasesText}

## Issue mới nhất (cập nhật trong 24 giờ qua)${issueNote}
${issuesText}

## Pull Request mới nhất (cập nhật trong 24 giờ qua)${prNote}
${prsText}

---

Hãy tạo bản tin tiếng Việt có cấu trúc rõ ràng, gồm các phần sau:

1. **Điểm nổi bật hôm nay** - Dùng 2-3 câu tóm tắt những cập nhật quan trọng nhất
2. **Bản phát hành và thay đổi phá vỡ tương thích** - Phiên bản mới, thay đổi API/cấu hình, lưu ý chuyển đổi; không có thì bỏ qua
3. **Hỗ trợ mô hình và phần cứng mới** - Mô hình, kiến trúc, backend mới được hỗ trợ (CUDA/ROCm/Metal/CPU), định dạng lượng tử hóa
4. **Hiệu năng và tối ưu hóa** - Thông lượng, độ trễ, bộ nhớ và công việc kernel đã hoàn thành hoặc đang thực hiện, trích số liệu cụ thể khi có
5. **Ổn định và lỗi hồi quy** - Sự cố, lỗi đúng đắn, lỗi hồi quy được báo cáo hôm nay, xếp theo mức độ nghiêm trọng, ghi rõ nếu đã có PR sửa
6. **Ý nghĩa với nhà phát triển ứng dụng** - Ảnh hưởng thực tế với người xây dựng agent/ứng dụng trên dự án này

Yêu cầu văn phong: ngắn gọn, chuyên nghiệp, phù hợp kỹ sư hạ tầng. Mỗi mục kèm liên kết GitHub.`;
}

export function buildInfraComparisonPrompt(
  digests: RepoDigest[],
  dateStr: string,
  lang: Lang = "vi",
): string {
  const noActivityStr =
    lang === "en" ? "No activity in the last 24 hours." : "Không có hoạt động trong 24 giờ qua.";

  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length || d.discussions.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior analyst of the AI infrastructure ecosystem — inference engines, model serving, LLM gateways and fine-tuning frameworks. The following are ${dateStr} digest summaries for each project:

${sections}

---

Generate a cross-project comparison report in English with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall AI infrastructure landscape today
2. **Activity Comparison** - Table comparing Issues count, PR count and Release status for each project
3. **Model Support Race** - Which projects shipped support for which new models/architectures, and who is ahead
4. **Performance Frontier** - Where the optimization effort is concentrated (KV cache, batching, quantization, distributed serving, kernels)
5. **Layer Positioning** - How these projects differ by layer: serving engine vs local runtime vs gateway vs training/fine-tuning
6. **Trend Signals** - Industry trends extracted from today's activity, and what agent/application developers should watch

Style: concise and professional, data-backed, suited for infrastructure engineers and technical decision-makers.
`;
  }

  return `Bạn là chuyên viên phân tích kỹ thuật cấp cao về hệ sinh thái hạ tầng AI — công cụ suy luận, phục vụ mô hình, gateway LLM và khung tinh chỉnh. Dưới đây là tóm tắt hoạt động ngày ${dateStr} của từng dự án:

${sections}

---

Hãy tạo báo cáo so sánh chéo dựa trên hoạt động của các dự án trên, gồm các phần sau:

1. **Toàn cảnh hệ sinh thái** - Dùng 3-5 câu tóm tắt tình hình chung của hạ tầng AI hiện nay
2. **So sánh mức độ hoạt động** - Bảng tổng hợp số Issue, số PR và tình trạng Release của từng dự án hôm nay
3. **Cuộc đua hỗ trợ mô hình** - Dự án nào đã hỗ trợ mô hình/kiến trúc mới nào, ai đang dẫn đầu
4. **Biên giới tối ưu hiệu năng** - Nỗ lực tối ưu đang tập trung ở đâu (KV cache, batching, lượng tử hóa, suy luận phân tán, kernel)
5. **Khác biệt về phân lớp** - Vị trí của các dự án theo lớp: công cụ suy luận, runtime cục bộ, gateway, huấn luyện/tinh chỉnh
6. **Tín hiệu xu hướng đáng chú ý** - Xu hướng ngành rút ra từ hoạt động hôm nay và điều nhà phát triển agent/ứng dụng nên theo dõi

Yêu cầu văn phong: ngắn gọn, chuyên nghiệp, có số liệu hỗ trợ, phù hợp kỹ sư hạ tầng và người ra quyết định kỹ thuật.`;
}

const PEER_ISSUE_LIMIT = 30;
const PEER_PR_LIMIT = 20;

export function buildPeerPrompt(
  cfg: RepoConfig,
  issues: GitHubItem[],
  prs: GitHubItem[],
  releases: GitHubRelease[],
  dateStr: string,
  issueLimit = PEER_ISSUE_LIMIT,
  prLimit = PEER_PR_LIMIT,
  lang: Lang = "vi",
): string {
  const totalIssues = issues.length;
  const totalPrs = prs.length;

  const sampledIssues = topN(issues, issueLimit);
  const sampledPrs = topN(prs, prLimit);

  const noneStr = lang === "en" ? "None" : "Không có";
  const issuesText = sampledIssues.map((i) => formatItem(i, lang)).join("\n") || noneStr;
  const prsText = sampledPrs.map((p) => formatItem(p, lang)).join("\n") || noneStr;
  const releasesText = releases.length
    ? releases.map((r) => `- ${r.tag_name}: ${r.name}\n  ${(r.body ?? "").slice(0, 300)}`).join("\n")
    : noneStr;

  const openIssues = issues.filter((i) => i.state === "open").length;
  const closedIssues = issues.filter((i) => i.state === "closed").length;
  const openPrs = prs.filter((p) => p.state === "open").length;
  const mergedPrs = prs.filter((p) => p.state === "closed").length;

  const issueSampleNote = sampleNote(totalIssues, sampledIssues.length, lang);
  const prSampleNote = sampleNote(totalPrs, sampledPrs.length, lang);

  if (lang === "en") {
    return `You are an analyst of AI agent and personal AI assistant open-source projects. Based on the following GitHub data from ${cfg.name} (github.com/${cfg.repo}), generate a project digest for ${dateStr}.

# Data Overview
- Issues updated in last 24h: ${totalIssues} (open/active: ${openIssues}, closed: ${closedIssues})
- PRs updated in last 24h: ${totalPrs} (open: ${openPrs}, merged/closed: ${mergedPrs})
- New releases: ${releases.length}

## Latest Releases
${releasesText}

## Latest Issues ${issueSampleNote}
${issuesText}

## Latest Pull Requests ${prSampleNote}
${prsText}

---

Generate a structured English ${cfg.name} project digest with the following sections:

1. **Today's Overview** - 3-5 sentences summarizing project status, including activity assessment
2. **Releases** - If new versions exist, detail changes, breaking changes, migration notes; omit if none
3. **Project Progress** - Merged/closed PRs today, what features advanced or were fixed
4. **Community Hot Topics** - Most active Issues/PRs with most comments/reactions (with links), analyze underlying needs
5. **Bugs & Stability** - Bugs, crashes, regressions reported today, ranked by severity, note if fix PRs exist
6. **Feature Requests & Roadmap Signals** - User-requested features, predict which might be in next version
7. **User Feedback Summary** - Real user pain points, use cases, satisfaction/dissatisfaction
8. **Backlog Watch** - Long-unanswered important Issues or PRs needing maintainer attention

Style: objective, data-driven, highlighting project health. Include GitHub links for each item.
`;
  }

  return `Bạn là chuyên viên phân tích dự án mã nguồn mở về AI agent và trợ lý AI cá nhân. Dựa trên dữ liệu GitHub dưới đây từ ${cfg.name} (github.com/${cfg.repo}), hãy tạo bản tin dự án ngày ${dateStr}.

# Tổng quan dữ liệu
- Issue cập nhật trong 24 giờ qua: ${totalIssues} (đang mở/hoạt động: ${openIssues}, đã đóng: ${closedIssues})
- PR cập nhật trong 24 giờ qua: ${totalPrs} (đang mở: ${openPrs}, đã hợp nhất/đóng: ${mergedPrs})
- Bản phát hành mới: ${releases.length}

## Bản phát hành mới nhất
${releasesText}

## Issue mới nhất ${issueSampleNote}
${issuesText}

## Pull Request mới nhất ${prSampleNote}
${prsText}

---

Hãy tạo bản tin tiếng Việt có cấu trúc rõ ràng cho dự án ${cfg.name}, gồm các phần sau:

1. **Tổng quan hôm nay** - Dùng 3-5 câu tóm tắt tình hình chung của dự án, kèm đánh giá mức độ hoạt động
2. **Bản phát hành** - Nếu có phiên bản mới, nêu chi tiết thay đổi, thay đổi phá vỡ tương thích, lưu ý chuyển đổi; không có thì bỏ qua
3. **Tiến triển dự án** - Các PR quan trọng được hợp nhất/đóng hôm nay, tính năng hoặc bản sửa nào được đẩy tiếp, dự án tiến được bao xa
4. **Chủ đề nóng của cộng đồng** - Issue/PR có nhiều thảo luận, bình luận, phản ứng nhất hôm nay (kèm liên kết), phân tích nhu cầu phía sau
5. **Lỗi và độ ổn định** - Lỗi, sự cố, vấn đề hồi quy được báo cáo hôm nay, xếp theo mức độ nghiêm trọng, ghi rõ nếu đã có PR sửa
6. **Yêu cầu tính năng và tín hiệu lộ trình** - Tính năng người dùng đề xuất, kết hợp PR hiện có để dự đoán khả năng vào phiên bản tới
7. **Tóm tắt phản hồi người dùng** - Từ bình luận Issue, đúc kết điểm đau thực tế, tình huống sử dụng, điều hài lòng/chưa hài lòng
8. **Tồn đọng cần xử lý** - Issue hoặc PR quan trọng lâu chưa được phản hồi, nhắc người duy trì chú ý

Yêu cầu văn phong: khách quan, chuyên nghiệp, dựa trên dữ liệu, làm nổi bật sức khỏe dự án. Mỗi mục kèm liên kết GitHub.`;
}

export function buildPeersComparisonPrompt(
  openclawDigest: RepoDigest,
  peerDigests: RepoDigest[],
  dateStr: string,
  lang: Lang = "vi",
): string {
  const noActivityStr =
    lang === "en" ? "No activity in the last 24 hours." : "Không có hoạt động trong 24 giờ qua.";

  const openclawSection =
    lang === "en"
      ? `## OpenClaw (core reference, github.com/${openclawDigest.config.repo})\n${openclawDigest.summary}`
      : `## OpenClaw (tham chiếu chính, github.com/${openclawDigest.config.repo})\n${openclawDigest.summary}`;

  const peerSections = peerDigests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length || d.discussions.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior analyst of the AI agent and personal AI assistant open-source ecosystem. The following are ${dateStr} community digest summaries for each project.

${openclawSection}

---

${peerSections}

---

Generate a cross-project comparison report in English with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall personal AI assistant / agent open-source landscape
2. **Activity Comparison** - Table comparing Issues count, PR count, Release status, and health score for each project
3. **OpenClaw's Position** - Advantages vs peers, technical approach differences, community size comparison
4. **Shared Technical Focus Areas** - Requirements emerging across multiple projects (note which projects, specific needs)
5. **Differentiation Analysis** - Key differences in feature focus, target users, technical architecture
6. **Community Momentum & Maturity** - Activity tiers, which are rapidly iterating, which are stabilizing
7. **Trend Signals** - Industry trends extracted from community feedback, value for AI agent developers

Style: concise and professional, data-backed, suited for technical decision-makers and developers.
`;
  }

  return `Bạn là chuyên viên phân tích kỹ thuật cấp cao về hệ sinh thái mã nguồn mở AI agent và trợ lý AI cá nhân. Dưới đây là tóm tắt hoạt động cộng đồng ngày ${dateStr} của từng dự án.

${openclawSection}

---

${peerSections}

---

Hãy tạo báo cáo so sánh chéo dựa trên hoạt động của các dự án trên, gồm các phần sau:

1. **Toàn cảnh hệ sinh thái** - Dùng 3-5 câu tóm tắt tình hình chung của hệ sinh thái trợ lý AI cá nhân/agent mã nguồn mở
2. **So sánh mức độ hoạt động** - Bảng tổng hợp số Issue, số PR, tình trạng Release và đánh giá sức khỏe của từng dự án
3. **Vị thế của OpenClaw trong hệ sinh thái** - Lợi thế so với các dự án cùng nhóm, khác biệt về hướng kỹ thuật, so sánh quy mô cộng đồng
4. **Hướng kỹ thuật cùng quan tâm** - Nhu cầu xuất hiện ở nhiều dự án (ghi rõ dự án nào, nhu cầu cụ thể)
5. **Phân tích khác biệt hóa** - Khác biệt chính về trọng tâm tính năng, đối tượng người dùng, kiến trúc kỹ thuật
6. **Độ nóng và độ trưởng thành của cộng đồng** - Phân tầng hoạt động: dự án nào đang lặp nhanh, dự án nào đang củng cố chất lượng
7. **Tín hiệu xu hướng đáng chú ý** - Xu hướng ngành rút ra từ phản hồi cộng đồng, giá trị tham khảo cho nhà phát triển AI agent

Yêu cầu văn phong: ngắn gọn, chuyên nghiệp, có số liệu hỗ trợ, phù hợp người ra quyết định kỹ thuật và nhà phát triển.`;
}

export function buildSkillsPrompt(
  prs: GitHubItem[],
  issues: GitHubItem[],
  dateStr: string,
  lang: Lang = "vi",
): string {
  const topPrs = topN(prs, 20);
  const topIssues = topN(issues, 15);

  const noneStr = lang === "en" ? "None" : "Không có";
  const prsText = topPrs.map((p) => formatItem(p, lang)).join("\n") || noneStr;
  const issuesText = topIssues.map((i) => formatItem(i, lang)).join("\n") || noneStr;

  if (lang === "en") {
    return `You are a technical analyst focused on the Claude Code ecosystem. The following data is from github.com/anthropics/skills (official Claude Code Skills repository). Analyze the community's most-watched Skills activity (data as of ${dateStr}).

## Repository Context
anthropics/skills is the official Claude Code Skills collection. Each PR typically represents a new or improved Skill. The community proposes new Skills and reports issues via Issues; PRs represent actual Skill submissions.

## Popular Pull Requests (sorted by comments, ${prs.length} total, showing top ${topPrs.length})
${prsText}

## Community Issues (sorted by comments, ${issues.length} total, showing top ${topIssues.length})
${issuesText}

---

Generate a Claude Code Skills community highlights report in English with these sections:

1. **Top Skills Ranking** - List the 5-8 most-discussed Skills (PRs) by comments/attention, describe each Skill's functionality, discussion highlights, and current status (open/merged/draft)
2. **Community Demand Trends** - From Issues, distill the most-anticipated new Skill directions (e.g. workflow automation, code review, test generation, documentation)
3. **High-Potential Pending Skills** - Active-comment PRs not yet merged; these Skills may land soon
4. **Skills Ecosystem Insight** - One-sentence summary: what is the community's most concentrated demand at the Skills level?

Style: concise and professional, include GitHub links for each item.
`;
  }

  return `Bạn là chuyên viên phân tích kỹ thuật tập trung vào hệ sinh thái Claude Code. Dưới đây là dữ liệu từ github.com/anthropics/skills (kho Claude Code Skills chính thức). Hãy phân tích hoạt động Skills được cộng đồng quan tâm nhất (dữ liệu đến ngày ${dateStr}).

## Giới thiệu kho
anthropics/skills là kho tập hợp Claude Code Skills chính thức; mỗi PR thường tương ứng một Skill mới hoặc được cải thiện. Cộng đồng đề xuất nhu cầu Skill mới hoặc phản hồi vấn đề qua Issue, PR đại diện cho Skill được gửi thực tế.

## Pull Request phổ biến (sắp theo số bình luận, tổng ${prs.length}, hiển thị ${topPrs.length} mục đầu)
${prsText}

## Issue cộng đồng (sắp theo số bình luận, tổng ${issues.length}, hiển thị ${topIssues.length} mục đầu)
${issuesText}

---

Hãy tạo báo cáo điểm nóng cộng đồng Claude Code Skills, gồm các phần sau:

1. **Bảng xếp hạng Skills nổi bật** - Liệt kê 5-8 Skills (PR) có bình luận/độ chú ý cao nhất, nêu chức năng, điểm thảo luận nổi bật và trạng thái hiện tại (open/merged/draft)
2. **Xu hướng nhu cầu cộng đồng** - Từ Issue, đúc kết những hướng Skill mới được mong đợi nhất (ví dụ tự động hóa quy trình, đánh giá mã, tạo kiểm thử, tài liệu)
3. **Skills tiềm năng chờ hợp nhất** - Các PR có bình luận sôi nổi nhưng chưa hợp nhất; những Skills này có thể sớm ra mắt
4. **Góc nhìn hệ sinh thái Skills** - Một câu tóm tắt: nhu cầu tập trung nhất của cộng đồng ở tầng Skills hiện nay là gì

Yêu cầu văn phong: ngắn gọn, chuyên nghiệp, mỗi mục kèm liên kết GitHub.`;
}

export function buildComparisonPrompt(digests: RepoDigest[], dateStr: string, lang: Lang = "vi"): string {
  const noActivityStr =
    lang === "en" ? "No activity in the last 24 hours." : "Không có hoạt động trong 24 giờ qua.";

  const sections = digests
    .map((d) => {
      const hasData = d.issues.length || d.prs.length || d.releases.length || d.discussions.length;
      if (!hasData) return `## ${d.config.name} (github.com/${d.config.repo})\n${noActivityStr}`;
      return `## ${d.config.name} (github.com/${d.config.repo})\n${d.summary}`;
    })
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a senior technical analyst of the AI developer tools ecosystem. The following are ${dateStr} community digest summaries for each major AI CLI tool:

${sections}

---

Generate a cross-tool comparison report in English with these sections:

1. **Ecosystem Overview** - 3-5 sentences on the overall AI CLI tools development landscape
2. **Activity Comparison** - Table comparing Issues count, PR count, Discussions count and Release status for each tool today. Some repos have Issues/PRs disabled upstream and use Discussions as their only community channel — mark those as "N/A" rather than reporting them as inactive
3. **Shared Feature Directions** - Requirements appearing across multiple tool communities (note which tools, specific needs)
4. **Differentiation Analysis** - Differences in feature focus, target users, and technical approach
5. **Community Momentum & Maturity** - Which tools have more active communities, which are rapidly iterating
6. **Trend Signals** - Industry trends from community feedback, reference value for developers

Style: concise and professional, data-backed, suited for technical decision-makers and developers.
`;
  }

  return `Bạn là chuyên viên phân tích kỹ thuật cấp cao về hệ sinh thái công cụ phát triển AI. Dưới đây là tóm tắt hoạt động cộng đồng ngày ${dateStr} của các công cụ AI CLI chính:

${sections}

---

Hãy tạo báo cáo so sánh chéo dựa trên hoạt động của các công cụ trên, gồm các phần sau:

1. **Toàn cảnh hệ sinh thái** - Dùng 3-5 câu tóm tắt tình hình phát triển chung của công cụ AI CLI hiện nay
2. **So sánh mức độ hoạt động** - Bảng tổng hợp số Issue, số PR, số Discussion và tình trạng Release của từng công cụ hôm nay. Một số kho đã tắt Issue/PR ở thượng nguồn và chỉ dùng Discussions làm kênh cộng đồng — hãy ghi "N/A" thay vì coi là không hoạt động
3. **Hướng tính năng cùng quan tâm** - Nhu cầu xuất hiện ở nhiều cộng đồng công cụ (ghi rõ công cụ nào, nhu cầu cụ thể)
4. **Phân tích khác biệt hóa** - Khác biệt về trọng tâm tính năng, đối tượng người dùng, hướng kỹ thuật
5. **Độ nóng và độ trưởng thành của cộng đồng** - Công cụ nào có cộng đồng sôi nổi hơn, công cụ nào đang lặp nhanh
6. **Tín hiệu xu hướng đáng chú ý** - Xu hướng ngành rút ra từ phản hồi cộng đồng, giá trị tham khảo cho nhà phát triển

Yêu cầu văn phong: ngắn gọn, chuyên nghiệp, có số liệu hỗ trợ, phù hợp người ra quyết định kỹ thuật và nhà phát triển.`;
}

// ---------------------------------------------------------------------------
// Translation
// ---------------------------------------------------------------------------
// Every report body is generated once in English, then translated to Vietnamese.
// Generating both languages from the raw GitHub/API data doubled the LLM bill
// for identical information; a translation pass costs a fraction of the input
// tokens because its prompt is the finished report, not the source data.

/** Prompt that translates a finished English report body into Vietnamese. */
export function buildTranslationPrompt(text: string): string {
  return `Translate the following English technical report into Vietnamese.

${text}

---

Rules:
- Output ONLY the translation. No preamble, no explanation, no markdown fences around the whole output.
- Preserve the Markdown structure exactly: headings, tables (including column alignment rows), lists, blockquotes, bold/italic, horizontal rules, emoji.
- Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim.
- Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form — do not translate them.
- Issue/PR references like #12345 and their link text stay as-is.
- Use natural Vietnamese, the register of a Vietnamese developer newsletter — clear and direct, not a literal word-for-word rendering.
- Prefer simple words and short sentences. State what changed and what it is for when the source provides enough information. Do not add facts, version comparisons or benefits that are not in the source.
`;
}
/** Prompt that translates the string values of a JSON object into Vietnamese. */
export function buildJsonTranslationPrompt(json: string): string {
  return `Translate the string values in the following JSON into Vietnamese.

${json}

---

Rules:
- Return ONLY valid JSON. No markdown fences, no explanation.
- Keep every key exactly as-is. Keep the array lengths and nesting identical.
- Translate only the string values.
- Keep project names, repository slugs, version tags and numbers in their original form.
- Do not change numbers, dates or status wording: keep "đề xuất/đang phát triển" for open PRs, "đã merge" for merged-but-unreleased, "đã phát hành/hỗ trợ" only where the source says so.
- Each highlight must be a short Vietnamese sentence of at most 25 words.
`;
}

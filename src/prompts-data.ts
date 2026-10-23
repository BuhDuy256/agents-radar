/**
 * LLM prompt builders for data-source reports (trending, web, HN).
 *
 * Separated from prompts.ts to keep each module focused.
 */

import type { WebFetchResult } from "./web.ts";
import type { TrendingData } from "./trending.ts";
import type { HnData } from "./hn.ts";
import type { PhData } from "./ph.ts";
import type { ArxivData } from "./arxiv.ts";
import type { HfData } from "./hf.ts";
import type { DevtoData } from "./devto.ts";
import type { LobstersData } from "./lobsters.ts";
import type { Lang } from "./i18n.ts";
export function buildTrendingPrompt(data: TrendingData, dateStr: string, lang: Lang = "vi"): string {
  const trendingSection =
    data.trendingFetchSuccess && data.trendingRepos.length > 0
      ? data.trendingRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.totalStars.toLocaleString()}` +
              (r.todayStars > 0 ? ` (+${r.todayStars} today)` : "") +
              (r.forks > 0 ? ` 🍴${r.forks.toLocaleString()}` : "") +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : lang === "en"
        ? "(Unable to fetch today's GitHub Trending list)"
        : "(Không lấy được bảng GitHub Trending hôm nay)";

  const searchSection =
    data.searchRepos.length > 0
      ? data.searchRepos
          .map(
            (r) =>
              `- [${r.fullName}](${r.url})` +
              (r.language ? ` [${r.language}]` : "") +
              ` ⭐${r.stargazersCount.toLocaleString()}` +
              ` [topic:${r.searchQuery}]` +
              (r.description ? `\n  ${r.description}` : ""),
          )
          .join("\n")
      : lang === "en"
        ? "(No search results)"
        : "(Không có kết quả tìm kiếm)";

  if (lang === "en") {
    return `You are a technical analyst focused on the AI open-source ecosystem. The following is ${dateStr} GitHub AI-related trending repository data. Please filter for AI relevance, categorize, and analyze trends.

## Data Sources
- **Trending List** (github.com/trending, today's stars most reliable): Real-time hot list with today's new stars
- **Topic Search** (GitHub Search API, topic tags): AI-related projects active in last 7 days, grouped by topic

---

## GitHub Today's Trending (${data.trendingRepos.length} repositories)
${trendingSection}

---

## AI Topic Search Results (${data.searchRepos.length} repositories, deduplicated)
${searchSection}

---

Generate a structured AI Open Source Trends Report in English:

**Step 1 (Filter)**: From the above data, select projects clearly related to AI/ML (exclude unrelated general tools, frontend frameworks, games, etc.). Skip non-AI trending repos.

**Step 2 (Categorize)**: Group filtered projects into these categories (a project can belong to multiple; pick the primary one):
- 🔧 AI Infrastructure (frameworks, SDKs, inference engines, dev tools, CLI)
- 🤖 AI Agents / Workflows (agent frameworks, automation, multi-agent systems)
- 📦 AI Applications (specific apps, vertical solutions)
- 🧠 LLMs / Training (model weights, training frameworks, fine-tuning tools)
- 🔍 RAG / Knowledge (vector databases, retrieval-augmented generation, knowledge management)

**Step 3 (Output Report)** with these sections:

1. **Today's Highlights** — 3-5 sentences on the most noteworthy AI open-source developments today

2. **Top Projects by Category** — For each category, render a **Markdown table** with exactly these columns:

   | Project | Lang | Stars (total / today) | Summary |
   | :--- | :--- | ---: | :--- |

   - **Project**: repo name as a Markdown link to its GitHub URL
   - **Lang**: primary language (leave blank if unknown)
   - **Stars**: total stars, plus today's new stars in parentheses when available (e.g. "86,392 (+1,851)"); copy the numbers from the input verbatim, do not recompute
   - **Summary**: 2 sentences — what the project is and why it's worth attention today, including any standout data point or momentum signal
   - List 3-8 projects per category; omit a category's table entirely if no project falls under it

3. **Trend Signal Analysis** — 200-300 words, distill from today's hot list:
   - Which type of AI tool is getting explosive community attention?
   - Any new tech stacks or directions appearing for the first time?
   - Connection to recent LLM releases / industry events

4. **Community Hot Spots** — Bullet list of 3-5 specific projects or directions worth developer focus, with brief reasoning

Style: English, professional and concise, must include GitHub links for every project.
`;
  }

  return `Bạn là chuyên viên phân tích kỹ thuật tập trung vào hệ sinh thái mã nguồn mở AI. Dưới đây là dữ liệu các kho liên quan đến AI trên GitHub ngày ${dateStr}. Hãy lọc theo mức độ liên quan đến AI, phân loại và phân tích xu hướng.

## Nguồn dữ liệu
- **Bảng Trending** (github.com/trending, số star hôm nay đáng tin nhất): bảng nóng theo thời gian thực, kèm số star mới trong ngày
- **Tìm kiếm theo chủ đề** (GitHub Search API, thẻ topic): dự án liên quan AI hoạt động trong 7 ngày qua, nhóm theo chủ đề

---

## Bảng GitHub Trending hôm nay (${data.trendingRepos.length} kho)
${trendingSection}

---

## Kết quả tìm kiếm theo chủ đề AI (${data.searchRepos.length} kho, đã loại trùng)
${searchSection}

---

Hãy tạo báo cáo Xu hướng mã nguồn mở AI có cấu trúc rõ ràng, yêu cầu:

**Bước 1 (Lọc)**: Từ dữ liệu trên, chọn các dự án liên quan rõ ràng đến AI/ML (loại công cụ tổng quát, framework frontend, trò chơi... không liên quan); bỏ qua dự án không phải AI trong bảng Trending.

**Bước 2 (Phân loại)**: Chia các dự án đã lọc theo các nhóm sau (một dự án có thể thuộc nhiều nhóm, ưu tiên nhóm chính):
- 🔧 Hạ tầng AI (framework, SDK, công cụ suy luận, công cụ phát triển, CLI)
- 🤖 AI Agent / quy trình tự động (framework agent, tự động hóa, đa agent)
- 📦 Ứng dụng AI (sản phẩm cụ thể, giải pháp theo lĩnh vực)
- 🧠 LLM / huấn luyện (trọng số mô hình, framework huấn luyện, công cụ tinh chỉnh)
- 🔍 RAG / tri thức (cơ sở dữ liệu vector, truy xuất tăng cường, quản lý tri thức)

**Bước 3 (Xuất báo cáo)**, gồm các phần sau:

1. **Điểm nổi bật hôm nay** — 3-5 câu tóm tắt những diễn biến đáng chú ý nhất của mã nguồn mở AI hôm nay

2. **Dự án nổi bật theo nhóm** — Mỗi nhóm trình bày bằng **bảng Markdown**, cột cố định:

   | Dự án | Ngôn ngữ | Stars (tổng / hôm nay) | Mô tả ngắn |
   | :--- | :--- | ---: | :--- |

   - **Dự án**: tên kho, đặt làm liên kết Markdown tới GitHub
   - **Ngôn ngữ**: ngôn ngữ chính (để trống nếu không rõ)
   - **Stars**: tổng số star, kèm số star mới hôm nay trong ngoặc nếu có (ví dụ "86,392 (+1,851)"); sao chép nguyên số từ đầu vào, không tính lại
   - **Mô tả ngắn**: 2 câu — dự án là gì và vì sao đáng chú ý hôm nay, nêu điểm dữ liệu hoặc tín hiệu tăng trưởng nổi bật
   - Mỗi nhóm liệt kê 3-8 dự án; nhóm không có dự án thì bỏ toàn bộ bảng

3. **Phân tích tín hiệu xu hướng** — 200-300 từ, rút ra từ bảng nóng hôm nay:
   - Loại công cụ AI nào đang nhận sự chú ý bùng nổ từ cộng đồng?
   - Có ngăn xếp công nghệ hoặc hướng đi mới xuất hiện lần đầu không?
   - Liên hệ với các bản phát hành LLM / sự kiện ngành gần đây

4. **Điểm nóng cộng đồng** — Dạng bullet, 3-5 dự án hoặc hướng đi cụ thể đáng để nhà phát triển theo dõi, kèm lý do ngắn gọn

Yêu cầu văn phong: tiếng Việt, chuyên nghiệp, ngắn gọn, mỗi dự án phải kèm liên kết GitHub.`;
}

export function buildWebReportPrompt(results: WebFetchResult[], dateStr: string, lang: Lang = "vi"): string {
  const isAnyFirstRun = results.some((r) => r.isFirstRun);

  const siteSections = results
    .map(({ siteName, isFirstRun, newItems, totalDiscovered }) => {
      const mode =
        lang === "en"
          ? isFirstRun
            ? `First full crawl (sitemap total ${totalDiscovered} URLs, showing latest ${newItems.length} articles)`
            : `Incremental update, ${newItems.length} new articles today`
          : isFirstRun
            ? `Quét đầy đủ lần đầu (sitemap có ${totalDiscovered} URL, dưới đây là ${newItems.length} bài mới nhất có nội dung)`
            : `Cập nhật tăng dần hôm nay, ${newItems.length} nội dung mới`;

      if (newItems.length === 0) {
        const noContent =
          lang === "en" ? `(${mode}, no content to analyze.)` : `(${mode}, không có nội dung để phân tích.)`;
        return `## ${siteName}\n\n${noContent}`;
      }

      const categoryLabel = lang === "en" ? "Category" : "Nhóm";
      const dateLabel = lang === "en" ? "Published/Updated" : "Công bố/Cập nhật";
      const unknownDate = lang === "en" ? "unknown" : "không rõ";
      const excerptLabel = lang === "en" ? "Excerpt" : "Trích đoạn";
      const metadataOnlyNote =
        lang === "en"
          ? "(metadata-only: title derived from URL slug, may be inaccurate; no article text available)"
          : "(chỉ có metadata: tiêu đề suy ra từ đường dẫn URL, có thể không chính xác; không lấy được nội dung bài)";
      const itemsText = newItems
        .map((item) => {
          const lines = [
            `### [${item.title || item.url}](${item.url})`,
            `- ${categoryLabel}: ${item.category} | ${dateLabel}: ${item.lastmod.slice(0, 10) || unknownDate}`,
          ];
          if (item.content) {
            lines.push(`- ${excerptLabel}: ${item.content}`);
          } else {
            lines.push(`- ${metadataOnlyNote}`);
          }
          return lines.join("\n");
        })
        .join("\n\n");

      const lp = "(";
      const rp = ")";
      return `## ${siteName}${lp}${mode}${rp}\n\n${itemsText}`;
    })
    .join("\n\n---\n\n");

  const firstRunNote =
    lang === "en"
      ? isAnyFirstRun
        ? "This is the first full crawl. Please focus on the overall content landscape, historical context, and core themes of each site, rather than individual articles."
        : "This is an incremental update. Please focus on today's new content and assess its strategic significance in context."
      : isAnyFirstRun
        ? "Đây là lần quét đầy đủ đầu tiên. Hãy tập trung vào bố cục nội dung tổng thể, bối cảnh lịch sử và chủ đề cốt lõi của từng trang, thay vì chỉ từng bài riêng lẻ."
        : "Đây là cập nhật tăng dần. Hãy tập trung vào nội dung mới hôm nay và đánh giá ý nghĩa chiến lược của nó trong bối cảnh chung.";

  if (lang === "en") {
    return `You are a deep content analyst focused on AI, skilled at extracting strategic signals from official announcements, technical blogs, research papers, and product documentation.

The following content was crawled on ${dateStr} from Anthropic (claude.com / anthropic.com) and OpenAI (openai.com). ${firstRunNote}

${siteSections}

---

Generate a detailed AI Official Content Tracking Report in English with these sections:

1. **Today's Highlights** — 3-5 sentences on the most important new releases or developments, calling out key highlights

2. **Anthropic / Claude Content Highlights** — Organize important content by category (news / research / engineering / learn, etc.):
   - For each piece, 2-4 sentences extracting core insights, technical details, or business significance
   - Note publication date and original link
   - If first full crawl, trace important milestones chronologically

3. **OpenAI Content Highlights** — Same structure, organized by research / release / company / safety categories
   - ⚠️ Note: OpenAI data is metadata-only (titles derived from URL slugs, no article text). Only list URLs and categories objectively. Do NOT speculate on title meanings or fabricate content summaries. If information is insufficient for analysis, state the data limitation clearly.

4. **Strategic Signal Analysis** — Based on both companies' release cadence and content focus, analyze:
   - Each company's recent technical priorities (model capabilities / safety / productization / ecosystem)
   - Competitive dynamics: who is setting the agenda, who is following
   - Potential impact on developers and enterprise users

5. **Notable Details** — Extract hidden signals from titles, phrasing, and timing, e.g.:
   - New terms or topics appearing for the first time
   - Dense releases in a category (may signal a product milestone)
   - Policy, compliance, and safety developments

${isAnyFirstRun ? "6. **Content Landscape Overview** — First full crawl only: summarize the content category distribution for both companies and describe their content strategy style (academic-oriented vs product-oriented vs user stories, etc.)\n\n" : ""}Style: English, professional and detailed, suited for AI researchers, product managers, and technical decision-makers. Every item must include official links.
`;
  }

  return `Bạn là chuyên viên phân tích nội dung chuyên sâu về AI, có khả năng rút ra tín hiệu chiến lược từ thông cáo chính thức, blog kỹ thuật, bài nghiên cứu và tài liệu sản phẩm.

Dưới đây là nội dung thu thập ngày ${dateStr} từ Anthropic (claude.com / anthropic.com) và OpenAI (openai.com). ${firstRunNote}

${siteSections}

---

Hãy tạo báo cáo Theo dõi nội dung chính thức AI chi tiết, gồm các phần sau:

1. **Điểm nổi bật hôm nay** — 3-5 câu tóm tắt những bản phát hành hoặc diễn biến mới quan trọng nhất, nêu điểm sáng chính

2. **Nội dung nổi bật của Anthropic / Claude** — Sắp xếp từng nội dung quan trọng theo nhóm (news / research / engineering / learn...):
   - Mỗi bài dùng 2-4 câu nêu luận điểm chính, chi tiết kỹ thuật hoặc ý nghĩa kinh doanh
   - Ghi ngày công bố và liên kết gốc
   - Nếu là lần quét đầy đủ đầu tiên, sắp theo dòng thời gian các cột mốc quan trọng

3. **Nội dung nổi bật của OpenAI** — Cấu trúc tương tự, nhóm theo research / release / company / safety
   - ⚠️ Lưu ý: dữ liệu OpenAI chỉ có metadata (tiêu đề suy ra từ URL, không có nội dung bài). Chỉ liệt kê URL và nhóm một cách khách quan. KHÔNG suy đoán ý nghĩa tiêu đề hay bịa tóm tắt nội dung. Nếu thông tin không đủ để phân tích, hãy nêu rõ giới hạn dữ liệu.

4. **Giải mã tín hiệu chiến lược** — Dựa trên nhịp phát hành và trọng tâm nội dung của hai công ty, phân tích:
   - Ưu tiên kỹ thuật gần đây của mỗi công ty (năng lực mô hình / an toàn / sản phẩm hóa / hệ sinh thái)
   - Cục diện cạnh tranh: ai đang dẫn dắt chủ đề, ai đang bám theo
   - Ảnh hưởng tiềm tàng với nhà phát triển và người dùng doanh nghiệp

5. **Chi tiết đáng chú ý** — Rút ra tín hiệu ẩn từ tiêu đề, cách diễn đạt, thời điểm công bố, ví dụ:
   - Thuật ngữ hoặc chủ đề mới xuất hiện lần đầu
   - Mật độ công bố dày trong một nhóm chủ đề (có thể báo hiệu cột mốc sản phẩm)
   - Diễn biến chính sách, tuân thủ, an toàn

${isAnyFirstRun ? "6. **Tổng quan bố cục nội dung** — Chỉ có ở lần quét đầy đủ đầu tiên: tổng hợp phân bố số lượng theo nhóm nội dung của hai công ty và mô tả phong cách vận hành nội dung (hướng học thuật vs hướng sản phẩm vs câu chuyện người dùng...)\n\n" : ""}Yêu cầu văn phong: tiếng Việt, chuyên nghiệp và đi sâu, nội dung đầy đủ, phù hợp nhà nghiên cứu AI, quản lý sản phẩm và người ra quyết định kỹ thuật. Mỗi mục phải kèm liên kết GitHub/website chính thức.`;
}

// ---------------------------------------------------------------------------
// Highlights prompt — extracts structured highlights from finished reports
// for use in Telegram notifications.
// ---------------------------------------------------------------------------

export interface ReportHighlights {
  [reportId: string]: string[];
}

export function buildHighlightsPrompt(
  reportContents: Record<string, string>,
  lang: Lang = "vi",
  itemsPerReport: number = 6,
): string {
  const sections = Object.entries(reportContents)
    .map(([id, content]) => `## [${id}]\n\n${content.slice(0, 2000)}`)
    .join("\n\n---\n\n");

  if (lang === "en") {
    return `You are a concise news editor. The following are today's AI ecosystem report excerpts, each labeled with a report ID.

${sections}

---

For each report, extract ${itemsPerReport} of the most noteworthy highlights — the kind that would make a reader want to click through. Each highlight should be a single short sentence (under 60 characters).

Return ONLY valid JSON, no markdown fences, no explanation. Format:
{"ai-cli":["highlight 1","highlight 2",...],"ai-agents":["highlight 1","highlight 2",...],...}

Rules:
- Use the exact report IDs from the [brackets] above as keys
- Only include reports that have meaningful content (skip reports with failure messages or no activity)
- ${itemsPerReport} highlights per report, each under 60 characters
- Focus on: new releases, notable features, trending projects, key discussions
- Be specific: include project names, version numbers, star counts where relevant`;
  }

  return `Bạn là biên tập viên tin tức ngắn gọn. Dưới đây là trích đoạn báo cáo hệ sinh thái AI hôm nay, mỗi báo cáo được gắn ID.

${sections}

---

Với mỗi báo cáo, hãy chọn ${itemsPerReport} điểm nổi bật đáng chú ý nhất — loại khiến người đọc muốn bấm vào xem. Mỗi điểm là một câu tiếng Việt ngắn, tối đa 25 từ.

Chỉ trả về JSON hợp lệ, không dùng khối mã markdown, không giải thích. Định dạng:
{"ai-cli":["điểm 1","điểm 2",...],"ai-agents":["điểm 1","điểm 2",...],...}

Quy tắc:
- Dùng đúng ID báo cáo trong [ngoặc vuông] ở trên làm key
- Chỉ gồm báo cáo có nội dung thực chất (bỏ báo cáo lỗi hoặc không có hoạt động)
- ${itemsPerReport} điểm mỗi báo cáo, mỗi điểm tối đa 25 từ
- Tập trung vào: bản phát hành mới, tính năng quan trọng, dự án nổi bật, thảo luận then chốt
- Nêu cụ thể: tên dự án, số phiên bản, số star... khi có
- Mỗi điểm phải viết bằng tiếng Việt; kể cả khi nguồn (tiêu đề bài báo, tên mô hình, tiêu đề thảo luận...) là tiếng Anh cũng phải dịch sang tiếng Việt, chỉ giữ nguyên tiếng Anh cho tên riêng như tên dự án, tên mô hình, tên sản phẩm; không sao chép nguyên câu tiếng Anh`;
}

export function buildHnPrompt(data: HnData, dateStr: string, lang: Lang = "vi"): string {
  const storiesText = data.stories
    .map((s, i) =>
      lang === "en"
        ? `${i + 1}. **${s.title}**\n` +
          `   Link: ${s.url}\n` +
          `   Discussion: ${s.hnUrl}\n` +
          `   HN Rank: ${s.hnRank ?? i + 1} | Score: ${s.points} | Comments: ${s.comments} | Author: ${s.author} | Time: ${s.createdAt.slice(0, 16)}`
        : `${i + 1}. **${s.title}**\n` +
          `   Liên kết: ${s.url}\n` +
          `   Thảo luận: ${s.hnUrl}\n` +
          `   Hạng HN: ${s.hnRank ?? i + 1} | Điểm: ${s.points} | Bình luận: ${s.comments} | Tác giả: ${s.author} | Thời gian: ${s.createdAt.slice(0, 16)}`,
    )
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI industry news analyst. The following are AI-related posts from the current Hacker News topstories feed as of ${dateStr} (ordered by HN rank, ${data.stories.length} total):

---

${storiesText}

---

Generate a structured Hacker News AI Community Digest in English:

1. **Today's Highlights** — 3-5 sentences on the hottest AI discussion topics and community sentiment on HN today

2. **Top News & Discussions** — Organized by category, render a **Markdown table** per category with exactly these columns:

   | Title | Score | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Title**: title as a Markdown link to the original article, followed by a " · [HN](discussion-url)" link to the HN thread
   - **Score / Comments**: copy the numbers from the input verbatim
   - **Summary**: 2 sentences — why this matters and what the community's typical reaction is
   - Select the 2-5 most representative items per category; omit a category's table if empty

   Categories:
   - 🔬 Models & Research (new model releases, papers, benchmarks)
   - 🛠️ Tools & Engineering (open-source projects, frameworks, engineering practices)
   - 🏢 Industry News (company news, funding, product launches)
   - 💬 Opinions & Debates (notable Ask HN, Show HN, or hot discussion threads)

3. **Community Sentiment Signal** — 100-200 words analyzing today's HN AI discussion mood and focus:
   - Which topics are most active (high score + high comments)?
   - Any clear points of controversy or consensus?
   - Compared to last cycle, any notable shift in focus?

4. **Worth Deep Reading** — List 2-3 pieces most worth developers/researchers reading in depth, with brief reasoning

Style: English, concise and professional, preserve all original links.
`;
  }

  return `Bạn là chuyên viên phân tích tin tức ngành AI. Dưới đây là các bài viết liên quan AI từ nguồn topstories của Hacker News tính đến ${dateStr} (sắp theo thứ hạng HN, tổng ${data.stories.length} bài):

---

${storiesText}

---

Hãy tạo Bản tin cộng đồng Hacker News AI có cấu trúc rõ ràng:

1. **Điểm nổi bật hôm nay** — 3-5 câu về chủ đề AI nóng nhất và tâm lý cộng đồng trên HN hôm nay

2. **Tin tức và thảo luận nổi bật** — Nhóm theo chủ đề, mỗi nhóm dùng **bảng Markdown** với các cột cố định:

   | Tiêu đề | Điểm | Bình luận | Mô tả ngắn |
   | :--- | ---: | ---: | :--- |

   - **Tiêu đề**: tiêu đề đặt làm liên kết Markdown tới bài gốc, sau đó thêm " · [HN](liên kết thảo luận)" trỏ tới thảo luận HN
   - **Điểm / Bình luận**: sao chép nguyên số từ đầu vào
   - **Mô tả ngắn**: 2 câu — vì sao đáng chú ý và phản ứng điển hình của cộng đồng
   - Mỗi nhóm chọn 2-5 mục tiêu biểu nhất; nhóm trống thì bỏ bảng

   Nhóm:
   - 🔬 Mô hình và nghiên cứu (mô hình mới, bài báo, benchmark)
   - 🛠️ Công cụ và kỹ thuật (dự án mã nguồn mở, framework, thực hành kỹ thuật)
   - 🏢 Tin ngành (tin công ty, gọi vốn, ra mắt sản phẩm)
   - 💬 Quan điểm và tranh luận (Ask HN, Show HN hoặc chủ đề tranh luận nổi bật)

3. **Tín hiệu tâm lý cộng đồng** — 100-200 từ phân tích tâm lý và trọng tâm thảo luận AI trên HN hôm nay:
   - Chủ đề nào sôi nổi nhất (điểm cao + nhiều bình luận)?
   - Có điểm tranh cãi hoặc đồng thuận rõ ràng không?
   - So với chu kỳ trước, trọng tâm có thay đổi đáng chú ý không?

4. **Đáng đọc sâu** — Liệt kê 2-3 nội dung đáng để nhà phát triển/nhà nghiên cứu đọc kỹ, kèm lý do ngắn

Yêu cầu văn phong: tiếng Việt, chuyên nghiệp, ngắn gọn, giữ nguyên mọi liên kết gốc.`;
}

export function buildPhPrompt(data: PhData, dateStr: string, lang: Lang = "vi"): string {
  const productsText = data.products
    .map((p, i) =>
      lang === "en"
        ? `${i + 1}. **${p.name}** — ${p.tagline}\n` +
          `   Product Hunt: ${p.url}\n` +
          `   Website: ${p.website}\n` +
          `   Votes: ${p.votesCount} | Comments: ${p.commentsCount} | Topics: ${p.topics.join(", ")}`
        : `${i + 1}. **${p.name}** — ${p.tagline}\n` +
          `   Product Hunt: ${p.url}\n` +
          `   Website: ${p.website}\n` +
          `   Phiếu: ${p.votesCount} | Bình luận: ${p.commentsCount} | Chủ đề: ${p.topics.join(", ")}`,
    )
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI product analyst. The following are AI-related products launched on Product Hunt in the past 24 hours as of ${dateStr} (sorted by votes, ${data.products.length} total):

---

${productsText}

---

Generate a structured Product Hunt AI Products Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most notable AI product launches and trends on Product Hunt today

2. **Top Products** — Organized by category, render a **Markdown table** per category with exactly these columns:

   | Product | Votes | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Product**: product name as a Markdown link to its Product Hunt page, followed by " · [site](website-url)" when a website is available
   - **Votes / Comments**: copy the numbers from the input verbatim
   - **Summary**: 2 sentences — the tagline plus what problem it solves and what makes it stand out
   - Select the most representative products per category; omit a category's table if empty

   Categories:
   - 🤖 AI Agents & Assistants (chatbots, copilots, autonomous agents)
   - 🛠️ Developer Tools (APIs, SDKs, coding tools, dev infrastructure)
   - 📊 AI Applications (vertical products, SaaS tools powered by AI)
   - 🎨 Creative & Content (image/video/text generation, design tools)
   - 🔧 Infrastructure & Models (model serving, fine-tuning, MLOps)

3. **Market Signal** — 100-200 words analyzing today's Product Hunt AI launch patterns:
   - Which categories are most crowded?
   - Any innovative approaches or novel use cases?
   - Open-source vs closed-source trend among launches

4. **Worth Trying** — List 2-3 products most worth developers trying out, with brief reasoning

Style: English, concise and professional, preserve all original links.
`;
  }

  return `Bạn là chuyên viên phân tích sản phẩm AI. Dưới đây là các sản phẩm AI ra mắt trên Product Hunt trong 24 giờ qua tính đến ${dateStr} (sắp theo số phiếu, tổng ${data.products.length} sản phẩm):

---

${productsText}

---

Hãy tạo Bản tin sản phẩm AI Product Hunt có cấu trúc rõ ràng, yêu cầu:

1. **Điểm nổi bật hôm nay** — 3-5 câu tóm tắt xu hướng và điểm sáng của các sản phẩm AI ra mắt trên Product Hunt hôm nay

2. **Sản phẩm nổi bật** — Nhóm theo các nhóm sau, mỗi nhóm dùng **bảng Markdown** với cột cố định:

   | Sản phẩm | Phiếu | Bình luận | Mô tả ngắn |
   | :--- | ---: | ---: | :--- |

   - **Sản phẩm**: tên sản phẩm đặt làm liên kết Markdown tới trang Product Hunt, nếu có website thì thêm " · [website](liên kết website)"
   - **Phiếu / Bình luận**: sao chép nguyên số từ đầu vào, không tính lại
   - **Mô tả ngắn**: 2 câu — dựa trên phần giới thiệu, nêu sản phẩm giải quyết vấn đề gì và có gì khác biệt
   - Mỗi nhóm chọn sản phẩm tiêu biểu nhất; nhóm trống thì bỏ bảng

   Nhóm:
   - 🤖 AI Agent và trợ lý (chatbot, Copilot, agent tự chủ)
   - 🛠️ Công cụ nhà phát triển (API, SDK, công cụ lập trình, hạ tầng phát triển)
   - 📊 Ứng dụng AI (sản phẩm theo lĩnh vực, công cụ SaaS dùng AI)
   - 🎨 Sáng tạo và nội dung (tạo ảnh/video/văn bản, công cụ thiết kế)
   - 🔧 Hạ tầng và mô hình (phục vụ mô hình, tinh chỉnh, MLOps)

3. **Tín hiệu thị trường** — 100-200 từ phân tích quy luật ra mắt sản phẩm AI trên Product Hunt hôm nay:
   - Nhóm nào dày đặc nhất?
   - Có cách tiếp cận đổi mới hoặc tình huống sử dụng mới lạ không?
   - Xu hướng mã nguồn mở so với đóng

4. **Đáng dùng thử** — Liệt kê 2-3 sản phẩm đáng để nhà phát triển dùng thử nhất, kèm lý do ngắn

Yêu cầu văn phong: tiếng Việt, chuyên nghiệp, ngắn gọn, giữ nguyên mọi liên kết gốc.`;
}

// ---------------------------------------------------------------------------
// ArXiv prompt
// ---------------------------------------------------------------------------

export function buildArxivPrompt(data: ArxivData, dateStr: string, lang: Lang = "vi"): string {
  const papersText = data.papers
    .map((p, i) => {
      const authors =
        p.authors.length > 3 ? p.authors.slice(0, 3).join(", ") + " et al." : p.authors.join(", ");
      const cats = p.categories.slice(0, 3).join(", ");
      return lang === "en"
        ? `${i + 1}. **${p.title}**\n` +
            `   Link: ${p.url}\n` +
            `   Authors: ${authors} | Categories: ${cats}\n` +
            `   Published: ${p.published.slice(0, 10)}\n` +
            `   Abstract: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`
        : `${i + 1}. **${p.title}**\n` +
            `   Liên kết: ${p.url}\n` +
            `   Tác giả: ${authors} | Nhóm: ${cats}\n` +
            `   Công bố: ${p.published.slice(0, 10)}\n` +
            `   Tóm tắt: ${p.summary.slice(0, 300)}${p.summary.length > 300 ? "..." : ""}`;
    })
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI research analyst. The following are recent AI-related papers from ArXiv as of ${dateStr} (${data.papers.length} papers from cs.AI, cs.CL, cs.LG):

---

${papersText}

---

Generate a structured ArXiv AI Research Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most significant research directions and breakthroughs

2. **Key Papers** — Select 8-15 most important papers, organized by theme. Under each theme header, render a **Markdown table** with exactly these columns:

   | Paper | Authors | Summary |
   | :--- | :--- | :--- |

   - **Paper**: title as a Markdown link to its ArXiv URL
   - **Authors**: abbreviated (first 3 + et al.)
   - **Summary**: 2 sentences — the key contribution and why it matters
   - Omit a theme's table if no paper falls under it

   Themes:
   - 🧠 Large Language Models (architecture, training, alignment, evaluation)
   - 🤖 Agents & Reasoning (planning, tool use, multi-agent, chain-of-thought)
   - 🔧 Methods & Frameworks (new techniques, benchmarks, efficiency improvements)
   - 📊 Applications (domain-specific, multimodal, code generation)

3. **Research Trend Signal** — 100-200 words on emerging research directions visible from today's submissions

4. **Worth Deep Reading** — 2-3 papers most worth reading in full, with reasoning

Style: English, concise and professional, preserve all ArXiv links.
`;
  }

  return `Bạn là chuyên viên phân tích nghiên cứu AI. Dưới đây là các bài báo liên quan AI mới nhất trên ArXiv tính đến ${dateStr} (tổng ${data.papers.length} bài, từ cs.AI, cs.CL, cs.LG):

---

${papersText}

---

Hãy tạo Bản tin nghiên cứu AI ArXiv có cấu trúc rõ ràng, yêu cầu:

1. **Điểm nổi bật hôm nay** — 3-5 câu tóm tắt hướng nghiên cứu và đột phá đáng chú ý nhất hôm nay

2. **Bài báo quan trọng** — Chọn 8-15 bài quan trọng nhất, nhóm theo chủ đề. Dưới mỗi tiêu đề chủ đề dùng **bảng Markdown** với cột cố định:

   | Bài báo | Tác giả | Mô tả ngắn |
   | :--- | :--- | :--- |

   - **Bài báo**: tiêu đề đặt làm liên kết Markdown tới ArXiv
   - **Tác giả**: viết tắt (3 tác giả đầu + et al.)
   - **Mô tả ngắn**: 2 câu — đóng góp chính và vì sao đáng chú ý
   - Chủ đề không có bài thì bỏ bảng

   Chủ đề:
   - 🧠 Mô hình ngôn ngữ lớn (kiến trúc, huấn luyện, căn chỉnh, đánh giá)
   - 🤖 Agent và suy luận (lập kế hoạch, dùng công cụ, đa agent, chuỗi suy nghĩ)
   - 🔧 Phương pháp và framework (kỹ thuật mới, benchmark, tối ưu hiệu quả)
   - 📊 Ứng dụng (theo lĩnh vực, đa phương thức, sinh mã)

3. **Tín hiệu xu hướng nghiên cứu** — 100-200 từ về các hướng nghiên cứu mới nổi quan sát từ bài gửi hôm nay

4. **Đáng đọc kỹ** — 2-3 bài đáng đọc trọn vẹn nhất, kèm lý do ngắn

Yêu cầu văn phong: tiếng Việt, chuyên nghiệp, ngắn gọn, giữ nguyên mọi liên kết ArXiv.`;
}

// ---------------------------------------------------------------------------
// Hugging Face prompt
// ---------------------------------------------------------------------------

export function buildHfPrompt(data: HfData, dateStr: string, lang: Lang = "vi"): string {
  const modelsText = data.models
    .map((m, i) =>
      lang === "en"
        ? `${i + 1}. **${m.id}**\n` +
          `   Link: ${m.url}\n` +
          `   Author: ${m.author} | Pipeline: ${m.pipelineTag || "N/A"}\n` +
          `   Likes: ${m.likes.toLocaleString()} | Downloads: ${m.downloads.toLocaleString()}\n` +
          `   Tags: ${m.tags.slice(0, 5).join(", ")}`
        : `${i + 1}. **${m.id}**\n` +
          `   Liên kết: ${m.url}\n` +
          `   Tác giả: ${m.author} | Tác vụ: ${m.pipelineTag || "N/A"}\n` +
          `   Lượt thích: ${m.likes.toLocaleString()} | Lượt tải: ${m.downloads.toLocaleString()}\n` +
          `   Thẻ: ${m.tags.slice(0, 5).join(", ")}`,
    )
    .join("\n\n");

  if (lang === "en") {
    return `You are an AI model ecosystem analyst. The following are trending models on Hugging Face Hub as of ${dateStr} (${data.models.length} models, sorted by weekly likes):

---

${modelsText}

---

Generate a structured Hugging Face Trending Models Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most notable model releases and trends on Hugging Face

2. **Trending Models** — Organized by category. Under each category header, render a **Markdown table** with exactly these columns:

   | Model | Author | Likes | Downloads | Summary |
   | :--- | :--- | ---: | ---: | :--- |

   - **Model**: model name as a Markdown link to its HF URL
   - **Likes / Downloads**: copy the numbers from the input verbatim (keep the thousands separators; do not recompute or round)
   - **Summary**: 2 sentences — what it is and why it's trending, including a standout capability or data point
   - Omit a category's table entirely if no model falls under it

   Categories:
   - 🧠 Language Models (LLMs, chat models, instruction-tuned)
   - 🎨 Multimodal & Generation (image, video, audio, text-to-X)
   - 🔧 Specialized Models (code, math, medical, embeddings)
   - 📦 Fine-tunes & Quantizations (community fine-tunes, GGUF, AWQ)

3. **Ecosystem Signal** — 100-200 words analyzing model ecosystem trends:
   - Which model families are gaining momentum?
   - Open-weight vs proprietary trends
   - Notable quantization or fine-tuning activity

4. **Worth Exploring** — 2-3 models most worth trying or studying, with reasoning

Style: English, concise and professional, preserve all HuggingFace links.
`;
  }

  return `Bạn là chuyên viên phân tích hệ sinh thái mô hình AI. Dưới đây là các mô hình nổi bật trên Hugging Face Hub tính đến ${dateStr} (tổng ${data.models.length} mô hình, sắp theo lượt thích trong tuần):

---

${modelsText}

---

Hãy tạo Bản tin mô hình nổi bật Hugging Face có cấu trúc rõ ràng, yêu cầu:

1. **Điểm nổi bật hôm nay** — 3-5 câu tóm tắt những bản phát hành mô hình và xu hướng đáng chú ý nhất trên Hugging Face

2. **Mô hình nổi bật** — Nhóm theo các nhóm sau. Dưới mỗi tiêu đề nhóm dùng **bảng Markdown** với cột cố định:

   | Mô hình | Tác giả | Lượt thích | Lượt tải | Mô tả ngắn |
   | :--- | :--- | ---: | ---: | :--- |

   - **Mô hình**: tên mô hình đặt làm liên kết Markdown tới trang HF
   - **Lượt thích / Lượt tải**: sao chép nguyên số từ đầu vào (giữ dấu phân cách hàng nghìn, không tính lại hoặc làm tròn)
   - **Mô tả ngắn**: 2 câu — mô hình là gì, vì sao lọt bảng, nêu năng lực hoặc điểm dữ liệu nổi bật
   - Nhóm không có mô hình thì bỏ toàn bộ bảng

   Nhóm:
   - 🧠 Mô hình ngôn ngữ (LLM, mô hình hội thoại, tinh chỉnh theo chỉ dẫn)
   - 🎨 Đa phương thức và sinh nội dung (ảnh, video, âm thanh, văn bản sang X)
   - 🔧 Mô hình chuyên biệt (mã, toán, y tế, embedding)
   - 📦 Tinh chỉnh và lượng tử hóa (tinh chỉnh cộng đồng, GGUF, AWQ)

3. **Tín hiệu hệ sinh thái** — 100-200 từ phân tích xu hướng hệ sinh thái mô hình:
   - Những dòng mô hình nào đang lên?
   - Xu hướng trọng số mở so với đóng
   - Hoạt động lượng tử hóa hoặc tinh chỉnh đáng chú ý

4. **Đáng khám phá** — 2-3 mô hình đáng thử hoặc nghiên cứu nhất, kèm lý do ngắn

Yêu cầu văn phong: tiếng Việt, chuyên nghiệp, ngắn gọn, giữ nguyên mọi liên kết HuggingFace.`;
}

// ---------------------------------------------------------------------------
// Community prompt (Dev.to + Lobste.rs combined)
// ---------------------------------------------------------------------------

export function buildCommunityPrompt(
  devto: DevtoData,
  lobsters: LobstersData,
  dateStr: string,
  lang: Lang = "vi",
): string {
  const devtoText =
    devto.articles.length > 0
      ? devto.articles
          .map((a, i) =>
            lang === "en"
              ? `${i + 1}. **${a.title}**\n` +
                `   Link: ${a.url}\n` +
                `   Author: ${a.user} | Reactions: ${a.positiveReactionsCount} | Comments: ${a.commentsCount} | Reading: ${a.readingTimeMinutes} min\n` +
                `   Tags: ${a.tags.join(", ")}\n` +
                `   ${a.description}`
              : `${i + 1}. **${a.title}**\n` +
                `   Liên kết: ${a.url}\n` +
                `   Tác giả: ${a.user} | Lượt thích: ${a.positiveReactionsCount} | Bình luận: ${a.commentsCount} | Đọc: ${a.readingTimeMinutes} phút\n` +
                `   Thẻ: ${a.tags.join(", ")}\n` +
                `   ${a.description}`,
          )
          .join("\n\n")
      : lang === "en"
        ? "(No Dev.to articles available)"
        : "(Không có bài viết Dev.to)";

  const lobstersText =
    lobsters.stories.length > 0
      ? lobsters.stories
          .map((s, i) =>
            lang === "en"
              ? `${i + 1}. **${s.title}**\n` +
                `   Link: ${s.url}\n` +
                `   Discussion: ${s.commentsUrl}\n` +
                `   Score: ${s.score} | Comments: ${s.commentCount} | Author: ${s.author} | Tags: ${s.tags.join(", ")}`
              : `${i + 1}. **${s.title}**\n` +
                `   Liên kết: ${s.url}\n` +
                `   Thảo luận: ${s.commentsUrl}\n` +
                `   Điểm: ${s.score} | Bình luận: ${s.commentCount} | Tác giả: ${s.author} | Thẻ: ${s.tags.join(", ")}`,
          )
          .join("\n\n")
      : lang === "en"
        ? "(No Lobste.rs stories available)"
        : "(Không có nội dung Lobste.rs)";

  if (lang === "en") {
    return `You are a tech community analyst. The following are AI-related content from Dev.to and Lobste.rs as of ${dateStr}:

## Dev.to Articles (${devto.articles.length} articles)

${devtoText}

---

## Lobste.rs Stories (${lobsters.stories.length} stories)

${lobstersText}

---

Generate a structured Tech Community AI Digest in English:

1. **Today's Highlights** — 3-5 sentences on the most discussed AI topics across these communities today

2. **Dev.to Highlights** — Select 5-10 most valuable articles as a **Markdown table**:

   | Article | Reactions | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Article**: title as a Markdown link
   - **Reactions / Comments**: copy the numbers from the input verbatim
   - **Summary**: 2 sentences — the key takeaway for developers

3. **Lobste.rs Highlights** — Select 3-8 most notable stories as a **Markdown table**:

   | Story | Score | Comments | Summary |
   | :--- | ---: | ---: | :--- |

   - **Story**: title as a Markdown link, followed by " · [discuss](discussion-url)"
   - **Score / Comments**: copy the numbers from the input verbatim
   - **Summary**: 2 sentences — why it's worth reading

4. **Community Pulse** — 100-200 words on what these communities are talking about:
   - Common themes across both platforms
   - Practical concerns developers have about AI tools
   - Emerging tutorials, patterns, or best practices

5. **Worth Reading** — 2-3 articles/stories most worth reading in depth

Style: English, concise and developer-friendly, preserve all original links.
`;
  }

  return `Bạn là chuyên viên phân tích cộng đồng công nghệ. Dưới đây là nội dung liên quan AI trên Dev.to và Lobste.rs tính đến ${dateStr}:

## Bài viết Dev.to (tổng ${devto.articles.length} bài)

${devtoText}

---

## Nội dung Lobste.rs (tổng ${lobsters.stories.length} mục)

${lobstersText}

---

Hãy tạo Bản tin AI cộng đồng công nghệ có cấu trúc rõ ràng, yêu cầu:

1. **Điểm nổi bật hôm nay** — 3-5 câu tóm tắt hướng thảo luận AI nóng nhất trong cộng đồng công nghệ hôm nay

2. **Dev.to chọn lọc** — Chọn 5-10 bài giá trị nhất, dùng **bảng Markdown**:

   | Bài viết | Lượt thích | Bình luận | Mô tả ngắn |
   | :--- | ---: | ---: | :--- |

   - **Bài viết**: tiêu đề đặt làm liên kết Markdown
   - **Lượt thích / Bình luận**: sao chép nguyên số từ đầu vào, không tính lại
   - **Mô tả ngắn**: 2 câu — giá trị cốt lõi với nhà phát triển

3. **Lobste.rs chọn lọc** — Chọn 3-8 nội dung đáng chú ý nhất, dùng **bảng Markdown**:

   | Tiêu đề | Điểm | Bình luận | Mô tả ngắn |
   | :--- | ---: | ---: | :--- |

   - **Tiêu đề**: tiêu đề đặt làm liên kết Markdown, sau đó thêm " · [thảo luận](liên kết thảo luận)"
   - **Điểm / Bình luận**: sao chép nguyên số từ đầu vào, không tính lại
   - **Mô tả ngắn**: 2 câu — vì sao đáng đọc

4. **Nhịp đập cộng đồng** — 100-200 từ phân tích cộng đồng công nghệ đang bàn gì:
   - Chủ đề chung mà hai nền tảng cùng quan tâm
   - Mối quan tâm thực tế của nhà phát triển với công cụ AI
   - Hướng dẫn, mẫu hoặc thực hành tốt mới nổi

5. **Đáng đọc kỹ** — 2-3 nội dung đáng đọc sâu nhất

Yêu cầu văn phong: tiếng Việt, chuyên nghiệp, ngắn gọn, giữ nguyên mọi liên kết gốc.`;
}

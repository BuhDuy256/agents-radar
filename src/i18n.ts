/**
 * Centralized i18n strings for bilingual (vi/en) report generation.
 */

export type Lang = "vi" | "en";

/** Get a bilingual string by language key. */
function t(vi: string, en: string): Record<Lang, string> {
  return { vi, en };
}

// ---------------------------------------------------------------------------
// Status & error messages (used in index.ts)
// ---------------------------------------------------------------------------

export const MSG = {
  noActivity: t("Không có hoạt động trong 24 giờ qua.", "No activity in the last 24 hours."),
  summaryFailed: t("⚠️ Tạo tóm tắt thất bại.", "⚠️ Summary generation failed."),
  skillsFailed: t("⚠️ Tạo tóm tắt Skills thất bại.", "⚠️ Skills summary generation failed."),
  trendingNoData: t(
    "⚠️ Không lấy được dữ liệu xu hướng hôm nay, không thể tạo báo cáo.",
    "⚠️ Trending data unavailable, unable to generate report.",
  ),
  trendingFailed: t("⚠️ Tạo báo cáo xu hướng thất bại.", "⚠️ Trending report generation failed."),
  comparisonFailed: t("⚠️ Tạo phân tích so sánh thất bại.", "⚠️ Comparative analysis generation failed."),
} as const;

// ---------------------------------------------------------------------------
// Report headers & labels (used in report-builders.ts, index.ts)
// ---------------------------------------------------------------------------

export const CLI_REPORT = {
  title: t("Bản tin cộng đồng công cụ AI CLI", "AI CLI Tools Community Digest"),
  meta: (utcStr: string, count: number, lang: Lang) =>
    lang === "en"
      ? `> Generated: ${utcStr} UTC | Tools covered: ${count}\n\n`
      : `> Tạo lúc: ${utcStr} UTC | Công cụ theo dõi: ${count}\n\n`,
  skillsHeading: t("Điểm nóng cộng đồng Claude Code Skills", "Claude Code Skills Highlights"),
  skillsSource: t("Nguồn dữ liệu", "Source"),
  comparison: t("So sánh chéo công cụ", "Cross-Tool Comparison"),
  detail: t("Báo cáo chi tiết từng công cụ", "Per-Tool Reports"),
} as const;

export const OPENCLAW_REPORT = {
  title: t("Bản tin hệ sinh thái OpenClaw", "OpenClaw Ecosystem Digest"),
  deepDive: t("Báo cáo chuyên sâu dự án OpenClaw", "OpenClaw Deep Dive"),
  comparison: t("So sánh chéo hệ sinh thái", "Cross-Ecosystem Comparison"),
  peers: t("Báo cáo chi tiết các dự án cùng phân khúc", "Peer Project Reports"),
} as const;

export const INFRA_REPORT = {
  title: t("Bản tin hạ tầng AI", "AI Infrastructure Digest"),
  meta: (utcStr: string, count: number, lang: Lang) =>
    lang === "en"
      ? `> Generated: ${utcStr} UTC | Projects covered: ${count}\n\n`
      : `> Tạo lúc: ${utcStr} UTC | Dự án theo dõi: ${count}\n\n`,
  comparison: t("So sánh chéo dự án", "Cross-Project Comparison"),
  detail: t("Báo cáo chi tiết từng dự án", "Per-Project Reports"),
} as const;

export const WEB_REPORT = {
  title: t("Báo cáo theo dõi nội dung chính thức của AI", "Official AI Content Report"),
  firstCrawl: t("Quét đầy đủ đầu tiên", "First full crawl"),
  todayUpdate: t("Cập nhật hôm nay", "Today's update"),
  newContent: (count: number, lang: Lang) =>
    lang === "en" ? `New content: ${count} articles` : `Nội dung mới: ${count} bài`,
  generated: (utcStr: string, lang: Lang) =>
    lang === "en" ? `Generated: ${utcStr} UTC` : `Tạo lúc: ${utcStr} UTC`,
  sourcesHeader: t("Nguồn dữ liệu:", "Sources:"),
  watchlistChanges: (count: number, lang: Lang) =>
    lang === "en" ? `Watchlist changes: ${count}` : `Thay đổi watchlist: ${count}`,
  issueTitle: (dateStr: string, isFirstRun: boolean, lang: Lang) =>
    lang === "en"
      ? `🌐 Official AI Content Report ${dateStr}${isFirstRun ? " (First Crawl)" : ""}`
      : `🌐 Báo cáo nội dung chính thức AI ${dateStr}${isFirstRun ? " (quét đầy đủ đầu tiên)" : ""}`,
} as const;

export const TRENDING_REPORT = {
  title: t("Xu hướng mã nguồn mở AI", "AI Open Source Trends"),
  sources: t(
    "Nguồn dữ liệu: GitHub Trending + GitHub Search API",
    "Sources: GitHub Trending + GitHub Search API",
  ),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📈 AI Open Source Trends ${dateStr}` : `📈 Xu hướng mã nguồn mở AI ${dateStr}`,
} as const;

export const HN_REPORT = {
  title: t("Bản tin cộng đồng Hacker News AI", "Hacker News AI Community Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📰 Hacker News AI Digest ${dateStr}` : `📰 Bản tin Hacker News AI ${dateStr}`,
} as const;

export const PH_REPORT = {
  title: t("Bản tin sản phẩm AI trên Product Hunt", "Product Hunt AI Products Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `🚀 Product Hunt AI Digest ${dateStr}` : `🚀 Bản tin AI Product Hunt ${dateStr}`,
} as const;

export const ARXIV_REPORT = {
  title: t("Bản tin nghiên cứu AI trên ArXiv", "ArXiv AI Research Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📚 ArXiv AI Research Digest ${dateStr}` : `📚 Bản tin nghiên cứu AI ArXiv ${dateStr}`,
} as const;

// The HF report runs weekly (see HF_REPORT_WEEKDAY in index.ts) — the Hub's
// download-ranked list barely moves day to day, so the titles say "weekly".
export const HF_REPORT = {
  title: t("Bản tin tuần mô hình nổi bật trên Hugging Face", "Hugging Face Trending Models Weekly"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en"
      ? `🤗 Hugging Face Trending Models ${dateStr}`
      : `🤗 Mô hình nổi bật Hugging Face ${dateStr}`,
} as const;

export const COMMUNITY_REPORT = {
  title: t("Bản tin AI từ cộng đồng công nghệ", "Tech Community AI Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `💬 Tech Community AI Digest ${dateStr}` : `💬 Bản tin AI cộng đồng công nghệ ${dateStr}`,
} as const;

// The problem-discovery report runs from its own workflow, not the daily
// digest. Its issue labels are kept out of ISSUE_LABELS on purpose, so the
// daily digest's close-stale step (which keeps only the newest digest day)
// never touches problem-discovery issues.
export const PROBLEMS_REPORT = {
  title: t("Phát hiện vấn đề từ thảo luận công khai", "Problem Discovery from Public Discussions"),
  meta: (utcStr: string, count: number, lang: Lang) =>
    lang === "en"
      ? `> Sources: GitHub Issues · Stack Exchange · Hacker News | Problems: ${count} | Generated: ${utcStr} UTC`
      : `> Nguồn: GitHub Issues · Stack Exchange · Hacker News | Số vấn đề: ${count} | Tạo lúc: ${utcStr} UTC`,
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `🔎 Problem Discovery ${dateStr}` : `🔎 Phát hiện vấn đề ${dateStr}`,
} as const;

export const PROBLEMS_ISSUE_LABELS = t("problems", "problems-en");

export const ISSUE_LABELS = {
  cli: t("digest", "digest-en"),
  openclaw: t("openclaw", "openclaw-en"),
  infra: t("infra", "infra-en"),
  web: t("web", "web-en"),
  trending: t("trending", "trending-en"),
  hn: t("hn", "hn-en"),
  ph: t("ph", "ph-en"),
  arxiv: t("arxiv", "arxiv-en"),
  hf: t("hf", "hf-en"),
  community: t("community", "community-en"),
} as const;

export const CLI_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `📊 AI CLI Tools Digest ${dateStr}` : `📊 Bản tin công cụ AI CLI ${dateStr}`;

export const OPENCLAW_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `🦞 OpenClaw Ecosystem Digest ${dateStr}` : `🦞 Bản tin hệ sinh thái OpenClaw ${dateStr}`;

export const INFRA_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `⚙️ AI Infrastructure Digest ${dateStr}` : `⚙️ Bản tin hạ tầng AI ${dateStr}`;

// ---------------------------------------------------------------------------
// Footer (used in report.ts)
// ---------------------------------------------------------------------------

export const FOOTER = {
  autoGen: t("Bản tin này được tạo tự động bởi", "This digest is auto-generated by"),
} as const;

// ---------------------------------------------------------------------------
// Telegram notification labels (used in notify.ts)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Report labels for manifest/RSS (used in generate-manifest.ts)
// ---------------------------------------------------------------------------

export const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "Bản tin cộng đồng công cụ AI CLI",
  "ai-cli-en": "AI CLI Tools Digest",
  "ai-agents": "Bản tin hệ sinh thái AI Agents",
  "ai-agents-en": "AI Agents Ecosystem Digest",
  "ai-infra": "Bản tin hạ tầng AI",
  "ai-infra-en": "AI Infrastructure Digest",
  "ai-web": "Báo cáo theo dõi nội dung chính thức AI",
  "ai-web-en": "Official AI Content Report",
  "ai-trending": "Xu hướng mã nguồn mở AI",
  "ai-trending-en": "AI Open Source Trends",
  "ai-hn": "Bản tin cộng đồng Hacker News AI",
  "ai-hn-en": "Hacker News AI Community Digest",
  "ai-ph": "Bản tin sản phẩm AI Product Hunt",
  "ai-ph-en": "Product Hunt AI Products Digest",
  "ai-arxiv": "Bản tin nghiên cứu AI ArXiv",
  "ai-arxiv-en": "ArXiv AI Research Digest",
  "ai-hf": "Bản tin tuần mô hình nổi bật Hugging Face",
  "ai-hf-en": "Hugging Face Trending Models Weekly",
  "ai-community": "Bản tin AI cộng đồng công nghệ",
  "ai-community-en": "Tech Community AI Digest",
  problems: "Phát hiện vấn đề từ thảo luận công khai",
  "problems-en": "Problem Discovery",
  // Weekly/monthly rollups are no longer generated; kept so archived reports
  // still render a proper title in the sidebar and RSS feed.
  "ai-weekly": "Bản tin tuần hệ sinh thái công cụ AI",
  "ai-weekly-en": "AI Tools Weekly Digest",
  "ai-monthly": "Bản tin tháng hệ sinh thái công cụ AI",
  "ai-monthly-en": "AI Tools Monthly Digest",
};

export const NOTIFY_LABELS: Record<string, Record<Lang, string>> = {
  "ai-cli": t("Công cụ AI CLI", "AI CLI Tools"),
  "ai-agents": t("Hệ sinh thái AI Agents", "AI Agents Ecosystem"),
  "ai-infra": t("Hạ tầng AI", "AI Infrastructure"),
  "ai-web": t("Cập nhật chính thức", "Official Updates"),
  "ai-trending": t("Xu hướng GitHub", "GitHub Trends"),
  "ai-hn": t("Cộng đồng HN", "HN Community"),
  "ai-ph": t("Product Hunt", "Product Hunt"),
  "ai-arxiv": t("Nghiên cứu ArXiv", "ArXiv Research"),
  "ai-hf": t("Mô hình HF", "HF Models"),
  "ai-community": t("Cộng đồng công nghệ", "Tech Community"),
};

// ---------------------------------------------------------------------------
// Published reports
// ---------------------------------------------------------------------------

/**
 * Reports still generated and published. Everything else on disk is history:
 * keep the old files and issues, but do not list them in the manifest, RSS
 * feed, Telegram message or sidebar.
 */
export const PUBLISHED_REPORTS = [
  "ai-cli",
  "ai-trending",
  "ai-web",
  "ai-hn",
  "ai-community",
  "problems",
] as const;

/** Published report files: Vietnamese (base id) and English (`-en`). */
export const PUBLISHED_REPORT_FILES: readonly string[] = PUBLISHED_REPORTS.flatMap((id) => [id, `${id}-en`]);

// ---------------------------------------------------------------------------
// Telegram message (Vietnamese only — English is still readable on the web)
// ---------------------------------------------------------------------------

/**
 * Telegram section headings, in message order. Keyed by report id; a section
 * is only rendered when that report has highlights for the day.
 */
export const NOTIFY_SECTIONS: Record<string, Record<Lang, string>> = {
  "ai-cli": t("🛠 Công cụ AI", "🛠 AI tools"),
  "ai-web": t("📢 Tin chính thức", "📢 Official news"),
  "ai-hn": t("📰 Tin công nghệ", "📰 Tech news"),
  "ai-community": t("💬 Kinh nghiệm cộng đồng", "💬 Community lessons"),
  "ai-trending": t("⭐ Open-source đáng thử", "⭐ Open-source worth a look"),
};

export const NOTIFY_TITLE = t("📡 Bản tin công nghệ", "📡 Tech digest");
export const NOTIFY_READ_MORE = t("Đọc chi tiết", "Read more");

// Problem Discovery is a separate pipeline from the daily digest and sends its
// own Telegram message (same channel). This is that message's title/heading.
export const NOTIFY_PROBLEMS_TITLE = t("🔎 Vấn đề đáng giải quyết", "🔎 Problems worth solving");

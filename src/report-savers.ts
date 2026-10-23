/**
 * Report saver functions — LLM call + file save + optional GitHub issue.
 * Extracted from index.ts for separation of concerns.
 *
 * Each saver emits both languages. The body is generated once in English and
 * translated to Vietnamese (see `bilingualBody`), so a saver owns the whole
 * bilingual output for its report instead of being called once per language.
 */

import {
  type Lang,
  WEB_REPORT,
  TRENDING_REPORT,
  HN_REPORT,
  PH_REPORT,
  ARXIV_REPORT,
  HF_REPORT,
  COMMUNITY_REPORT,
  ISSUE_LABELS,
} from "./i18n.ts";
import type { WatchlistResult, WatchlistState } from "./watchlist.ts";
import { saveWatchlistState } from "./watchlist.ts";
import {
  buildWebReportPrompt,
  buildHnPrompt,
  buildHnShortlistPrompt,
  buildPhPrompt,
  buildArxivPrompt,
  buildHfPrompt,
  buildCommunityPrompt,
  buildCommunityShortlistPrompt,
} from "./prompts-data.ts";
import {
  callLlm,
  translateToVi,
  saveFile,
  autoGenFooter,
  LLM_TOKENS_WEB,
  LLM_TOKENS_LISTING,
} from "./report.ts";
import { createGitHubIssue } from "./github.ts";
import { saveWebState, type WebFetchResult, type WebState } from "./web.ts";
import {
  type HnData,
  type HnStory,
  HN_SHORTLIST_MAX,
  fetchHnArticles,
  keywordShortlist,
  parseHnSelection,
  pickStories,
} from "./hn.ts";
import {
  type CommunityItem,
  COMMUNITY_MAX,
  communityCandidates,
  fetchCommunityContent,
  keywordCommunityShortlist,
  normalizeUrl,
  pickCommunityItems,
} from "./community.ts";
import type { PhData } from "./ph.ts";
import type { TrendingData } from "./trending.ts";
import type { ArxivData } from "./arxiv.ts";
import type { HfData } from "./hf.ts";
import type { DevtoData } from "./devto.ts";
import type { LobstersData } from "./lobsters.ts";

/** Output languages, in the order reports are written. */
export const LANGS = ["vi", "en"] as const;

/**
 * File name for a report in a given language. The primary language uses the
 * bare id (`ai-cli.md`); English keeps the `-en` suffix (`ai-cli-en.md`).
 */
export function reportFileName(id: string, lang: Lang): string {
  return lang === "en" ? `${id}-en.md` : `${id}.md`;
}

/** A report body in both languages. */
export type BilingualBody = Record<Lang, string>;

/**
 * Generate a report body once in English, then translate it to Vietnamese.
 * Throws if the English generation fails — there is nothing to save then.
 * A failed translation degrades to English rather than throwing.
 */
async function bilingualBody(enPrompt: string, maxTokens: number): Promise<BilingualBody> {
  const en = await callLlm(enPrompt, maxTokens);
  const vi = await translateToVi(en, maxTokens);
  return { en, vi };
}

// ---------------------------------------------------------------------------
// Web report
// ---------------------------------------------------------------------------

export async function saveWebReport(
  webResults: WebFetchResult[],
  webState: WebState,
  watchlist: WatchlistResult,
  watchlistState: WatchlistState,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<BilingualBody | null> {
  const hasNewContent = webResults.some((r) => r.newItems.length > 0);
  const watchlistChanges = watchlist.changes.length;
  let body: BilingualBody | null = null;

  if (hasNewContent || watchlistChanges > 0) {
    console.log("  [web] Calling LLM for web content report (EN) + translation (VI)...");
    try {
      const summary = await bilingualBody(
        buildWebReportPrompt(webResults, dateStr, "en", watchlist),
        LLM_TOKENS_WEB,
      );
      const isFirstRun = webResults.some((r) => r.isFirstRun);
      const totalNew = webResults.reduce((sum, r) => sum + r.newItems.length, 0);

      const anthropicNew = webResults.find((r) => r.site === "anthropic")?.newItems.length ?? 0;
      const anthropicTotal = webResults.find((r) => r.site === "anthropic")?.totalDiscovered ?? 0;
      const openaiNew = webResults.find((r) => r.site === "openai")?.newItems.length ?? 0;
      const openaiTotal = webResults.find((r) => r.site === "openai")?.totalDiscovered ?? 0;

      for (const lang of LANGS) {
        const fileName = reportFileName("ai-web", lang);
        const mode = isFirstRun ? WEB_REPORT.firstCrawl[lang] : WEB_REPORT.todayUpdate[lang];

        const webTitle = `# ${WEB_REPORT.title[lang]} ${dateStr}\n\n`;
        const watchMeta =
          watchlistChanges > 0 ? ` | ${WEB_REPORT.watchlistChanges(watchlistChanges, lang)}` : "";
        const webMeta = `> ${mode} | ${WEB_REPORT.newContent(totalNew, lang)}${watchMeta} | ${WEB_REPORT.generated(utcStr, lang)}\n\n`;
        const webSources =
          lang === "en"
            ? `${WEB_REPORT.sourcesHeader[lang]}\n` +
              `- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicNew} new articles (sitemap total: ${anthropicTotal})\n` +
              `- OpenAI: [openai.com](https://openai.com) — ${openaiNew} new articles (sitemap total: ${openaiTotal})\n\n`
            : `${WEB_REPORT.sourcesHeader[lang]}\n` +
              `- Anthropic: [anthropic.com](https://www.anthropic.com) — ${anthropicNew} bài mới (sitemap tổng: ${anthropicTotal})\n` +
              `- OpenAI: [openai.com](https://openai.com) — ${openaiNew} bài mới (sitemap tổng: ${openaiTotal})\n\n`;

        const webContent = webTitle + webMeta + webSources + `---\n\n` + summary[lang] + autoGenFooter(lang);

        console.log(`  Saved ${saveFile(webContent, dateStr, fileName)}`);

        if (digestRepo) {
          const issueTitle = WEB_REPORT.issueTitle(dateStr, isFirstRun, lang);
          const webLabel = ISSUE_LABELS.web[lang];
          const webUrl = await createGitHubIssue(issueTitle, webContent, webLabel);
          console.log(`  Created web issue (${lang}): ${webUrl}`);
        }
      }
      body = summary;
    } catch (err) {
      console.error(`  [web] Report generation failed: ${err}`);
    }
  } else {
    console.log("  [web] No new content or watchlist change detected, skipping report.");
  }

  saveWebState(webState);
  saveWatchlistState(watchlistState);
  console.log("  [web] State saved.");
  return body;
}

// ---------------------------------------------------------------------------
// Trending report
// ---------------------------------------------------------------------------

export async function saveTrendingReport(
  trendingData: TrendingData,
  trendingSummary: BilingualBody,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<BilingualBody | null> {
  const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
  if (!hasData) {
    console.log("  [trending] No data available, skipping report.");
    return null;
  }

  for (const lang of LANGS) {
    const fileName = reportFileName("ai-trending", lang);
    const header =
      `# ${TRENDING_REPORT.title[lang]} ${dateStr}\n\n` +
      `> ${TRENDING_REPORT.sources[lang]} | ${lang === "en" ? "Generated" : "Tạo lúc"}: ${utcStr} UTC\n\n---\n\n`;

    const trendingContent = header + trendingSummary[lang] + autoGenFooter(lang);

    console.log(`  Saved ${saveFile(trendingContent, dateStr, fileName)}`);

    if (digestRepo) {
      const trendingTitle = TRENDING_REPORT.issueTitle(dateStr, lang);
      const trendingLabel = ISSUE_LABELS.trending[lang];
      const trendingUrl = await createGitHubIssue(trendingTitle, trendingContent, trendingLabel);
      console.log(`  Created trending issue (${lang}): ${trendingUrl}`);
    }
  }
  return trendingSummary;
}

// ---------------------------------------------------------------------------
// Hacker News report
// ---------------------------------------------------------------------------

export async function saveHnReport(
  hnData: HnData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<BilingualBody | null> {
  if (!hnData.fetchSuccess || hnData.stories.length === 0) {
    console.log("  [hn] No data available, skipping report.");
    return null;
  }

  // 1. Shortlist: one LLM pass that only picks ids, then a keyword fallback.
  let selected: HnStory[] = [];
  try {
    const raw = await callLlm(buildHnShortlistPrompt(hnData, dateStr, HN_SHORTLIST_MAX), 512);
    selected = pickStories(hnData.stories, parseHnSelection(raw), HN_SHORTLIST_MAX);
    console.log(`  [hn] Selection picked ${selected.length} stories`);
  } catch (err) {
    console.error(`  [hn] Selection failed: ${err}`);
  }
  if (selected.length === 0) {
    selected = keywordShortlist(hnData.stories, HN_SHORTLIST_MAX);
    console.log(`  [hn] Using keyword fallback for ${selected.length} stories`);
  }
  if (selected.length === 0) {
    console.log("  [hn] Nothing matched the preferred topics, skipping report.");
    return null;
  }

  // 2. Fetch only the shortlisted articles' content.
  const articles = await fetchHnArticles(selected);

  console.log("  [hn] Calling LLM for HN report (EN) + translation (VI)...");
  let body: BilingualBody | null = null;
  try {
    const summary = await bilingualBody(buildHnPrompt(articles, dateStr, "en"), LLM_TOKENS_LISTING);

    for (const lang of LANGS) {
      const fileName = reportFileName("ai-hn", lang);
      const header =
        lang === "en"
          ? `# ${HN_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Source: [Hacker News](https://news.ycombinator.com/) | ` +
            `${articles.length} stories | Generated: ${utcStr} UTC\n\n` +
            `---\n\n`
          : `# ${HN_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Nguồn dữ liệu: [Hacker News](https://news.ycombinator.com/) | ` +
            `${articles.length} tin | Tạo lúc: ${utcStr} UTC\n\n` +
            `---\n\n`;

      const hnContent = header + summary[lang] + autoGenFooter(lang);

      console.log(`  Saved ${saveFile(hnContent, dateStr, fileName)}`);

      if (digestRepo) {
        const hnTitle = HN_REPORT.issueTitle(dateStr, lang);
        const hnLabel = ISSUE_LABELS.hn[lang];
        const hnUrl = await createGitHubIssue(hnTitle, hnContent, hnLabel);
        console.log(`  Created HN issue (${lang}): ${hnUrl}`);
      }
    }
    body = summary;
  } catch (err) {
    console.error(`  [hn] Report generation failed: ${err}`);
  }
  return body;
}

// ---------------------------------------------------------------------------
// Product Hunt
// ---------------------------------------------------------------------------

export async function savePhReport(
  phData: PhData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<void> {
  if (!phData.fetchSuccess) {
    console.log("  [ph] No data available, skipping report.");
    return;
  }

  console.log("  [ph] Calling LLM for Product Hunt report (EN) + translation (VI)...");
  try {
    const summary = await bilingualBody(buildPhPrompt(phData, dateStr, "en"), LLM_TOKENS_LISTING);

    for (const lang of LANGS) {
      const fileName = reportFileName("ai-ph", lang);
      const header =
        lang === "en"
          ? `# ${PH_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Source: [Product Hunt](https://www.producthunt.com/) | ` +
            `${phData.products.length} products | Generated: ${utcStr} UTC\n\n` +
            `---\n\n`
          : `# ${PH_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Nguồn dữ liệu: [Product Hunt](https://www.producthunt.com/) | ` +
            `${phData.products.length} sản phẩm | Tạo lúc: ${utcStr} UTC\n\n` +
            `---\n\n`;

      const phContent = header + summary[lang] + autoGenFooter(lang);

      console.log(`  Saved ${saveFile(phContent, dateStr, fileName)}`);

      if (digestRepo) {
        const phTitle = PH_REPORT.issueTitle(dateStr, lang);
        const phLabel = ISSUE_LABELS.ph[lang];
        const phUrl = await createGitHubIssue(phTitle, phContent, phLabel);
        console.log(`  Created PH issue (${lang}): ${phUrl}`);
      }
    }
  } catch (err) {
    console.error(`  [ph] Report generation failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// ArXiv report
// ---------------------------------------------------------------------------

export async function saveArxivReport(
  arxivData: ArxivData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<void> {
  if (!arxivData.fetchSuccess) {
    console.log("  [arxiv] No data available, skipping report.");
    return;
  }

  console.log("  [arxiv] Calling LLM for ArXiv report (EN) + translation (VI)...");
  try {
    const summary = await bilingualBody(buildArxivPrompt(arxivData, dateStr, "en"), LLM_TOKENS_LISTING);

    for (const lang of LANGS) {
      const fileName = reportFileName("ai-arxiv", lang);
      const header =
        lang === "en"
          ? `# ${ARXIV_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | ` +
            `${arxivData.papers.length} papers | Generated: ${utcStr} UTC\n\n` +
            `---\n\n`
          : `# ${ARXIV_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Nguồn dữ liệu: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | ` +
            `${arxivData.papers.length} bài báo | Tạo lúc: ${utcStr} UTC\n\n` +
            `---\n\n`;

      const content = header + summary[lang] + autoGenFooter(lang);

      console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

      if (digestRepo) {
        const title = ARXIV_REPORT.issueTitle(dateStr, lang);
        const label = ISSUE_LABELS.arxiv[lang];
        const url = await createGitHubIssue(title, content, label);
        console.log(`  Created ArXiv issue (${lang}): ${url}`);
      }
    }
  } catch (err) {
    console.error(`  [arxiv] Report generation failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// Hugging Face report — weekly, see HF_REPORT_WEEKDAY in index.ts
// ---------------------------------------------------------------------------

export async function saveHfReport(
  hfData: HfData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<void> {
  if (!hfData.fetchSuccess) {
    console.log("  [hf] No data available, skipping report.");
    return;
  }

  console.log("  [hf] Calling LLM for Hugging Face report (EN) + translation (VI)...");
  try {
    const summary = await bilingualBody(buildHfPrompt(hfData, dateStr, "en"), LLM_TOKENS_LISTING);

    for (const lang of LANGS) {
      const fileName = reportFileName("ai-hf", lang);
      const header =
        lang === "en"
          ? `# ${HF_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Source: [Hugging Face Hub](https://huggingface.co/) | ` +
            `${hfData.models.length} models | Generated: ${utcStr} UTC\n\n` +
            `---\n\n`
          : `# ${HF_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Nguồn dữ liệu: [Hugging Face Hub](https://huggingface.co/) | ` +
            `${hfData.models.length} mô hình | Tạo lúc: ${utcStr} UTC\n\n` +
            `---\n\n`;

      const content = header + summary[lang] + autoGenFooter(lang);

      console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

      if (digestRepo) {
        const title = HF_REPORT.issueTitle(dateStr, lang);
        const label = ISSUE_LABELS.hf[lang];
        const url = await createGitHubIssue(title, content, label);
        console.log(`  Created HF issue (${lang}): ${url}`);
      }
    }
  } catch (err) {
    console.error(`  [hf] Report generation failed: ${err}`);
  }
}

// ---------------------------------------------------------------------------
// Community report (Dev.to + Lobste.rs)
// ---------------------------------------------------------------------------

export interface CommunitySaveResult {
  body: BilingualBody | null;
  /** Normalised URLs this report covered, for cross-report dedupe. */
  selectedUrls: string[];
}

export async function saveCommunityReport(
  devtoData: DevtoData,
  lobstersData: LobstersData,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<CommunitySaveResult> {
  const hasData = devtoData.fetchSuccess || lobstersData.fetchSuccess;
  if (!hasData) {
    console.log("  [community] No data available, skipping report.");
    return { body: null, selectedUrls: [] };
  }

  // 1. Shortlist: one LLM pass that only picks ids, then a keyword fallback.
  const candidates = communityCandidates(devtoData, lobstersData);
  let selected: CommunityItem[] = [];
  try {
    const raw = await callLlm(buildCommunityShortlistPrompt(candidates, dateStr, COMMUNITY_MAX), 512);
    selected = pickCommunityItems(candidates, parseHnSelection(raw), COMMUNITY_MAX);
    console.log(`  [community] Selection picked ${selected.length} items`);
  } catch (err) {
    console.error(`  [community] Selection failed: ${err}`);
  }
  if (selected.length === 0) {
    selected = keywordCommunityShortlist(candidates, COMMUNITY_MAX);
    console.log(`  [community] Using keyword fallback for ${selected.length} items`);
  }
  if (selected.length === 0) {
    console.log("  [community] Nothing matched the preferred topics, skipping report.");
    return { body: null, selectedUrls: [] };
  }

  // 2. Read the selected pieces before asking for a summary.
  const items = await fetchCommunityContent(selected);

  console.log("  [community] Calling LLM for community report (EN) + translation (VI)...");
  let body: BilingualBody | null = null;
  try {
    const summary = await bilingualBody(buildCommunityPrompt(items, dateStr, "en"), LLM_TOKENS_LISTING);

    for (const lang of LANGS) {
      const fileName = reportFileName("ai-community", lang);
      const header =
        lang === "en"
          ? `# ${COMMUNITY_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Sources: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | ${items.length} items | Generated: ${utcStr} UTC\n\n` +
            `---\n\n`
          : `# ${COMMUNITY_REPORT.title[lang]} ${dateStr}\n\n` +
            `> Nguồn dữ liệu: [Dev.to](https://dev.to/) + [Lobste.rs](https://lobste.rs/) | ${items.length} mục | Tạo lúc: ${utcStr} UTC\n\n` +
            `---\n\n`;

      const content = header + summary[lang] + autoGenFooter(lang);

      console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

      if (digestRepo) {
        const title = COMMUNITY_REPORT.issueTitle(dateStr, lang);
        const label = ISSUE_LABELS.community[lang];
        const url = await createGitHubIssue(title, content, label);
        console.log(`  Created community issue (${lang}): ${url}`);
      }
    }
    body = summary;
  } catch (err) {
    console.error(`  [community] Report generation failed: ${err}`);
  }
  return { body, selectedUrls: items.map((item) => normalizeUrl(item.url)) };
}

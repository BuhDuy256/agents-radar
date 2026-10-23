/**
 * agents-radar: daily digest for AI CLI tools and the AI open-source ecosystem.
 *
 * Env vars:
 *   LLM_PROVIDER        - "anthropic" | "openai" | "github-copilot" | "openrouter" (default: anthropic)
 *   GITHUB_TOKEN        - GitHub token for API access and issue creation
 *   DIGEST_REPO         - owner/repo where digest issues are posted (optional)
 *
 * Provider-specific env vars — see src/providers/ for full list.
 */

import {
  type GitHubItem,
  type RepoFetch,
  fetchRecentItems,
  fetchRecentReleases,
  fetchRecentDiscussions,
  fetchSkillsData,
  createGitHubIssue,
} from "./github.ts";
import { type RepoDigest, buildCliPrompt, buildSkillsPrompt, buildJsonTranslationPrompt } from "./prompts.ts";
import { buildTrendingPrompt, buildHighlightsPrompt, type ReportHighlights } from "./prompts-data.ts";
import {
  callLlm,
  translateToVi,
  parseLlmJson,
  saveFile,
  autoGenFooter,
  LLM_TOKENS_TRENDING,
  assertLlmHealthy,
  reportLlmHealth,
  llmHealthLine,
  isConnectionError,
} from "./report.ts";
import { buildCliReportContent } from "./report-builders.ts";
import {
  type BilingualBody,
  LANGS,
  saveWebReport,
  saveTrendingReport,
  saveHnReport,
  saveCommunityReport,
  reportFileName,
} from "./report-savers.ts";
import { loadWebState, fetchSiteContent, type WebFetchResult, type WebState } from "./web.ts";
import { fetchTrendingData, type TrendingData } from "./trending.ts";
import { fetchHnData, type HnData } from "./hn.ts";
import { fetchDevtoData, type DevtoData } from "./devto.ts";
import { fetchLobstersData, type LobstersData } from "./lobsters.ts";
import { loadConfig } from "./config.ts";
import { toCstDateStr, toUtcStr, sleep } from "./date.ts";
import { type Lang, MSG, ISSUE_LABELS, CLI_ISSUE_TITLE } from "./i18n.ts";

// ---------------------------------------------------------------------------
// Repo config — loaded from config.yml, falls back to built-in defaults
// ---------------------------------------------------------------------------

const { cliRepos: CLI_REPOS, skillsRepo: CLAUDE_SKILLS_REPO } = loadConfig();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// ---------------------------------------------------------------------------
// Phase 1: Fetch
// ---------------------------------------------------------------------------

async function fetchAllData(
  since: Date,
  webState: WebState,
): Promise<{
  fetched: RepoFetch[];
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] };
  webResults: WebFetchResult[];
  trendingData: TrendingData;
  hnData: HnData;
  devtoData: DevtoData;
  lobstersData: LobstersData;
}> {
  console.log(
    `  Tracking: ${CLI_REPOS.map((r) => r.id).join(", ")}, claude-code-skills, web, trending, hn, devto, lobsters`,
  );

  const [fetched, skillsData, webResults, trendingData, hnData, devtoData, lobstersData] = await Promise.all([
    Promise.all(
      CLI_REPOS.map(async (cfg) => {
        try {
          const [issuesRaw, prs, releases, discussions] = await Promise.all([
            fetchRecentItems(cfg, "issues", since),
            fetchRecentItems(cfg, "pulls", since),
            fetchRecentReleases(cfg.repo, since),
            cfg.discussions ? fetchRecentDiscussions(cfg.repo, since) : Promise.resolve([]),
          ]);
          const issues = issuesRaw.filter((i) => !i.pull_request);
          console.log(
            `  [${cfg.id}] issues: ${issues.length}, prs: ${prs.length}, releases: ${releases.length}` +
              (cfg.discussions ? `, discussions: ${discussions.length}` : ""),
          );
          return { cfg, issues, prs, releases, discussions };
        } catch (err) {
          console.error(`  [${cfg.id}] fetch failed: ${err}`);
          return { cfg, issues: [], prs: [], releases: [], discussions: [] };
        }
      }),
    ),
    fetchSkillsData(CLAUDE_SKILLS_REPO)
      .then((d) => {
        console.log(`  [claude-code-skills] prs: ${d.prs.length}, issues: ${d.issues.length}`);
        return d;
      })
      .catch((err) => {
        console.error(`  [claude-code-skills] fetch failed: ${err}`);
        return { prs: [] as GitHubItem[], issues: [] as GitHubItem[] };
      }),
    Promise.all([
      fetchSiteContent("anthropic", webState).catch((err): WebFetchResult => {
        console.error(`  [web/anthropic] fetch failed: ${err}`);
        return {
          site: "anthropic",
          siteName: "Anthropic (Claude)",
          isFirstRun: false,
          newItems: [],
          totalDiscovered: 0,
        };
      }),
      fetchSiteContent("openai", webState).catch((err): WebFetchResult => {
        console.error(`  [web/openai] fetch failed: ${err}`);
        return { site: "openai", siteName: "OpenAI", isFirstRun: false, newItems: [], totalDiscovered: 0 };
      }),
    ]),
    fetchTrendingData().catch(
      (): TrendingData => ({
        trendingRepos: [],
        searchRepos: [],
        trendingFetchSuccess: false,
      }),
    ),
    fetchHnData().catch((): HnData => ({ stories: [], fetchSuccess: false })),
    fetchDevtoData().catch((): DevtoData => ({ articles: [], fetchSuccess: false })),
    fetchLobstersData().catch((): LobstersData => ({ stories: [], fetchSuccess: false })),
  ]);

  return { fetched, skillsData, webResults, trendingData, hnData, devtoData, lobstersData };
}

// ---------------------------------------------------------------------------
// Phase 2: LLM summaries
// ---------------------------------------------------------------------------

/** Call LLM with logging and error fallback. */
async function summarize(id: string, prompt: string, failMsg: string, maxTokens?: number): Promise<string> {
  console.log(`  [${id}] Calling LLM for summary...`);
  try {
    return await callLlm(prompt, maxTokens);
  } catch (err) {
    console.error(`  [${id}] LLM call failed: ${err}`);
    return failMsg;
  }
}

/** Summarize a repo's activity, returning a RepoDigest. Skips LLM if no data. */
async function summarizeRepo(
  { cfg, issues, prs, releases, discussions }: RepoFetch,
  prompt: string,
  noActivityMsg: string,
  failMsg: string,
): Promise<RepoDigest> {
  if (!issues.length && !prs.length && !releases.length && !discussions.length) {
    console.log(`  [${cfg.id}] No activity, skipping LLM call`);
    return { config: cfg, issues, prs, releases, discussions, summary: noActivityMsg };
  }
  const summary = await summarize(cfg.id, prompt, failMsg);
  return { config: cfg, issues, prs, releases, discussions, summary };
}

/** Every LLM-generated report body for one language. */
interface Summaries {
  cliDigests: RepoDigest[];
  skillsSummary: string;
  trendingSummary: string;
}

/**
 * Generate every report body in English. Vietnamese comes from
 * `translateSummaries`, not from a second pass over the raw data — see
 * `translateToVi` in report.ts for why.
 */
async function generateSummaries(
  fetchedCli: RepoFetch[],
  skillsData: { prs: GitHubItem[]; issues: GitHubItem[] },
  trendingData: TrendingData,
  dateStr: string,
): Promise<Summaries> {
  const lang: Lang = "en";
  const noActivity = MSG.noActivity[lang];
  const fail = MSG.summaryFailed[lang];

  const [cliDigests, skillsSummary, trendingSummary] = await Promise.all([
    Promise.all(
      fetchedCli.map((f) =>
        summarizeRepo(
          f,
          buildCliPrompt(f.cfg, f.issues, f.prs, f.releases, f.discussions, dateStr, lang),
          noActivity,
          fail,
        ),
      ),
    ),
    summarize(
      "claude-code-skills",
      buildSkillsPrompt(skillsData.prs, skillsData.issues, dateStr, lang),
      MSG.skillsFailed[lang],
    ),
    (async () => {
      const hasData = trendingData.trendingRepos.length > 0 || trendingData.searchRepos.length > 0;
      if (!hasData) {
        return MSG.trendingNoData[lang];
      }
      return summarize(
        "trending",
        buildTrendingPrompt(trendingData, dateStr, lang),
        MSG.trendingFailed[lang],
        LLM_TOKENS_TRENDING,
      );
    })(),
  ]);

  return { cliDigests, skillsSummary, trendingSummary };
}

// ---------------------------------------------------------------------------
// Phase 2b: Vietnamese translation
// ---------------------------------------------------------------------------

/**
 * Fixed status strings ("no activity", "generation failed") are i18n constants,
 * not model output. Map them straight across rather than paying for a
 * translation call that would only re-derive Vietnamese we already have — on a
 * quiet day that is most of the peer digests.
 */
const FIXED_EN_TO_VI = new Map(Object.values(MSG).map((m) => [m.en, m.vi] as [string, string]));

function localize(enText: string, maxTokens?: number): Promise<string> {
  const fixed = FIXED_EN_TO_VI.get(enText);
  return fixed !== undefined ? Promise.resolve(fixed) : translateToVi(enText, maxTokens);
}

async function localizeDigest(d: RepoDigest): Promise<RepoDigest> {
  return { ...d, summary: await localize(d.summary) };
}

/** Translate a full set of English report bodies into Vietnamese. */
async function translateSummaries(en: Summaries): Promise<Summaries> {
  const [cliDigests, skillsSummary, trendingSummary] = await Promise.all([
    Promise.all(en.cliDigests.map(localizeDigest)),
    localize(en.skillsSummary),
    localize(en.trendingSummary, LLM_TOKENS_TRENDING),
  ]);
  return { cliDigests, skillsSummary, trendingSummary };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

/**
 * Pause between the two highlights attempts when the first one died on a
 * connection failure. Long enough that attempt 2 lands outside the outage that
 * just consumed callLlm's retry ladder, short enough that a healthy provider
 * hiccup still costs the run a single minute.
 */
const HIGHLIGHTS_COOLDOWN_MS = 60_000;

async function main(): Promise<void> {
  requireEnv("GITHUB_TOKEN");

  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";

  const providerName = process.env["LLM_PROVIDER"] ?? "anthropic";
  console.log(`[${now.toISOString()}] Starting digest | provider: ${providerName}`);

  // 1. Fetch all data in parallel
  const webState = loadWebState();
  const { fetched, skillsData, webResults, trendingData, hnData, devtoData, lobstersData } =
    await fetchAllData(since, webState);

  // 2. Generate every report body once in English, then translate to Vietnamese
  console.log("  Generating summaries (EN)...");
  const enSummaries = await generateSummaries(fetched, skillsData, trendingData, dateStr);

  console.log("  Translating summaries (EN -> VI)...");
  const viSummaries = await translateSummaries(enSummaries);

  // First gate: enough calls have run by now to tell an outage from a
  // flaky report. Bailing here costs nothing — no file has been written yet.
  assertLlmHealthy("summary");

  // 3. Build + save all reports (vi + en)
  const summariesByLang: Record<Lang, Summaries> = { vi: viSummaries, en: enSummaries };
  const cliContent: Record<Lang, string> = {} as Record<Lang, string>;

  for (const lang of LANGS) {
    const s = summariesByLang[lang];
    cliContent[lang] = buildCliReportContent(
      s.cliDigests,
      s.skillsSummary,
      "",
      utcStr,
      dateStr,
      autoGenFooter(lang),
      CLAUDE_SKILLS_REPO,
      lang,
    );

    console.log(`  Saved ${saveFile(cliContent[lang], dateStr, reportFileName("ai-cli", lang))}`);
  }

  // Each saver now emits both languages: it generates its body in English,
  // translates it, and writes both files plus both issues.
  const trendingSummaries: BilingualBody = {
    vi: viSummaries.trendingSummary,
    en: enSummaries.trendingSummary,
  };

  // Saver return values (not the files on disk) decide what this run produced:
  // a leftover file from an earlier run on the same day must not feed highlights.
  const [webBody, trendingBody, hnBody, communityBody] = await Promise.all([
    saveWebReport(webResults, webState, utcStr, dateStr, digestRepo),
    saveTrendingReport(trendingData, trendingSummaries, utcStr, dateStr, digestRepo),
    saveHnReport(hnData, utcStr, dateStr, digestRepo),
    saveCommunityReport(devtoData, lobstersData, utcStr, dateStr, digestRepo),
  ]);

  // Second gate: an outage that starts *after* the first gate would otherwise
  // sail straight through — the savers each swallow their own failure and just
  // skip a report. Files are on disk by now, but the failing exit skips the
  // commit step, so they are never published.
  assertLlmHealthy("report");

  // 4. Generate highlights for Telegram notification
  // Highlights are extracted from the English bodies only — the Vietnamese set is
  // translated from the result. Bodies come straight from this run's savers, so
  // reports that were skipped or failed are absent instead of being read back
  // from an older file.
  const enReports: Record<string, string> = { "ai-cli": cliContent.en };
  for (const [id, body] of [
    ["ai-trending", trendingBody],
    ["ai-web", webBody],
    ["ai-hn", hnBody],
    ["ai-community", communityBody],
  ] as const) {
    if (body) enReports[id] = body.en;
  }

  console.log("  Generating highlights for Telegram...");
  const highlights: Record<Lang, ReportHighlights> = { vi: {}, en: {} };
  // Both passes parse JSON, and both retry once: the LLM occasionally emits
  // slightly malformed JSON that repairJson can't fix (seen 2026-07-13: one
  // language failed with "Expected ',' or ']' after array element"); a fresh generation
  // usually returns valid JSON.
  //
  // A connection failure is a different animal: attempt 1 has already burned
  // callLlm's full ~3 min connection ladder, so firing attempt 2 immediately
  // re-enters an outage that is demonstrably still going. On 2026-09-19 both
  // attempts failed back to back inside the same DashScope outage and the day
  // shipped with an empty highlights.json — Telegram and Feishu rendered
  // section links and no bullets. Wait out a cooldown first; a malformed-JSON
  // retry still goes straight through.
  const attemptJson = async (label: string, prompt: string): Promise<ReportHighlights> => {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        return parseLlmJson<ReportHighlights>(await callLlm(prompt, 2048));
      } catch (err) {
        const tag = attempt < 2 ? "retrying" : "giving up";
        console.error(`  [highlights] ${label} attempt ${attempt} failed (${tag}): ${err}`);
        if (attempt < 2 && isConnectionError(err)) {
          console.error(
            `  [highlights] connection down — cooling down ${HIGHLIGHTS_COOLDOWN_MS / 1000}s before retry`,
          );
          await sleep(HIGHLIGHTS_COOLDOWN_MS);
        }
      }
    }
    return {};
  };

  // English is extracted from the reports; Vietnamese is translated from that
  // result. The extraction prompt carries every report body, the translation
  // prompt carries only the short highlight list.
  highlights.en = await attemptJson("en", buildHighlightsPrompt(enReports, "en"));
  highlights.vi = Object.keys(highlights.en).length
    ? await attemptJson("vi", buildJsonTranslationPrompt(JSON.stringify(highlights.en)))
    : {};

  // If one language failed (generation or parse) but the other succeeded,
  // backfill the empty one from the other so notifications never render with
  // zero highlights. Seen 2026-07-13: the translation failed intermittently
  // while en was fine, leaving Telegram/Feishu with only section headers.
  const viEmpty = Object.keys(highlights.vi).length === 0;
  const enEmpty = Object.keys(highlights.en).length === 0;
  if (viEmpty && !enEmpty) {
    console.warn("  [highlights] vi empty — backfilling from en");
    highlights.vi = highlights.en;
  } else if (enEmpty && !viEmpty) {
    console.warn("  [highlights] en empty — backfilling from vi");
    highlights.en = highlights.vi;
  }

  const highlightsPath = saveFile(JSON.stringify(highlights, null, 2), dateStr, "highlights.json");
  console.log(`  Saved ${highlightsPath}`);

  // 5. Create the CLI issue (vi + en)
  if (digestRepo) {
    for (const lang of ["vi", "en"] as const) {
      const cliUrl = await createGitHubIssue(
        CLI_ISSUE_TITLE(dateStr, lang),
        cliContent[lang],
        ISSUE_LABELS.cli[lang],
      );
      console.log(`  Created CLI issue (${lang}): ${cliUrl}`);
    }
  }

  reportLlmHealth();
  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  // The tally is the first thing worth seeing when a run dies — it separates
  // "the provider was unreachable" from a genuine bug in the pipeline.
  console.error(`  [llm] ${llmHealthLine()}`);
  process.exit(1);
});

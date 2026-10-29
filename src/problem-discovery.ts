/**
 * Autonomous Problem Discovery pipeline.
 *
 * One executable (`pnpm problems`) that:
 *   1. collects real public discussions (GitHub Issues, Stack Exchange, Ask HN)
 *   2. extracts concrete problems from them with an LLM
 *   3. groups semantically similar problem signals
 *   4. builds an evidence-backed Markdown report (English, then translated)
 *   5. publishes it into the existing Agents Radar outputs (digests + manifest)
 *
 * It shares the repo's LLM provider, retry/health accounting, translation and
 * file helpers, and is completely separate from the daily AI digest.
 */

import {
  type Discussion,
  DOMAINS,
  DOMAIN_LABELS,
  collectDiscussions,
  loadProblemState,
  saveProblemState,
} from "./problem-sources.ts";
import {
  type ProblemSignal,
  type ProblemGroup,
  buildExtractionPrompt,
  buildGroupingPrompt,
} from "./problem-prompts.ts";
import {
  callLlm,
  translateToVi,
  parseLlmJson,
  saveFile,
  autoGenFooter,
  assertLlmHealthy,
  reportLlmHealth,
  llmHealthLine,
  LLM_TOKENS_LISTING,
} from "./report.ts";
import { createGitHubIssue } from "./github.ts";
import { buildJsonTranslationPrompt } from "./prompts.ts";
import { PROBLEMS_HIGHLIGHTS_FILE, type ProblemHighlights } from "./notify.ts";
import { toCstDateStr, toUtcStr } from "./date.ts";
import { type Lang, PROBLEMS_REPORT, PROBLEMS_ISSUE_LABELS } from "./i18n.ts";

const LANGS: Lang[] = ["vi", "en"];
const EXTRACTION_BATCH = 6;
/** Final problems kept in the report — the upper end of the 5-15 target. */
const MAX_PROBLEMS = 15;
/** Strongest problems surfaced as Telegram highlights. */
const TELEGRAM_HIGHLIGHTS = 3;

export type EvidenceStrength = "single" | "multiple" | "insufficient";

/** A finalized problem ready to render, with its evidence resolved to real links. */
export interface ResolvedProblem extends ProblemGroup {
  evidence: Discussion[];
  strength: EvidenceStrength;
}

// ---------------------------------------------------------------------------
// Pipeline steps
// ---------------------------------------------------------------------------

/** Extract problem signals from the discussions, in bounded LLM batches. */
async function extractSignals(
  discussions: Discussion[],
  byRef: Map<string, Discussion>,
  refOf: Map<string, string>,
): Promise<ProblemSignal[]> {
  const validRefs = new Set(byRef.keys());
  const batches: { ref: string; discussion: Discussion }[][] = [];
  for (let i = 0; i < discussions.length; i += EXTRACTION_BATCH) {
    batches.push(
      discussions.slice(i, i + EXTRACTION_BATCH).map((d) => ({ ref: refOf.get(d.key)!, discussion: d })),
    );
  }

  const results = await Promise.all(
    batches.map(async (batch, i) => {
      try {
        const raw = await callLlm(buildExtractionPrompt(batch), LLM_TOKENS_LISTING);
        const parsed = parseLlmJson<ProblemSignal[]>(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((s) => isValidSignal(s, validRefs));
      } catch (err) {
        console.error(`  [problems] extraction batch ${i + 1}/${batches.length} failed: ${err}`);
        return [];
      }
    }),
  );
  return results.flat();
}

function isValidSignal(s: ProblemSignal, validRefs: Set<string>): boolean {
  if (!s || typeof s.who !== "string" || typeof s.difficulty !== "string") return false;
  if (!s.who.trim() || !s.difficulty.trim()) return false;
  if (!Array.isArray(s.refs)) return false;
  s.refs = s.refs.filter((r) => validRefs.has(r));
  if (s.refs.length === 0) return false;
  if (!DOMAINS.includes(s.domain)) s.domain = "software";
  return true;
}

/** Group signals into final problems, then resolve + rank their evidence. */
async function groupProblems(
  signals: ProblemSignal[],
  byRef: Map<string, Discussion>,
): Promise<ResolvedProblem[]> {
  let groups: ProblemGroup[] = [];
  try {
    const raw = await callLlm(buildGroupingPrompt(signals), LLM_TOKENS_LISTING);
    const parsed = parseLlmJson<ProblemGroup[]>(raw);
    if (Array.isArray(parsed)) groups = parsed;
  } catch (err) {
    console.error(`  [problems] grouping failed, falling back to one problem per signal: ${err}`);
  }

  // Fallback: if grouping produced nothing usable, treat each signal as its own
  // problem so a transient grouping failure still yields a grounded report.
  if (groups.length === 0) {
    groups = signals.map((s) => ({
      title: s.difficulty,
      affectedUsers: s.who,
      description: [s.difficulty, s.context, s.matters].filter(Boolean).join(" "),
      workarounds: s.workaround,
      softwareRelevance: "",
      domain: s.domain,
      refs: s.refs,
    }));
  }

  return resolveProblems(groups, byRef);
}

/**
 * Validate grouped problems against the real discussions, resolve evidence to
 * links, rank by evidence and cap. Pure (no network/LLM) so the evidence
 * integrity — every published problem backed by at least one real source, and
 * no invented refs — is directly testable.
 */
export function resolveProblems(groups: ProblemGroup[], byRef: Map<string, Discussion>): ResolvedProblem[] {
  const validRefs = new Set(byRef.keys());
  const resolved: ResolvedProblem[] = [];
  for (const g of groups) {
    if (!g || typeof g.title !== "string" || !g.title.trim()) continue;
    const refs = Array.isArray(g.refs) ? g.refs.filter((r) => validRefs.has(r)) : [];
    const evidence = dedupeByUrl(refs.map((r) => byRef.get(r)!));
    if (evidence.length === 0) continue; // never publish a problem without a real source
    resolved.push({
      ...g,
      domain: DOMAINS.includes(g.domain) ? g.domain : evidence[0]!.domainHint,
      refs,
      evidence,
      strength: evidenceStrength(evidence),
    });
  }

  // Strongest evidence first, capped.
  resolved.sort((a, b) => b.evidence.length - a.evidence.length);
  return resolved.slice(0, MAX_PROBLEMS);
}

function dedupeByUrl(items: Discussion[]): Discussion[] {
  const seen = new Set<string>();
  const out: Discussion[] = [];
  for (const d of items) {
    if (!d || seen.has(d.url)) continue;
    seen.add(d.url);
    out.push(d);
  }
  return out;
}

/** Evidence strength from the count of distinct supporting discussions. */
export function evidenceStrength(evidence: Discussion[]): EvidenceStrength {
  if (evidence.length >= 2) return "multiple";
  if (evidence.length === 1) return "single";
  return "insufficient";
}

// ---------------------------------------------------------------------------
// Report rendering (English; Vietnamese is translated from it)
// ---------------------------------------------------------------------------

const STRENGTH_LABEL: Record<EvidenceStrength, string> = {
  single: "Single observation",
  multiple: "Multiple independent observations",
  insufficient: "Insufficient evidence",
};

/** Build the English report body deterministically from resolved problems. */
export function buildReportBody(problems: ResolvedProblem[], analyzed: number, missing: string[]): string {
  if (problems.length === 0) {
    return (
      `No concrete, evidence-backed problems surfaced from the ${analyzed} discussions collected today. ` +
      `Problems are only published when a real discussion supports them; none qualified this run.`
    );
  }

  const parts: string[] = [];
  for (const domain of DOMAINS) {
    const inDomain = problems.filter((p) => p.domain === domain);
    if (inDomain.length === 0) continue;
    parts.push(`## ${DOMAIN_LABELS[domain].en}`);
    for (const p of inDomain) {
      parts.push(renderProblem(p));
    }
  }

  if (missing.length > 0) {
    parts.push(
      `---\n\n> Coverage note: no data was available from ${missing.join(", ")} this run, ` +
        `so problems from those sources may be under-represented.`,
    );
  }
  return parts.join("\n\n");
}

function renderProblem(p: ResolvedProblem): string {
  const lines = [`### ${p.title}`];
  lines.push(`**Affected Users:** ${p.affectedUsers || "Not clearly stated."}`);
  lines.push(`**Problem Description:** ${p.description || p.title}`);

  const evidenceLinks = p.evidence
    .map((d) => `- [${sanitizeLinkText(d.title)}](${d.url}) — ${d.sourceLabel}`)
    .join("\n");
  lines.push(`**Evidence:**\n${evidenceLinks}`);

  lines.push(`**Current Workarounds:** ${p.workarounds?.trim() || "None mentioned in the discussions."}`);
  if (p.softwareRelevance?.trim()) {
    lines.push(`**Potential Software Relevance (hypothesis):** ${p.softwareRelevance.trim()}`);
  }
  lines.push(
    `**Evidence Strength:** ${STRENGTH_LABEL[p.strength]} (${p.evidence.length} source${p.evidence.length === 1 ? "" : "s"})`,
  );
  return lines.join("\n\n");
}

/** Keep link text from breaking Markdown (brackets) — URLs are untouched. */
function sanitizeLinkText(text: string): string {
  return text.replace(/[[\]]/g, "").replace(/\s+/g, " ").trim().slice(0, 160) || "source";
}

// ---------------------------------------------------------------------------
// Save
// ---------------------------------------------------------------------------

async function saveReport(
  bodyEn: string,
  problemCount: number,
  utcStr: string,
  dateStr: string,
  digestRepo: string,
): Promise<void> {
  const bodyVi = await translateToVi(bodyEn, LLM_TOKENS_LISTING);
  const body: Record<Lang, string> = { en: bodyEn, vi: bodyVi };

  for (const lang of LANGS) {
    const fileName = lang === "en" ? "problems-en.md" : "problems.md";
    const header =
      `# ${PROBLEMS_REPORT.title[lang]} ${dateStr}\n\n` +
      `${PROBLEMS_REPORT.meta(utcStr, problemCount, lang)}\n\n---\n\n`;
    const content = header + body[lang] + autoGenFooter(lang);
    console.log(`  Saved ${saveFile(content, dateStr, fileName)}`);

    if (digestRepo) {
      try {
        const url = await createGitHubIssue(
          PROBLEMS_REPORT.issueTitle(dateStr, lang),
          content,
          PROBLEMS_ISSUE_LABELS[lang],
        );
        console.log(`  Created problems issue (${lang}): ${url}`);
      } catch (err) {
        console.error(`  [problems] issue creation (${lang}) failed: ${err}`);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Telegram highlights
// ---------------------------------------------------------------------------

/**
 * Write the strongest problem titles for the Telegram message. Problem
 * Discovery runs on its own schedule, so it posts its own message to the same
 * channel (not folded into the daily digest message). The actual send happens
 * in a separate workflow step (`notify-problems.ts`) *after* the report is
 * committed and pushed, mirroring the daily digest — so the "Read more" link
 * resolves. `problems` is already ranked strongest-first by `resolveProblems`.
 */
async function writeTelegramHighlights(problems: ResolvedProblem[], dateStr: string): Promise<void> {
  if (problems.length === 0) return;

  const en = problems
    .slice(0, TELEGRAM_HIGHLIGHTS)
    .map((p) => sanitizeLinkText(p.title))
    .filter((t) => t.length > 0);
  if (en.length === 0) return;

  // Vietnamese titles via the shared JSON-translation prompt; fall back to the
  // English titles so the message is never empty if translation misbehaves.
  let vi = en;
  try {
    const translated = parseLlmJson<string[]>(
      await callLlm(buildJsonTranslationPrompt(JSON.stringify(en)), 1024),
    );
    if (Array.isArray(translated) && translated.some((t) => typeof t === "string" && t.trim())) {
      vi = translated.map((t) => (typeof t === "string" ? t.trim() : "")).filter(Boolean);
    }
  } catch (err) {
    console.error(`  [problems] highlight translation failed, using English: ${err}`);
  }

  const highlights: ProblemHighlights = { vi, en };
  console.log(`  Saved ${saveFile(JSON.stringify(highlights, null, 2), dateStr, PROBLEMS_HIGHLIGHTS_FILE)}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const now = new Date();
  const dateStr = toCstDateStr(now);
  const utcStr = toUtcStr(now);
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  const collectOnly = process.env["PROBLEMS_COLLECT_ONLY"] === "1";
  const providerName = process.env["LLM_PROVIDER"] ?? "anthropic";

  console.log(`[${now.toISOString()}] Starting problem discovery | provider: ${providerName}`);

  // 1. Collect.
  const state = loadProblemState();
  const seen = new Set(state.seen);
  console.log("  Collecting discussions (GitHub Issues, Stack Exchange, Hacker News)...");
  const collection = await collectDiscussions(seen);
  const { discussions, sourceCounts, domainCounts, emptySources } = collection;

  console.log(
    `  Collected ${discussions.length} discussions — ` +
      `by source: github=${sourceCounts.github}, stackexchange=${sourceCounts.stackexchange}, hackernews=${sourceCounts.hackernews}; ` +
      `by domain: software=${domainCounts.software}, finance=${domainCounts.finance}, business=${domainCounts.business}`,
  );
  if (emptySources.length) console.warn(`  Missing coverage: ${emptySources.join(", ")}`);

  if (collectOnly) {
    const out = saveFile(JSON.stringify(collection, null, 2), "problem-collection.json");
    console.log(`  [collect-only] wrote ${out} — skipping LLM phase.`);
    return;
  }

  if (discussions.length === 0) {
    console.warn("  No new discussions to analyze (all seen or sources empty). Writing an empty report.");
    await saveReport(buildReportBody([], 0, emptySources), 0, utcStr, dateStr, digestRepo);
    saveProblemState(state);
    reportLlmHealth();
    return;
  }

  // Assign opaque ref ids — the only handle the LLM gets on each discussion.
  const byRef = new Map<string, Discussion>();
  const refOf = new Map<string, string>();
  discussions.forEach((d, i) => {
    const ref = `D${i + 1}`;
    byRef.set(ref, d);
    refOf.set(d.key, ref);
  });

  // 2. Extract problem signals.
  console.log("  Extracting problems with the LLM...");
  const signals = await extractSignals(discussions, byRef, refOf);
  console.log(`  Extracted ${signals.length} problem signals.`);

  // 3. Group into final problems.
  console.log("  Grouping similar problems...");
  const problems = signals.length ? await groupProblems(signals, byRef) : [];
  console.log(`  Produced ${problems.length} grouped problems.`);

  // Abort before writing anything if the provider was effectively down — a
  // published report of nothing is worse than a missing one (re-runnable).
  assertLlmHealthy("extraction");

  // Mark every analyzed discussion as seen, so repeated runs do not re-mine it.
  state.seen = [...seen, ...discussions.map((d) => d.key)];

  // 4 + 5. Build + translate + save.
  const bodyEn = buildReportBody(problems, discussions.length, emptySources);
  await saveReport(bodyEn, problems.length, utcStr, dateStr, digestRepo);

  assertLlmHealthy("report");
  saveProblemState(state);

  // 6. Write Telegram highlights; the workflow sends them after the push, so
  // the message links to an already-published report (see writeTelegramHighlights).
  await writeTelegramHighlights(problems, dateStr);

  reportLlmHealth();
  console.log("Done!");
}

// Run only when executed directly (not when imported for testing).
const isDirectRun =
  process.argv[1] &&
  (process.argv[1].endsWith("problem-discovery.ts") || process.argv[1].endsWith("problem-discovery.js"));
if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    console.error(`  [llm] ${llmHealthLine()}`);
    process.exit(1);
  });
}

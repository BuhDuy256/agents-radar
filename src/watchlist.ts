/**
 * Vendor watchlist: pricing, quota and access changes for the tools this
 * digest depends on. Edit `WATCHLIST` below to add or remove a source.
 *
 * The pages are public HTML, read without credentials. Only price and limit
 * facts are stored and compared, so a menu change or a new crawl date is not
 * news. The first successful read of a page is a baseline: it is never
 * reported as an increase or a decrease.
 *
 * State lives in `digests/watchlist-state.json`. The workflow commits
 * `digests/`, so the baseline survives between runs.
 */

import fs from "node:fs";
import path from "node:path";
import { fetchUrlText } from "./hn.ts";

export interface WatchlistPage {
  label: string;
  url: string;
}

export interface WatchlistEntry {
  id: string;
  name: string;
  pages: WatchlistPage[];
}

/**
 * Verified public pages (checked with a plain GET before being added).
 * Pricing facts only — feature and incident news still comes from the
 * official feeds and the CLI repositories.
 */
export const WATCHLIST: WatchlistEntry[] = [
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    pages: [{ label: "Plans & pricing", url: "https://docs.github.com/en/copilot/get-started/plans" }],
  },
  {
    id: "deepseek-api",
    name: "DeepSeek API",
    pages: [{ label: "Models & pricing", url: "https://api-docs.deepseek.com/quick_start/pricing/" }],
  },
  {
    id: "river-ai",
    name: "River AI",
    pages: [{ label: "Pricing", url: "https://river.ai/pricing" }],
  },
  {
    id: "openai-codex",
    name: "OpenAI Codex",
    pages: [{ label: "Codex pricing", url: "https://learn.chatgpt.com/docs/pricing" }],
  },
  {
    id: "claude",
    name: "Claude",
    pages: [{ label: "Plans & pricing", url: "https://claude.com/pricing" }],
  },
  {
    id: "claude-code",
    name: "Claude Code",
    pages: [{ label: "Pricing and costs", url: "https://code.claude.com/docs/en/costs" }],
  },
];

/** url → normalised price/limit facts from the last successful read. */
export type WatchlistState = Record<string, string[]>;

export interface WatchlistChange {
  name: string;
  page: string;
  url: string;
  added: string[];
  removed: string[];
}

export interface WatchlistResult {
  /** Only real diffs; baselines are counted separately. */
  changes: WatchlistChange[];
  /** Pages whose baseline was recorded on this run. */
  baselines: number;
  /** Pages that could not be read or produced no trackable facts. */
  unavailable: string[];
  checked: number;
}

const STATE_FILE = path.join("digests", "watchlist-state.json");
const MAX_FACTS = 120;
const MIN_FACT_CHARS = 4;
const MAX_FACT_CHARS = 110;
const MIN_USABLE_TEXT = 120;

/**
 * Price and limit facts. Anything else on the page — navigation, model names,
 * publication dates — is deliberately ignored so page chrome cannot look like
 * a price change.
 */
const FACT_PATTERNS = [
  /\$\s?\d[\d.,]*\s?(?:USD)?(?:\s*(?:per|\/|a)\s*[^.;|()]{0,40})?/gi,
  /\b\d[\d.,]*\s?(?:K|M|B)?\s?(?:AI credits|credits|tokens?|requests?|completions?|messages?|seats?)\b(?:\s*(?:per|\/|a)\s*[^.;|()]{0,40})?/gi,
  /\b(?:rate limits?|context window|max(?:imum)? output|usage limits?|quota)\b[^.;|]{0,60}/gi,
];

function normaliseFact(raw: string): string {
  return raw.replace(/\s+/g, " ").replace(/^[\s,;:-]+|[\s,;:-]+$/g, "").trim();
}

/**
 * The comparable part of a fact: the number and its unit/condition, without
 * the leading label. Marketing copy next to a price can rotate between two
 * requests — that is not a price change — while the number and its "per …"
 * clause are stable.
 */
export function factKey(fact: string): string {
  const match =
    fact.match(/\$\s?\d[\d.,]*(?:\s?USD)?(?:\s*(?:per|\/|a)\s*[^.;|()]{0,40})?/i) ??
    fact.match(
      /\b\d[\d.,]*\s?(?:K|M|B)?\s?(?:AI credits|credits|tokens?|requests?|completions?|messages?|seats?)\b(?:\s*(?:per|\/|a)\s*[^.;|()]{0,40})?/i,
    );
  return normaliseFact(match?.[0] ?? fact).toLowerCase();
}

/** Extract the comparable price/limit facts from a page's text. */
export function extractFacts(text: string): string[] {
  const seen = new Set<string>();
  const facts: string[] = [];

  for (const [index, pattern] of FACT_PATTERNS.entries()) {
    for (const match of text.matchAll(pattern)) {
      const matched = match[0] ?? "";
      // A bare "$0.003" says nothing without the row label. Keep a short prefix
      // for money facts so "1M INPUT TOKENS (CACHE HIT) OFF-PEAK $0.003" stays
      // readable. Limit facts already carry their own words.
      const start = match.index ?? 0;
      const prefix =
        index === 0 && start > 0 ? text.slice(Math.max(0, start - 45), start).replace(/^\S*\s/, "") : "";
      const fact = normaliseFact(`${prefix}${matched}`).slice(-MAX_FACT_CHARS);
      if (fact.length < MIN_FACT_CHARS) continue;
      if (!/\d/.test(fact)) continue;
      const key = fact.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      facts.push(fact);
      if (facts.length >= MAX_FACTS) return facts.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    }
  }

  return facts.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

export function loadWatchlistState(): WatchlistState {
  try {
    const raw = JSON.parse(fs.readFileSync(STATE_FILE, "utf-8")) as unknown;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
    const state: WatchlistState = {};
    for (const [url, facts] of Object.entries(raw as Record<string, unknown>)) {
      if (Array.isArray(facts)) state[url] = facts.filter((f): f is string => typeof f === "string");
    }
    return state;
  } catch {
    return {};
  }
}

export function saveWatchlistState(state: WatchlistState): void {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
}

/**
 * Read every watchlist page and diff its price/limit facts against the stored
 * baseline. Mutates `state` for pages that were read successfully; the caller
 * persists it after the run.
 */
export async function fetchWatchlistChanges(state: WatchlistState): Promise<WatchlistResult> {
  const result: WatchlistResult = { changes: [], baselines: 0, unavailable: [], checked: 0 };

  const pages = WATCHLIST.flatMap((entry) => entry.pages.map((page) => ({ entry, page })));

  await Promise.all(
    pages.map(async ({ entry, page }) => {
      const label = `${entry.name} — ${page.label}`;
      let text: string;
      try {
        const fetched = await fetchUrlText(page.url);
        if (fetched.status === "unavailable" || fetched.text.length < MIN_USABLE_TEXT) {
          result.unavailable.push(label);
          return;
        }
        text = fetched.text;
      } catch (err) {
        result.unavailable.push(label);
        console.error(`  [watchlist] ${label}: ${err}`);
        return;
      }

      const facts = extractFacts(text);
      if (facts.length === 0) {
        result.unavailable.push(label);
        return;
      }

      result.checked += 1;
      const previous = state[page.url];
      if (!previous) {
        state[page.url] = facts;
        result.baselines += 1;
        return;
      }

      const before = new Map(previous.map((f) => [factKey(f), f]));
      const after = new Map(facts.map((f) => [factKey(f), f]));
      const added = facts.filter((f) => !before.has(factKey(f)));
      const removed = previous.filter((f) => !after.has(factKey(f)));

      state[page.url] = facts;
      if (added.length || removed.length) {
        result.changes.push({ name: entry.name, page: page.label, url: page.url, added, removed });
      }
    }),
  );

  if (result.checked || result.unavailable.length) {
    console.log(
      `  [watchlist] ${result.checked} page(s) read, ${result.changes.length} changed, ` +
        `${result.baselines} baseline(s), ${result.unavailable.length} unavailable`,
    );
  }
  return result;
}

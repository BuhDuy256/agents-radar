/**
 * Hacker News AI stories fetched from the official Firebase API.
 */

import { extractText, extractTitle } from "./web.ts";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface HnStory {
  id: string;
  hnRank?: number;
  title: string;
  url: string; // external URL, or HN discussion link if no external URL
  hnUrl: string; // always the HN discussion link
  points: number;
  comments: number;
  author: string;
  createdAt: string;
}

export interface HnData {
  stories: HnStory[];
  fetchSuccess: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HN_TOP_STORIES = 30;
const HN_STORIES_TO_SCAN = 500;
const HN_BATCH_SIZE = 50;

const HN_TOPSTORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const HN_ITEM_URL = (id: number) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

// ---------------------------------------------------------------------------
// Firebase API types
// ---------------------------------------------------------------------------

interface HnFirebaseItem {
  id: number;
  deleted?: boolean;
  dead?: boolean;
  type?: string;
  by?: string;
  time?: number;
  title?: string;
  url?: string;
  score?: number;
  descendants?: number;
}

const AI_KEYWORD_PATTERNS = [
  /\bai\b/i,
  /\ba\.i\./i,
  /\bllm(s)?\b/i,
  /\bml\b/i,
  /machine learning/i,
  /deep learning/i,
  /neural/i,
  /transformer/i,
  /language model(s)?\b/i,
  /foundation model(s)?\b/i,
  /\brag\b/i,
  /agent(s)?\b/i,
  /openai/i,
  /anthropic/i,
  /claude/i,
  /chatgpt/i,
  /gemini/i,
  /copilot/i,
];

function isAiRelated(item: HnFirebaseItem): boolean {
  const text = `${item.title ?? ""} ${item.url ?? ""}`;
  return AI_KEYWORD_PATTERNS.some((pattern) => pattern.test(text));
}

function toHnStory(item: HnFirebaseItem, hnRank: number): HnStory {
  const id = String(item.id);
  const hnUrl = `https://news.ycombinator.com/item?id=${id}`;

  return {
    id,
    hnRank,
    title: item.title ?? "(untitled)",
    url: item.url ?? hnUrl,
    hnUrl,
    points: item.score ?? 0,
    comments: item.descendants ?? 0,
    author: item.by ?? "unknown",
    createdAt: item.time ? new Date(item.time * 1000).toISOString() : new Date(0).toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Article content for the shortlisted stories
// ---------------------------------------------------------------------------

export type ArticleStatus = "full" | "partial" | "unavailable";

export interface HnArticle {
  story: HnStory;
  status: ArticleStatus;
  /** Page title when it differs from the HN submission title. */
  pageTitle?: string;
  text: string;
  /** Where the text came from, or why it is missing. */
  note?: string;
}

/** Characters of article text handed to the LLM per story. */
const ARTICLE_MAX_CHARS = 8_000;
const ARTICLE_TIMEOUT_MS = 10_000;
const ARTICLE_CONCURRENCY = 3;
/** Below this the extraction is probably just nav/boilerplate. */
const MIN_PARTIAL_CHARS = 200;
/** Enough text to treat the article body as read. */
const MIN_FULL_CHARS = 1_200;

const ARTICLE_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; agents-radar/1.0; +https://github.com/search?q=agents-radar)",
  Accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.5",
  "Accept-Language": "en-US,en;q=0.9",
};

/** Reject localhost, link-local and private IPv4/IPv6 hosts. */
export function isPublicHttpUrl(raw: string): boolean {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) {
    return false;
  }
  if (host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80")) {
    return false;
  }

  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (a === 0 || a === 10 || a === 127) return false;
    if (a === 169 && b === 254) return false;
    if (a === 192 && b === 168) return false;
    if (a === 172 && b >= 16 && b <= 31) return false;
  }
  return true;
}

const GITHUB_REPO_RE = /^https?:\/\/(?:www\.)?github\.com\/([^/?#]+)\/([^/?#]+)\/?$/;

async function fetchGitHubReadme(owner: string, repo: string): Promise<string> {
  const token = process.env["GITHUB_TOKEN"] ?? "";
  const resp = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: {
      Accept: "application/vnd.github.raw",
      "User-Agent": "agents-radar/1.0",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(ARTICLE_TIMEOUT_MS),
  });
  if (!resp.ok) throw new Error(`GitHub API HTTP ${resp.status}`);
  return await resp.text();
}

export interface UrlText {
  status: ArticleStatus;
  text: string;
  pageTitle?: string;
  note?: string;
}

/**
 * Fetch readable text from a public URL (article page or GitHub README).
 * Never throws — failures come back as `unavailable` so one bad link cannot
 * break a whole report.
 */
export async function fetchUrlText(url: string): Promise<UrlText> {
  if (!isPublicHttpUrl(url)) {
    return { status: "unavailable", text: "", note: "unsupported URL" };
  }

  try {
    const gh = url.match(GITHUB_REPO_RE);
    if (gh) {
      const text = (await fetchGitHubReadme(gh[1]!, gh[2]!)).slice(0, ARTICLE_MAX_CHARS).trim();
      return {
        status:
          text.length >= MIN_FULL_CHARS
            ? "full"
            : text.length >= MIN_PARTIAL_CHARS
              ? "partial"
              : "unavailable",
        text,
        note: "GitHub README",
      };
    }

    const resp = await fetch(url, {
      headers: ARTICLE_HEADERS,
      redirect: "follow",
      signal: AbortSignal.timeout(ARTICLE_TIMEOUT_MS),
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    if (!isPublicHttpUrl(resp.url || url)) throw new Error("redirected to a non-public host");

    const type = resp.headers.get("content-type") ?? "";
    const raw = await resp.text();
    const text = /text\/plain/i.test(type)
      ? raw.slice(0, ARTICLE_MAX_CHARS).trim()
      : extractText(raw, ARTICLE_MAX_CHARS);

    return {
      status:
        text.length >= MIN_FULL_CHARS ? "full" : text.length >= MIN_PARTIAL_CHARS ? "partial" : "unavailable",
      pageTitle: /html/i.test(type) ? extractTitle(raw) || undefined : undefined,
      text,
      note: /html/i.test(type) ? undefined : `content-type: ${type || "unknown"}`,
    };
  } catch (err) {
    return { status: "unavailable", text: "", note: err instanceof Error ? err.message : String(err) };
  }
}

/** Fetch the body of one story. */
export async function fetchArticleContent(story: HnStory): Promise<HnArticle> {
  const page = await fetchUrlText(story.url);
  if (page.status === "unavailable") {
    console.error(`  [hn] article fetch failed for ${story.id}: ${page.note ?? "unknown"}`);
  }
  return { story, ...page };
}

/** Fetch several stories' bodies with a small worker pool (max 3 at a time). */
export async function fetchHnArticles(stories: HnStory[]): Promise<HnArticle[]> {
  const articles: HnArticle[] = new Array(stories.length);
  let next = 0;

  const worker = async (): Promise<void> => {
    while (next < stories.length) {
      const index = next++;
      articles[index] = await fetchArticleContent(stories[index]!);
    }
  };

  await Promise.all(Array.from({ length: Math.min(ARTICLE_CONCURRENCY, stories.length) }, worker));

  const counts = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] ?? 0) + 1;
    return acc;
  }, {});
  console.log(
    `  [hn] article content: ${counts["full"] ?? 0} full, ${counts["partial"] ?? 0} partial, ` +
      `${counts["unavailable"] ?? 0} unavailable`,
  );
  return articles;
}

// ---------------------------------------------------------------------------
// Shortlist helpers
// ---------------------------------------------------------------------------

/** Keywords that match the preferred topics — the fallback when selection fails. */
const PREFERRED_PATTERNS = [
  /anthropic|claude|openai|chatgpt|codex|deepseek|qwen|gemini|mistral|meta\s+ai|llama|copilot|grok|xai/i,
  /\bmodel(s)?\b|harness|agent(s)?|skill(s)?|mcp|sdk|api|ide|cli|coding|developer tool/i,
  /\bfunding|raise(s|d)?|valuation|acquire(s|d)?|acquisition|merger|ipo|revenue|profit|earnings|layoff|hiring|hire(s|d)?|partnership|pricing|price cut/i,
  /\bmarket|invest(s|ed|ment)?|cloud|chip(s)?|gpu(s)?|semiconductor|datacenter|data center|policy|regulation|forecast|outlook|jobs\b/i,
];

const DEPRIORITIZED_PATTERNS = [
  /\bkernel(s)?\b|ptx|cuda core|instruction set|compiler optimization/i,
  /\bmedical|clinical|biolog|genom|protein|drug discovery|poetry|novel writing/i,
];

function preferenceScore(story: HnStory): number {
  const text = `${story.title} ${story.url}`;
  const preferred = PREFERRED_PATTERNS.filter((p) => p.test(text)).length;
  const deprioritized = DEPRIORITIZED_PATTERNS.filter((p) => p.test(text)).length;
  return preferred * 2 - deprioritized * 3;
}

/**
 * Deterministic fallback shortlist: keep only preferred topics, best preference
 * first, then HN rank. Used when the LLM selection fails.
 */
export function keywordShortlist(stories: HnStory[], max: number): HnStory[] {
  return stories
    .filter((s) => preferenceScore(s) > 0)
    .sort((a, b) => preferenceScore(b) - preferenceScore(a) || (a.hnRank ?? 9999) - (b.hnRank ?? 9999))
    .slice(0, max);
}

/**
 * Pull ids out of the model's selection reply. Accepts a bare JSON array or an
 * object with an `ids` array; anything else yields an empty list.
 */
export function parseHnSelection(raw: string): string[] {
  const match = raw.match(/\[[\s\S]*?\]/);
  if (!match) return [];
  try {
    const parsed: unknown = JSON.parse(match[0]);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((v) => (typeof v === "string" ? v : typeof v === "number" ? String(v) : ""))
      .map((v) => v.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** Map selected ids onto real stories, dropping unknown and duplicate ids. */
export function pickStories(stories: HnStory[], ids: string[], max: number): HnStory[] {
  const byId = new Map(stories.map((s) => [s.id, s]));
  const picked: HnStory[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    const story = byId.get(id);
    if (!story || seen.has(id)) continue;
    seen.add(id);
    picked.push(story);
    if (picked.length >= max) break;
  }
  return picked;
}

export const HN_SHORTLIST_MAX = 8;

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export async function fetchHnData(): Promise<HnData> {
  try {
    const topResp = await fetch(HN_TOPSTORIES_URL, {
      headers: { "User-Agent": "agents-radar/1.0" },
    });
    if (!topResp.ok) {
      console.error(`  [hn] topstories: HTTP ${topResp.status}`);
      return { stories: [], fetchSuccess: false };
    }

    const topIds = ((await topResp.json()) as number[]).slice(0, HN_STORIES_TO_SCAN);
    const stories: HnStory[] = [];

    for (let i = 0; i < topIds.length && stories.length < HN_TOP_STORIES; i += HN_BATCH_SIZE) {
      const batchIds = topIds.slice(i, i + HN_BATCH_SIZE);
      const items = await Promise.all(
        batchIds.map(async (id): Promise<HnFirebaseItem | null> => {
          const resp = await fetch(HN_ITEM_URL(id), {
            headers: { "User-Agent": "agents-radar/1.0" },
          });
          if (!resp.ok) {
            console.error(`  [hn] item ${id}: HTTP ${resp.status}`);
            return null;
          }
          return (await resp.json()) as HnFirebaseItem;
        }),
      );

      for (let j = 0; j < items.length && stories.length < HN_TOP_STORIES; j += 1) {
        const item = items[j];
        if (!item || item.deleted || item.dead || item.type !== "story" || !item.title) {
          continue;
        }
        if (isAiRelated(item)) {
          stories.push(toHnStory(item, i + j + 1));
        }
      }
    }

    console.log(`  [hn] ${stories.length} AI stories (scanned ${topIds.length} topstories)`);
    return { stories, fetchSuccess: stories.length > 0 };
  } catch (err) {
    console.error(`  [hn] fetch failed: ${err}`);
    return { stories: [], fetchSuccess: false };
  }
}

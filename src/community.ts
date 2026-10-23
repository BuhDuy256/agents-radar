/**
 * Community report inputs (Dev.to + Lobste.rs): shortlist, article bodies, and
 * the small helpers the report saver needs. Reuses the article fetcher from
 * the Hacker News flow.
 */

import type { DevtoData } from "./devto.ts";
import { fetchDevtoBody } from "./devto.ts";
import type { LobstersData } from "./lobsters.ts";
import { type ArticleStatus, fetchUrlText } from "./hn.ts";

export interface CommunityItem {
  /** Stable selection key: `devto:123` or `lobsters:abc`. */
  key: string;
  source: "devto" | "lobsters";
  title: string;
  /** Original article link. */
  url: string;
  /** Lobste.rs discussion link, when it differs from the article link. */
  discussionUrl?: string;
  author: string;
  publishedAt: string;
  tags: string[];
  description?: string;
  /** Short display string, e.g. "12 reactions · 3 comments". */
  engagement: string;
  engagementScore: number;
  status: ArticleStatus;
  pageTitle?: string;
  text: string;
  note?: string;
}

export const COMMUNITY_MAX = 5;
const CONTENT_CONCURRENCY = 3;

/** Host + path, without scheme, `www.`, query or fragment — for cross-source dedupe. */
export function normalizeUrl(raw: string): string {
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    return `${host}${url.pathname.replace(/\/+$/, "")}`;
  } catch {
    return raw.trim().toLowerCase();
  }
}

/** Build the candidate list from both sources, best-engagement first. */
export function communityCandidates(devto: DevtoData, lobsters: LobstersData): CommunityItem[] {
  const candidates: CommunityItem[] = [];

  for (const a of devto.articles) {
    candidates.push({
      key: `devto:${a.id}`,
      source: "devto",
      title: a.title,
      url: a.url,
      author: a.user,
      publishedAt: a.publishedAt,
      tags: a.tags,
      description: a.description,
      engagement: `${a.positiveReactionsCount} reactions · ${a.commentsCount} comments · ${a.readingTimeMinutes} min read`,
      engagementScore: a.positiveReactionsCount + a.commentsCount,
      status: "unavailable",
      text: "",
    });
  }

  for (const s of lobsters.stories) {
    candidates.push({
      key: `lobsters:${s.id}`,
      source: "lobsters",
      title: s.title,
      url: s.url,
      discussionUrl: s.commentsUrl,
      author: s.author,
      publishedAt: s.publishedAt,
      tags: s.tags,
      engagement: `${s.score} points · ${s.commentCount} comments`,
      engagementScore: s.score + s.commentCount,
      status: "unavailable",
      text: "",
    });
  }

  return candidates.sort((a, b) => b.engagementScore - a.engagementScore);
}

/**
 * Topics the reader actually wants: AI harnesses, agents, skills, workflows,
 * models and hands-on experience with AI tools. Used only as a fallback when
 * the selection call fails.
 */
const AI_TOPIC_PATTERNS = [
  /\bai\b/i,
  /\ba\.i\./i,
  /\bllms?\b/i,
  /\bgpt/i,
  /\bclaude\b/i,
  /\banthropic\b/i,
  /\bopenai\b/i,
  /\bchatgpt\b/i,
  /\bcopilot\b/i,
  /\bgemini\b/i,
  /\bdeepseek\b/i,
  /\bollama\b/i,
  /\bllama\b/i,
  /\bmodel(s)?\b/i,
  /\bagent(s|ic)?\b/i,
  /\bprompt(s|ing)?\b/i,
  /\brag\b/i,
  /\bmcp\b/i,
  /\bembeddings?\b/i,
  /\bfine-?tun/i,
  /\binference\b/i,
  /\bharness\b/i,
  /\bskills?\b/i,
  /\blangchain\b/i,
  /\bvector (db|database|store)\b/i,
];

export function isAiCommunityItem(item: CommunityItem): boolean {
  const text = `${item.title} ${item.description ?? ""} ${item.tags.join(" ")}`;
  return AI_TOPIC_PATTERNS.some((p) => p.test(text));
}

/** Deterministic fallback: AI topics only, best engagement first. */
export function keywordCommunityShortlist(candidates: CommunityItem[], max = COMMUNITY_MAX): CommunityItem[] {
  return candidates.filter(isAiCommunityItem).slice(0, max);
}

/** Map selected keys onto real candidates, dropping unknown and duplicate keys. */
export function pickCommunityItems(
  candidates: CommunityItem[],
  keys: string[],
  max = COMMUNITY_MAX,
): CommunityItem[] {
  const byKey = new Map(candidates.map((c) => [c.key, c]));
  const picked: CommunityItem[] = [];
  const seen = new Set<string>();
  for (const key of keys) {
    const item = byKey.get(key);
    if (!item || seen.has(key)) continue;
    seen.add(key);
    picked.push(item);
    if (picked.length >= max) break;
  }
  return picked;
}

async function withContent(item: CommunityItem): Promise<CommunityItem> {
  if (item.source === "devto") {
    const body = await fetchDevtoBody(Number(item.key.slice("devto:".length)));
    return { ...item, ...body };
  }

  // A Lobste.rs story without an external URL points at its own discussion
  // page. Reading that page would mean reading comments, which this report
  // deliberately does not use.
  if (item.url === item.discussionUrl) {
    return { ...item, status: "unavailable", text: "", note: "link points to the Lobste.rs discussion" };
  }

  const page = await fetchUrlText(item.url);
  return { ...item, ...page };
}

/** Fetch bodies for the shortlist with a small worker pool (max 3 at a time). */
export async function fetchCommunityContent(items: CommunityItem[]): Promise<CommunityItem[]> {
  const result: CommunityItem[] = new Array(items.length);
  let next = 0;

  const worker = async (): Promise<void> => {
    while (next < items.length) {
      const index = next++;
      result[index] = await withContent(items[index]!);
    }
  };

  await Promise.all(Array.from({ length: Math.min(CONTENT_CONCURRENCY, items.length) }, worker));

  const counts = result.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});
  console.log(
    `  [community] article content: ${counts["full"] ?? 0} full, ${counts["partial"] ?? 0} partial, ` +
      `${counts["unavailable"] ?? 0} unavailable`,
  );
  return result;
}

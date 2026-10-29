/**
 * Telegram notification — reads manifest.json and sends a message
 * with links to the latest reports. Skips silently if secrets are not set.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — bot token from @BotFather
 *   TELEGRAM_CHAT_ID    — channel/group/user chat ID
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL (defaults to the public deployment)
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { NOTIFY_PROBLEMS_TITLE, NOTIFY_READ_MORE, NOTIFY_SECTIONS, NOTIFY_TITLE } from "./i18n.ts";
import { toCstDateStr } from "./date.ts";
import type { ReportHighlights } from "./prompts-data.ts";

export interface Highlights {
  vi: ReportHighlights;
  en: ReportHighlights;
}

/**
 * Shape of highlights.json written before the switch to Vietnamese. Kept so a
 * re-run of notify/feishu over an old digest folder still finds English
 * highlights instead of failing on the missing `vi` key.
 */
export interface LegacyHighlights extends Partial<Highlights> {
  zh?: ReportHighlights;
}

/**
 * File (under `digests/<date>/`) holding the Problem Discovery Telegram
 * highlights that `problem-discovery.ts` writes and `notify-problems.ts` sends.
 * Lives here, in the provider-free Telegram module, so the notify step never
 * pulls in the LLM provider graph (which throws without an API key at import).
 */
export const PROBLEMS_HIGHLIGHTS_FILE = "problems-highlights.json";

export interface ProblemHighlights {
  vi: string[];
  en: string[];
}

const PAGES_URL_DEFAULT = "https://buhduy256.github.io/agents-radar";

/** Telegram rejects messages over 4096 UTF-16 chars; leave room for encoding. */
export const TELEGRAM_MAX_CHARS = 3_500;

/** Ceiling per section, even if highlights.json still carries older, longer lists. */
const MAX_HIGHLIGHTS_PER_SECTION = 3;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendTelegram(text: string): Promise<void> {
  const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
  const CHAT_ID = process.env["TELEGRAM_CHAT_ID"] || "@agents_radar";
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
}

interface Section {
  id: string;
  title: string;
  items: string[];
}

/**
 * Build the Vietnamese Telegram message.
 *
 * Only published reports are considered (`NOTIFY_SECTIONS`), a section is
 * dropped when it has no usable highlight, and the message is shortened by
 * removing whole trailing highlights — never by cutting HTML or a link.
 * Returns an empty string when there is nothing worth sending.
 */
export function buildMessage(
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | LegacyHighlights | null,
  cacheKey?: string,
): string {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  // A versioned document URL defeats the 10-minute Pages cache: the reader
  // opens the digest produced by *this* run, not the one cached earlier.
  const baseUrl = cacheKey ? `${PAGES_URL}/?v=${encodeURIComponent(cacheKey)}` : `${PAGES_URL}/`;
  const viHighlights = highlights?.vi ?? {};
  const enHighlights = highlights?.en ?? {};
  // Old files may carry a `zh` key; it is deliberately ignored — Vietnamese is
  // the primary language now, and English is the only valid fallback.

  const sections: Section[] = [];
  for (const [id, titles] of Object.entries(NOTIFY_SECTIONS)) {
    if (!reports.includes(id)) continue;
    const raw = viHighlights[id]?.length ? viHighlights[id] : enHighlights[id];
    const items = (raw ?? []).map((h) => h.trim()).filter((h) => h.length > 0);
    const unique = [...new Set(items)].slice(0, MAX_HIGHLIGHTS_PER_SECTION);
    if (unique.length) sections.push({ id, title: titles.vi, items: unique });
  }

  if (sections.length === 0) return "";

  const header = `${NOTIFY_TITLE.vi} · ${date}`;
  const render = (): string => {
    const blocks = sections.map((s) =>
      [
        s.title,
        ...s.items.map((item) => `• ${escapeHtml(item)}`),
        `<a href="${baseUrl}#${date}/${s.id}">${NOTIFY_READ_MORE.vi}</a>`,
      ].join("\n"),
    );
    return [header, ...blocks].join("\n\n");
  };

  let text = render();
  // Too long: drop the last whole highlight and re-render. Removing the final
  // item of a section drops the section itself, so no empty heading is sent.
  while (text.length > TELEGRAM_MAX_CHARS && sections.length > 0) {
    const last = sections[sections.length - 1]!;
    last.items.pop();
    if (last.items.length === 0) sections.pop();
    text = render();
  }
  return text;
}

/**
 * Build the Problem Discovery Telegram message — one section, Vietnamese
 * preferred with English fallback, at most three problem titles, and a single
 * "Read more" link to the problems report. Separate from the daily digest
 * message (`buildMessage`) because Problem Discovery is its own pipeline on its
 * own schedule. Returns "" when there is nothing worth sending.
 */
export function buildProblemsMessage(
  date: string,
  highlights: { vi: string[]; en: string[] },
  pagesUrl?: string,
  cacheKey?: string,
): string {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const baseUrl = cacheKey ? `${PAGES_URL}/?v=${encodeURIComponent(cacheKey)}` : `${PAGES_URL}/`;

  const raw = highlights.vi?.length ? highlights.vi : highlights.en;
  const items = (raw ?? []).map((h) => h.trim()).filter((h) => h.length > 0);
  const unique = [...new Set(items)].slice(0, MAX_HIGHLIGHTS_PER_SECTION);
  if (unique.length === 0) return "";

  const header = `${NOTIFY_PROBLEMS_TITLE.vi} · ${date}`;
  const render = (list: string[]): string =>
    [
      header,
      ...list.map((item) => `• ${escapeHtml(item)}`),
      `<a href="${baseUrl}#${date}/problems">${NOTIFY_READ_MORE.vi}</a>`,
    ].join("\n");

  let text = render(unique);
  while (text.length > TELEGRAM_MAX_CHARS && unique.length > 1) {
    unique.pop();
    text = render(unique);
  }
  return text;
}

async function main(): Promise<void> {
  const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
  if (!BOT_TOKEN) {
    console.log("[notify] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[notify] manifest.json not found — skipping.");
    return;
  }

  const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    generated?: string;
    dates: { date: string; reports: string[] }[];
  };

  const latest = manifest.dates?.[0];
  if (!latest) {
    console.log("[notify] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  // A digest folder that is not today's is yesterday's news — never re-send it.
  const today = toCstDateStr(new Date());
  if (date !== today) {
    console.log(`[notify] Latest digest is ${date}, not today (${today}) — skipping.`);
    return;
  }

  // Load highlights if available
  let highlights: Highlights | LegacyHighlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights | LegacyHighlights;
    } catch {
      console.log("[notify] Failed to parse highlights.json — skipping (nothing to report).");
      return;
    }
  }

  const text = buildMessage(date, reports, undefined, highlights, manifest.generated);
  if (!text) {
    console.log(`[notify] No usable highlights for ${date} — skipping.`);
    return;
  }

  console.log(`[notify] Sending Telegram message for ${date} (${text.length} chars)…`);
  await sendTelegram(text);
  console.log("[notify] Done!");
}

// Only auto-send when run directly (`tsx src/notify.ts`). Guard prevents an
// accidental send when another module imports `buildMessage` from here.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e: unknown) => {
    console.error("[notify]", e instanceof Error ? e.message : e);
    process.exit(1);
  });
}

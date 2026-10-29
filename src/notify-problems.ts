/**
 * Telegram notification for the Problem Discovery report.
 *
 * Problem Discovery is a separate pipeline from the daily digest, so it posts
 * its own message to the same channel (same bot, same format) instead of being
 * folded into the daily digest message. This runs as a dedicated workflow step
 * *after* the report is committed and pushed, so the "Read more" link resolves
 * — mirroring how `notify.ts` runs for the daily digest.
 *
 * It reads the bilingual highlights that `problem-discovery.ts` wrote to
 * `digests/<today>/problems-highlights.json`; no file means no problems were
 * published today, so there is nothing to send. Skips silently if the Telegram
 * secrets are not set.
 *
 * Required env vars:
 *   TELEGRAM_BOT_TOKEN  — bot token from @BotFather
 *   TELEGRAM_CHAT_ID    — channel/group/user chat ID
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  buildProblemsMessage,
  sendTelegram,
  PROBLEMS_HIGHLIGHTS_FILE,
  type ProblemHighlights,
} from "./notify.ts";
import { toCstDateStr } from "./date.ts";

async function main(): Promise<void> {
  if (!process.env["TELEGRAM_BOT_TOKEN"]) {
    console.log("[notify-problems] TELEGRAM_BOT_TOKEN not set — skipping.");
    return;
  }

  const date = toCstDateStr(new Date());
  const file = path.join("digests", date, PROBLEMS_HIGHLIGHTS_FILE);
  if (!fs.existsSync(file)) {
    console.log(`[notify-problems] ${file} not found — no problems report today, skipping.`);
    return;
  }

  let highlights: ProblemHighlights;
  try {
    highlights = JSON.parse(fs.readFileSync(file, "utf-8")) as ProblemHighlights;
  } catch {
    console.log("[notify-problems] Failed to parse highlights — skipping.");
    return;
  }

  const text = buildProblemsMessage(
    date,
    { vi: highlights.vi ?? [], en: highlights.en ?? [] },
    undefined,
    String(Date.now()),
  );
  if (!text) {
    console.log(`[notify-problems] No usable highlights for ${date} — skipping.`);
    return;
  }

  console.log(`[notify-problems] Sending Telegram message for ${date} (${text.length} chars)…`);
  await sendTelegram(text);
  console.log("[notify-problems] Done!");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e: unknown) => {
    console.error("[notify-problems]", e instanceof Error ? e.message : e);
    process.exit(1);
  });
}

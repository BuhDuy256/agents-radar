/**
 * One-off script: regenerate highlights.json from existing reports
 * and optionally resend Telegram notification.
 *
 * Usage:
 *   npx tsx scripts/regen-highlights.ts [--notify]
 *
 * Env vars:
 *   ANTHROPIC_API_KEY (or LLM_PROVIDER + matching key)
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID (only if --notify)
 */

import fs from "node:fs";
import path from "node:path";
import { callLlm, parseLlmJson } from "../src/report.ts";
import { buildHighlightsPrompt, type ReportHighlights } from "../src/prompts-data.ts";
import { buildMessage } from "../src/notify.ts";
import { PUBLISHED_REPORTS, type Lang } from "../src/i18n.ts";

const DATE = process.argv[2] && !process.argv[2].startsWith("-") ? process.argv[2] : null;
const NOTIFY = process.argv.includes("--notify");

async function main() {
  // Find latest date
  const digestsDir = "digests";
  const dateStr =
    DATE ??
    fs
      .readdirSync(digestsDir)
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort()
      .reverse()[0];

  if (!dateStr) {
    console.error("No digest date found");
    process.exit(1);
  }

  console.log(`Regenerating highlights for ${dateStr}...`);

  const reportIds = PUBLISHED_REPORTS;

  // Read reports
  const viReports: Record<string, string> = {};
  const enReports: Record<string, string> = {};
  for (const id of reportIds) {
    const viPath = path.join(digestsDir, dateStr, `${id}.md`);
    const enPath = path.join(digestsDir, dateStr, `${id}-en.md`);
    if (fs.existsSync(viPath)) viReports[id] = fs.readFileSync(viPath, "utf-8");
    if (fs.existsSync(enPath)) enReports[id] = fs.readFileSync(enPath, "utf-8");
  }

  console.log(`  VI reports: ${Object.keys(viReports).length}, EN reports: ${Object.keys(enReports).length}`);

  // Generate highlights
  const highlights: Record<Lang, ReportHighlights> = { vi: {}, en: {} };
  const [viRaw, enRaw] = await Promise.all([
    callLlm(buildHighlightsPrompt(viReports, "vi"), 2048),
    callLlm(buildHighlightsPrompt(enReports, "en"), 2048),
  ]);

  try {
    highlights.vi = parseLlmJson<ReportHighlights>(viRaw);
  } catch (err) {
    console.error(`  [highlights] vi parse failed: ${err}`);
  }
  try {
    highlights.en = parseLlmJson<ReportHighlights>(enRaw);
  } catch (err) {
    console.error(`  [highlights] en parse failed: ${err}`);
  }

  // Backfill an empty language from the other so notifications never blank out.
  if (Object.keys(highlights.vi).length === 0) highlights.vi = highlights.en;
  else if (Object.keys(highlights.en).length === 0) highlights.en = highlights.vi;

  const outPath = path.join(digestsDir, dateStr, "highlights.json");
  fs.writeFileSync(outPath, JSON.stringify(highlights, null, 2) + "\n");
  console.log(`  Saved ${outPath}`);
  console.log(`  VI keys: ${Object.keys(highlights.vi).join(", ")}`);
  console.log(`  EN keys: ${Object.keys(highlights.en).join(", ")}`);

  if (NOTIFY) {
    const BOT_TOKEN = process.env["TELEGRAM_BOT_TOKEN"] ?? "";
    const CHAT_ID = process.env["TELEGRAM_CHAT_ID"] || "@agents_radar";

    if (!BOT_TOKEN) {
      console.error("  TELEGRAM_BOT_TOKEN not set, cannot send notification.");
      process.exit(1);
    }

    const allReports = [...Object.keys(viReports), ...Object.keys(enReports).map((k) => `${k}-en`)];
    const text = buildMessage(dateStr, allReports, undefined, highlights);

    console.log(`  Sending Telegram notification...`);
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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
      console.error(`  Telegram API ${res.status}: ${body}`);
      process.exit(1);
    }
    console.log("  Telegram notification sent!");
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

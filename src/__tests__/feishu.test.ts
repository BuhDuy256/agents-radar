import { describe, it, expect, afterEach } from "vitest";
import { buildFeishuMessage } from "../feishu.ts";
import type { Highlights, LegacyHighlights } from "../notify.ts";

const BASE_URL = "https://example.com/radar";

describe("buildFeishuMessage", () => {
  const origPagesUrl = process.env["PAGES_URL"];

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env["PAGES_URL"] = origPagesUrl;
    } else {
      delete process.env["PAGES_URL"];
    }
  });

  it("builds a daily message with vi + en reports", () => {
    const msg = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      BASE_URL,
    );
    expect(msg).toContain("agents-radar");
    expect(msg).toContain("2026-03-09");
    expect(msg).toContain("📡");
    expect(msg).toContain(`[Công cụ AI CLI](${BASE_URL}/#2026-03-09/ai-cli)`);
    expect(msg).toContain(`[AI CLI Tools](${BASE_URL}/#2026-03-09/ai-cli-en)`);
  });

  it("renders vi-only reports without en link", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-hn"], BASE_URL);
    expect(msg).toContain("Cộng đồng HN");
    expect(msg).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli"], BASE_URL);
    expect(msg).toContain("🌐 Web UI");
    expect(msg).toContain("RSS");
    expect(msg).toContain(`${BASE_URL}/feed.xml`);
  });

  it("uses markdown links instead of HTML", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL);
    expect(msg).not.toContain("<a href=");
    expect(msg).not.toContain("<b>");
    expect(msg).toContain("**agents-radar");
    expect(msg).toContain(`[Công cụ AI CLI](`);
  });

  it("includes Vietnamese highlights when provided", () => {
    const highlights: Highlights = {
      vi: {
        "ai-cli": ["Claude Code phát hành v1.2.0", "Gemini CLI sửa lỗi streaming"],
        "ai-agents": ["OpenClaw thêm hỗ trợ MCP"],
      },
      en: {
        "ai-cli": ["Claude Code releases v1.2.0"],
      },
    };
    const msg = buildFeishuMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      BASE_URL,
      highlights,
    );
    expect(msg).toContain("◦ Claude Code phát hành v1.2.0");
    expect(msg).toContain("◦ Gemini CLI sửa lỗi streaming");
    expect(msg).toContain("◦ OpenClaw thêm hỗ trợ MCP");
  });

  it("falls back to en highlights and ignores legacy zh", () => {
    const legacy: LegacyHighlights = {
      zh: { "ai-cli": ["Claude Code 发布 v1.2.0"] },
      en: { "ai-cli": ["Claude Code releases v1.2.0"] },
    };
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, legacy);
    expect(msg).toContain("◦ Claude Code releases v1.2.0");
    expect(msg).not.toContain("◦ Claude Code 发布 v1.2.0");
  });

  it("works without highlights", () => {
    const msg = buildFeishuMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, null);
    expect(msg).toContain("Công cụ AI CLI");
    expect(msg).not.toContain("◦");
  });
});

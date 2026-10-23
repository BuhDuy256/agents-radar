import { describe, it, expect, afterEach } from "vitest";
import { buildMessage, type Highlights, type LegacyHighlights } from "../notify.ts";

const BASE_URL = "https://example.com/radar";

describe("buildMessage", () => {
  const origPagesUrl = process.env["PAGES_URL"];

  afterEach(() => {
    if (origPagesUrl !== undefined) {
      process.env["PAGES_URL"] = origPagesUrl;
    } else {
      delete process.env["PAGES_URL"];
    }
  });

  it("builds a daily message with vi + en reports", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"], BASE_URL);
    expect(msg).toContain("agents-radar");
    expect(msg).toContain("2026-03-09");
    expect(msg).toContain("📡");
    // vi links — the default file has no suffix
    expect(msg).toContain(`${BASE_URL}/#2026-03-09/ai-cli`);
    expect(msg).toContain("Công cụ AI CLI");
    // en links
    expect(msg).toContain(`${BASE_URL}/#2026-03-09/ai-cli-en`);
    expect(msg).toContain("AI CLI Tools");
  });

  it("renders vi-only reports without en link", () => {
    const msg = buildMessage("2026-03-09", ["ai-hn"], BASE_URL);
    expect(msg).toContain("Cộng đồng HN");
    expect(msg).not.toContain("HN Community");
  });

  it("includes Web UI and RSS links", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL);
    expect(msg).toContain("🌐 Web UI");
    expect(msg).toContain("RSS");
    expect(msg).toContain(`${BASE_URL}/feed.xml`);
  });

  it("strips trailing slash from pagesUrl", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL + "/");
    expect(msg).not.toContain("//feed.xml");
    expect(msg).toContain(`${BASE_URL}/feed.xml`);
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
    const msg = buildMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      BASE_URL,
      highlights,
    );
    expect(msg).toContain("◦ Claude Code phát hành v1.2.0");
    expect(msg).toContain("◦ Gemini CLI sửa lỗi streaming");
    expect(msg).toContain("◦ OpenClaw thêm hỗ trợ MCP");
  });

  it("falls back to en highlights when a report's vi is missing", () => {
    // Mirrors the 2026-07-13 incident: the translation failed, leaving vi empty
    // while en was populated. The message must still render bullets.
    const highlights: Highlights = {
      vi: {},
      en: {
        "ai-cli": ["Claude Code releases v1.2.0"],
        "ai-agents": ["OpenClaw adds MCP support"],
      },
    };
    const msg = buildMessage(
      "2026-03-09",
      ["ai-cli", "ai-cli-en", "ai-agents", "ai-agents-en"],
      BASE_URL,
      highlights,
    );
    expect(msg).toContain("◦ Claude Code releases v1.2.0");
    expect(msg).toContain("◦ OpenClaw adds MCP support");
  });

  it("prefers vi highlights over en when both present", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Claude Code phát hành v1.2.0"] },
      en: { "ai-cli": ["Claude Code releases v1.2.0"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, highlights);
    expect(msg).toContain("◦ Claude Code phát hành v1.2.0");
    expect(msg).not.toContain("◦ Claude Code releases v1.2.0");
  });

  it("ignores legacy zh highlights and uses en instead", () => {
    const legacy: LegacyHighlights = {
      zh: { "ai-cli": ["Claude Code 发布 v1.2.0"] },
      en: { "ai-cli": ["Claude Code releases v1.2.0"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, legacy);
    expect(msg).toContain("◦ Claude Code releases v1.2.0");
    expect(msg).not.toContain("◦ Claude Code 发布 v1.2.0");
  });

  it("works without highlights (null)", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, null);
    expect(msg).toContain("Công cụ AI CLI");
    expect(msg).not.toContain("◦");
  });

  it("works without highlights (undefined)", () => {
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL);
    expect(msg).toContain("Công cụ AI CLI");
    expect(msg).not.toContain("◦");
  });
});

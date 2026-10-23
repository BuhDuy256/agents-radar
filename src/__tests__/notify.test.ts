import { describe, it, expect, afterEach } from "vitest";
import { buildMessage, TELEGRAM_MAX_CHARS, type Highlights, type LegacyHighlights } from "../notify.ts";

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

  it("builds a Vietnamese-only message with one link per section", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Claude Code thêm chế độ song song", "Gemini CLI sửa lỗi streaming"] },
      en: { "ai-cli": ["Claude Code adds parallel mode"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, highlights);

    expect(msg).toContain("📡 Bản tin công nghệ · 2026-03-09");
    expect(msg).toContain("🛠 Công cụ AI");
    expect(msg).toContain("• Claude Code thêm chế độ song song");
    expect(msg).toContain(`<a href="${BASE_URL}/#2026-03-09/ai-cli">Đọc chi tiết</a>`);
    // No second (English) link and no English label in the chat message.
    expect(msg).not.toContain("ai-cli-en");
    expect(msg).not.toContain("Read more");
  });

  it("uses the section heading for each report", () => {
    const highlights: Highlights = {
      vi: {
        "ai-trending": ["Repo X tăng nhanh"],
        "ai-hn": ["Một sự kiện cụ thể"],
        "ai-web": ["Anthropic công bố mô hình mới"],
        "ai-community": ["Một bài học cụ thể"],
      },
      en: {},
    };
    const msg = buildMessage(
      "2026-03-09",
      ["ai-trending", "ai-hn", "ai-web", "ai-community"],
      BASE_URL,
      highlights,
    );
    expect(msg).toContain("⭐ Open-source đáng thử");
    expect(msg).toContain("📰 Tin công nghệ");
    expect(msg).toContain("📢 Tin chính thức");
    expect(msg).toContain("💬 Kinh nghiệm cộng đồng");
  });

  it("only renders Tin chính thức when ai-web is published", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Một thay đổi"], "ai-web": ["Một thông báo"] },
      en: {},
    };
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL, highlights);
    expect(msg).not.toContain("📢 Tin chính thức");
    expect(msg).not.toContain("Một thông báo");
  });

  it("drops reports that are no longer published", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Một thay đổi"], "ai-agents": ["Tin cũ"], "ai-arxiv": ["Bài báo cũ"] },
      en: {},
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-agents", "ai-arxiv"], BASE_URL, highlights);
    expect(msg).not.toContain("ai-agents");
    expect(msg).not.toContain("ai-arxiv");
    expect(msg).not.toContain("Tin cũ");
    expect(msg).not.toContain("Bài báo cũ");
  });

  it("skips sections without highlights instead of sending an empty heading", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Một thay đổi"], "ai-hn": [] },
      en: {},
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-hn"], BASE_URL, highlights);
    expect(msg).toContain("🛠 Công cụ AI");
    expect(msg).not.toContain("📰 Tin công nghệ");
  });

  it("caps a section at three highlights", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Một", "Hai", "Ba", "Bốn", "Năm"] },
      en: {},
    };
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL, highlights);
    expect(msg).toContain("• Một");
    expect(msg).toContain("• Ba");
    expect(msg).not.toContain("• Bốn");
    expect(msg).not.toContain("• Năm");
  });

  it("escapes HTML in highlights", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Fix <script> & more"] },
      en: {},
    };
    const msg = buildMessage("2026-03-09", ["ai-cli"], BASE_URL, highlights);
    expect(msg).toContain("Fix &lt;script&gt; &amp; more");
  });

  it("falls back to en highlights when a report's vi is missing", () => {
    // Mirrors the 2026-07-13 incident: the translation failed, leaving vi empty
    // while en was populated. The message must still render bullets.
    const highlights: Highlights = {
      vi: {},
      en: { "ai-cli": ["Claude Code releases v1.2.0"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, highlights);
    expect(msg).toContain("• Claude Code releases v1.2.0");
  });

  it("prefers vi highlights over en when both present", () => {
    const highlights: Highlights = {
      vi: { "ai-cli": ["Claude Code phát hành v1.2.0"] },
      en: { "ai-cli": ["Claude Code releases v1.2.0"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, highlights);
    expect(msg).toContain("• Claude Code phát hành v1.2.0");
    expect(msg).not.toContain("• Claude Code releases v1.2.0");
  });

  it("ignores legacy zh highlights and uses en instead", () => {
    const legacy: LegacyHighlights = {
      zh: { "ai-cli": ["Claude Code 发布 v1.2.0"] },
      en: { "ai-cli": ["Claude Code releases v1.2.0"] },
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, legacy);
    expect(msg).toContain("• Claude Code releases v1.2.0");
    expect(msg).not.toContain("Claude Code 发布 v1.2.0");
  });

  it("returns an empty message without highlights (null)", () => {
    expect(buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL, null)).toBe("");
  });

  it("returns an empty message without highlights (undefined)", () => {
    expect(buildMessage("2026-03-09", ["ai-cli", "ai-cli-en"], BASE_URL)).toBe("");
  });

  it("drops whole highlights from the end to fit the length cap", () => {
    const long = "Đây là một câu tin rất dài để chiếm chỗ trong tin nhắn Telegram. ".repeat(3);
    const highlights: Highlights = {
      vi: {
        "ai-cli": [long, `${long}hai`, `${long}ba`],
        "ai-hn": [`${long}bốn`],
        "ai-community": [`${long}năm`],
      },
      en: {},
    };
    const msg = buildMessage("2026-03-09", ["ai-cli", "ai-hn", "ai-community"], BASE_URL, highlights);

    expect(msg.length).toBeLessThanOrEqual(TELEGRAM_MAX_CHARS);
    // Every remaining section link is complete — no mid-HTML cut.
    const links = msg.match(/<a href="[^"]+">Đọc chi tiết<\/a>/g) ?? [];
    expect(links.length).toBeGreaterThan(0);
    expect(msg.endsWith("</a>")).toBe(true);
  });
});

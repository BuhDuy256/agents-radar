import { afterEach, describe, expect, it, vi } from "vitest";
import { collectDiscussions, discussionForPrompt, type Discussion } from "../problem-sources.ts";

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Mock every outbound request. GitHub is skipped (no token), Stack Exchange
 * returns one money question, and Hacker News returns one Ask HN story plus its
 * comment tree.
 */
function mockFetch(): void {
  vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
    const url = String(input);

    if (url.includes("api.stackexchange.com") && url.includes("/questions/")) {
      // answers batch
      return jsonResponse({
        items: [{ question_id: 55, body: "<p>Use a spreadsheet.</p>", score: 9, is_accepted: true }],
      });
    }
    if (url.includes("api.stackexchange.com") && url.includes("site=money")) {
      return jsonResponse({
        items: [
          {
            question_id: 55,
            title: "How to track freelance income across platforms?",
            link: "https://money.stackexchange.com/questions/55",
            body: "<p>I earn on several platforms and reconciling totals by hand is painful.</p>",
            tags: ["income", "freelance"],
            score: 42,
            answer_count: 3,
            creation_date: 1_790_000_000,
          },
        ],
      });
    }
    if (url.includes("api.stackexchange.com")) {
      // Other Stack Exchange sites (stackoverflow, startups) return nothing here.
      return jsonResponse({ items: [] });
    }
    if (url.includes("hn.algolia.com/api/v1/search")) {
      return jsonResponse({
        hits: [
          {
            objectID: "9001",
            title: "Ask HN: How do you handle inventory for a tiny shop?",
            story_text: "I run a small store and tracking stock in a spreadsheet keeps breaking.",
            points: 120,
            num_comments: 45,
            created_at: "2026-09-01T00:00:00.000Z",
          },
        ],
      });
    }
    if (url.includes("hn.algolia.com/api/v1/items/")) {
      return jsonResponse({
        children: [
          { text: "I gave up and switched to a paid tool after months of pain.", points: 20 },
          { text: "short", points: 50 },
        ],
      });
    }
    throw new Error(`unexpected fetch: ${url}`);
  });
}

describe("collectDiscussions", () => {
  const original = process.env["GITHUB_TOKEN"];
  afterEach(() => {
    vi.restoreAllMocks();
    if (original === undefined) delete process.env["GITHUB_TOKEN"];
    else process.env["GITHUB_TOKEN"] = original;
  });

  it("parses Stack Exchange and Hacker News into normalized discussions", async () => {
    delete process.env["GITHUB_TOKEN"]; // skip GitHub so the test is network-free
    mockFetch();

    const { discussions, sourceCounts, emptySources } = await collectDiscussions();

    const se = discussions.find((d) => d.source === "stackexchange");
    expect(se).toBeDefined();
    expect(se!.url).toBe("https://money.stackexchange.com/questions/55");
    expect(se!.body).toContain("reconciling totals by hand");
    expect(se!.comments[0]).toContain("spreadsheet"); // top answer as workaround

    const hn = discussions.find((d) => d.source === "hackernews");
    expect(hn).toBeDefined();
    expect(hn!.url).toBe("https://news.ycombinator.com/item?id=9001");
    // The 1-word comment is dropped (< 20 chars); the substantive one is kept.
    expect(hn!.comments).toHaveLength(1);
    expect(hn!.comments[0]).toContain("switched to a paid tool");

    expect(sourceCounts.github).toBe(0);
    expect(emptySources).toContain("GitHub Issues");
  });

  it("filters out discussions already seen in a previous run", async () => {
    delete process.env["GITHUB_TOKEN"];
    mockFetch();

    const seen = new Set(["hackernews:9001", "stackexchange:money:55"]);
    const { discussions } = await collectDiscussions(seen);
    expect(discussions).toHaveLength(0);
  });
});

describe("discussionForPrompt", () => {
  it("includes the ref, title, URL and body, and labels replies", () => {
    const d: Discussion = {
      key: "hackernews:1",
      source: "hackernews",
      sourceLabel: "Hacker News (Ask HN)",
      domainHint: "business",
      title: "Ask HN: inventory woes",
      url: "https://news.ycombinator.com/item?id=1",
      body: "Stock tracking breaks constantly.",
      comments: ["I switched tools."],
      tags: [],
      score: 30,
      createdAt: "2026-09-01T00:00:00.000Z",
    };
    const text = discussionForPrompt(d, "D1");
    expect(text).toContain("### D1");
    expect(text).toContain("https://news.ycombinator.com/item?id=1");
    expect(text).toContain("Stock tracking breaks constantly.");
    expect(text).toContain("Top replies");
  });
});

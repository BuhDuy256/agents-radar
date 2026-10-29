import { describe, expect, it } from "vitest";
import {
  buildReportBody,
  evidenceStrength,
  resolveProblems,
  type ResolvedProblem,
} from "../problem-discovery.ts";
import type { Discussion } from "../problem-sources.ts";
import type { ProblemGroup } from "../problem-prompts.ts";

function disc(overrides: Partial<Discussion> = {}): Discussion {
  return {
    key: overrides.key ?? "hackernews:1",
    source: overrides.source ?? "hackernews",
    sourceLabel: overrides.sourceLabel ?? "Hacker News (Ask HN)",
    domainHint: overrides.domainHint ?? "finance",
    title: overrides.title ?? "How do you reconcile payouts?",
    url: overrides.url ?? "https://news.ycombinator.com/item?id=1",
    body: overrides.body ?? "I spend hours matching payouts to invoices.",
    comments: overrides.comments ?? [],
    tags: overrides.tags ?? [],
    score: overrides.score ?? 10,
    createdAt: overrides.createdAt ?? "2026-10-01T00:00:00.000Z",
  };
}

function byRefOf(discussions: Discussion[]): Map<string, Discussion> {
  const m = new Map<string, Discussion>();
  discussions.forEach((d, i) => m.set(`D${i + 1}`, d));
  return m;
}

describe("evidenceStrength", () => {
  it("maps distinct-source counts to the three buckets", () => {
    expect(evidenceStrength([])).toBe("insufficient");
    expect(evidenceStrength([disc()])).toBe("single");
    expect(evidenceStrength([disc({ url: "https://a" }), disc({ url: "https://b" })])).toBe("multiple");
  });
});

describe("resolveProblems", () => {
  const d1 = disc({ key: "k1", url: "https://example.com/1", domainHint: "finance" });
  const d2 = disc({ key: "k2", url: "https://example.com/2", domainHint: "finance" });
  const byRef = byRefOf([d1, d2]);

  it("drops problems whose refs do not resolve to a real discussion", () => {
    const groups: ProblemGroup[] = [
      {
        title: "Fabricated",
        affectedUsers: "x",
        description: "y",
        workarounds: "",
        softwareRelevance: "",
        domain: "finance",
        refs: ["D99"], // not in byRef
      },
    ];
    expect(resolveProblems(groups, byRef)).toEqual([]);
  });

  it("keeps grounded problems, resolves evidence, and ranks by evidence count", () => {
    const groups: ProblemGroup[] = [
      {
        title: "Single",
        affectedUsers: "a",
        description: "b",
        workarounds: "",
        softwareRelevance: "",
        domain: "finance",
        refs: ["D1"],
      },
      {
        title: "Multiple",
        affectedUsers: "a",
        description: "b",
        workarounds: "",
        softwareRelevance: "",
        domain: "finance",
        refs: ["D1", "D2"],
      },
    ];
    const resolved = resolveProblems(groups, byRef);
    expect(resolved.map((p) => p.title)).toEqual(["Multiple", "Single"]); // strongest first
    expect(resolved[0]!.strength).toBe("multiple");
    expect(resolved[0]!.evidence.map((e) => e.url)).toEqual([
      "https://example.com/1",
      "https://example.com/2",
    ]);
    expect(resolved[1]!.strength).toBe("single");
  });

  it("dedupes evidence by URL and ignores invalid refs mixed with valid ones", () => {
    const groups: ProblemGroup[] = [
      {
        title: "P",
        affectedUsers: "a",
        description: "b",
        workarounds: "",
        softwareRelevance: "",
        domain: "finance",
        refs: ["D1", "D1", "D404"],
      },
    ];
    const resolved = resolveProblems(groups, byRef);
    expect(resolved).toHaveLength(1);
    expect(resolved[0]!.evidence).toHaveLength(1);
    expect(resolved[0]!.refs).toEqual(["D1", "D1"]); // invalid ref removed, valid kept
  });
});

describe("buildReportBody", () => {
  function resolved(title: string, domain: Discussion["domainHint"], urls: string[]): ResolvedProblem {
    const evidence = urls.map((u, i) => disc({ url: u, key: `k${i}`, title: `src ${i}` }));
    return {
      title,
      affectedUsers: "freelancers",
      description: "They reconcile income by hand.",
      workarounds: "Spreadsheets.",
      softwareRelevance: "Software could possibly consolidate transactions.",
      domain,
      refs: urls.map((_, i) => `D${i + 1}`),
      evidence,
      strength: evidence.length >= 2 ? "multiple" : "single",
    };
  }

  it("renders a grounded report whose links are all real evidence URLs", () => {
    const problems = [
      resolved("Payment reconciliation", "finance", ["https://ex.com/a", "https://ex.com/b"]),
      resolved("Flaky CI", "software", ["https://ex.com/c"]),
    ];
    const body = buildReportBody(problems, 20, []);

    // Domain headers present.
    expect(body).toContain("## Finance");
    expect(body).toContain("## Software Development");
    // Required fields present.
    expect(body).toContain("**Affected Users:**");
    expect(body).toContain("**Evidence:**");
    expect(body).toContain("**Evidence Strength:** Multiple independent observations");

    // Grounding: every markdown link URL appears in the evidence set.
    const linkUrls = [...body.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((m) => m[1]);
    const allowed = new Set(["https://ex.com/a", "https://ex.com/b", "https://ex.com/c"]);
    expect(linkUrls.length).toBeGreaterThan(0);
    for (const u of linkUrls) expect(allowed.has(u!)).toBe(true);
  });

  it("writes an explicit empty-report notice when no problem qualified", () => {
    const body = buildReportBody([], 12, ["Hacker News"]);
    expect(body).toContain("No concrete");
    expect(body).toContain("12 discussions");
  });

  it("adds a coverage note when a source returned nothing", () => {
    const problems = [resolved("P", "software", ["https://ex.com/a"])];
    const body = buildReportBody(problems, 5, ["Stack Exchange"]);
    expect(body).toContain("Coverage note");
    expect(body).toContain("Stack Exchange");
  });
});

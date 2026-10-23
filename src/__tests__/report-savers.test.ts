import { describe, it, expect } from "vitest";
import { LANGS, reportFileName } from "../report-savers.ts";

describe("reportFileName", () => {
  it("writes the primary language to the bare file name", () => {
    expect(reportFileName("ai-cli", "vi")).toBe("ai-cli.md");
    expect(reportFileName("ai-hn", "vi")).toBe("ai-hn.md");
  });

  it("keeps the -en suffix for English", () => {
    expect(reportFileName("ai-cli", "en")).toBe("ai-cli-en.md");
    expect(reportFileName("ai-hn", "en")).toBe("ai-hn-en.md");
  });

  it("lists Vietnamese before English", () => {
    expect([...LANGS]).toEqual(["vi", "en"]);
  });
});

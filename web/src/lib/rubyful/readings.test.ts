import { describe, expect, it } from "vitest";
import {
  buildPlainEntries,
  buildReadingEntries,
  parseReadingEntry,
} from "./readings";

describe("parseReadingEntry", () => {
  it("漢字の直後の [ ] を読みとして分解する", () => {
    expect(parseReadingEntry("記者[きしゃ]の方[かた]")).toEqual([
      { text: "記者", reading: "きしゃ" },
      { text: "の" },
      { text: "方", reading: "かた" },
    ]);
  });

  it("かなだけの部分は読みなし", () => {
    expect(parseReadingEntry("石毛[いしげ] かずあき")).toEqual([
      { text: "石毛", reading: "いしげ" },
      { text: " かずあき" },
    ]);
  });
});

describe("buildReadingEntries", () => {
  it("空白を含む語は空白なしでも一致する", () => {
    const surfaces = buildReadingEntries(["石毛[いしげ] かずあき"]).map(
      (e) => e.surface
    );
    expect(surfaces).toContain("石毛 かずあき");
    expect(surfaces).toContain("石毛かずあき");
  });

  it("長い語を先に並べる", () => {
    const entries = buildReadingEntries([
      "障[しょう]がい",
      "障[しょう]がい者[しゃ]",
    ]);
    expect(entries[0].surface).toBe("障がい者");
  });
});

describe("buildPlainEntries", () => {
  it("読みなしの1部品になる", () => {
    expect(buildPlainEntries(["山田太郎"])).toEqual([
      { surface: "山田太郎", parts: [{ text: "山田太郎" }] },
    ]);
  });
});

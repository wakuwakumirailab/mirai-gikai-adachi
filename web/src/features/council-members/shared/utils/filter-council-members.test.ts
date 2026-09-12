import { describe, expect, it } from "vitest";
import type { CouncilMember } from "../types";
import { filterCouncilMembers } from "./filter-council-members";

const members: CouncilMember[] = [
  {
    id: "1",
    name: "山田太郎",
    faction: { id: "f1", name: "jimin", display_name: "自民党" },
    committees: [{ id: "c1", name: "総務委員会" }],
  },
  {
    id: "2",
    name: "田中花子",
    faction: { id: "f2", name: "komei", display_name: "公明党" },
    committees: [
      { id: "c1", name: "総務委員会" },
      { id: "c2", name: "厚生委員会" },
    ],
  },
  {
    id: "3",
    name: "佐藤次郎",
    faction: null,
    committees: [],
  },
];

describe("filterCouncilMembers", () => {
  it("returns all members when filters are empty", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionIds: new Set(),
      committeeIds: new Set(),
    });
    expect(result).toHaveLength(3);
  });

  it("filters by name keyword (partial match)", () => {
    const result = filterCouncilMembers(members, {
      keyword: "田",
      factionIds: new Set(),
      committeeIds: new Set(),
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎", "田中花子"]);
  });

  it("trims whitespace in the keyword", () => {
    const result = filterCouncilMembers(members, {
      keyword: "  山田太郎  ",
      factionIds: new Set(),
      committeeIds: new Set(),
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎"]);
  });

  it("filters by a single faction id", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionIds: new Set(["f2"]),
      committeeIds: new Set(),
    });
    expect(result.map((m) => m.name)).toEqual(["田中花子"]);
  });

  it("matches any of multiple selected faction ids (OR)", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionIds: new Set(["f1", "f2"]),
      committeeIds: new Set(),
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎", "田中花子"]);
  });

  it("excludes members with no faction when a faction filter is active", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionIds: new Set(["f1"]),
      committeeIds: new Set(),
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎"]);
  });

  it("filters by a single committee id", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionIds: new Set(),
      committeeIds: new Set(["c2"]),
    });
    expect(result.map((m) => m.name)).toEqual(["田中花子"]);
  });

  it("matches a member belonging to any of multiple selected committees (OR)", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionIds: new Set(),
      committeeIds: new Set(["c1"]),
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎", "田中花子"]);
  });

  it("combines keyword, faction and committee filters", () => {
    const result = filterCouncilMembers(members, {
      keyword: "田中",
      factionIds: new Set(["f2"]),
      committeeIds: new Set(["c1"]),
    });
    expect(result.map((m) => m.name)).toEqual(["田中花子"]);
  });

  it("returns an empty array when nothing matches", () => {
    const result = filterCouncilMembers(members, {
      keyword: "存在しない",
      factionIds: new Set(),
      committeeIds: new Set(),
    });
    expect(result).toEqual([]);
  });
});

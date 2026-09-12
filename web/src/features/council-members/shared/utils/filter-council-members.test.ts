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
  it("returns all members when filters are empty/all", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionId: "all",
      committeeId: "all",
    });
    expect(result).toHaveLength(3);
  });

  it("filters by name keyword (partial match)", () => {
    const result = filterCouncilMembers(members, {
      keyword: "田",
      factionId: "all",
      committeeId: "all",
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎", "田中花子"]);
  });

  it("trims whitespace in the keyword", () => {
    const result = filterCouncilMembers(members, {
      keyword: "  山田太郎  ",
      factionId: "all",
      committeeId: "all",
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎"]);
  });

  it("filters by faction id", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionId: "f2",
      committeeId: "all",
    });
    expect(result.map((m) => m.name)).toEqual(["田中花子"]);
  });

  it("excludes members with no faction when a faction filter is active", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionId: "f1",
      committeeId: "all",
    });
    expect(result.map((m) => m.name)).toEqual(["山田太郎"]);
  });

  it("filters by committee id", () => {
    const result = filterCouncilMembers(members, {
      keyword: "",
      factionId: "all",
      committeeId: "c2",
    });
    expect(result.map((m) => m.name)).toEqual(["田中花子"]);
  });

  it("combines keyword, faction and committee filters", () => {
    const result = filterCouncilMembers(members, {
      keyword: "田中",
      factionId: "f2",
      committeeId: "c1",
    });
    expect(result.map((m) => m.name)).toEqual(["田中花子"]);
  });

  it("returns an empty array when nothing matches", () => {
    const result = filterCouncilMembers(members, {
      keyword: "存在しない",
      factionId: "all",
      committeeId: "all",
    });
    expect(result).toEqual([]);
  });
});

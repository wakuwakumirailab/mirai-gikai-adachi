import { describe, expect, it } from "vitest";
import { mapFactionStances } from "./map-faction-stances";

describe("mapFactionStances", () => {
  it("会派情報を表示用の形に整形する", () => {
    const result = mapFactionStances([
      {
        id: "fs-1",
        type: "for",
        comment: "賛成です",
        member_names: ["山田太郎", "鈴木花子"],
        factions: {
          id: "f-1",
          name: "miraikai",
          display_name: "未来会議",
          sort_order: 1,
        },
      },
    ]);

    expect(result).toEqual([
      {
        id: "fs-1",
        stance: "for",
        comment: "賛成です",
        memberNames: ["山田太郎", "鈴木花子"],
        faction: {
          id: "f-1",
          name: "miraikai",
          display_name: "未来会議",
          sort_order: 1,
        },
      },
    ]);
  });

  it("member_names が null の場合は空配列にする", () => {
    const result = mapFactionStances([
      {
        id: "fs-1",
        type: "for",
        comment: null,
        member_names: null,
        factions: {
          id: "f-1",
          name: "miraikai",
          display_name: "未来会議",
          sort_order: 1,
        },
      },
    ]);

    expect(result[0].memberNames).toEqual([]);
  });

  it("factions が null のレコードを除外する", () => {
    const result = mapFactionStances([
      {
        id: "fs-1",
        type: "for",
        comment: null,
        member_names: null,
        factions: null,
      },
    ]);

    expect(result).toEqual([]);
  });

  it("sort_order の昇順に並び替える", () => {
    const result = mapFactionStances([
      {
        id: "fs-1",
        type: "for",
        comment: null,
        member_names: null,
        factions: {
          id: "f-1",
          name: "b",
          display_name: "B会派",
          sort_order: 2,
        },
      },
      {
        id: "fs-2",
        type: "against",
        comment: null,
        member_names: null,
        factions: {
          id: "f-2",
          name: "a",
          display_name: "A会派",
          sort_order: 1,
        },
      },
    ]);

    expect(result.map((r) => r.id)).toEqual(["fs-2", "fs-1"]);
  });
});

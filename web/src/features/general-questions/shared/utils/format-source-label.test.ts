import { describe, expect, it } from "vitest";
import { formatSourceLabel } from "./format-source-label";

describe("formatSourceLabel", () => {
  it("日付があれば和暦の日付と第N日を入れる", () => {
    expect(
      formatSourceLabel({ session_day: 3, session_date: "2026-02-24" })
    ).toBe("本会議 令和8年2月24日（第3日）会議録");
  });

  it("令和元年は「元年」と表記する", () => {
    expect(
      formatSourceLabel({ session_day: 2, session_date: "2019-06-05" })
    ).toBe("本会議 令和元年6月5日（第2日）会議録");
  });

  it("日付がなければ第N日だけで表記する", () => {
    expect(formatSourceLabel({ session_day: 2, session_date: null })).toBe(
      "本会議（第2日）会議録"
    );
  });
});

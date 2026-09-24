import { describe, expect, it } from "vitest";
import { formatQuestionDay } from "./format-question-day";

describe("formatQuestionDay", () => {
  it("session_date があれば「M月D日」形式で返す", () => {
    expect(
      formatQuestionDay({ session_day: 3, session_date: "2026-02-24" })
    ).toBe("2月24日");
  });

  it("月・日の先頭の0は付けない", () => {
    expect(
      formatQuestionDay({ session_day: 1, session_date: "2026-09-05" })
    ).toBe("9月5日");
  });

  it("session_date が null なら「第N日」形式で返す", () => {
    expect(formatQuestionDay({ session_day: 3, session_date: null })).toBe(
      "第3日"
    );
  });

  it("session_date が未定義なら「第N日」形式で返す", () => {
    expect(formatQuestionDay({ session_day: 2 })).toBe("第2日");
  });
});

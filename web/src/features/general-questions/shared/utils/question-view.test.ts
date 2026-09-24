import { describe, expect, it } from "vitest";
import {
  buildQuestionDetailHref,
  buildSessionQuestionsHref,
  parseQuestionView,
} from "./question-view";

describe("parseQuestionView", () => {
  it("members は議員別", () => {
    expect(parseQuestionView("members")).toBe("members");
  });

  it("未指定・不明な値・配列はテーマ別", () => {
    expect(parseQuestionView(undefined)).toBe("theme");
    expect(parseQuestionView("unknown")).toBe("theme");
    expect(parseQuestionView(["members"])).toBe("theme");
  });
});

describe("buildSessionQuestionsHref", () => {
  it("テーマ別はクエリなし", () => {
    expect(buildSessionQuestionsHref("r8-1", "theme")).toBe(
      "/sessions/r8-1/questions"
    );
  });

  it("議員別は view=members を付ける", () => {
    expect(buildSessionQuestionsHref("r8-1", "members")).toBe(
      "/sessions/r8-1/questions?view=members"
    );
  });
});

describe("buildQuestionDetailHref", () => {
  it("テーマ別から来た場合はクエリなし", () => {
    expect(buildQuestionDetailHref("q1", "theme")).toBe("/questions/q1");
  });

  it("議員別から来た場合は from=members を付ける", () => {
    expect(buildQuestionDetailHref("q1", "members")).toBe(
      "/questions/q1?from=members"
    );
  });
});

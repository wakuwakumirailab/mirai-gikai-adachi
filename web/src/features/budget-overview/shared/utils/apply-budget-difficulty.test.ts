import { describe, expect, it } from "vitest";
import type { BudgetOverviewWithThemes } from "../types";
import {
  applyBudgetDetailDifficulty,
  applyBudgetOverviewDifficulty,
} from "./apply-budget-difficulty";

const overview = {
  id: "o1",
  direction: "詳しい方針",
  direction_easy: "やさしい方針",
  themes: [
    {
      id: "t1",
      ai_summary: "詳しい要約",
      ai_summary_easy: "やさしい要約",
      initiatives: [
        {
          id: "i1",
          description: "詳しい説明",
          description_easy: "やさしい説明",
        },
        { id: "i2", description: "詳しい説明のみ", description_easy: null },
      ],
    },
  ],
} as unknown as BudgetOverviewWithThemes;

describe("applyBudgetDetailDifficulty", () => {
  it("ふつう（normal）では、やさしい版を使い、なければ詳しい版を使う", () => {
    const result = applyBudgetDetailDifficulty(overview, "normal");
    expect(result.direction).toBe("やさしい方針");
    expect(result.themes[0].ai_summary).toBe("やさしい要約");
    expect(result.themes[0].initiatives[0].description).toBe("やさしい説明");
    expect(result.themes[0].initiatives[1].description).toBe("詳しい説明のみ");
  });

  it("詳しく（hard）では、詳しい版をそのまま使う", () => {
    const result = applyBudgetDetailDifficulty(overview, "hard");
    expect(result.direction).toBe("詳しい方針");
    expect(result.themes[0].initiatives[0].description).toBe("詳しい説明");
  });
});

describe("applyBudgetOverviewDifficulty", () => {
  it("一覧用：ふつうではやさしい方針、詳しくでは詳しい方針", () => {
    expect(applyBudgetOverviewDifficulty(overview, "normal").direction).toBe(
      "やさしい方針"
    );
    expect(applyBudgetOverviewDifficulty(overview, "hard").direction).toBe(
      "詳しい方針"
    );
  });
});

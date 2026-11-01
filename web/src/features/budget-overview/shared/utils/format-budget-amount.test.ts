import { describe, expect, it } from "vitest";
import { formatBudgetAmount } from "./format-budget-amount";

describe("formatBudgetAmount", () => {
  it("億円と万円に分けて表示する", () => {
    expect(formatBudgetAmount(1622904)).toBe("約16億2,290万円");
    expect(formatBudgetAmount(539000)).toBe("約5億3,900万円");
  });

  it("ちょうど億円のときは万円を付けない", () => {
    expect(formatBudgetAmount(1000000)).toBe("約10億円");
  });

  it("1億円未満は万円で表示する", () => {
    expect(formatBudgetAmount(4420)).toBe("約442万円");
    expect(formatBudgetAmount(90766)).toBe("約9,077万円");
  });

  it("1万円未満は千円で表示する", () => {
    expect(formatBudgetAmount(3)).toBe("3千円");
  });

  it("0は「0円」、金額なしは null", () => {
    expect(formatBudgetAmount(0)).toBe("0円");
    expect(formatBudgetAmount(null)).toBeNull();
  });
});

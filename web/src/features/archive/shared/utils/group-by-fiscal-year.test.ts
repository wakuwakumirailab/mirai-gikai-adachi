import { describe, expect, it } from "vitest";
import { groupByFiscalYear } from "./group-by-fiscal-year";

type Item = { id: string; start_date: string };

describe("groupByFiscalYear", () => {
  it("groups items into the same fiscal year across a calendar-year boundary", () => {
    const items: Item[] = [
      { id: "1", start_date: "2025-11-25" }, // FY2025 (令和7年度)
      { id: "2", start_date: "2026-02-17" }, // FY2025 (令和7年度、暦年またぎ)
      { id: "3", start_date: "2026-05-01" }, // FY2026
    ];

    const result = groupByFiscalYear(items);

    expect(result).toHaveLength(2);
    expect(result[0].fiscalYear).toBe(2026);
    expect(result[0].items.map((i) => i.id)).toEqual(["3"]);
    expect(result[1].fiscalYear).toBe(2025);
    expect(result[1].items.map((i) => i.id)).toEqual(["1", "2"]);
  });

  it("sorts fiscal years descending", () => {
    const items: Item[] = [
      { id: "a", start_date: "2023-06-01" },
      { id: "b", start_date: "2025-06-01" },
      { id: "c", start_date: "2024-06-01" },
    ];

    const result = groupByFiscalYear(items);

    expect(result.map((g) => g.fiscalYear)).toEqual([2025, 2024, 2023]);
  });

  it("returns an empty array for an empty input", () => {
    expect(groupByFiscalYear([])).toEqual([]);
  });
});

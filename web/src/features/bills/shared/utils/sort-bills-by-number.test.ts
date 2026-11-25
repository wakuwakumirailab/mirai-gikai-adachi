import { describe, expect, it } from "vitest";
import { sortBillsByNumber } from "./sort-bills-by-number";

describe("sortBillsByNumber", () => {
  it("通常議案を番号の数値順、議員提出議案をその後に並べる", () => {
    const bills = [
      { bill_number: "議員提出第4号", status_order: 1 },
      { bill_number: "第104号", status_order: 1 },
      { bill_number: "第78号", status_order: 1 },
      { bill_number: "第9号", status_order: 1 },
      { bill_number: "議員提出第3号", status_order: 1 },
    ];
    expect(sortBillsByNumber(bills).map((b) => b.bill_number)).toEqual([
      "第9号",
      "第78号",
      "第104号",
      "議員提出第3号",
      "議員提出第4号",
    ]);
  });

  it("ステータス順を優先する", () => {
    const bills = [
      { bill_number: "第1号", status_order: 2 },
      { bill_number: "第9号", status_order: 1 },
    ];
    expect(sortBillsByNumber(bills).map((b) => b.bill_number)).toEqual([
      "第9号",
      "第1号",
    ]);
  });
});

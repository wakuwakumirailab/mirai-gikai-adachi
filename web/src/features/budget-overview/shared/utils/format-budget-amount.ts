/**
 * 予算額（千円単位）を、読みやすい表記に直す。
 * 例）1,622,904 → 「約16億2,290万円」、539,000 → 「約5億3,900万円」、4,420 → 「約442万円」、608 → 「約61万円」
 * 1万円未満の金額は「○千円」と書く。
 */
export function formatBudgetAmount(thousandYen: number | null): string | null {
  if (thousandYen == null) return null;
  if (thousandYen === 0) return "0円";

  const man = Math.round(thousandYen / 10); // 万円（千円→万円は÷10）
  if (man < 1) return `${thousandYen.toLocaleString("ja-JP")}千円`;

  const oku = Math.floor(man / 10000);
  const restMan = man % 10000;
  if (oku === 0) return `約${restMan.toLocaleString("ja-JP")}万円`;
  if (restMan === 0) return `約${oku.toLocaleString("ja-JP")}億円`;
  return `約${oku.toLocaleString("ja-JP")}億${restMan.toLocaleString("ja-JP")}万円`;
}

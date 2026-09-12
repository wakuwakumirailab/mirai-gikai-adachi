import { getFiscalYear } from "@/lib/utils/date";

export type FiscalYearGroup<T> = {
  /** 会計年度（4月始まり）の開始年 */
  fiscalYear: number;
  items: T[];
};

/**
 * start_date を持つ項目を会計年度（4月始まり）でグループ化する（新しい年度順）。
 * 「過去の資料」ページで、定例会・予算のどちらも同じ年度単位で
 * まとめて表示するために使う。
 */
export function groupByFiscalYear<T extends { start_date: string }>(
  items: T[]
): FiscalYearGroup<T>[] {
  const map = new Map<number, T[]>();

  for (const item of items) {
    const fiscalYear = getFiscalYear(item.start_date);
    const existing = map.get(fiscalYear);
    if (existing) {
      existing.push(item);
    } else {
      map.set(fiscalYear, [item]);
    }
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => b - a)
    .map(([fiscalYear, groupItems]) => ({ fiscalYear, items: groupItems }));
}

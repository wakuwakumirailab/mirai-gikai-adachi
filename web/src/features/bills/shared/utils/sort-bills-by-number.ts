/**
 * 議案番号（「第78号」「議員提出第4号」など）から並び替え用のキーを作る。
 * 通常の議案 → 議員提出議案 → その他の順で、それぞれ番号の若い順。
 */
function getBillNumberSortKey(billNumber: string): [number, number] {
  const num = Number(billNumber.match(/\d+/)?.[0] ?? Number.MAX_SAFE_INTEGER);
  if (billNumber.startsWith("議員提出")) return [1, num];
  if (billNumber.startsWith("第")) return [0, num];
  return [2, num];
}

export function compareBillNumber(a: string, b: string): number {
  const [aGroup, aNum] = getBillNumberSortKey(a);
  const [bGroup, bNum] = getBillNumberSortKey(b);
  return aGroup - bGroup || aNum - bNum;
}

/** ステータス順（status_order）を保ったまま、同じステータス内を議案番号の若い順に並べる */
export function sortBillsByNumber<
  T extends { bill_number: string; status_order?: number | null },
>(bills: T[]): T[] {
  return [...bills].sort(
    (a, b) =>
      (a.status_order ?? 0) - (b.status_order ?? 0) ||
      compareBillNumber(a.bill_number, b.bill_number)
  );
}

import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { findAllBillsByCouncilSession } from "../repositories/bill-repository";

/** "第78号" → 78 のように議案番号から数値部分を取り出す。取れない場合はInfinityで末尾に回す */
function extractBillNumber(billNumber: string): number {
  const match = billNumber.match(/\d+/);
  return match ? Number(match[0]) : Number.POSITIVE_INFINITY;
}

/**
 * 会期に上程された議案を、わかりやすい解説の有無に関わらず議案番号順に取得。
 * ホームの「今回の定例会の議案」バナー用（審査前の新会期でも表示できる）。
 */
export async function getCurrentSessionBills(councilSessionId: string) {
  const bills = await _getCachedCurrentSessionBills(councilSessionId);
  return [...bills].sort(
    (a, b) =>
      extractBillNumber(a.bill_number) - extractBillNumber(b.bill_number)
  );
}

const _getCachedCurrentSessionBills = unstable_cache(
  async (councilSessionId: string) => {
    return findAllBillsByCouncilSession(councilSessionId);
  },
  ["current-session-bills"],
  {
    revalidate: 600,
    tags: [CACHE_TAGS.BILLS],
  }
);

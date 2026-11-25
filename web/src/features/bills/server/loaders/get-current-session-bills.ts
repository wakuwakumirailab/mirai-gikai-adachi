import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { compareBillNumber } from "../../shared/utils/sort-bills-by-number";
import { findAllBillsByCouncilSession } from "../repositories/bill-repository";

/**
 * 会期に上程された議案を、わかりやすい解説の有無に関わらず議案番号順に取得。
 * ホームの「今回の定例会の議案」バナー用（審査前の新会期でも表示できる）。
 */
export async function getCurrentSessionBills(councilSessionId: string) {
  const bills = await _getCachedCurrentSessionBills(councilSessionId);
  return [...bills].sort((a, b) =>
    compareBillNumber(a.bill_number, b.bill_number)
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

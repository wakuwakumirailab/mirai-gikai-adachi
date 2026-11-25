import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { compareBillNumber } from "../../shared/utils/sort-bills-by-number";
import { findProceduralBillsByCouncilSession } from "../repositories/bill-repository";

/**
 * 会期に紐づく「その他の議案」（事務手続き議案）を取得。
 * 指定管理者の指定・工事請負契約・物品購入・道路線の認定など、
 * わかりやすい解説を付けず一覧表示のみとする議案。
 */
export async function getSessionProceduralBills(councilSessionId: string) {
  return _getCachedSessionProceduralBills(councilSessionId);
}

const _getCachedSessionProceduralBills = unstable_cache(
  async (councilSessionId: string) => {
    const bills = await findProceduralBillsByCouncilSession(councilSessionId);
    // 議案番号の若い順に並べる
    return [...bills].sort((a, b) =>
      compareBillNumber(a.bill_number, b.bill_number)
    );
  },
  ["session-procedural-bills"],
  {
    revalidate: 600,
    tags: [CACHE_TAGS.BILLS],
  }
);

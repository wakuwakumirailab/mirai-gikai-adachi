import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { getJapanTime } from "@/lib/utils/date";
import type { CouncilSession } from "../../shared/types";
import { findAllPastCouncilSessions } from "../repositories/council-session-repository";

/**
 * 過去の定例会を全件取得（新しい順）
 * is_active = false かつ既に閉会済み（end_date < 今日）のものを start_date DESC で返す
 */
export async function getAllPastSessions(): Promise<CouncilSession[]> {
  const date = getJapanTime();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const targetDate = `${year}-${month}-${day}`;

  return _getCachedAllPastSessions(targetDate);
}

const _getCachedAllPastSessions = unstable_cache(
  async (targetDate: string): Promise<CouncilSession[]> => {
    return findAllPastCouncilSessions(targetDate);
  },
  ["all-past-sessions"],
  {
    revalidate: 3600,
    tags: [CACHE_TAGS.COUNCIL_SESSIONS],
  }
);

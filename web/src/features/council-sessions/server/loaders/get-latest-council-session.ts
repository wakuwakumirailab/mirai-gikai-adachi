import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { CouncilSession } from "../../shared/types";
import { findLatestStartedCouncilSession } from "../repositories/council-session-repository";

/**
 * 指定日時点で、すでに開会した直近の定例会を取得
 * 閉会中のホームで、最新の議会の内容を表示するために使う
 */
export async function getLatestCouncilSession(
  date: Date
): Promise<CouncilSession | null> {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return _getCachedLatestCouncilSession(`${year}-${month}-${day}`);
}

const _getCachedLatestCouncilSession = unstable_cache(
  async (targetDate: string): Promise<CouncilSession | null> => {
    return findLatestStartedCouncilSession(targetDate);
  },
  ["latest-council-session"],
  {
    revalidate: 3600,
    tags: [CACHE_TAGS.COUNCIL_SESSIONS],
  }
);

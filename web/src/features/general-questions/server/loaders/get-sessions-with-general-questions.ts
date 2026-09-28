import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { getJapanTime } from "@/lib/utils/date";
import type { CouncilSession } from "@/features/council-sessions/shared/types";
import { findAllSessionsWithGeneralQuestions } from "../repositories/general-questions-repository";

/**
 * 公開済みの一般質問があり、既に閉会済みの会期を新しい順に取得（過去の資料一覧用）
 */
export async function getSessionsWithGeneralQuestions(): Promise<
  CouncilSession[]
> {
  const date = getJapanTime();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const targetDate = `${year}-${month}-${day}`;

  return _getCachedSessionsWithGeneralQuestions(targetDate);
}

const _getCachedSessionsWithGeneralQuestions = unstable_cache(
  async (targetDate: string): Promise<CouncilSession[]> => {
    return findAllSessionsWithGeneralQuestions(targetDate);
  },
  ["sessions-with-general-questions"],
  {
    revalidate: 600,
    tags: [CACHE_TAGS.GENERAL_QUESTIONS],
  }
);

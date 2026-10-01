import { unstable_cache } from "next/cache";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { BillWithContent } from "../../shared/types";
import {
  findBillContentByDifficulty,
  findPublishedBillById,
} from "../repositories/bill-repository";

/**
 * 公開済みの請願・陳情（bill_type = petition）を1件取得。
 * 議案（bill_type = bill）は対象外。
 */
export async function getPetitionById(
  id: string
): Promise<BillWithContent | null> {
  const difficultyLevel = await getDifficultyLevel();
  return _getCachedPetitionById(id, difficultyLevel);
}

const _getCachedPetitionById = unstable_cache(
  async (
    id: string,
    difficultyLevel: DifficultyLevelEnum
  ): Promise<BillWithContent | null> => {
    const bill = await findPublishedBillById(id);

    if (!bill || bill.bill_type !== "petition") {
      return null;
    }

    const billContent = await findBillContentByDifficulty(id, difficultyLevel);

    return {
      ...bill,
      bill_content: billContent || undefined,
      tags: [],
    };
  },
  ["petition-by-id"],
  {
    revalidate: 600,
    tags: [CACHE_TAGS.BILLS],
  }
);

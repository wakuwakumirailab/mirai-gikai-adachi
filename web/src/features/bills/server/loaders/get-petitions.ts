import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { findAllPublishedPetitions } from "../repositories/bill-repository";

/**
 * 公開済みの請願・陳情を新しい順に取得。
 * 継続審査中のものを含め、会期をまたいだ全件をまとめて返す。
 */
export async function getPetitions() {
  return _getCachedPetitions();
}

const _getCachedPetitions = unstable_cache(
  async () => {
    return findAllPublishedPetitions();
  },
  ["petitions"],
  {
    revalidate: 600,
    tags: [CACHE_TAGS.BILLS],
  }
);

import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { findAllPublishedPetitions } from "../repositories/bill-repository";

/**
 * 公開済みの請願・陳情を受理番号の新しい順（08-27, 08-26, ... 05-7）に取得。
 * 継続審査中のものを含め、会期をまたいだ全件をまとめて返す。
 */
export async function getPetitions() {
  const petitions = await _getCachedPetitions();
  return [...petitions].sort((a, b) =>
    (b.bill_number ?? "").localeCompare(a.bill_number ?? "", "ja", {
      numeric: true,
    })
  );
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

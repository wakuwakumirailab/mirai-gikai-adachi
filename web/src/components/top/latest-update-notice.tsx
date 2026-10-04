import Link from "next/link";
import { formatJapaneseDate } from "@/features/committee-minutes/shared/utils/format-japanese-date";
import { getLatestUpdateDate } from "@/features/release-notes/shared/release-notes";

/** ホームの最上部に出す「最終更新日」。更新情報ページへのリンクを兼ねる */
export function LatestUpdateNotice() {
  const latest = getLatestUpdateDate();
  if (!latest) return null;

  return (
    <div className="w-full bg-mirai-surface-muted px-4 pb-2 text-center">
      <Link
        href="/release-notes"
        className="text-xs text-mirai-text-secondary underline underline-offset-2 hover:text-primary-accent"
      >
        最終更新：{formatJapaneseDate(latest)}（更新情報）
      </Link>
    </div>
  );
}

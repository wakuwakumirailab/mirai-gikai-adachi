import "server-only";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Wallet } from "lucide-react";
import type { BudgetOverviewWithThemes } from "../../shared/types";

type BudgetOverviewDetailProps = {
  overview: BudgetOverviewWithThemes;
  sessionSlug: string;
};

export function BudgetOverviewDetail({
  overview,
  sessionSlug,
}: BudgetOverviewDetailProps) {
  return (
    <div>
      {/* ナビゲーション */}
      <Link
        href={`/budget/${sessionSlug}`}
        className="inline-flex items-center gap-1 text-sm text-mirai-text-muted hover:text-mirai-text mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        予算一覧に戻る
      </Link>

      {/* ヘッダー */}
      <header className="mb-6 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
          <Wallet className="size-3.5" />
          令和8年度 重点施策
        </span>
        <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
          {overview.department_name}
        </h1>

        {overview.direction && (
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            {overview.direction}
          </p>
        )}

        {overview.source_url && (
          <Link
            href={overview.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1 text-xs text-mirai-text-secondary hover:text-mirai-text"
          >
            <ExternalLink className="w-3 h-3" />
            予算書PDF（足立区公式サイト）
          </Link>
        )}
      </header>
    </div>
  );
}

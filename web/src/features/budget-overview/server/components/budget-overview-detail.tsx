import "server-only";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Wallet } from "lucide-react";
import {
  CATEGORY_ICON,
  CATEGORY_STYLE,
  DEFAULT_STYLE,
} from "@/lib/category-visual";
import type { BudgetOverviewWithThemes } from "../../shared/types";
import { formatBudgetAmount } from "../../shared/utils/format-budget-amount";

type BudgetOverviewDetailProps = {
  overview: BudgetOverviewWithThemes;
  sessionSlug: string;
  /** 会期名（例：令和8年 第1回 定例会）。年度の表示に使う */
  sessionName: string;
};

function toFiscalYearLabel(sessionName: string): string {
  const match = sessionName.match(/令和(d+)年/);
  return match ? `令和${match[1]}年度` : sessionName;
}

export function BudgetOverviewDetail({
  overview,
  sessionSlug,
  sessionName,
}: BudgetOverviewDetailProps) {
  const totalLabel = formatBudgetAmount(overview.total_budget);
  const style = CATEGORY_STYLE[overview.department_name] ?? DEFAULT_STYLE;
  const Icon = CATEGORY_ICON[overview.department_name];
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
          {toFiscalYearLabel(sessionName)} 主な施策
        </span>
        <div className="flex items-center gap-3">
          {Icon && (
            <span
              aria-hidden="true"
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl shadow-sm ${style.iconBg}`}
            >
              <Icon className={`size-6 ${style.text}`} />
            </span>
          )}
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            {overview.department_name}
          </h1>
        </div>

        {overview.direction && (
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            {overview.direction}
          </p>
        )}

        {totalLabel && (
          <p className="text-xs leading-relaxed text-mirai-text-secondary">
            このページに載せている事業の予算額の合計：{totalLabel}
            （区が「主要施策」として紹介している事業の合計で、この分野の予算全体ではありません）
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
            予算編成のあらまし（足立区公式サイト・PDF）
          </Link>
        )}
      </header>
    </div>
  );
}

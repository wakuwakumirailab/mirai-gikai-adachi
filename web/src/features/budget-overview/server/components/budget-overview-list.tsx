import "server-only";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  CATEGORY_ICON,
  CATEGORY_STYLE,
  DEFAULT_STYLE,
} from "@/lib/category-visual";
import type { BudgetOverview } from "../../shared/types";
import { formatBudgetAmount } from "../../shared/utils/format-budget-amount";

type BudgetOverviewListProps = {
  overviews: BudgetOverview[];
  sessionSlug: string;
};

/**
 * 分野別のカード一覧。スマホでも2列で並べる。
 * 2列だと1枚の幅がせまいので、アイコンは小さくし、
 * 分野名・合計・説明を縦に並べて、説明は省略せずに最後まで出す。
 */
export function BudgetOverviewList({
  overviews,
  sessionSlug,
}: BudgetOverviewListProps) {
  if (overviews.length === 0) {
    return (
      <p className="text-mirai-text-muted text-center py-10">
        公開中の予算概要はありません。
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {overviews.map((overview) => {
        const style = CATEGORY_STYLE[overview.department_name] ?? DEFAULT_STYLE;
        const Icon = CATEGORY_ICON[overview.department_name];
        const totalLabel = formatBudgetAmount(overview.total_budget);

        return (
          <li key={overview.id}>
            <Link
              href={`/budget/${sessionSlug}/${overview.department_slug}`}
              className={`group flex h-full flex-col gap-2 rounded-2xl border-2 p-3 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4 ${style.card}`}
            >
              <div className="flex items-start gap-2">
                {Icon && (
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${style.iconBg}`}
                  >
                    <Icon className={`size-4 ${style.text}`} />
                  </span>
                )}
                <h2
                  className={`min-w-0 flex-1 text-base font-bold leading-snug ${style.text}`}
                >
                  {overview.department_name}
                </h2>
                <ChevronRight
                  aria-hidden="true"
                  className={`mt-1 hidden size-4 shrink-0 transition-transform group-hover:translate-x-0.5 sm:block ${style.text}`}
                />
              </div>

              {totalLabel && (
                <p className="w-fit rounded-lg bg-white/70 px-2 py-0.5 text-xs font-medium leading-snug text-mirai-text">
                  合計：{totalLabel}
                </p>
              )}

              {overview.direction && (
                <p className="text-sm leading-relaxed text-mirai-text-secondary">
                  {overview.direction}
                </p>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

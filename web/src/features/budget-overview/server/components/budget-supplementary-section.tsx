import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { YearSupplementary } from "../../shared/budget-supplementary";

type BudgetSupplementarySectionProps = {
  supplementary: YearSupplementary;
  /** ふつう（normal）ではやさしい版、詳しく（hard）では詳しい版を出す */
  difficulty: DifficultyLevelEnum;
};

/** 当初予算のあとに組まれた補正予算（一般会計）を、回ごとに並べる */
export function BudgetSupplementarySection({
  supplementary,
  difficulty,
}: BudgetSupplementarySectionProps) {
  const useEasy = difficulty === "normal";
  return (
    <section className="mb-10 flex flex-col gap-4">
      <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
        補正予算（{supplementary.fiscalYear}・一般会計）
      </h2>
      <p className="text-sm leading-relaxed text-mirai-text">
        {useEasy ? supplementary.leadEasy : supplementary.lead}
      </p>
      <ol className="flex flex-col gap-3">
        {supplementary.budgets.map((budget) => {
          const items = useEasy ? budget.itemsEasy : budget.items;
          return (
            <li
              key={budget.number}
              className="flex flex-col gap-2 rounded-2xl border border-mirai-border bg-white px-5 py-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="font-bold text-mirai-text">
                  補正予算 {budget.number}
                </h3>
                <span className="text-sm font-bold text-primary-accent">
                  {budget.amountLabel}
                </span>
              </div>
              <p className="text-xs text-mirai-text-secondary">
                {budget.meeting}
              </p>
              <p className="text-sm leading-relaxed text-mirai-text">
                {useEasy ? budget.easy : budget.detail}
              </p>
              <ul className="flex flex-col gap-1.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-mirai-text"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/bills/${budget.billId}`}
                className="mt-1 inline-flex w-fit items-center gap-0.5 text-sm font-medium text-primary-accent hover:underline"
              >
                議案の解説を見る
                <ChevronRight className="size-4" />
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="text-xs leading-relaxed text-mirai-text-secondary">
        特別会計（国民健康保険・介護保険・後期高齢者医療）の補正は、ここには含めていません。
      </p>
    </section>
  );
}

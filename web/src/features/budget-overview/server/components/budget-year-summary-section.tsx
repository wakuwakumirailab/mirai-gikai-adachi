import { ExternalLink } from "lucide-react";
import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { BudgetYearSummary } from "../../shared/budget-year-summaries";

type BudgetYearSummarySectionProps = {
  summary: BudgetYearSummary;
  /** ふつう（normal）ではやさしい版、詳しく（hard）では詳しい版を出す */
  difficulty: DifficultyLevelEnum;
};

/** 年度のトップに出す「どんな予算？」（3行まとめ、主な金額、「安心」「活力」の視点） */
export function BudgetYearSummarySection({
  summary,
  difficulty,
}: BudgetYearSummarySectionProps) {
  const useEasy = difficulty === "normal" && summary.easy;
  const lines = useEasy
    ? (summary.easy?.lines ?? summary.lines)
    : summary.lines;
  const viewpoints = useEasy
    ? (summary.easy?.viewpoints ?? summary.viewpoints)
    : summary.viewpoints;
  return (
    <div className="mb-10 flex flex-col gap-8">
      <section className="flex flex-col gap-3 rounded-2xl border border-mirai-border bg-white px-5 py-4">
        <h2 className="font-bold text-mirai-text">どんな予算？（3行まとめ）</h2>
        <ol className="flex flex-col gap-2">
          {lines.map((line, i) => (
            <li key={line} className="flex gap-2 text-sm text-mirai-text">
              <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary-accent text-white text-xs font-bold">
                {i + 1}
              </span>
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
          主な金額
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {summary.keyFigures.map((figure) => (
            <li
              key={figure.label}
              className="flex flex-col gap-1 rounded-2xl border border-mirai-border bg-white px-4 py-3"
            >
              <span className="text-xs text-mirai-text-secondary">
                {figure.label}
              </span>
              <span className="text-lg font-bold text-mirai-text">
                {figure.value}
              </span>
              <span className="text-xs leading-relaxed text-mirai-text-secondary">
                {figure.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
          予算づくりの2つの視点
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {viewpoints.map((viewpoint) => (
            <div
              key={viewpoint.title}
              className="flex flex-col gap-2 rounded-2xl bg-mirai-surface-warm px-4 py-3"
            >
              <h3 className="font-bold text-mirai-text">{viewpoint.title}</h3>
              <ul className="flex flex-col gap-1.5">
                {viewpoint.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-mirai-text"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-mirai-text-secondary">
        出典：
        <a
          href={summary.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-primary-accent"
        >
          {summary.sourceLabel}
          <ExternalLink className="size-3" />
        </a>
      </p>
    </div>
  );
}

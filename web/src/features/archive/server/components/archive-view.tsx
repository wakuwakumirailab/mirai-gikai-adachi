import "server-only";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { CouncilSession } from "@/features/council-sessions/shared/types";
import { formatSessionPeriod } from "@/features/council-sessions/shared/utils/group-sessions-by-year";
import { groupByFiscalYear } from "../../shared/utils/group-by-fiscal-year";

type Props = {
  pastSessions: CouncilSession[];
  pastBudgetSessions: CouncilSession[];
};

function toBudgetLabel(sessionName: string): string {
  const match = sessionName.match(/令和(\d+)年/);
  if (match) {
    return `令和${match[1]}年度 各部の重点施策`;
  }
  return `${sessionName} 各部の重点施策`;
}

export function ArchiveView({ pastSessions, pastBudgetSessions }: Props) {
  const sessionsByFiscalYear = groupByFiscalYear(pastSessions);
  const budgetSessionsByFiscalYear = groupByFiscalYear(pastBudgetSessions);

  const fiscalYears = Array.from(
    new Set([
      ...sessionsByFiscalYear.map((g) => g.fiscalYear),
      ...budgetSessionsByFiscalYear.map((g) => g.fiscalYear),
    ])
  ).sort((a, b) => b - a);

  if (fiscalYears.length === 0) {
    return (
      <p className="text-sm text-mirai-text-muted">
        過去の資料はまだ掲載されていません。
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {fiscalYears.map((fiscalYear) => {
        const sessions =
          sessionsByFiscalYear.find((g) => g.fiscalYear === fiscalYear)
            ?.items ?? [];
        const budgetSessions =
          budgetSessionsByFiscalYear.find((g) => g.fiscalYear === fiscalYear)
            ?.items ?? [];

        return (
          <section key={fiscalYear} className="flex flex-col gap-6">
            <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
              {fiscalYear}年度
            </h2>

            {sessions.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-mirai-text-secondary">
                  定例会・議案
                </h3>
                <ul className="flex flex-col divide-y divide-mirai-border">
                  {sessions.map((session) => {
                    if (!session.slug) return null;
                    return (
                      <li key={session.id}>
                        <Link
                          href={`/sessions/${session.slug}/bills`}
                          className="group flex items-center justify-between gap-2 rounded-lg px-2 py-3 transition-colors hover:bg-mirai-surface-grouped"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-mirai-text">
                              {session.name}
                            </span>
                            <span className="text-xs text-mirai-text-secondary">
                              {formatSessionPeriod(session)}
                            </span>
                          </div>
                          <ChevronRight className="h-5 w-5 shrink-0 text-mirai-text-muted transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {budgetSessions.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-mirai-text-secondary">
                  予算
                </h3>
                <ul className="flex flex-col divide-y divide-mirai-border">
                  {budgetSessions.map((session) => {
                    if (!session.slug) return null;
                    return (
                      <li key={session.id}>
                        <Link
                          href={`/budget/${session.slug}`}
                          className="group flex items-center justify-between gap-2 rounded-lg px-2 py-3 transition-colors hover:bg-mirai-surface-grouped"
                        >
                          <span className="font-bold text-mirai-text">
                            {toBudgetLabel(session.name)}
                          </span>
                          <ChevronRight className="h-5 w-5 shrink-0 text-mirai-text-muted transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

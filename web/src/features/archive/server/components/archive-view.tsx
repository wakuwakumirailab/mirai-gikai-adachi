import "server-only";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { CouncilSession } from "@/features/council-sessions/shared/types";
import {
  formatSessionPeriod,
  groupSessionsByYear,
} from "@/features/council-sessions/shared/utils/group-sessions-by-year";

type SessionListProps = {
  sessions: CouncilSession[];
  /** 各定例会の遷移先（例: bills / questions） */
  linkSuffix: "bills" | "questions";
  emptyText: string;
  /** bill_contents が0件（未整備）の定例会IDの集合（議案のみ） */
  sessionsWithoutContent?: Set<string>;
};

/** 定例会を年ごとにまとめた一覧（過去の議案・過去の代表・一般質問で共通） */
export function ArchiveSessionList({
  sessions,
  linkSuffix,
  emptyText,
  sessionsWithoutContent,
}: SessionListProps) {
  const sessionsByYear = groupSessionsByYear(sessions);

  if (sessionsByYear.length === 0) {
    return <p className="text-sm text-mirai-text-muted">{emptyText}</p>;
  }

  return (
    <div className="flex flex-col gap-10">
      {sessionsByYear.map(({ year, sessions: yearSessions }) => (
        <section key={year} className="flex flex-col gap-3">
          <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
            {year}年
          </h2>
          <ul className="flex flex-col divide-y divide-mirai-border">
            {yearSessions.map((session) => {
              if (!session.slug) return null;
              const noContent = sessionsWithoutContent?.has(session.id);
              return (
                <li key={session.id}>
                  <Link
                    href={`/sessions/${session.slug}/${linkSuffix}`}
                    className="group flex items-center justify-between gap-2 rounded-lg px-2 py-3 transition-colors hover:bg-mirai-surface-grouped"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-mirai-text">
                        {session.name}
                        {noContent && (
                          <span className="ml-2 rounded-full bg-mirai-surface-muted px-2 py-0.5 text-xs font-medium text-mirai-text-muted align-middle">
                            解説データ未整備
                          </span>
                        )}
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
        </section>
      ))}
    </div>
  );
}

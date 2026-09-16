import type { Metadata } from "next";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { getAllPastSessions } from "@/features/council-sessions/server/loaders/get-all-past-sessions";
import { getSessionsWithBudget } from "@/features/budget-overview/server/loaders/get-sessions-with-budget";
import { ArchiveView } from "@/features/archive/server/components/archive-view";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { countPublishedBillsByDietSession } from "@/features/bills/server/repositories/bill-repository";

export const metadata: Metadata = {
  title: `過去の資料 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の過去の定例会・議案、過去の予算を年度別に確認できます。`,
};

export default async function ArchivePage() {
  const [pastSessions, budgetSessions, difficultyLevel] = await Promise.all([
    getAllPastSessions(),
    getSessionsWithBudget(),
    getDifficultyLevel(),
  ]);

  const contentCounts = await Promise.all(
    pastSessions.map((session) =>
      countPublishedBillsByDietSession(session.id, difficultyLevel)
    )
  );
  const sessionsWithoutContent = new Set(
    pastSessions
      .filter((_, i) => contentCounts[i] === 0)
      .map((session) => session.id)
  );

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <Link
          href="/assembly"
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          議会に戻る
        </Link>

        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <Archive className="size-3.5" />
            過去の資料
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            過去の定例会・議案、過去の予算
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            終了した定例会と、そこで審議された議案・予算を年度別にまとめています。
          </p>
        </header>

        <ArchiveView
          pastSessions={pastSessions}
          pastBudgetSessions={budgetSessions}
          sessionsWithoutContent={sessionsWithoutContent}
        />

        {siteConfig.features.jimuJigyo && (
          <section className="flex flex-col gap-3">
            <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
              事務事業評価
            </h2>
            <Link
              href="/jimu-jigyo"
              className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-4 transition-colors hover:border-primary"
            >
              <div className="flex items-start gap-3">
                <ClipboardList className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="font-bold text-mirai-text">
                    事務事業評価を年度別に見る
                  </p>
                  <p className="mt-0.5 text-sm text-mirai-text-secondary">
                    区が実施する事業のKPI・予算・効率の動向を年度ごとに分析します
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-mirai-text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </section>
        )}
      </div>
    </Container>
  );
}

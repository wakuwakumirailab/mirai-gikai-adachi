import type { Metadata } from "next";
import { Archive } from "lucide-react";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { getAllPastSessions } from "@/features/council-sessions/server/loaders/get-all-past-sessions";
import { getSessionsWithBudget } from "@/features/budget-overview/server/loaders/get-sessions-with-budget";
import { ArchiveView } from "@/features/archive/server/components/archive-view";

export const metadata: Metadata = {
  title: `過去の資料 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の過去の定例会・議案、過去の予算を年度別に確認できます。`,
};

export default async function ArchivePage() {
  const [pastSessions, budgetSessions] = await Promise.all([
    getAllPastSessions(),
    getSessionsWithBudget(),
  ]);

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
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
        />
      </div>
    </Container>
  );
}

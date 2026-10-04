import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { ArchivePageShell } from "@/features/archive/server/components/archive-page-shell";
import { ArchiveSessionList } from "@/features/archive/server/components/archive-view";
import { countPublishedBillsByDietSession } from "@/features/bills/server/repositories/bill-repository";
import { getAllPastSessions } from "@/features/council-sessions/server/loaders/get-all-past-sessions";

export const metadata: Metadata = {
  title: `過去の議案 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の過去の定例会と、そこで審議された議案を年ごとに確認できます。`,
};

export default async function ArchiveBillsPage() {
  const [pastSessions, difficultyLevel] = await Promise.all([
    getAllPastSessions(),
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
    <ArchivePageShell
      badge="過去の議案"
      icon={<CalendarDays className="size-3.5" />}
      title="過去の定例会・議案"
      description="終了した定例会と、そこで審議された議案を年ごとにまとめています。"
    >
      <ArchiveSessionList
        sessions={pastSessions}
        linkSuffix="bills"
        emptyText="過去の議案はまだ掲載されていません。"
        sessionsWithoutContent={sessionsWithoutContent}
      />
    </ArchivePageShell>
  );
}

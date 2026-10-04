import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { ArchivePageShell } from "@/features/archive/server/components/archive-page-shell";
import { ArchiveSessionList } from "@/features/archive/server/components/archive-view";
import { getSessionsWithGeneralQuestions } from "@/features/general-questions/server/loaders/get-sessions-with-general-questions";

export const metadata: Metadata = {
  title: `過去の代表・一般質問 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の過去の定例会で行われた代表・一般質問を年ごとに確認できます。`,
};

export default async function ArchiveQuestionsPage() {
  const questionSessions = await getSessionsWithGeneralQuestions();

  return (
    <ArchivePageShell
      badge="過去の代表・一般質問"
      icon={<MessageSquare className="size-3.5" />}
      title="過去の代表・一般質問"
      description="終了した定例会で行われた代表・一般質問を年ごとにまとめています。"
    >
      <ArchiveSessionList
        sessions={questionSessions}
        linkSuffix="questions"
        emptyText="過去の代表・一般質問はまだ掲載されていません。"
      />
    </ArchivePageShell>
  );
}

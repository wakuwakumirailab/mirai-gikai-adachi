import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { getCouncilSessionBySlug } from "@/features/council-sessions/server/loaders/get-council-session-by-slug";
import { SessionTopicsView } from "@/features/general-questions/server/components/session-topics-view";
import { getGeneralQuestionOverviewBySession } from "@/features/general-questions/server/loaders/get-general-question-overview-by-session";
import { getGeneralQuestionsBySession } from "@/features/general-questions/server/loaders/get-general-questions-by-session";
import { applyQuestionDifficulty } from "@/features/general-questions/shared/utils/apply-question-difficulty";
import { parseQuestionView } from "@/features/general-questions/shared/utils/question-view";

type Props = {
  params: Promise<{ session_slug: string }>;
  searchParams: Promise<{ view?: string | string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { session_slug } = await params;
  const session = await getCouncilSessionBySlug(session_slug);

  if (!session) {
    return { title: "定例会が見つかりません" };
  }

  return {
    title: `${session.name}の一般質問 | ${siteConfig.siteName}`,
    description: `${session.name}で行われた一般質問の一覧です。議員が区長・部長に直接質問した内容をわかりやすく解説します。`,
  };
}

export default async function SessionQuestionsPage({
  params,
  searchParams,
}: Props) {
  const { session_slug } = await params;
  const view = parseQuestionView((await searchParams).view);
  const session = await getCouncilSessionBySlug(session_slug);

  if (!session) {
    notFound();
  }

  const [rawQuestions, overview, difficultyLevel] = await Promise.all([
    getGeneralQuestionsBySession(session.id),
    getGeneralQuestionOverviewBySession(session.id),
    getDifficultyLevel(),
  ]);
  const questions = rawQuestions.map((q) =>
    applyQuestionDifficulty(q, difficultyLevel)
  );

  return (
    <Container className="py-8">
      <div className="mb-4">
        <Link
          href="/assembly"
          className="inline-flex items-center gap-1 text-sm text-mirai-text-secondary hover:text-mirai-text"
        >
          <ChevronLeft className="w-4 h-4" />
          議会に戻る
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-mirai-text">
          {session.name}の一般質問
        </h1>
        <p className="mt-2 text-sm text-mirai-text-secondary">
          議員が問い、区が答えた。あなたの暮らしに関わる取り組みを、テーマ別・議員別にまとめました。
        </p>
      </div>
      <SessionTopicsView
        questions={questions}
        overview={overview}
        sessionSlug={session_slug}
        view={view}
      />
    </Container>
  );
}

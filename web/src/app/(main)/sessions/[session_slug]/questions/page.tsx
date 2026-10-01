import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
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
import { buildGeneralQuestionsSourceUrl } from "@/features/general-questions/shared/utils/build-source-url";
import { parseQuestionView } from "@/features/general-questions/shared/utils/question-view";
import { getJapanTime } from "@/lib/utils/date";

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
    title: `${session.name}の代表・一般質問 | ${siteConfig.siteName}`,
    description: `${session.name}で行われた代表・一般質問の一覧です。区議会議員が行政・区長に質問した内容をわかりやすく解説します。`,
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
  const startDate = new Date(session.start_date);
  const roundMatch = session.name.match(/第(\d+)回/);
  const eyebrowLabel = roundMatch
    ? `${startDate.getFullYear()}年 第${roundMatch[1]}回`
    : `${startDate.getFullYear()}年`;
  const sourceUrl = buildGeneralQuestionsSourceUrl(session.council_url);
  const isPastSession =
    !session.is_active &&
    !!session.end_date &&
    new Date(session.end_date) < getJapanTime();
  const backHref = isPastSession ? "/archive" : "/assembly";
  const backLabel = isPastSession ? "過去の資料に戻る" : "議会に戻る";

  return (
    <Container className="py-8">
      <div className="mb-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-mirai-text-secondary hover:text-mirai-text"
        >
          <ChevronLeft className="w-4 h-4" />
          {backLabel}
        </Link>
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mirai-surface-tag px-3 py-1 text-xs font-medium text-primary-accent">
          <Calendar className="size-3.5" />
          {eyebrowLabel}
        </span>
        <h1 className="text-[28px] font-bold text-black leading-[1.4]">
          {session.name}の代表・一般質問
        </h1>
        <p className="mt-2 text-sm text-mirai-text-secondary">
          区議会議員が問い、区が答えた内容をわかりやすく解説します。あなたの暮らしに関わる取り組みを、テーマ別・議員別にまとめました。
        </p>
      </div>
      <SessionTopicsView
        questions={questions}
        overview={overview}
        sessionSlug={session_slug}
        view={view}
        difficultyLevel={difficultyLevel}
      />

      <div className="mt-10 flex flex-col gap-4">
        {sourceUrl && (
          <div className="flex items-center gap-1 text-[13px] font-medium text-mirai-text">
            {startDate.getFullYear()}年{session.name}
            に行われた全ての代表・一般質問は
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1"
            >
              足立区議会情報へ
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}

        <Link
          href="/archive"
          className="group flex items-center justify-between gap-2 rounded-2xl border border-mirai-border bg-white px-5 py-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
        >
          <p className="font-bold text-mirai-text">過去の資料一覧へ</p>
          <ChevronRight className="w-5 h-5 text-mirai-text-muted shrink-0" />
        </Link>
      </div>
    </Container>
  );
}

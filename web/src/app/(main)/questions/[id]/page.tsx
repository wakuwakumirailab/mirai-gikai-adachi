import { ChevronLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { getCouncilSessionById } from "@/features/council-sessions/server/loaders/get-council-session-by-id";
import { QuestionChatView } from "@/features/general-questions/client/components/question-chat-view";
import { QuestionViewToggle } from "@/features/general-questions/client/components/question-view-toggle";
import { AdjacentQuestionNav } from "@/features/general-questions/server/components/adjacent-question-nav";
import { QuestionTypeBadge } from "@/features/general-questions/server/components/question-type-badge";
import { RawTranscriptView } from "@/features/general-questions/server/components/raw-transcript-view";
import { SourceStageNotice } from "@/features/general-questions/server/components/source-stage-notice";
import { getGeneralQuestionById } from "@/features/general-questions/server/loaders/get-general-question-by-id";
import { getGeneralQuestionsBySession } from "@/features/general-questions/server/loaders/get-general-questions-by-session";
import { applyQuestionDifficulty } from "@/features/general-questions/shared/utils/apply-question-difficulty";
import { formatQuestionDay } from "@/features/general-questions/shared/utils/format-question-day";
import { formatSourceLabel } from "@/features/general-questions/shared/utils/format-source-label";
import {
  buildSessionQuestionsHref,
  parseQuestionView,
} from "@/features/general-questions/shared/utils/question-view";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const question = await getGeneralQuestionById(id);

  if (!question) {
    return { title: "質問が見つかりません" };
  }

  return {
    title: `${question.questioner_name} 議員の一般質問 | ${siteConfig.siteName}`,
    description: question.summary ?? undefined,
  };
}

export default async function GeneralQuestionDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const view = parseQuestionView((await searchParams).from);
  const rawQuestion = await getGeneralQuestionById(id);

  if (!rawQuestion) {
    notFound();
  }

  const [session, sessionQuestions, difficultyLevel] = await Promise.all([
    getCouncilSessionById(rawQuestion.council_session_id),
    getGeneralQuestionsBySession(rawQuestion.council_session_id),
    getDifficultyLevel(),
  ]);
  const question = applyQuestionDifficulty(rawQuestion, difficultyLevel);

  const backHref = session?.slug
    ? buildSessionQuestionsHref(session.slug, view)
    : "/questions";

  const dayLabel = formatQuestionDay(question);

  return (
    <Container className="py-8 max-w-2xl">
      <div className="mb-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1 text-sm text-mirai-text-secondary hover:text-mirai-text"
        >
          <ChevronLeft className="w-4 h-4" />
          一般質問の一覧に戻る
        </Link>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mirai-text">
            {question.questioner_name} 議員
          </h1>
          <QuestionTypeBadge questionType={question.question_type} />
        </div>
        <p className="mt-1 text-sm text-mirai-text-secondary">
          {question.questioner_party && (
            <span>{question.questioner_party}　｜　</span>
          )}
          {dayLabel}
        </p>
      </div>

      {question.source_stage && question.source_stage !== "final" && (
        <div className="mb-6">
          <SourceStageNotice stage={question.source_stage} scope="question" />
        </div>
      )}

      {question.summary && (
        <p className="mb-6 text-mirai-text leading-relaxed">
          {question.summary}
        </p>
      )}

      {question.raw_text && question.topics.length > 0 ? (
        <QuestionViewToggle
          topics={question.topics}
          rawText={question.raw_text}
        />
      ) : question.raw_text ? (
        <RawTranscriptView rawText={question.raw_text} />
      ) : (
        <QuestionChatView topics={question.topics} />
      )}

      <AdjacentQuestionNav
        questions={sessionQuestions}
        currentId={question.id}
        view={view}
      />

      {question.source_url && (
        <div className="my-8">
          <h2 className="text-lg font-bold text-mirai-text mb-3">
            参考にした会議録
          </h2>
          <a
            href={question.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary-accent hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            {formatSourceLabel(question)}
          </a>
        </div>
      )}
    </Container>
  );
}

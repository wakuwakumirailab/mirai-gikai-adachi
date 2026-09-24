import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { GeneralQuestion } from "../../shared/types";
import { formatQuestionDay } from "../../shared/utils/format-question-day";
import { buildQuestionDetailHref } from "../../shared/utils/question-view";

interface GeneralQuestionCardProps {
  question: GeneralQuestion;
}

/** 議員別一覧の1枚。議員名・会派・質問日・要約・質問テーマの見出しをまとめて表示する */
export function GeneralQuestionCard({ question }: GeneralQuestionCardProps) {
  const dayLabel = formatQuestionDay(question);

  return (
    <Link
      href={buildQuestionDetailHref(question.id, "members")}
      className="flex h-full flex-col gap-3 rounded-xl border border-mirai-border bg-white p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
    >
      <div>
        <p className="text-lg font-bold text-mirai-text">
          {question.questioner_name} 議員
        </p>
        <p className="mt-0.5 text-xs text-mirai-text-secondary">
          {question.questioner_party && (
            <span>{question.questioner_party}　｜　</span>
          )}
          {dayLabel}
        </p>
      </div>
      {question.summary && (
        <p className="text-sm leading-relaxed text-mirai-text">
          {question.summary}
        </p>
      )}
      {question.topics.length > 0 && (
        <ul className="flex flex-col gap-1 border-t border-mirai-border pt-3">
          {question.topics.map((topic, i) => (
            <li
              key={`${topic.title}-${i}`}
              className="flex gap-1.5 text-xs leading-relaxed text-mirai-text-secondary"
            >
              <span aria-hidden="true">・</span>
              <span>{topic.title}</span>
            </li>
          ))}
        </ul>
      )}
      <span className="mt-auto inline-flex items-center gap-1 self-end text-xs font-medium text-primary-accent">
        質問の詳細を見る
        <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { GeneralQuestion } from "../../shared/types";
import { findAdjacentQuestions } from "../../shared/utils/find-adjacent-questions";
import {
  buildQuestionDetailHref,
  type QuestionView,
} from "../../shared/utils/question-view";

interface AdjacentQuestionNavProps {
  /** 同じ定例会の一般質問（質問順） */
  questions: GeneralQuestion[];
  currentId: string;
  view: QuestionView;
}

/** 詳細ページ下部の「前の議員／次の議員」への移動リンク */
export function AdjacentQuestionNav({
  questions,
  currentId,
  view,
}: AdjacentQuestionNavProps) {
  const { prev, next } = findAdjacentQuestions(questions, currentId);

  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      aria-label="ほかの議員の一般質問"
      className="mt-8 grid grid-cols-2 gap-3"
    >
      {prev ? (
        <Link
          href={buildQuestionDetailHref(prev.id, view)}
          className="flex flex-col gap-1 rounded-xl border border-mirai-border bg-white px-4 py-3 transition-colors hover:border-primary/50"
        >
          <span className="inline-flex items-center gap-0.5 text-xs text-mirai-text-secondary">
            <ChevronLeft className="h-3.5 w-3.5" />
            前の議員
          </span>
          <span className="text-sm font-bold text-mirai-text">
            {prev.questioner_name} 議員
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={buildQuestionDetailHref(next.id, view)}
          className="flex flex-col items-end gap-1 rounded-xl border border-mirai-border bg-white px-4 py-3 text-right transition-colors hover:border-primary/50"
        >
          <span className="inline-flex items-center gap-0.5 text-xs text-mirai-text-secondary">
            次の議員
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-bold text-mirai-text">
            {next.questioner_name} 議員
          </span>
        </Link>
      )}
    </nav>
  );
}

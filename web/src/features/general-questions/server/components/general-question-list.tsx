import type { GeneralQuestion } from "../../shared/types";
import { GeneralQuestionCard } from "./general-question-card";

interface GeneralQuestionListProps {
  questions: GeneralQuestion[];
}

/** 議員別一覧（質問順） */
export function GeneralQuestionList({ questions }: GeneralQuestionListProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-mirai-text-secondary">
        質問した順に並んでいます。議員を選ぶと質問と答弁の詳細を確認できます
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {questions.map((question) => (
          <li key={question.id}>
            <GeneralQuestionCard question={question} />
          </li>
        ))}
      </ul>
    </div>
  );
}

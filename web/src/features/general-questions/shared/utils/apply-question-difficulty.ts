import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { GeneralQuestion } from "../types";

/**
 * 難易度設定に応じて、一般質問の表示用テキストを差し替える。
 * - normal（ふつう）: やさしい版があればそれを使い、なければ詳しい版を使う
 * - hard（難しい）: 詳しい版をそのまま使う
 * 下流のコンポーネントは summary / question_summary / answer_summary だけを見ればよい。
 */
export function applyQuestionDifficulty(
  question: GeneralQuestion,
  level: DifficultyLevelEnum
): GeneralQuestion {
  if (level === "hard") {
    return question;
  }
  return {
    ...question,
    summary: question.summary_easy || question.summary,
    topics: question.topics.map((topic) => ({
      ...topic,
      question_summary: topic.question_summary_easy || topic.question_summary,
      answer_summary: topic.answer_summary_easy || topic.answer_summary,
    })),
  };
}

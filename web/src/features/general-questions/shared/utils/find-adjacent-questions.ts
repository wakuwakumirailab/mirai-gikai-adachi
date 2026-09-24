import type { GeneralQuestion } from "../types";

type QuestionLink = Pick<GeneralQuestion, "id" | "questioner_name">;

/**
 * 同じ定例会の一般質問（質問順に並んだ配列）の中から、
 * 指定した質問の前後の質問を返す。先頭・末尾や見つからない場合は null。
 */
export function findAdjacentQuestions<T extends QuestionLink>(
  questions: T[],
  currentId: string
): { prev: T | null; next: T | null } {
  const index = questions.findIndex((q) => q.id === currentId);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: questions[index - 1] ?? null,
    next: questions[index + 1] ?? null,
  };
}

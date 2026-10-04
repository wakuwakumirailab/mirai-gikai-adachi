import type { GeneralQuestion } from "../types";
import { buildTopicGroups } from "./build-topic-groups";

export type SessionQuestionsSummary = {
  questionerCount: number;
  topicCount: number;
  /** 件数の多い順（同数ならテーマの表示順） */
  topThemes: { label: string; count: number }[];
  /** topThemes に載らなかったテーマの数 */
  otherThemeCount: number;
};

/** ホームのバナー用に、会期の質問をテーマ別の件数にまとめる */
export function summarizeSessionQuestions(
  questions: GeneralQuestion[],
  maxThemes = 3
): SessionQuestionsSummary {
  const groups = buildTopicGroups(questions)
    .map((g, order) => ({
      label: g.categoryLabel,
      count: g.entries.length,
      order,
    }))
    .sort((a, b) => b.count - a.count || a.order - b.order);

  return {
    questionerCount: questions.length,
    topicCount: groups.reduce((sum, g) => sum + g.count, 0),
    topThemes: groups
      .slice(0, maxThemes)
      .map(({ label, count }) => ({ label, count })),
    otherThemeCount: Math.max(groups.length - maxThemes, 0),
  };
}

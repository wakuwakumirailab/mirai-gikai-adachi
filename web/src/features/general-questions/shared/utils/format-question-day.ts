import type { GeneralQuestion } from "../types";

/**
 * 一般質問が行われた日の表示ラベルを返す。
 * session_date があれば「2月24日」形式、なければ「第N日」形式にする。
 */
export function formatQuestionDay(
  question: Pick<GeneralQuestion, "session_day" | "session_date">
): string {
  const match = question.session_date?.match(/^\d{4}-(\d{2})-(\d{2})$/);
  if (match) {
    return `${Number(match[1])}月${Number(match[2])}日`;
  }
  return `第${question.session_day}日`;
}

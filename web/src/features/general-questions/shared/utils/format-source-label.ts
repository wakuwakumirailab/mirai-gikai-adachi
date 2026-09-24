import type { GeneralQuestion } from "../types";

/**
 * 「参考にした会議録」のリンク文言を返す（議案ページの表記に合わせる）。
 * 例: 本会議 令和8年2月24日（第3日）会議録
 * session_date が無い場合は「本会議（第N日）会議録」とする。
 */
export function formatSourceLabel(
  question: Pick<GeneralQuestion, "session_day" | "session_date">
): string {
  const day = `（第${question.session_day}日）`;
  const match = question.session_date?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return `本会議${day}会議録`;
  }
  const year = Number(match[1]);
  // 令和元年＝2019年
  const reiwa = year - 2018;
  const era = reiwa === 1 ? "令和元年" : `令和${reiwa}年`;
  return `本会議 ${era}${Number(match[2])}月${Number(match[3])}日${day}会議録`;
}

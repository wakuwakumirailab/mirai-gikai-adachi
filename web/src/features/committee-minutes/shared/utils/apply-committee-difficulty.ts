import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { CommitteeMeeting } from "../types";

/**
 * 難易度設定に応じて、委員会会議の表示用テキストを差し替える。
 * - normal（ふつう）: やさしい版があればそれを使い、なければ詳しい版を使う
 * - hard（難しい）: 詳しい版をそのまま使う
 * 下流のコンポーネントは summary / conclusion / text だけを見ればよい。
 */
export function applyCommitteeDifficulty(
  meeting: CommitteeMeeting,
  level: DifficultyLevelEnum
): CommitteeMeeting {
  if (level === "hard") {
    return meeting;
  }
  return {
    ...meeting,
    summary: meeting.summaryEasy || meeting.summary,
    topics: meeting.topics.map((topic) => ({
      ...topic,
      summary: topic.summaryEasy || topic.summary,
      conclusion: topic.conclusionEasy || topic.conclusion,
      positions: topic.positions.map((p) => ({
        ...p,
        text: p.text_easy || p.text,
      })),
    })),
  };
}

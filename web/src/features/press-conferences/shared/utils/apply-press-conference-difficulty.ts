import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { PressConference } from "../types";

/**
 * 難易度設定に応じて、記者会見の表示用テキストを差し替える。
 * - normal（ふつう）: やさしい版があればそれを使い、なければ詳しい版を使う
 * - hard（難しい）: 詳しい版をそのまま使う
 */
export function applyPressConferenceDifficulty(
  pressConference: PressConference,
  level: DifficultyLevelEnum
): PressConference {
  if (level === "hard") {
    return pressConference;
  }
  return {
    ...pressConference,
    items: pressConference.items.map((item) => ({
      ...item,
      summary: item.summaryEasy || item.summary,
    })),
  };
}

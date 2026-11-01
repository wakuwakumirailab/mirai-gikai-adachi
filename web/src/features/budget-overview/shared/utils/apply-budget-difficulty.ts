import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { BudgetOverview, BudgetOverviewWithThemes } from "../types";

/**
 * 難易度設定に応じて、予算の表示用テキストを差し替える。
 * - normal（ふつう）: やさしい版があればそれを使い、なければ詳しい版を使う
 * - hard（詳しく）: 詳しい版をそのまま使う
 * 下流のコンポーネントは direction / ai_summary / description だけを見ればよい。
 */
export function applyBudgetOverviewDifficulty<T extends BudgetOverview>(
  overview: T,
  level: DifficultyLevelEnum
): T {
  if (level === "hard") return overview;
  return {
    ...overview,
    direction: overview.direction_easy || overview.direction,
  };
}

export function applyBudgetDetailDifficulty(
  overview: BudgetOverviewWithThemes,
  level: DifficultyLevelEnum
): BudgetOverviewWithThemes {
  if (level === "hard") return overview;
  return {
    ...applyBudgetOverviewDifficulty(overview, level),
    themes: overview.themes.map((theme) => ({
      ...theme,
      ai_summary: theme.ai_summary_easy || theme.ai_summary,
      initiatives: theme.initiatives.map((initiative) => ({
        ...initiative,
        description: initiative.description_easy || initiative.description,
      })),
    })),
  };
}

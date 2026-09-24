/** 一般質問一覧の表示切り替え（テーマ別／議員別） */
export type QuestionView = "theme" | "members";

/** URL の view パラメータを表示モードに変換する。不明な値はテーマ別として扱う */
export function parseQuestionView(value: unknown): QuestionView {
  return value === "members" ? "members" : "theme";
}

/** 一般質問一覧ページのURL。テーマ別（既定）の場合はクエリを付けない */
export function buildSessionQuestionsHref(
  sessionSlug: string,
  view: QuestionView
): string {
  const base = `/sessions/${sessionSlug}/questions`;
  return view === "members" ? `${base}?view=members` : base;
}

/** 一般質問の詳細ページのURL。議員別から来た場合は戻り先を保つため from を付ける */
export function buildQuestionDetailHref(
  questionId: string,
  view: QuestionView
): string {
  const base = `/questions/${questionId}`;
  return view === "members" ? `${base}?from=members` : base;
}

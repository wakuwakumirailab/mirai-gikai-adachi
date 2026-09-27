export type GeneralQuestionTopic = {
  title: string;
  question_summary: string;
  answer_summary: string;
  /** やさしい版（中学生レベル）。未設定なら question_summary / answer_summary を使う */
  question_summary_easy?: string | null;
  answer_summary_easy?: string | null;
  answerer_role: string;
  answerer_name: string;
};

/**
 * セッション単位のオーバービュー。
 * - lines: セッション全体の「どんな話があった？」3行（未生成なら null）
 * - themeLines: カテゴリラベル → そのテーマの3行（未生成テーマはキーなし）
 */
export type SessionQuestionOverview = {
  lines: string[] | null;
  themeLines: Record<string, string[]>;
};

export type QuestionSourceStage = "notice" | "preliminary" | "final";

export type GeneralQuestion = {
  id: string;
  council_session_id: string;
  questioner_name: string;
  questioner_party: string | null;
  questioner_number: number | null;
  session_day: number;
  /** 質問が行われた本会議の日付（YYYY-MM-DD）。未設定の場合は session_day で表示する */
  session_date?: string | null;
  question_order: number;
  summary: string | null;
  /** 全体要約のやさしい版。未設定なら summary を使う */
  summary_easy?: string | null;
  topics: GeneralQuestionTopic[];
  raw_text: string | null;
  source_url: string | null;
  /** 作成の元資料。notice=質問通告書（質問のみ・答弁なし）／preliminary=速報版会議録／final=正式な会議録 */
  source_stage?: QuestionSourceStage;
  publish_status: string;
  created_at: string;
  updated_at: string;
};

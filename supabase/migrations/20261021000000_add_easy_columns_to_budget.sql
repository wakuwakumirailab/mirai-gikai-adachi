-- 予算ページに「やさしい」版の文章を追加
-- 難易度切り替え（ふつう＝やさしい／詳しく＝詳しい版）に対応するため。
-- 未設定の場合は、詳しい版（direction / ai_summary / description）をそのまま表示する。
alter table budget_overviews
  add column if not exists direction_easy text;

alter table budget_themes
  add column if not exists ai_summary_easy text;

alter table budget_initiatives
  add column if not exists description_easy text;

comment on column budget_overviews.direction_easy is '分野の方針のやさしい版（中学生レベル）。未設定時は direction を表示';
comment on column budget_themes.ai_summary_easy is 'テーマの要約のやさしい版（中学生レベル）。未設定時は ai_summary を表示';
comment on column budget_initiatives.description_easy is '事業の説明のやさしい版（中学生レベル）。未設定時は description を表示';

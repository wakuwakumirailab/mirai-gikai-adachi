-- general_questions に「やさしい」版の全体要約を追加
-- 難易度切り替え（ふつう＝やさしい／難しい＝詳しく）に対応するため。
-- トピックごとのやさしい版は topics(JSON) の question_summary_easy / answer_summary_easy に持つ。
-- 未設定の場合は詳しい版（summary / question_summary / answer_summary）をそのまま表示する。
alter table general_questions
  add column if not exists summary_easy text;

comment on column general_questions.summary_easy is '全体要約のやさしい版（中学生レベル）。未設定時は summary を表示';

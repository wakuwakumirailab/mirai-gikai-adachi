-- general_questions に「代表質問」か「一般質問」かの区分を追加
-- 足立区議会サイトの一覧・個別ページの「区分」欄に明記されている情報（PDF通告書本文には区分の記載がない）。
alter table general_questions
  add column if not exists question_type text not null default 'general'
  check (question_type in ('representative', 'general'));

comment on column general_questions.question_type is '質問区分（representative=代表質問／general=一般質問）。足立区議会サイトの「区分」欄をもとに設定';

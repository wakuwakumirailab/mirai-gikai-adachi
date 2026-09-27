-- general_questions に「どの資料をもとに作成したか」を追加
-- 正式な会議録の公開前でも、質問通告書（質問項目のみ）や速報版会議録から先行して掲載できるようにする。
--   notice      : 質問通告書をもとに質問項目のみ掲載（答弁は未掲載）
--   preliminary : 速報版会議録をもとに作成（正式版の公開後に見直す）
--   final       : 正式な会議録をもとに作成
alter table general_questions
  add column if not exists source_stage text not null default 'final'
  check (source_stage in ('notice', 'preliminary', 'final'));

comment on column general_questions.source_stage is '作成の元資料（notice=質問通告書・質問のみ／preliminary=速報版会議録／final=正式な会議録）';

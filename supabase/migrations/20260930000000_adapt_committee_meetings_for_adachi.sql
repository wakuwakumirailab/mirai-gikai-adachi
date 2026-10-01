-- 委員会アーカイブを足立区版（トピック別の結論＋意見が分かれる場合の発言者別整理）に対応させる
--
-- 足立区の委員会会議録は発言者名つき。全文転載はしない方針のため、会議録の
-- 逐語（speeches / raw_text）は画面に出さず、AIが作った要約だけを表示する。
-- 表示用テキストは「詳しい版（標準）」と「やさしい版（*_easy）」の2種類を持つ。
-- 未設定の *_easy は詳しい版で代替する（難易度切り替えはgeneral_questionsと同じ方式）。

alter table committee_meetings
  add column if not exists summary_easy text;

-- 全文転載しないため原文は必須にしない（再要約用に保持したい場合のみ格納）
alter table committee_meetings
  alter column raw_text drop not null;

alter table committee_meeting_topics
  add column if not exists summary_easy text,
  -- このトピックの結論（可決・否決・継続審査・報告了承、または議論の到達点）
  add column if not exists conclusion text,
  add column if not exists conclusion_easy text,
  -- 意見が分かれた場合の発言者別整理。空配列なら意見の対立なし。
  -- [{ "speaker": "○○委員", "party": "会派名|null", "role": "member|executive",
  --    "text": "主張の要約", "text_easy": "やさしい版" }]
  add column if not exists positions jsonb not null default '[]'::jsonb;

comment on column committee_meeting_topics.conclusion is 'トピックの結論（詳しい版）';
comment on column committee_meeting_topics.positions is '意見が分かれたときの発言者別の主張要約（空配列＝対立なし）';

-- 委員会のトピックと、議案・請願陳情（bills）を結びつける
--
-- [{ "bill_type": "petition", "bill_number": "08-4" },
--  { "bill_type": "bill", "bill_number": "第77号", "session_slug": "r8-2" }]
-- 請願・陳情は bill_number（例: 08-4）が全期間で一意。議案は年度ごとに番号が
-- 重複しうるため session_slug（council_sessions.slug）も持つ。
-- bills.id は環境ごとに異なるため、IDではなく番号で持ち、表示時に解決する。
alter table committee_meeting_topics
  add column if not exists related_bills jsonb not null default '[]'::jsonb;

comment on column committee_meeting_topics.related_bills is 'このトピックで審査された議案・請願陳情（番号で参照）';

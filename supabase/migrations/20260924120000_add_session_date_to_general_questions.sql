-- general_questions に質問が行われた日付を追加
-- 「第3日」のような日程番号だけでは区民に伝わりにくいため、詳細ページで「2月24日」のように日付を表示する
alter table general_questions
  add column if not exists session_date date;

comment on column general_questions.session_date is '一般質問が行われた本会議の日付（未設定時は session_day の「第N日」表記で代替表示）';

alter table press_conference_items
  add column if not exists summary_easy text;

comment on column press_conference_items.summary_easy is 'ひらがなを多用した平易な表現の要約（難易度「ふつう」で優先表示）';

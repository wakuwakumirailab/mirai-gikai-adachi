-- bills テーブルに、事務手続き議案（is_procedural=true）向けの短い要約を追加
-- わかりやすい解説（bill_contents）は付けないが、一覧上で内容が分かるよう
-- 契約金額・相手方や放棄する権利の内容などを1〜2文で記載する
alter table bills
  add column if not exists procedural_summary text;

comment on column bills.procedural_summary is '事務手続き議案の内容を1〜2文で要約したもの（契約金額・相手方、放棄する権利の内容など）';

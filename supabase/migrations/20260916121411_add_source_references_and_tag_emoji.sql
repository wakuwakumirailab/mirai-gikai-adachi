-- bill_contents: AI解説の出典（速報版フラグ・参照した会議録等へのリンク）を追加
alter table bill_contents
  add column if not exists is_preliminary_source boolean not null default false,
  add column if not exists source_references jsonb not null default '[]'::jsonb;

comment on column bill_contents.is_preliminary_source is '正式な会議録が確定する前の速報版会議録を情報源として作成したかどうか';
comment on column bill_contents.source_references is 'AI解説の作成に使った会議録・審議結果PDF等へのリンク（[{label, url}]形式）';

-- tags: カテゴリ表示用の絵文字を追加
alter table tags
  add column if not exists emoji text;

comment on column tags.emoji is 'カテゴリチップの先頭に表示する絵文字（任意）';

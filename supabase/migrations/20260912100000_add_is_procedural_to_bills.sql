-- 議案を「わかりやすい解説の対象」と「一覧のみ表示（事務手続き議案）」に
-- 分けて表示するためのフラグ。
-- 指定管理者の指定・工事請負契約・物品購入・道路線の認定など、
-- 区民の暮らしへの影響が薄く解説の優先度が低い議案を true にする。
ALTER TABLE bills
  ADD COLUMN is_procedural boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN bills.is_procedural IS
  '事務手続き議案（指定管理者の指定・契約・購入等）で一覧表示のみとする場合は true。falseの議案は「わかりやすい解説」の対象。';

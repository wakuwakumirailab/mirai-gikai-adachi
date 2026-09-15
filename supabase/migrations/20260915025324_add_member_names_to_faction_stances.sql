-- 会派の賛否を「採決当時の議員名スナップショット」付きで記録できるようにする。
--
-- 背景: 足立区議会は会派の離合集散（例:「是々非々の会」）や無所属議員の
-- 賛否の分裂が起こりうる。council_members.faction_id は「現在の所属」しか
-- 保持できず、過去の採決時点の所属とは一致しなくなる可能性があるため、
-- faction_stances に採決当時のメンバー名をスナップショットとして直接持たせる。
--
-- あわせて、無所属議員の賛否が割れた場合に同じ会派IDで
-- for/against 2レコードを登録できるよう、UNIQUE(bill_id, faction_id) を撤廃する。

ALTER TABLE faction_stances
  DROP CONSTRAINT faction_stances_bill_id_faction_id_key;

ALTER TABLE faction_stances
  ADD COLUMN member_names TEXT[] NOT NULL DEFAULT '{}';

COMMENT ON COLUMN faction_stances.member_names IS
  '採決当時にこの賛否区分に含まれていた議員名のスナップショット。会派の離合集散や無所属議員の賛否の分裂があっても、記録した時点の実態を保持するため council_members とは独立して保持する。';

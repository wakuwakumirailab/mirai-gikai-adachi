-- bills.bill_type に petition（請願・陳情）を追加
-- 足立区議会公式サイトの「請願・陳情の検索」データを bills テーブルへ取り込むため

ALTER TABLE bills
  DROP CONSTRAINT bills_bill_type_check;

ALTER TABLE bills
  ADD CONSTRAINT bills_bill_type_check
  CHECK (bill_type IN ('bill', 'opinion', 'resolution', 'member_bill', 'petition'));

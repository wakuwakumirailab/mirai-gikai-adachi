type DifficultyLevel = "normal" | "hard";

interface BillContentWithBillName {
  bill_name: string;
  difficulty_level: DifficultyLevel;
  title: string;
  summary: string;
  content: string;
}

// 議案コンテンツのデータ（bill_nameで参照）
// 注: 令和7年度・令和8年度の実議案165件を投入したのに伴い、
// 旧・仮議案（5件）向けのAI解説データは削除した。
// 「わかりやすい解説」（tier①＝bill_type "bill" の議案）はレビューを経て
// 別途投入する。ここが空の間、対象議案には解説が付かない
// （議案一覧・議案原文へのリンクのみの表示になる）。
export const billContentsWithBillName: BillContentWithBillName[] = [];

// bill_nameをbill_idに変換する関数（マイグレーション後に型を更新）
export function createBillContents(
  insertedBills: { id: string; name: string }[]
) {
  return billContentsWithBillName.map((content) => {
    const bill = insertedBills.find((b) => b.name === content.bill_name);
    if (!bill) {
      throw new Error(`Bill not found for content: ${content.bill_name}`);
    }

    return {
      bill_id: bill.id,
      difficulty_level: content.difficulty_level,
      title: content.title,
      summary: content.summary,
      content: content.content,
    };
  });
}

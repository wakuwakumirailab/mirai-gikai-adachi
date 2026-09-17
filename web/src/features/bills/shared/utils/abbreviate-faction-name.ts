// 会派の正式名称 → 画面表示用の略称。
// 正式名称は factions.display_name（採決当時の公式な会派区分）をそのまま保持し、
// 表示側だけ略称に変換することで、DBには正確な名称を残しつつ画面は見やすくする。
// 略称は足立区議会の【審議結果一覧】PDFの凡例（自民・公明・共産・是非・都ファ・れ市・無派）に合わせる。
const FACTION_ABBREVIATIONS: Record<string, string> = {
  足立区議会自由民主党: "自民",
  足立区議会公明党: "公明",
  日本共産党足立区議団: "共産",
  都民ファーストの会足立区議団: "都ファ",
  "是々非々の会（維新・参政・無所属・立憲）": "是非",
  "れいわ新選組・市民派の会あだち": "れ市",
  無所属: "無派",
};

export function abbreviateFactionName(displayName: string): string {
  return FACTION_ABBREVIATIONS[displayName] ?? displayName;
}

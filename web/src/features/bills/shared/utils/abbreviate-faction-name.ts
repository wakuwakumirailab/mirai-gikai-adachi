// 会派の正式名称 → 画面表示用の略称。
// 正式名称は factions.display_name（採決当時の公式な会派区分）をそのまま保持し、
// 表示側だけ略称に変換することで、DBには正確な名称を残しつつ画面は見やすくする。
const FACTION_ABBREVIATIONS: Record<string, string> = {
  足立区議会自由民主党: "自民党",
  足立区議会公明党: "公明党",
  日本共産党足立区議団: "共産党",
  都民ファーストの会足立区議団: "都ファ",
  "是々非々の会（維新・参政・無所属・立憲）": "是々非々の会",
};

export function abbreviateFactionName(displayName: string): string {
  return FACTION_ABBREVIATIONS[displayName] ?? displayName;
}

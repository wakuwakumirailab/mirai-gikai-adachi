/** 「足立区議会」「足立区議団」などの冠称を除いた短縮表記を返す（既知の会派名のみ）。未知の値はそのまま返す */
const PARTY_SHORT_NAMES: Record<string, string> = {
  足立区議会自由民主党: "自由民主党",
  足立区議会公明党: "公明党",
  日本共産党足立区議団: "日本共産党",
  都民ファーストの会足立区議団: "都民ファーストの会",
  "是々非々の会（維新・参政・無所属・立憲）": "是々非々の会",
  "是々非々の会（維新・参政・無所属）": "是々非々の会",
  足立区議会議会改革を全力で推し進める会: "議会改革を全力で推し進める会",
};

export function shortenPartyName(
  party: string | null | undefined
): string | null | undefined {
  if (!party) return party;
  return PARTY_SHORT_NAMES[party] ?? party;
}

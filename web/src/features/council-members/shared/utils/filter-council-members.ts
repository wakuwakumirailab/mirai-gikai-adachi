import type { CouncilMember } from "../types";

export type CouncilMemberFilters = {
  /** 議員名の部分一致キーワード */
  keyword: string;
  /** 選択された会派IDの集合。空集合なら絞り込みなし（OR条件） */
  factionIds: Set<string>;
  /** 選択された委員会IDの集合。空集合なら絞り込みなし（OR条件） */
  committeeIds: Set<string>;
};

export function filterCouncilMembers(
  members: CouncilMember[],
  { keyword, factionIds, committeeIds }: CouncilMemberFilters
): CouncilMember[] {
  const trimmedKeyword = keyword.trim();

  return members.filter((member) => {
    if (trimmedKeyword && !member.name.includes(trimmedKeyword)) {
      return false;
    }

    if (
      factionIds.size > 0 &&
      (!member.faction || !factionIds.has(member.faction.id))
    ) {
      return false;
    }

    if (
      committeeIds.size > 0 &&
      !member.committees.some((c) => committeeIds.has(c.id))
    ) {
      return false;
    }

    return true;
  });
}

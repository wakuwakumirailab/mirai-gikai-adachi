import type { CouncilMember } from "../types";

export type CouncilMemberFilters = {
  /** 議員名の部分一致キーワード */
  keyword: string;
  /** 会派ID。"all" で絞り込みなし */
  factionId: string;
  /** 委員会ID。"all" で絞り込みなし */
  committeeId: string;
};

export const ALL_FACTIONS = "all";
export const ALL_COMMITTEES = "all";

export function filterCouncilMembers(
  members: CouncilMember[],
  { keyword, factionId, committeeId }: CouncilMemberFilters
): CouncilMember[] {
  const trimmedKeyword = keyword.trim();

  return members.filter((member) => {
    if (trimmedKeyword && !member.name.includes(trimmedKeyword)) {
      return false;
    }

    if (factionId !== ALL_FACTIONS && member.faction?.id !== factionId) {
      return false;
    }

    if (
      committeeId !== ALL_COMMITTEES &&
      !member.committees.some((c) => c.id === committeeId)
    ) {
      return false;
    }

    return true;
  });
}

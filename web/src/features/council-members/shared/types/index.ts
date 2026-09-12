export type CouncilMemberFaction = {
  id: string;
  name: string;
  display_name: string;
};

export type CouncilMemberCommittee = {
  id: string;
  name: string;
};

export type CouncilMember = {
  id: string;
  name: string;
  faction: CouncilMemberFaction | null;
  committees: CouncilMemberCommittee[];
};

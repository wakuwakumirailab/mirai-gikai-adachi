import "server-only";

import { createAdminClient } from "@mirai-gikai/supabase";
import type { CouncilMember } from "../../shared/types";

type RawCouncilMember = {
  id: string;
  name: string;
  faction: { id: string; name: string; display_name: string } | null;
  committees: { committee: { id: string; name: string } | null }[];
};

function mapCouncilMember(raw: RawCouncilMember): CouncilMember {
  return {
    id: raw.id,
    name: raw.name,
    faction: raw.faction,
    committees: raw.committees
      .map((c) => c.committee)
      .filter((c): c is { id: string; name: string } => c !== null),
  };
}

/**
 * 有効な議員を全件取得（会派・所属委員会を含む）
 */
export async function findAllCouncilMembers(): Promise<CouncilMember[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("council_members")
    .select(
      `
      id,
      name,
      faction:factions(id, name, display_name),
      committees:council_member_committees(
        committee:committees(id, name)
      )
    `
    )
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch council members:", error);
    return [];
  }

  return (data as unknown as RawCouncilMember[]).map(mapCouncilMember);
}

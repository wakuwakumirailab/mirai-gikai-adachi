import "server-only";

import { findAllCouncilMembers } from "../repositories/council-member-repository";

export async function getAllCouncilMembers() {
  return findAllCouncilMembers();
}

import "server-only";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { findDiscussionsByPetitionNumber } from "../repositories/committee-meeting-repository";

export type PetitionDiscussion = {
  meetingDate: string;
  committeeName: string;
  href: string;
  topicTitle: string;
  conclusion: string | null;
};

/** 請願・陳情が委員会で審査された経過（開催日順、難易度設定を適用済み）を取得する */
export async function getPetitionDiscussions(
  billNumber: string
): Promise<PetitionDiscussion[]> {
  const [rows, level] = await Promise.all([
    findDiscussionsByPetitionNumber(billNumber),
    getDifficultyLevel(),
  ]);
  return rows.map((r) => ({
    meetingDate: r.meetingDate,
    committeeName: r.committeeName,
    href: `/committees/${r.committeeSlug}/${r.sourceDocumentId}`,
    topicTitle: r.topicTitle,
    conclusion:
      level === "hard" ? r.conclusion : r.conclusionEasy || r.conclusion,
  }));
}

import "server-only";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import type { CommitteeMeeting } from "../../shared/types";
import { applyCommitteeDifficulty } from "../../shared/utils/apply-committee-difficulty";
import { findMeetingByDocumentId } from "../repositories/committee-meeting-repository";

/** 会議録検索システムのDocumentID（FINO）で会議詳細を取得する（難易度設定を適用済み） */
export async function getCommitteeMeeting(
  documentId: number
): Promise<CommitteeMeeting | null> {
  const [meeting, level] = await Promise.all([
    findMeetingByDocumentId(documentId),
    getDifficultyLevel(),
  ]);
  return meeting ? applyCommitteeDifficulty(meeting, level) : null;
}

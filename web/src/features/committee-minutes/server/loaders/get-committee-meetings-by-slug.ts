import "server-only";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import type { CommitteeMeeting } from "../../shared/types";
import { applyCommitteeDifficulty } from "../../shared/utils/apply-committee-difficulty";
import { findMeetingsBySlug } from "../repositories/committee-meeting-repository";

/** 指定した委員会（スラッグ）の会議一覧を開催日降順で取得する（難易度設定を適用済み） */
export async function getCommitteeMeetingsBySlug(
  slug: string
): Promise<CommitteeMeeting[]> {
  const [meetings, level] = await Promise.all([
    findMeetingsBySlug(slug),
    getDifficultyLevel(),
  ]);
  return meetings.map((m) => applyCommitteeDifficulty(m, level));
}

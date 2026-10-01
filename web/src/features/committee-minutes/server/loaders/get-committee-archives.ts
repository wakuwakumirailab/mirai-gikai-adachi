import "server-only";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import type { CommitteeArchive, CommitteeMeeting } from "../../shared/types";
import { applyCommitteeDifficulty } from "../../shared/utils/apply-committee-difficulty";
import {
  buildArchives,
  findAllMeetings,
} from "../repositories/committee-meeting-repository";

/**
 * 委員会一覧と全会議を取得する（難易度設定を適用済み）。
 * テーブル未作成の環境（マイグレーション適用前）ではrepositoryが空を返す。
 * それ以外のDB障害はエラーとして伝播させる。
 */
export async function getCommitteeArchives(): Promise<{
  archives: CommitteeArchive[];
  meetings: CommitteeMeeting[];
}> {
  const [meetings, level] = await Promise.all([
    findAllMeetings(),
    getDifficultyLevel(),
  ]);
  return {
    archives: buildArchives(meetings),
    meetings: meetings.map((m) => applyCommitteeDifficulty(m, level)),
  };
}

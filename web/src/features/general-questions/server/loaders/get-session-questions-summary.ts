import "server-only";
import { getCouncilSessionBySlug } from "@/features/council-sessions/server/loaders/get-council-session-by-slug";
import {
  type SessionQuestionsSummary,
  summarizeSessionQuestions,
} from "../../shared/utils/summarize-session-questions";
import { getGeneralQuestionsBySession } from "./get-general-questions-by-session";

export type SessionQuestionsBannerData = SessionQuestionsSummary & {
  /** 例: 令和8年 第3回 */
  sessionLabel: string;
};

/** ホームの一般質問バナー用（会期名・議員数・件数・上位テーマ） */
export async function getSessionQuestionsBannerData(
  sessionSlug: string
): Promise<SessionQuestionsBannerData | null> {
  const session = await getCouncilSessionBySlug(sessionSlug);
  if (!session) return null;
  const questions = await getGeneralQuestionsBySession(session.id);
  if (questions.length === 0) return null;
  return {
    ...summarizeSessionQuestions(questions),
    sessionLabel: session.name.replace(/\s*定例会$/, ""),
  };
}

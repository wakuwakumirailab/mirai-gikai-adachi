import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import { SessionQuestionsOverview } from "../../client/components/session-questions-overview";
import { SessionSummaryLines } from "../../client/components/session-summary-lines";
import type {
  GeneralQuestion,
  SessionQuestionOverview,
} from "../../shared/types";
import { buildTopicGroups } from "../../shared/utils/build-topic-groups";
import type { QuestionView } from "../../shared/utils/question-view";
import { getSessionSourceStage } from "../../shared/utils/source-stage";
import { GeneralQuestionList } from "./general-question-list";
import { QuestionViewTabs } from "./question-view-tabs";
import { SourceStageNotice } from "./source-stage-notice";

interface SessionTopicsViewProps {
  questions: GeneralQuestion[];
  /** セッション単位のオーバービュー（全体3行＋テーマ別3行）。 */
  overview: SessionQuestionOverview;
  sessionSlug: string;
  view: QuestionView;
  difficultyLevel?: DifficultyLevelEnum;
}

export function SessionTopicsView({
  questions,
  overview,
  sessionSlug,
  view,
  difficultyLevel = "normal",
}: SessionTopicsViewProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-16 text-mirai-text-secondary">
        <p>現在、一般質問のデータを準備中です。</p>
        <p className="text-sm mt-2">しばらくお待ちください。</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SourceStageNotice
        stage={getSessionSourceStage(questions)}
        scope="session"
        level={difficultyLevel}
      />
      <SessionSummaryLines lines={overview?.lines} />
      <QuestionViewTabs sessionSlug={sessionSlug} current={view} />
      {view === "members" ? (
        <GeneralQuestionList questions={questions} />
      ) : (
        <SessionQuestionsOverview
          groups={buildTopicGroups(questions)}
          overview={overview}
        />
      )}
    </div>
  );
}

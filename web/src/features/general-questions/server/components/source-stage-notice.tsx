import { Info } from "lucide-react";
import type { QuestionSourceStage } from "../../shared/types";
import { getSourceStageNotice } from "../../shared/utils/source-stage";

interface SourceStageNoticeProps {
  stage: QuestionSourceStage | null | undefined;
  /** session: 定例会の一覧ページ、question: 議員ごとの詳細ページ */
  scope: "session" | "question";
}

/** 質問通告のみ・速報版から作成した一般質問であることを知らせる注記（議案の速報版注記と同じ見た目） */
export function SourceStageNotice({ stage, scope }: SourceStageNoticeProps) {
  if (!stage || stage === "final") return null;

  return (
    <div className="flex items-start gap-2 rounded-lg bg-mirai-surface-grouped px-4 py-3 text-xs leading-relaxed text-mirai-text-secondary">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-mirai-text-muted" />
      <p>{getSourceStageNotice(stage, scope)}</p>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import type { QuestionType } from "../../shared/types";

type QuestionTypeBadgeProps = {
  questionType: QuestionType;
};

/** 代表質問／一般質問の区分バッジ */
export function QuestionTypeBadge({ questionType }: QuestionTypeBadgeProps) {
  return (
    <Badge variant={questionType === "representative" ? "light" : "muted"}>
      {questionType === "representative" ? "代表質問" : "一般質問"}
    </Badge>
  );
}

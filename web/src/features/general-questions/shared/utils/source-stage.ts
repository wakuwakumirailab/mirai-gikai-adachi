import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import type { GeneralQuestion, QuestionSourceStage } from "../types";

/** 答弁待ち（質問通告のみ）のトピックで答弁欄に出す文言 */
export const PENDING_ANSWER_TEXT = "区の答弁は、会議録の公開後に掲載します。";

/**
 * 会期内の質問から、注記に出す元資料の段階を決める。
 * 質問通告のみの質問が1件でもあれば notice、速報版があれば preliminary を優先して返す。
 * すべて正式な会議録なら null（注記なし）。
 */
export function getSessionSourceStage(
  questions: Pick<GeneralQuestion, "source_stage">[]
): Exclude<QuestionSourceStage, "final"> | null {
  if (questions.some((q) => q.source_stage === "notice")) return "notice";
  if (questions.some((q) => q.source_stage === "preliminary"))
    return "preliminary";
  return null;
}

export function getSourceStageNotice(
  stage: Exclude<QuestionSourceStage, "final">,
  scope: "session" | "question",
  level: DifficultyLevelEnum = "normal"
): string {
  if (stage === "notice") {
    if (level === "hard") {
      return scope === "session"
        ? "この定例会の一般質問には、議員が事前に提出した質問通告書をもとに、質問の項目だけを掲載しているものがあります。区の答弁は、会議録の公開後に掲載します。"
        : "この質問は、議員が事前に提出した質問通告書をもとに、質問の項目だけを掲載しています。区の答弁は、会議録の公開後に掲載します。";
    }
    return scope === "session"
      ? "この定例会の一般質問には、議員が前もって出した質問の内容だけをのせているものがあります。区の答弁は、会議録が出たあとにのせます。"
      : "この質問は、議員が前もって出した質問の内容だけをのせています。区の答弁は、会議録が出たあとにのせます。";
  }
  if (level === "hard") {
    return scope === "session"
      ? "この定例会の一般質問には、正式な会議録が確定する前の速報版会議録をもとに作成したものが含まれます。正式な会議録の公開後、内容を見直す場合があります。"
      : "この要約は、正式な会議録が確定する前の速報版会議録をもとに作成しています。正式な会議録の公開後、内容を見直す場合があります。";
  }
  return scope === "session"
    ? "この定例会の一般質問には、正式な会議録が決まる前の速報版をもとに作った内容が含まれます。正式な会議録が出たら、内容を直すことがあります。"
    : "この要約は、正式な会議録が決まる前の速報版をもとに作っています。正式な会議録が出たら、内容を直すことがあります。";
}

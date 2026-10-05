/**
 * 一般質問のチャット表示で使う吹き出しのスタイル。
 * 質問側は「白地・濃い文字・青い枠」、答弁側は「白地・濃い文字・濃いグレーの枠」にして、
 * どちらも文字が読みやすい配色にしつつ、枠の色で話し手を見分けられるようにする。
 * 話し手のいる側の角を小さく丸めて、吹き出しの向きが分かるようにする。
 */

const BUBBLE_BASE = "relative bg-card px-4 py-3 text-mirai-text border-2";

/** 質問する側（右寄せ・青い枠） */
export const QUESTION_BUBBLE = `${BUBBLE_BASE} rounded-2xl rounded-br-md border-primary-accent`;

/** 答える側（左寄せ・濃いグレーの枠） */
export const ANSWER_BUBBLE = `${BUBBLE_BASE} rounded-2xl rounded-bl-md border-mirai-text-muted`;

/** 質問側の話し手ラベルの色 */
export const QUESTION_SPEAKER_LABEL = "text-primary-deep";

/** 質問側のアイコン（丸） */
export const QUESTION_AVATAR =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary-accent bg-card text-primary-accent";

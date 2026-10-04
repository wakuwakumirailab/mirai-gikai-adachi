import { ChevronRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import type { SessionQuestionsBannerData } from "@/features/general-questions/server/loaders/get-session-questions-summary";

type GeneralQuestionsBannerProps = {
  sessionSlug: string;
  /** 取得できない・件数が少ないときは null（従来の説明文だけ表示する） */
  data: SessionQuestionsBannerData | null;
};

// 件数が少ないうちはテーマ別の件数を出しても意味が薄いので、従来の表示にする
const MIN_TOPICS_FOR_SUMMARY = 5;

export function GeneralQuestionsBanner({
  sessionSlug,
  data,
}: GeneralQuestionsBannerProps) {
  const showSummary =
    data !== null && data.topicCount >= MIN_TOPICS_FOR_SUMMARY;

  return (
    <Link
      href={`/sessions/${sessionSlug}/questions`}
      className="flex flex-col gap-3 rounded-2xl border-2 border-primary bg-white px-5 py-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-2">
        <MessageSquare className="size-4 text-primary-accent" />
        <p className="font-bold text-mirai-text">
          {showSummary
            ? `${data.sessionLabel} 代表・一般質問`
            : "代表・一般質問"}
        </p>
        <ChevronRight className="ml-auto size-5 text-mirai-text-muted shrink-0" />
      </div>

      {showSummary ? (
        <>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            区議会議員{data.questionerCount}人が質問した{data.topicCount}
            件の内容を、テーマ別にまとめました。
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {data.topThemes.map((theme) => (
              <li
                key={theme.label}
                className="rounded-full bg-mirai-surface-warm px-2.5 py-0.5 text-xs font-medium text-primary-accent"
              >
                {theme.label} {theme.count}件
              </li>
            ))}
            {data.otherThemeCount > 0 && (
              <li className="px-1 py-0.5 text-xs text-mirai-text-muted">
                ほか{data.otherThemeCount}テーマ
              </li>
            )}
          </ul>
          <p className="text-xs text-mirai-text-muted">議員別でも探せます</p>
        </>
      ) : (
        <p className="text-sm leading-relaxed text-mirai-text-secondary">
          区議会議員が行政・区長に質問した内容をわかりやすく解説します
        </p>
      )}
    </Link>
  );
}

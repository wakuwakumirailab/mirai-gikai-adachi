import { siteConfig } from "@/config/site.config";
import { formatDateWithDots } from "@/lib/utils/date";
import type { CouncilSession } from "../../shared/types";

type CurrentCouncilSessionProps = {
  session: CouncilSession | null;
};

/**
 * ホームの「本日は足立区議会」。
 * スマホでは、見出しとバッジを1段目、会期名と日付を2段目に置く。
 * パソコン（md以上）では、見出し・バッジを左、会期名と日付を右にして、1行に並べる。
 * スマホで文字を大きくしても、見出しが縮んで1文字ずつ折れないようにする
 * （見出しは折り返さず、幅が足りないときはバッジのほうが下の行に回る）。
 */
export function CurrentCouncilSession({ session }: CurrentCouncilSessionProps) {
  return (
    <div className="w-full bg-mirai-surface-warm px-6 py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <h2 className="shrink-0 whitespace-nowrap text-xl font-bold leading-snug text-gray-800">
            本日は{siteConfig.councilName}
          </h2>
          <div
            className={`
            inline-flex items-center justify-center px-4 py-1 rounded-lg border-2 bg-white shrink-0
            ${session == null ? "border-mirai-text-muted" : "border-mirai-session-open"}
            `}
          >
            <span
              className={`
              text-base font-bold leading-[1.48]
              ${session == null ? "text-mirai-text-muted" : "text-mirai-session-open"}
              `}
            >
              {session == null ? "閉会中" : "開会中"}
            </span>
          </div>
        </div>
        {session != null && (
          <p className="flex flex-wrap gap-x-3 text-sm leading-[1.5] md:shrink-0 md:flex-col md:gap-x-0">
            <span>{session.name}</span>
            <span>{formatDateWithDots(session.start_date)}〜</span>
          </p>
        )}
      </div>
    </div>
  );
}

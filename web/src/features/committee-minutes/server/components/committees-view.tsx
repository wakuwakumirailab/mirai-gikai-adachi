import "server-only";
import { ChevronRight, Landmark } from "lucide-react";
import Link from "next/link";
import type { CommitteeArchive, CommitteeMeeting } from "../../shared/types";
import {
  COMMITTEE_TYPE_ORDER,
  getCommitteeTypeLabel,
} from "../../shared/utils/committee-type";
import { formatJapaneseDate } from "../../shared/utils/format-japanese-date";

type Props = {
  archives: CommitteeArchive[];
  meetings: CommitteeMeeting[];
};

export function CommitteesView({ archives, meetings }: Props) {
  const archivesByType = COMMITTEE_TYPE_ORDER.map((type) => ({
    type,
    archives: archives.filter((a) => getCommitteeTypeLabel(a.type) === type),
  })).filter((g) => g.archives.length > 0);

  return (
    <div className="flex flex-col gap-10">
      <header className="rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6 flex flex-col gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-accent bg-white/70 rounded-full px-3 py-1 w-fit">
          <Landmark className="w-3.5 h-3.5" />
          委員会アーカイブ
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-mirai-text leading-snug">
          委員会で話し合われたこと
        </h1>
        <p className="text-sm text-mirai-text-secondary leading-relaxed">
          足立区議会には、テーマごとにくわしく議論する「委員会」があります。
          それぞれの委員会でどんなことが話し合われ、どう決まったのかを、会議ごとにまとめて残していきます。
        </p>
      </header>

      {meetings.length === 0 ? (
        <p className="text-sm text-mirai-text-muted">
          委員会の記録は準備中です。
        </p>
      ) : (
        <>
          {archivesByType.map((group) => (
            <section key={group.type} className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-mirai-text">
                {group.type}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {group.archives.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/committees/${a.slug}`}
                      className="flex items-center justify-between gap-2 rounded-2xl border border-mirai-border bg-white p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        <div className="font-bold text-mirai-text">
                          {a.name}
                        </div>
                        <div className="mt-1 text-xs text-mirai-text-muted">
                          今年{a.meetingCount}回開催・最新{" "}
                          {formatJapaneseDate(a.latestMeetingDate)}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 shrink-0 text-primary-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

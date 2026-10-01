import "server-only";
import { ArrowLeft, CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CommitteeMeeting } from "../../shared/types";
import { getCommitteeTypeLabel } from "../../shared/utils/committee-type";
import { formatJapaneseDate } from "../../shared/utils/format-japanese-date";

type Props = {
  meeting: CommitteeMeeting;
};

export function MeetingDetailView({ meeting }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href={`/committees/${meeting.committeeSlug}`}
          className="inline-flex items-center gap-1 text-sm text-mirai-text-muted hover:text-mirai-text"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          {meeting.committeeName}の一覧へ戻る
        </Link>
        <div className="rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6 flex flex-col gap-2">
          <span className="text-xs font-medium text-primary-accent bg-white/70 rounded-full px-3 py-1 w-fit">
            {getCommitteeTypeLabel(meeting.committeeType)}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-mirai-text leading-snug">
            {meeting.committeeName}
          </h1>
          <p className="flex items-center gap-1.5 text-sm text-mirai-text-secondary">
            <CalendarDays className="w-4 h-4" />
            {formatJapaneseDate(meeting.meetingDate)} 開催
          </p>
          {meeting.summary && (
            <p className="mt-1 text-sm text-mirai-text-secondary leading-relaxed">
              {meeting.summary}
            </p>
          )}
        </div>
      </div>

      {meeting.topics.length === 0 ? (
        <div className="rounded-2xl border border-mirai-border bg-white p-5">
          <p className="text-sm text-mirai-text-secondary leading-relaxed">
            この会議では、会議を運営するための手続きが中心でした。
          </p>
        </div>
      ) : (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-mirai-text">
            この日に話し合われたこと
          </h2>
          <ol className="flex flex-col gap-4">
            {meeting.topics.map((topic) => (
              <li
                key={topic.id}
                className="rounded-2xl border-l-4 border-primary bg-white shadow-sm px-5 py-4"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-mirai-gradient-start text-primary-accent text-xs font-bold flex items-center justify-center">
                    {topic.topicOrder}
                  </span>
                  <h3 className="font-bold text-mirai-text leading-relaxed">
                    {topic.title}
                  </h3>
                </div>

                {topic.relatedBills.length > 0 && (
                  <ul className="mt-2 pl-9 flex flex-col gap-1">
                    {topic.relatedBills.map((b) => (
                      <li key={b.href}>
                        <Link
                          href={b.href}
                          className="inline-flex items-start gap-1 text-xs text-primary-accent hover:underline"
                        >
                          <span className="shrink-0 rounded-full bg-mirai-gradient-end px-2 py-0.5 font-medium">
                            {b.billType === "petition" ? "陳情・請願" : "議案"}
                          </span>
                          <span className="leading-relaxed">{b.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {topic.conclusion && (
                  <div className="mt-3 pl-9">
                    <div className="rounded-xl bg-mirai-gradient-end px-4 py-3">
                      <div className="text-xs font-bold text-primary-accent">
                        結論
                      </div>
                      <p className="mt-1 text-sm text-mirai-text leading-relaxed">
                        {topic.conclusion}
                      </p>
                    </div>
                  </div>
                )}

                {topic.summary && (
                  <p className="mt-3 pl-9 text-sm text-mirai-text-secondary leading-relaxed">
                    {topic.summary}
                  </p>
                )}

                {topic.positions.length > 0 && (
                  <div className="mt-3 pl-9">
                    <div className="text-xs font-bold text-mirai-text-muted">
                      発言者ごとの意見
                    </div>
                    <ul className="mt-2 flex flex-col gap-2">
                      {topic.positions.map((p, i) => (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: 表示専用の固定リスト
                          key={i}
                          className="rounded-xl border border-mirai-border bg-mirai-surface-grouped px-4 py-3"
                        >
                          <div className="flex flex-wrap items-center gap-1.5 text-xs">
                            <span className="font-bold text-mirai-text">
                              {p.speaker}
                            </span>
                            {p.party && (
                              <span className="rounded-full bg-white px-2 py-0.5 text-mirai-text-secondary">
                                {p.party}
                              </span>
                            )}
                            {p.role === "executive" && (
                              <span className="rounded-full bg-white px-2 py-0.5 text-mirai-text-secondary">
                                区の説明
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-mirai-text-secondary leading-relaxed">
                            {p.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className="rounded-2xl border border-mirai-border bg-white p-5">
        <a
          href={meeting.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-bold text-primary-accent hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          会議録の原文を見る（足立区議会）
        </a>
        <p className="mt-2 text-xs text-mirai-text-muted">
          この画面の内容は、会議録をもとにAIが要約したものです。正確な発言は原文をご確認ください。
        </p>
      </div>
    </div>
  );
}

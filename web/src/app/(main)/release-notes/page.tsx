import type { Metadata } from "next";
import { Bell, CalendarClock } from "lucide-react";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { formatJapaneseDate } from "@/features/committee-minutes/shared/utils/format-japanese-date";
import { getDataCoverage } from "@/features/release-notes/server/loaders/get-data-coverage";
import {
  getLatestUpdateDate,
  releaseNotes,
  upcomingPlans,
} from "@/features/release-notes/shared/release-notes";

export const metadata: Metadata = {
  title: `更新情報 | ${siteConfig.siteName}`,
  description: `${siteConfig.siteName}の更新履歴と、今後の更新予定です。`,
};

const TAG_STYLE: Record<string, string> = {
  機能: "bg-mirai-info-blue/40 text-primary-deep",
  データ: "bg-emerald-100 text-emerald-800",
  改善: "bg-amber-100 text-amber-800",
};

export default async function ReleaseNotesPage() {
  const coverage = await getDataCoverage();
  const latestUpdate = getLatestUpdateDate();

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <Bell className="size-3.5" />
            更新情報
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            サイトの更新履歴と今後の予定
          </h1>
          {latestUpdate && (
            <p className="text-sm leading-relaxed text-mirai-text-secondary">
              最終更新日：{formatJapaneseDate(latestUpdate)}
            </p>
          )}
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
            掲載しているデータ
          </h2>
          <p className="text-xs leading-relaxed text-mirai-text-secondary">
            それぞれ、どの会期・日付のデータまで載っているかの目安です。
          </p>
          <ul className="flex flex-col divide-y divide-mirai-border rounded-2xl border border-mirai-border bg-white">
            {coverage.map((item) => (
              <li
                key={item.label}
                className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="text-sm font-bold text-mirai-text">
                  {item.label}
                </span>
                <span className="text-sm text-mirai-text-secondary">
                  {item.latest ?? "準備中"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
            更新履歴
          </h2>
          <ul className="flex flex-col gap-3">
            {releaseNotes.map((note) => (
              <li
                key={`${note.date}-${note.text}`}
                className="flex flex-col gap-1.5 rounded-2xl border border-mirai-border bg-white px-4 py-3"
              >
                <div className="flex items-center gap-2 text-xs text-mirai-text-muted">
                  <time dateTime={note.date}>
                    {formatJapaneseDate(note.date)}
                  </time>
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${TAG_STYLE[note.tag] ?? ""}`}
                  >
                    {note.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-mirai-text">
                  {note.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="flex items-center gap-2 border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
            <CalendarClock className="size-5 text-primary-accent" />
            今後の予定
          </h2>
          <ul className="flex flex-col gap-2 rounded-2xl border border-mirai-border bg-white px-4 py-3">
            {upcomingPlans.map((plan) => (
              <li
                key={plan}
                className="flex items-start gap-2 text-sm leading-relaxed text-mirai-text"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {plan}
              </li>
            ))}
          </ul>
          <p className="text-xs text-mirai-text-muted">
            予定は変わることがあります。
          </p>
        </section>
      </div>
    </Container>
  );
}

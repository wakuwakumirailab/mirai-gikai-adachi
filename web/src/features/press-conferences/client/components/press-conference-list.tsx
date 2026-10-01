"use client";

import { ArrowRight, CalendarDays, Megaphone } from "lucide-react";
import Link from "next/link";
import type { PressConference } from "../../shared/types";

type Props = {
  pressConferences: PressConference[];
};

export function PressConferenceList({ pressConferences }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
          <Megaphone className="size-3.5" />
          区長記者会見
        </span>
        <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
          足立区長の記者会見
        </h1>
        <p className="text-sm leading-relaxed text-mirai-text-secondary">
          区長記者会見の内容を、わかりやすくお届けします。記者の方とのやりとりも掲載しています。
        </p>
      </header>

      <div className="flex flex-col gap-3">
        {pressConferences.map((pc) => {
          const announcements = pc.items.filter(
            (item) => item.itemType === "announcement"
          );
          const qaCount = pc.items.filter(
            (item) => item.itemType === "qa"
          ).length;
          const formattedDate = new Date(pc.heldAt).toLocaleDateString(
            "ja-JP",
            { year: "numeric", month: "long", day: "numeric" }
          );

          return (
            <Link
              key={pc.id}
              href={`/press-conferences/${pc.slug}`}
              className="group block rounded-2xl border border-mirai-border bg-white hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              {/* お知らせバナー風ヘッダー */}
              <div className="rounded-t-2xl bg-gradient-to-r from-mirai-gradient-start to-mirai-gradient-end px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-accent">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-sm font-medium">{formattedDate}</span>
                </div>
                <span className="text-xs text-primary-accent bg-white/60 rounded-full px-2 py-0.5 font-medium">
                  区長定例記者会見
                </span>
              </div>

              {/* 発表トピック一覧 */}
              <div className="px-5 py-4 flex flex-col gap-3">
                {announcements.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-mirai-text-muted">
                      <Megaphone className="w-3.5 h-3.5" />
                      発表事項
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {announcements.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-start gap-2 text-sm text-mirai-text"
                        >
                          <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-primary" />
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1 border-t border-mirai-border">
                  <span className="text-xs text-mirai-text-muted">
                    質疑応答 {qaCount}件
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-accent group-hover:gap-2 transition-all">
                    詳しく読む
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

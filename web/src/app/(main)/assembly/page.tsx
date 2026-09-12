import type { Metadata } from "next";
import { Archive, ChevronRight, Landmark, Megaphone } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { CurrentCouncilSession } from "@/features/council-sessions/client/components/current-council-session";
import { getCurrentCouncilSession } from "@/features/council-sessions/server/loaders/get-current-council-session";
import { siteConfig } from "@/config/site.config";
import { getJapanTime } from "@/lib/utils/date";

export const metadata: Metadata = {
  title: `議会 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の定例会・委員会・区長記者会見をまとめて確認できます。`,
};

const CHILD_LINKS = [
  {
    href: "/committees",
    icon: Landmark,
    label: "委員会",
    description: "委員会でどんな質疑・答弁があったかをまとめています",
  },
  {
    href: "/press-conferences",
    icon: Megaphone,
    label: "区長記者会見",
    description: "区長が定例で発表している内容をまとめています",
  },
  {
    href: "/archive",
    icon: Archive,
    label: "過去の資料",
    description: "終了した定例会・議案、過去の予算を年度別に確認できます",
  },
] as const;

export default async function AssemblyPage() {
  const currentSession = await getCurrentCouncilSession(getJapanTime());

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <Landmark className="size-3.5" />
            議会
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            {siteConfig.councilName}
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            今開かれている定例会や、委員会・区長記者会見の内容を確認できます。
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-mirai-border">
          <CurrentCouncilSession session={currentSession} />
          {currentSession?.slug && (
            <Link
              href={`/sessions/${currentSession.slug}/bills`}
              className="flex items-center justify-between gap-2 bg-white px-6 py-4 text-sm font-bold text-primary-accent hover:bg-mirai-surface-grouped"
            >
              この定例会の議案を見る
              <ChevronRight className="size-4 shrink-0" />
            </Link>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CHILD_LINKS.map(({ href, icon: Icon, label, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-full flex-col gap-2 rounded-2xl border border-mirai-border bg-white p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
              >
                <Icon className="size-5 text-primary-accent" />
                <span className="font-bold text-mirai-text">{label}</span>
                <span className="text-xs leading-relaxed text-mirai-text-secondary">
                  {description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

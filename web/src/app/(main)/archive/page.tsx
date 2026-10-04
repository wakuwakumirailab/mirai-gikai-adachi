import type { Metadata } from "next";
import {
  Archive,
  CalendarDays,
  ChevronLeft,
  ClipboardList,
  FileText,
  MessageSquare,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `過去の資料 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の過去の議案、代表・一般質問、予算、請願・陳情を確認できます。`,
};

const ARCHIVE_LINKS = [
  {
    href: "/archive/bills",
    icon: CalendarDays,
    label: "過去の議案",
    description: "終了した定例会と、そこで審議された議案を年ごとに確認できます",
  },
  {
    href: "/archive/questions",
    icon: MessageSquare,
    label: "過去の代表・一般質問",
    description: "終了した定例会で行われた代表・一般質問を年ごとに確認できます",
  },
  {
    href: "/budget",
    icon: Wallet,
    label: "過去の予算",
    description: "各定例会の各部予算の方向性と主要施策を確認できます",
  },
  {
    href: "/petitions",
    icon: FileText,
    label: "請願・陳情",
    description: "過去に審査された分も含め、すべての請願・陳情を確認できます",
  },
  ...(siteConfig.features.jimuJigyo
    ? [
        {
          href: "/jimu-jigyo",
          icon: ClipboardList,
          label: "事務事業評価",
          description:
            "区が実施する事業のKPI・予算・効率の動向を年度ごとに分析します",
        },
      ]
    : []),
];

export default function ArchivePage() {
  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <Link
          href="/assembly"
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          議会に戻る
        </Link>

        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <Archive className="size-3.5" />
            過去の資料
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            過去の議案・質問・予算
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            終了した定例会の議案や代表・一般質問、過去の予算、請願・陳情をまとめています。
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {ARCHIVE_LINKS.map(({ href, icon: Icon, label, description }) => (
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

import "server-only";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/layouts/container";

type Props = {
  /** ヘッダーのバッジ（例: 過去の議案） */
  badge: string;
  icon: ReactNode;
  title: string;
  description: string;
  /** 戻り先。省略すると過去の資料の入口 */
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
};

/** 過去の資料の種類別ページ共通の枠（戻るリンク＋水色ヘッダー） */
export function ArchivePageShell({
  badge,
  icon,
  title,
  description,
  backHref = "/archive",
  backLabel = "過去の資料に戻る",
  children,
}: Props) {
  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <Link
          href={backHref}
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            {icon}
            {badge}
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            {description}
          </p>
        </header>

        {children}
      </div>
    </Container>
  );
}

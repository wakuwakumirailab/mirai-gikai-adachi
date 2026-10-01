import { ChevronLeft, FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { getPetitions } from "@/features/bills/server/loaders/get-petitions";
import {
  getCardStatusLabel,
  getStatusVariant,
} from "@/features/bills/shared/utils/bill-status";
import { formatDateJST } from "@/lib/utils/date";
import { PetitionList } from "@/features/bills/client/components/petitions/petition-list";

export const metadata: Metadata = {
  title: `請願・陳情 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}に提出された請願・陳情の審査状況を一覧で確認できます。`,
};

export default async function PetitionsPage() {
  const petitions = await getPetitions();
  const items = petitions.map((petition) => ({
    id: petition.id,
    billNumber: petition.bill_number,
    name: petition.name,
    committeeName: petition.committees?.name ?? null,
    statusLabel: petition.status_note ?? getCardStatusLabel(petition.status),
    statusVariant: getStatusVariant(petition.status),
    publishedDate: petition.published_at
      ? formatDateJST(petition.published_at)
      : null,
  }));

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-6">
        <Link
          href="/assembly"
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          議会に戻る
        </Link>

        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <FileText className="size-3.5" />
            請願・陳情
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            {siteConfig.councilName}の請願・陳情
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            区民から提出され、委員会で審査されている請願・陳情の一覧です。継続審査中のものは、次の定例会以降も審査が続きます。
          </p>
        </header>

        {petitions.length === 0 ? (
          <p className="py-12 text-center text-sm text-mirai-text-muted">
            公開中の請願・陳情はありません。
          </p>
        ) : (
          <PetitionList petitions={items} />
        )}
      </div>
    </Container>
  );
}

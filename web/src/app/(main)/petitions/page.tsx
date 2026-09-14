import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layouts/container";
import { getPetitions } from "@/features/bills/server/loaders/get-petitions";
import {
  getCardStatusLabel,
  getStatusVariant,
} from "@/features/bills/shared/utils/bill-status";
import { siteConfig } from "@/config/site.config";
import { formatDateJST } from "@/lib/utils/date";

export const metadata: Metadata = {
  title: `請願・陳情 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}に提出された請願・陳情の審査状況を一覧で確認できます。`,
};

export default async function PetitionsPage() {
  const petitions = await getPetitions();

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

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-mirai-text">請願・陳情</h1>
          <p className="mt-1 text-sm text-mirai-text-secondary">
            区民から提出され、委員会で審査されている請願・陳情の一覧です。継続審査中のものは、次の定例会以降も審査が続きます。
          </p>
        </div>

        {petitions.length === 0 ? (
          <p className="py-12 text-center text-sm text-mirai-text-muted">
            公開中の請願・陳情はありません。
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-mirai-border rounded-2xl border border-mirai-border bg-white">
            {petitions.map((petition) => (
              <li
                key={petition.id}
                className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-mirai-text-muted">
                    {petition.bill_number}
                    {petition.committees?.name && (
                      <> ・ {petition.committees.name}</>
                    )}
                  </span>
                  <span className="font-medium text-mirai-text">
                    {petition.name}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-xs text-mirai-text-muted">
                  {petition.published_at && (
                    <time>{formatDateJST(petition.published_at)}</time>
                  )}
                  <Badge variant={getStatusVariant(petition.status)}>
                    {petition.status_note ??
                      getCardStatusLabel(petition.status)}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}

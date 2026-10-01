import { ChevronLeft, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site.config";
import { BillContent } from "@/features/bills/server/components/bill-detail/bill-content";
import { getPetitionById } from "@/features/bills/server/loaders/get-petition-by-id";
import {
  getCardStatusLabel,
  getStatusVariant,
} from "@/features/bills/shared/utils/bill-status";
import { PetitionDiscussions } from "@/features/committee-minutes/server/components/petition-discussions";
import { getPetitionDiscussions } from "@/features/committee-minutes/server/loaders/get-petition-discussions";
import { formatDateJST } from "@/lib/utils/date";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const petition = await getPetitionById(id);

  if (!petition) {
    return { title: "請願・陳情が見つかりません" };
  }

  return {
    title: `${petition.bill_content?.title ?? petition.name} | ${siteConfig.siteName}`,
    description: petition.bill_content?.summary ?? undefined,
  };
}

export default async function PetitionDetailPage({ params }: Props) {
  const { id } = await params;
  const petition = await getPetitionById(id);

  if (!petition) {
    notFound();
  }

  const discussions = await getPetitionDiscussions(petition.bill_number);
  const displayTitle = petition.bill_content?.title ?? petition.name;
  const displaySummary = petition.bill_content?.summary;

  return (
    <Container className="py-10">
      <div className="flex flex-col gap-6">
        <Link
          href="/petitions"
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          請願・陳情の一覧に戻る
        </Link>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-mirai-text-muted">
            {petition.bill_number}
          </span>
          <h1 className="text-2xl font-bold text-mirai-text">{displayTitle}</h1>
          <p className="text-sm text-mirai-text-secondary">{petition.name}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={getStatusVariant(petition.status)}>
              {petition.status_note ?? getCardStatusLabel(petition.status)}
            </Badge>
            {petition.published_at && (
              <span className="text-xs text-mirai-text-muted">
                {formatDateJST(petition.published_at)}
              </span>
            )}
          </div>
        </div>

        {displaySummary && (
          <p className="leading-relaxed text-mirai-text">{displaySummary}</p>
        )}

        <BillContent bill={petition} />

        <PetitionDiscussions discussions={discussions} />

        {petition.source_url && (
          <a
            href={petition.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-sm text-primary-accent hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            議事録を見る
          </a>
        )}
      </div>
    </Container>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { getBillById } from "@/features/bills/server/loaders/get-bill-by-id";
import { BillDetailLayout } from "@/features/bills/server/components/bill-detail/bill-detail-layout";
import { getCouncilSessionById } from "@/features/council-sessions/server/loaders/get-council-session-by-id";
import { env } from "@/lib/env";

interface BillDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BillDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const bill = await getBillById(id);

  if (!bill) {
    return {
      title: "議案が見つかりません",
    };
  }

  // bill_contentのsummaryがあればそれを使用、なければデフォルト値を使用
  const description = bill.bill_content?.summary || "議案の詳細情報";
  const defaultOgpUrl = new URL("/img/ogp-adachi.png", env.webUrl).toString();

  // シェア用OGP画像（share_thumbnail_url > thumbnail_url > デフォルト）
  // ページ表示用のthumbnail_urlとは別に、SNSシェア用の画像を優先
  const shareImageUrl =
    bill.share_thumbnail_url || bill.thumbnail_url || defaultOgpUrl;

  return {
    title: bill.name,
    description: description,
    alternates: {
      canonical: `/bills/${bill.id}`,
    },
    openGraph: {
      title: bill.name,
      description: description,
      type: "article",
      publishedTime: bill.published_at ?? undefined,
      modifiedTime: bill.updated_at,
      images: [
        {
          url: shareImageUrl,
          alt: `${bill.name} のOGPイメージ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: bill.name,
      description: description,
      images: [shareImageUrl],
    },
  };
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { id } = await params;
  const [billWithContent, currentDifficulty] = await Promise.all([
    getBillById(id),
    getDifficultyLevel(),
  ]);

  if (!billWithContent) {
    notFound();
  }

  const backToSession = billWithContent.council_session_id
    ? await getCouncilSessionById(billWithContent.council_session_id)
    : null;

  return (
    <BillDetailLayout
      bill={billWithContent}
      currentDifficulty={currentDifficulty}
      backLink={
        backToSession?.slug
          ? {
              href: `/sessions/${backToSession.slug}/bills`,
              label: `${backToSession.name}の議案一覧に戻る`,
            }
          : { href: "/assembly", label: "議会に戻る" }
      }
    />
  );
}

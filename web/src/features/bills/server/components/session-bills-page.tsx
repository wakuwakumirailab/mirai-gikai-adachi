import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CouncilSession } from "@/features/council-sessions/shared/types";
import { BillListWithStatusFilter } from "@/features/council-sessions/client/components/bill-list-with-status-filter";
import { formatDateJST } from "@/lib/utils/date";
import type { BillStatusEnum, BillWithContent } from "../../shared/types";
import {
  getCardStatusLabel,
  getStatusVariant,
} from "../../shared/utils/bill-status";
import { FeaturedBillSection } from "./featured-bill-section";
import { PreliminarySourceNotice } from "./preliminary-source-notice";

interface AwaitingContentBill {
  id: string;
  bill_number: string;
  name: string;
  status: BillStatusEnum;
  status_note: string | null;
  published_at: string | null;
}

interface SessionBillsPageProps {
  session: CouncilSession;
  bills: BillWithContent[];
  /** 指定管理者の指定・契約等、解説なしで一覧のみ表示する議案の件数 */
  proceduralBillCount?: number;
  /** 上程済みだがわかりやすい解説がまだ無い議案（委員会審査待ちの新会期など） */
  awaitingContentBills?: AwaitingContentBill[];
}

export function SessionBillsPage({
  session,
  bills,
  proceduralBillCount = 0,
  awaitingContentBills = [],
}: SessionBillsPageProps) {
  const startDate = new Date(session.start_date);
  const endDate = new Date(session.end_date ?? session.start_date);
  const sessionDescription = `${startDate.getFullYear()}.${startDate.getMonth() + 1}月〜${endDate.getMonth() + 1}月に実施された${session.name}`;

  const featuredBills = bills.filter((b) => b.is_featured);
  const hasPreliminarySource = bills.some(
    (b) => b.bill_content?.is_preliminary_source
  );
  const roundMatch = session.name.match(/第(\d+)回/);
  const eyebrowLabel = roundMatch
    ? `${startDate.getFullYear()}年 第${roundMatch[1]}回`
    : `${startDate.getFullYear()}年`;

  return (
    <div className="flex flex-col gap-16">
      {/* ヘッダー */}
      <div className="flex flex-col gap-6">
        <Link
          href="/assembly"
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          議会に戻る
        </Link>

        <div className="flex flex-col gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-mirai-surface-tag px-3 py-1 text-xs font-medium text-primary-accent">
            <Calendar className="size-3.5" />
            {eyebrowLabel}
          </span>
          <h1 className="text-[28px] font-bold text-black leading-[1.4]">
            {session.name}に上程された議案
          </h1>
          <p className="text-xs font-medium text-mirai-text">
            {sessionDescription}・{bills.length}件
          </p>
        </div>

        {hasPreliminarySource && <PreliminarySourceNotice scope="session" />}
      </div>

      {/* 注目の議案 */}
      <FeaturedBillSection bills={featuredBills} />

      {/* 全議案リスト（ステータスフィルター付き） */}
      {bills.length === 0 && awaitingContentBills.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground">
          わかりやすい解説つきの議案は準備中です
        </p>
      ) : (
        bills.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-[22px] font-bold text-black leading-[1.48]">
              全議案一覧
            </h2>
            <BillListWithStatusFilter bills={bills} />
          </section>
        )
      )}

      {/* 解説準備中の議案（委員会審査待ちなどでbill_contentsが未作成のもの） */}
      {awaitingContentBills.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-[22px] font-bold text-black leading-[1.48]">
            解説準備中の議案（{awaitingContentBills.length}件）
          </h2>
          <p className="text-sm text-mirai-text-secondary">
            委員会での審査が済み次第、わかりやすい解説を順次公開します。
          </p>
          <ul className="flex flex-col divide-y divide-mirai-border rounded-2xl border border-mirai-border bg-white">
            {awaitingContentBills.map((bill) => (
              <li key={bill.id} className="flex flex-col gap-1.5 px-4 py-3">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-mirai-text-muted">
                      {bill.bill_number}
                    </span>
                    <span className="font-medium text-mirai-text">
                      {bill.name}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-xs text-mirai-text-muted">
                    {bill.published_at && (
                      <time>{formatDateJST(bill.published_at)}</time>
                    )}
                    <Badge variant={getStatusVariant(bill.status)}>
                      {bill.status_note ?? getCardStatusLabel(bill.status)}
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* その他の議案（事務手続き議案）への導線 */}
      {proceduralBillCount > 0 && (
        <Link
          href={`/sessions/${session.slug}/other-bills`}
          className="flex items-center justify-between gap-2 rounded-2xl border border-mirai-border bg-white px-5 py-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
        >
          <div>
            <p className="font-bold text-mirai-text">
              その他の議案（{proceduralBillCount}件）
            </p>
            <p className="mt-0.5 text-sm text-mirai-text-secondary">
              指定管理者の指定・契約・購入など、事務手続き的な議案を一覧で確認できます
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-mirai-text-muted shrink-0" />
        </Link>
      )}

      {/* 区議会リンク */}
      {session.council_url && (
        <div className="flex items-center gap-1 text-[13px] font-medium text-mirai-text">
          {startDate.getFullYear()}年{session.name}に上程された全ての議案は
          <a
            href={session.council_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1"
          >
            足立区議会情報へ
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      )}

      {/* 過去の資料へのリンク */}
      <Link
        href="/archive"
        className="group flex items-center justify-between gap-2 rounded-2xl border border-mirai-border bg-white px-5 py-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
      >
        <p className="font-bold text-mirai-text">過去の資料一覧へ</p>
        <ChevronRight className="w-5 h-5 text-mirai-text-muted shrink-0" />
      </Link>
    </div>
  );
}

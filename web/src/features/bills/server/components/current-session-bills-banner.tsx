import { Gavel, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { CouncilSession } from "@/features/council-sessions/shared/types";
import type { BillStatusEnum } from "../../shared/types";
import {
  getCardStatusLabel,
  getStatusVariant,
} from "../../shared/utils/bill-status";

interface CurrentSessionBill {
  id: string;
  bill_number: string;
  name: string;
  status: BillStatusEnum;
  status_note: string | null;
}

interface CurrentSessionBillsBannerProps {
  session: CouncilSession;
  bills: CurrentSessionBill[];
  previewCount?: number;
}

export function CurrentSessionBillsBanner({
  session,
  bills,
  previewCount = 5,
}: CurrentSessionBillsBannerProps) {
  if (bills.length === 0) {
    return null;
  }

  const previewBills = bills.slice(0, previewCount);
  const remainingCount = bills.length - previewBills.length;

  return (
    <Link
      href={`/sessions/${session.slug}/bills`}
      className="flex flex-col gap-3 rounded-2xl border-2 border-primary bg-white px-5 py-4 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center gap-2">
        <Gavel className="size-4 text-primary-accent" />
        <p className="font-bold text-mirai-text">
          今回の定例会の議案（{bills.length}件）
        </p>
        <ChevronRight className="ml-auto size-5 text-mirai-text-muted shrink-0" />
      </div>

      <div className="flex flex-col gap-2">
        {previewBills.map((bill) => (
          <div
            key={bill.id}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <span className="text-mirai-text truncate">
              {bill.bill_number} {bill.name}
            </span>
            <Badge variant={getStatusVariant(bill.status)} className="shrink-0">
              {bill.status_note ?? getCardStatusLabel(bill.status)}
            </Badge>
          </div>
        ))}
        {remainingCount > 0 && (
          <p className="text-xs text-mirai-text-muted">他{remainingCount}件…</p>
        )}
      </div>

      <p className="text-xs text-mirai-text-muted">
        わかりやすい解説は委員会審査後に順次公開します
      </p>
    </Link>
  );
}

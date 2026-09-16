"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { BillWithContent } from "@/features/bills/shared/types";
import { CompactBillCard } from "@/features/bills/client/components/bill-list/compact-bill-card";

type FilterType = "all" | "approved" | "rejected" | "other";
const ALL_CATEGORIES = "all";

type Props = {
  bills: BillWithContent[];
};

function getFilterCounts(bills: BillWithContent[]) {
  const approved = bills.filter((b) => b.status === "approved").length;
  const rejected = bills.filter((b) => b.status === "rejected").length;
  const other = bills.length - approved - rejected;

  return { all: bills.length, approved, rejected, other };
}

function filterBillsByStatus(
  bills: BillWithContent[],
  filter: FilterType
): BillWithContent[] {
  switch (filter) {
    case "approved":
      return bills.filter((b) => b.status === "approved");
    case "rejected":
      return bills.filter((b) => b.status === "rejected");
    case "other":
      return bills.filter(
        (b) => b.status !== "approved" && b.status !== "rejected"
      );
    default:
      return bills;
  }
}

function getCategoryOptions(bills: BillWithContent[]) {
  const map = new Map<string, { id: string; label: string; count: number }>();
  for (const bill of bills) {
    for (const tag of bill.tags ?? []) {
      const existing = map.get(tag.id);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(tag.id, { id: tag.id, label: tag.label, count: 1 });
      }
    }
  }
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label, "ja"));
}

export function BillListWithStatusFilter({ bills }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES);
  const counts = getFilterCounts(bills);
  const categoryOptions = getCategoryOptions(bills);

  const filteredBills = filterBillsByStatus(bills, activeFilter).filter(
    (bill) =>
      activeCategory === ALL_CATEGORIES ||
      (bill.tags ?? []).some((tag) => tag.id === activeCategory)
  );

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "ALL", count: counts.all },
    { key: "approved", label: "可決", count: counts.approved },
    { key: "rejected", label: "否決", count: counts.rejected },
    { key: "other", label: "その他", count: counts.other },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* ステータスフィルターボタン */}
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Button
            key={filter.key}
            variant="ghost"
            onClick={() => setActiveFilter(filter.key)}
            className={`h-[29px] px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              activeFilter === filter.key
                ? "bg-mirai-gradient text-black hover:bg-mirai-gradient"
                : "bg-mirai-surface-grouped text-mirai-text-muted hover:bg-mirai-surface-muted"
            }`}
          >
            {filter.label} {filter.count}
          </Button>
        ))}
      </div>

      {/* カテゴリフィルターボタン */}
      {categoryOptions.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-mirai-text-secondary">
            カテゴリ
          </span>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="ghost"
              onClick={() => setActiveCategory(ALL_CATEGORIES)}
              className={`h-[29px] px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                activeCategory === ALL_CATEGORIES
                  ? "bg-mirai-gradient text-black hover:bg-mirai-gradient"
                  : "bg-mirai-surface-grouped text-mirai-text-muted hover:bg-mirai-surface-muted"
              }`}
            >
              ALL {counts.all}
            </Button>
            {categoryOptions.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                onClick={() => setActiveCategory(category.id)}
                className={`h-[29px] px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                  activeCategory === category.id
                    ? "bg-mirai-gradient text-black hover:bg-mirai-gradient"
                    : "bg-mirai-surface-grouped text-mirai-text-muted hover:bg-mirai-surface-muted"
                }`}
              >
                {category.label} {category.count}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 議案リスト */}
      {filteredBills.length === 0 ? (
        <p className="text-center py-12 text-muted-foreground">
          該当する議案がありません
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredBills.map((bill) => (
            <Link key={bill.id} href={`/bills/${bill.id}`}>
              <CompactBillCard bill={bill} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

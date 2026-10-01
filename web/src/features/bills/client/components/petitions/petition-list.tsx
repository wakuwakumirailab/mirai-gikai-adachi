"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type PetitionListItem = {
  id: string;
  billNumber: string | null;
  name: string;
  committeeName: string | null;
  statusLabel: string;
  statusVariant: "light" | "default" | "dark" | "muted";
  publishedDate: string | null;
};

const STATUS_ORDER = ["新規付託", "継続審査中", "採択", "不採択"];
const ALL = "all";

function FilterChips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const items = [ALL, ...options];
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold text-mirai-text-secondary">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = item === value;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(item)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                active
                  ? "border-primary-accent bg-primary-accent text-white"
                  : "border-mirai-border bg-white text-mirai-text-secondary hover:border-primary/50"
              )}
            >
              {item === ALL ? "すべて" : item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PetitionList({ petitions }: { petitions: PetitionListItem[] }) {
  const [status, setStatus] = useState(ALL);
  const [committee, setCommittee] = useState(ALL);

  const statusOptions = useMemo(() => {
    const labels = Array.from(new Set(petitions.map((p) => p.statusLabel)));
    return labels.sort((a, b) => {
      const ia = STATUS_ORDER.indexOf(a);
      const ib = STATUS_ORDER.indexOf(b);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
  }, [petitions]);

  const committeeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          petitions.map((p) => p.committeeName).filter((n): n is string => !!n)
        )
      ).sort((a, b) => a.localeCompare(b, "ja")),
    [petitions]
  );

  const filtered = petitions.filter(
    (p) =>
      (status === ALL || p.statusLabel === status) &&
      (committee === ALL || p.committeeName === committee)
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-mirai-border bg-white p-4">
        <FilterChips
          label="審査状況"
          options={statusOptions}
          value={status}
          onChange={setStatus}
        />
        <FilterChips
          label="委員会"
          options={committeeOptions}
          value={committee}
          onChange={setCommittee}
        />
      </div>

      <p className="text-sm text-mirai-text-secondary" aria-live="polite">
        {filtered.length}件
      </p>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-mirai-text-muted">
          条件に合う請願・陳情はありません。
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-mirai-border rounded-2xl border border-mirai-border bg-white">
          {filtered.map((petition) => (
            <li
              key={petition.id}
              className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-mirai-text-muted">
                  {petition.billNumber}
                  {petition.committeeName && <> ・ {petition.committeeName}</>}
                </span>
                <Link
                  href={`/petitions/${petition.id}`}
                  className="font-medium text-mirai-text hover:text-primary-accent hover:underline"
                >
                  {petition.name}
                </Link>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-xs text-mirai-text-muted">
                {petition.publishedDate && (
                  <time>{petition.publishedDate}</time>
                )}
                <Badge variant={petition.statusVariant}>
                  {petition.statusLabel}
                </Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

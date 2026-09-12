"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  selectedIds: Set<string>;
  onChange: (nextSelectedIds: Set<string>) => void;
};

/**
 * 会派・委員会などをチェックボックスで複数選択する絞り込みUI。
 * 選択なし = 絞り込みなし（全件表示）。
 */
export function CheckboxFilterPopover({
  label,
  options,
  selectedIds,
  onChange,
}: Props) {
  function toggle(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onChange(next);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full justify-between border-mirai-border bg-white font-normal",
            selectedIds.size > 0 && "border-primary text-primary-accent"
          )}
        >
          <span>
            {label}
            {selectedIds.size > 0 ? `（${selectedIds.size}）` : ""}
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="flex flex-col gap-1">
          {options.length === 0 ? (
            <p className="px-2 py-1.5 text-sm text-mirai-text-muted">
              選択肢がありません
            </p>
          ) : (
            options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-mirai-text hover:bg-mirai-surface-grouped"
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(option.id)}
                  onChange={() => toggle(option.id)}
                  className="size-4 rounded border-mirai-border text-primary-accent accent-primary-accent"
                />
                {option.label}
              </label>
            ))
          )}
          {selectedIds.size > 0 && (
            <Button
              type="button"
              variant="ghost"
              className="mt-1 h-8 justify-start px-2 text-xs text-mirai-text-muted"
              onClick={() => onChange(new Set())}
            >
              すべて解除
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

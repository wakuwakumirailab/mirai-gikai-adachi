"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { isPrimaryNavActive, PRIMARY_NAV_LINKS } from "./primary-nav";

/**
 * 画面下部固定のモバイル用ナビゲーションタブバー。
 * sm以上ではヘッダーのPrimaryNavが同じ役割を担うため非表示にする。
 */
export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex items-stretch border-t border-mirai-border bg-white pb-[env(safe-area-inset-bottom)] sm:hidden"
      aria-label="主要ナビゲーション"
    >
      {PRIMARY_NAV_LINKS.map(({ href, label, icon: Icon, exact }) => {
        const isActive = isPrimaryNavActive(pathname, href, exact);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors",
              isActive
                ? "text-primary-accent"
                : "text-mirai-text-muted hover:text-mirai-text"
            )}
          >
            <Icon className="size-5 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

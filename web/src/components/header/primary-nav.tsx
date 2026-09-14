"use client";

import { BookOpen, Home, Landmark, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "ホーム", icon: Home, exact: true },
  { href: "/assembly", label: "議会", icon: Landmark, exact: false },
  { href: "/budget", label: "予算", icon: Wallet, exact: false },
  { href: "/members", label: "議員", icon: Users, exact: false },
  { href: "/learn", label: "学ぶ", icon: BookOpen, exact: false },
] as const;

export function isPrimaryNavActive(
  pathname: string,
  href: string,
  exact: boolean
): boolean {
  return exact ? pathname === href : pathname.startsWith(href);
}

/**
 * ヘッダーの主要ナビゲーション（ホーム・議会・予算・議員・学ぶ）。
 * 狭い画面では収まらないため sm 以上でのみ表示し、
 * それ未満の画面幅では BottomNav（画面下部の固定タブバー）が同じ役割を担う。
 */
export function PrimaryNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden items-center gap-1 sm:flex"
      aria-label="主要ナビゲーション"
    >
      {PRIMARY_NAV_LINKS.map(({ href, label, icon: Icon, exact }) => {
        const isActive = isPrimaryNavActive(pathname, href, exact);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "text-primary-accent"
                : "text-mirai-text-muted hover:text-mirai-text"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

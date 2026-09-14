"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { DifficultySelector } from "@/features/bill-difficulty/client/components/difficulty-selector";
import type { DifficultyLevelEnum } from "@/features/bill-difficulty/shared/types";
import { InterviewHeaderActions } from "@/features/interview-session/client/components/interview-header-actions";
import { isInterviewPage } from "@/lib/page-layout-utils";
import { siteConfig } from "@/config/site.config";
import { HamburgerMenu } from "./hamburger-menu";
import { PrimaryNav } from "./primary-nav";

interface HeaderClientProps {
  difficultyLevel: DifficultyLevelEnum;
}

export function HeaderClient({ difficultyLevel }: HeaderClientProps) {
  const pathname = usePathname();
  const showInterviewActions = isInterviewPage(pathname);

  return (
    <header className="px-3 fixed top-4 left-0 right-0 z-10 max-w-[1440px] mx-auto">
      <div className="rounded-2xl bg-white shadow-sm mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-16 gap-1">
          {/* Logo / Site Title */}
          <div className="flex items-center shrink-0 z-10">
            <Link
              href="/"
              className="flex items-center space-x-2"
              aria-label="ホーム"
            >
              {/*
                ロゴは横長（約9.3:1）でヘッダーの幅を大きく使うため、
                狭い画面では高さ固定ではなく画面幅に追従させ、
                右側のナビ（詳しく・検索・メニュー）が折り返さないようにする。
                sm未満では主要ナビはBottomNav（画面下部）に譲るため、ここでは表示しない。
              */}
              <Image
                src="/img/brand-logo.png"
                alt={siteConfig.siteName}
                width={800}
                height={86}
                priority
                className="h-auto w-[30vw] min-[420px]:w-[28vw] sm:h-5 sm:w-auto"
              />
            </Link>
          </div>

          {/* 主要ナビゲーション（ホーム・議会・予算・議員・学ぶ）
              ヘッダーバー全体を基準に絶対配置で中央寄せする。
              左右の要素（ロゴ・補助ナビ）の幅はページによって変わる
              （例: 難易度切り替えはメインページのみ表示）ため、
              flex の space-between に任せるとページごとに中心がずれてしまう。 */}
          <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
            <div className="pointer-events-auto">
              <PrimaryNav />
            </div>
          </div>

          {/* Navigation */}
          <nav
            className="flex items-center space-x-2 shrink-0 z-10"
            aria-label="補助ナビゲーション"
          >
            <DifficultySelector currentLevel={difficultyLevel} />
            {showInterviewActions && <InterviewHeaderActions />}
            <Link
              href="/search"
              aria-label="検索"
              className="p-2 text-mirai-text-muted hover:text-mirai-text transition-colors"
            >
              <Search className="size-5" />
            </Link>
            <HamburgerMenu />
          </nav>
        </div>
      </div>
    </header>
  );
}

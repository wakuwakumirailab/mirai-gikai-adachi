"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site.config";
import { isInterviewSection, isMainPage } from "@/lib/page-layout-utils";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const useSidebarLayout = isMainPage(pathname) && siteConfig.features.aiChat;
  const isInterview = isInterviewSection(pathname);
  // TOPページはヒーロー画像に固定ヘッダーを重ねて見せるデザインのため、
  // モバイルでは余白を入れない（意図的にヘッダーの下に潜り込む）。
  // それ以外の全ページはモバイルでも固定ヘッダー分の余白が無いと
  // 見出し・本文が隠れてしまうため、mt-24 を常時適用する。
  const isHome = pathname === "/";

  return (
    <div
      className={cn(
        "relative max-w-[700px] mx-auto",
        isHome ? "md:mt-24" : "mt-24",
        // インタビューページ以外ではshadowを表示
        !isInterview && "sm:shadow-lg",
        // TOPページと法案詳細ページのみ、チャットサイドバー用のオフセット
        useSidebarLayout && "pc:mr-[500px] xl:ml-[calc(calc(100vw-1180px)/2)]"
      )}
    >
      {children}
    </div>
  );
}

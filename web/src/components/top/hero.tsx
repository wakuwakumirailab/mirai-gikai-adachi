import Image from "next/image";
import { siteConfig } from "@/config/site.config";

/**
 * トップページのヒーローバナー。
 * 見出し・キャッチコピー・スマホモックアップ等はバナー画像
 * （/img/hero_background.png、16:9 で作成）に含める前提。
 * DOM 上のテキストはスクリーンリーダー向けの sr-only のみ。
 */
export function Hero() {
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden bg-mirai-hero-bg">
      <Image
        src="/img/hero_background.png"
        alt={siteConfig.councilName}
        fill
        priority
        className="object-contain object-center"
        sizes="100vw"
        quality={85}
      />

      {/* 見出しは画像内に含めるため、テキストはスクリーンリーダー向けにのみ提供 */}
      <div className="sr-only">
        <h1>{siteConfig.siteName}</h1>
        <p>
          いま{siteConfig.councilName}
          で議論されていること。やさしい言葉で説明します。
        </p>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-gentle md:bottom-8">
        <div className="w-[1px] h-[34px] bg-black"></div>
        <p className="mt-2 font-lexend text-[10px] leading-[20px] text-black">
          Scroll
        </p>
      </div>
    </div>
  );
}

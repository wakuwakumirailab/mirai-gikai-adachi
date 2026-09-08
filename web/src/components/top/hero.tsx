import Image from "next/image";
import { siteConfig } from "@/config/site.config";

/**
 * トップページのヒーローバナー。
 * 16:9 のイラスト（/img/hero_background.png）の上に、
 * 見出しテキストを CSS で重ねて表示する。
 * レイアウトは max-w-[700px] に収まるため、文字サイズはビューポート幅ではなく
 * コンテナ幅基準（cqw）でバナーの拡大縮小に追従させる。
 */
export function Hero() {
  return (
    <div className="@container relative w-full aspect-[16/9] overflow-hidden bg-mirai-hero-bg">
      <Image
        src="/img/hero_background.png"
        alt={siteConfig.councilName}
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 700px) 100vw, 700px"
        quality={85}
      />

      {/* SEO・読み上げ用の見出し（画面上はキャッチコピーを表示） */}
      <h1 className="sr-only">{siteConfig.siteName}</h1>

      {/*
        キャッチコピー。
        md 未満は固定ヘッダーがヒーロー上部（約80px）に重なるため、
        ヘッダーを避けた位置に下げ、可読性確保のため白の半透明地を敷く。
        md 以上はレイアウト側の mt-24 でヘッダーと重ならないので、
        空が開いている右上にそのまま載せる。
      */}
      <div className="absolute right-[3%] top-[44%] w-[64%] md:top-[8%] md:w-[66%]">
        <p className="whitespace-nowrap rounded-lg bg-white/70 px-2 py-1 text-center font-bold leading-[1.9] text-mirai-text drop-shadow-sm text-[clamp(0.6rem,3.5cqw,1.75rem)] md:bg-transparent md:px-0 md:py-0">
          いま{siteConfig.councilName}で話されていることを
          <br />
          やさしい言葉で説明します
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

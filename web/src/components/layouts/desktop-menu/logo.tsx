import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";

/**
 * デスクトップメニュー: ロゴ (画面左上)
 */
export function DesktopMenuLogo() {
  return (
    <Link
      href="/"
      className="fixed top-6 left-6 z-50 flex flex-col gap-2 hover:opacity-90 transition-opacity"
    >
      {/* ロゴ（サイト名を含むワードマーク） */}
      <Image
        src="/img/brand-logo.png"
        alt={`${siteConfig.siteName}ロゴ`}
        width={800}
        height={97}
        priority
        className="h-10 w-auto"
      />

      {/* キャッチコピー */}
      <p
        className="font-bold text-black"
        style={{
          fontSize: "16px",
          lineHeight: "1.6em",
        }}
      >
        区議会の議論をわかりやすく
      </p>
    </Link>
  );
}

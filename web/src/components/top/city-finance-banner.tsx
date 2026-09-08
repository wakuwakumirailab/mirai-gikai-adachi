import { Coins, ExternalLink } from "lucide-react";

// pref=13（東京都）、entity=131211（足立区の全国地方公共団体コード）。
// 上記URLを開くと「東京都 足立区」の歳入・歳出が表示されることを確認済み。
const TAX_MAP_URL =
  "https://inshatancountry-jpn-tax-map.com/local-tax/?pref=13&entity=131211";

/**
 * トップページから「税金の使い道マップ（外部サイト）」への導線バナー。
 * 足立区の歳入・歳出を可視化する外部サイトに遷移する。
 */
export function CityFinanceBanner() {
  return (
    <a
      href={TAX_MAP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-4 bg-card border border-border rounded-lg px-5 py-4 hover:border-primary transition-colors"
    >
      <div className="flex items-start gap-3">
        <Coins className="w-6 h-6 text-primary shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-mirai-text">
            足立区のお金の使い道（外部サイト）
          </p>
          <p className="mt-0.5 text-sm text-mirai-text-secondary">
            「税金の使い道マップ」で区の収入と支出をわかりやすく見られます
          </p>
        </div>
      </div>
      <ExternalLink className="w-5 h-5 text-mirai-text-muted shrink-0" />
    </a>
  );
}

import { siteConfig } from "@/config/site.config";

type AiFeature = "aiChat" | "aiInterview";

/**
 * AI機能が無効（site.config.ts の features）のとき、APIの入口で断るための応答を返す。
 * 画面から呼ばれなくても、APIを直接叩かれて利用料金が発生するのを防ぐ。
 * 有効な場合は null を返すので、呼び出し側はそのまま処理を続ける。
 */
export function featureDisabledResponse(feature: AiFeature): Response | null {
  if (siteConfig.features[feature]) return null;
  return new Response(JSON.stringify({ error: "Not Found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

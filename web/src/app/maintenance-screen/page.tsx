import type { Metadata } from "next";
import { MaintenanceScreen } from "@/components/top/maintenance-screen";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `メンテナンス中 | ${siteConfig.siteName}`,
  robots: { index: false, follow: false },
};

/**
 * トップページ用のメンテナンス画面。ヘッダー・フッター・ボトムナビを持たない
 * ルートレイアウト直下のルートとして配置し、他ページへ遷移できないようにする。
 * middleware でメンテナンス中に "/" をここへリライトする。
 */
export default function MaintenanceScreenRoute() {
  return <MaintenanceScreen />;
}

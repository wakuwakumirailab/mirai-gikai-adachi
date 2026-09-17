import { Wrench } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import { SiteDisclaimerNotice } from "./site-disclaimer-notice";

/**
 * トップページのメンテナンス画面。
 * siteConfig.features.maintenanceMode が true の間、"/" の通常コンテンツの
 * 代わりに表示する（他のページには影響しない）。
 */
export function MaintenanceScreen() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteDisclaimerNotice />
      <div className="flex flex-1 flex-col items-center justify-center bg-mirai-gradient px-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-white/70">
          <Wrench className="size-8 text-primary-accent" />
        </div>
        <h1 className="mt-6 text-xl font-bold text-mirai-text sm:text-2xl">
          {siteConfig.siteName}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-mirai-text-secondary sm:text-base">
          現在、サイトのメンテナンスのため一時的にご利用いただけません。
          <br />
          しばらくしてから再度アクセスをお願いします。
        </p>
      </div>
    </div>
  );
}

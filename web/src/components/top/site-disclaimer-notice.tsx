import { ShieldCheck } from "lucide-react";

/**
 * 「公式サイトではない」旨の注記。
 * 通常時・メンテナンス中を問わず、トップページの最上部で常に表示する。
 */
export function SiteDisclaimerNotice() {
  return (
    <div className="w-full bg-mirai-surface-muted px-4 py-2 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-mirai-info-blue/40 px-3.5 py-1 text-xs font-medium text-primary-deep">
        <ShieldCheck className="size-3.5" />
        当サイトは足立区公式サイトではありません。
      </span>
    </div>
  );
}

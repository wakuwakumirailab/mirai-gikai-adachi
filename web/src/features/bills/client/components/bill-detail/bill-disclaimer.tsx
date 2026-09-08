import { LinkButton } from "@/components/top/link-button";
import { siteConfig } from "@/config/site.config";

export function BillDisclaimer() {
  return (
    <div className="space-y-6 pt-4 pb-10">
      {/* データの出典について */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-black">掲載コンテンツについて</h3>
        <p className="text-xs leading-relaxed text-mirai-text-note">
          掲載されている議案情報は、{siteConfig.councilName}
          に上程された議案などの公開情報を基に、AIを活用しながら背景情報を整理したものです。
        </p>
      </div>

      {/* 掲載コンテンツについての免責事項 */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-black">免責事項</h3>
        <p className="text-xs leading-relaxed text-mirai-text-note">
          {/* AIチャット機能は現在無効（site.config.ts の features.aiChat = false）のため、
              「また、AIチャットは不正確または誤解を招く回答を生成する可能性があります。」の一文を除外。
              有効化する際は「ものではありません。」の直後に戻すこと。 */}
          本サイトで公開する情報は、可能な限り正確かつ最新の情報を反映するよう努めていますが、その正確性・完全性・即時性について保証するものではありません。正確な情報は、公式文書や一次資料をご確認ください。
        </p>
      </div>

      <LinkButton
        href="/faq"
        icon={{
          src: "/icons/question-bubble.svg",
          alt: "note",
          width: 22,
          height: 22,
        }}
      >
        よくある質問
      </LinkButton>
    </div>
  );
}

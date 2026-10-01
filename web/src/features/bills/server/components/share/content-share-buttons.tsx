import { siteConfig } from "@/config/site.config";
import { getShareContext } from "@/features/bills/client/utils/share";
import { BillShareButtonsClient } from "../../../client/components/share/bill-share-buttons-client";

interface ContentShareButtonsProps {
  /** 共有するページのパス（例: /questions/xxx） */
  path: string;
  title: string;
  thumbnailUrl?: string | null;
}

/** 議案以外のページ（一般質問・委員会・記者会見など）用の共有・報告ボタン */
export async function ContentShareButtons({
  path,
  title,
  thumbnailUrl,
}: ContentShareButtonsProps) {
  const { origin, difficulty } = await getShareContext();
  const shareUrl = `${origin}${path}?difficulty=${difficulty}`;
  const shareMessage = `${title} #${siteConfig.twitterHashtag}`;

  return (
    <div className="flex flex-col gap-3">
      <BillShareButtonsClient
        shareMessage={shareMessage}
        shareUrl={shareUrl}
        thumbnailUrl={thumbnailUrl}
      />
    </div>
  );
}

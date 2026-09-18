import { Container } from "@/components/layouts/container";
import { About } from "@/components/top/about";
import { ArchiveBanner } from "@/components/top/archive-banner";
import { GeneralQuestionsBanner } from "@/components/top/general-questions-banner";
import { Hero } from "@/components/top/hero";
import { SiteDisclaimerNotice } from "@/components/top/site-disclaimer-notice";
import { TeamMirai } from "@/components/top/team-mirai";
import { siteConfig } from "@/config/site.config";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { BillDisclaimer } from "@/features/bills/client/components/bill-detail/bill-disclaimer";
import { CurrentSessionBillsBanner } from "@/features/bills/server/components/current-session-bills-banner";
import { getCurrentSessionBills } from "@/features/bills/server/loaders/get-current-session-bills";
import { loadHomeData } from "@/features/bills/server/loaders/load-home-data";
import type { BillWithContent } from "@/features/bills/shared/types";
import { HomeChatClient } from "@/features/chat/client/components/home-chat-client";
import { CurrentCouncilSession } from "@/features/council-sessions/client/components/current-council-session";
import { getCurrentCouncilSession } from "@/features/council-sessions/server/loaders/get-current-council-session";
import { getLatestSessionWithQuestions } from "@/features/general-questions/server/loaders/get-latest-session-with-questions";
import { PressConferenceArchiveSection } from "@/features/press-conferences/client/components/press-conference-archive-section";
import { PressConferenceNoticeBanner } from "@/features/press-conferences/client/components/press-conference-notice-banner";
import { getLatestPressConference } from "@/features/press-conferences/server/loaders/get-latest-press-conference";
import { getPressConferences } from "@/features/press-conferences/server/loaders/get-press-conferences";
import { getJapanTime } from "@/lib/utils/date";

export default async function Home() {
  const { billsByTag, featuredBills } = await loadHomeData();

  // ゆくゆくタグ機能がマージされたらBFFに統合する
  const [
    currentSession,
    currentDifficulty,
    latestQuestionsSlug,
    latestPressConference,
    pressConferences,
  ] = await Promise.all([
    getCurrentCouncilSession(getJapanTime()),
    getDifficultyLevel(),
    getLatestSessionWithQuestions(),
    getLatestPressConference(),
    getPressConferences(),
  ]);

  const currentSessionBills = currentSession
    ? await getCurrentSessionBills(currentSession.id)
    : [];

  const toBillChatContext = (bill: BillWithContent) => {
    return {
      name: `${bill.bill_content?.title}（${bill.name}）`,
      summary: bill.bill_content?.summary,
      tags: bill.tags?.map((tag) => tag.label) || [],
      isFeatured: featuredBills.some((b) => b.id === bill.id),
    };
  };

  return (
    <>
      <Hero />

      <SiteDisclaimerNotice />

      {/* 本日の定例会セクション＋今回の定例会の議案（ベージュ背景でひとつながりに） */}
      <div className="bg-mirai-surface-warm">
        <CurrentCouncilSession session={currentSession} />

        {/* わかりやすい解説の有無に関わらず表示 */}
        {currentSession && (
          <Container className="pt-4 pb-5">
            <CurrentSessionBillsBanner
              session={currentSession}
              bills={currentSessionBills}
            />
          </Container>
        )}
      </div>

      {/* 区長記者会見バナー */}
      {latestPressConference && (
        <Container className="pt-4">
          <PressConferenceNoticeBanner
            pressConference={latestPressConference}
          />
        </Container>
      )}

      {/* 一般質問バナー */}
      {latestQuestionsSlug && (
        <Container className="pt-6">
          <GeneralQuestionsBanner sessionSlug={latestQuestionsSlug} />
        </Container>
      )}

      {/* Archive セクション（区長記者会見・事務事業評価のアーカイブ＋過去の資料への導線） */}
      <div className="bg-mirai-surface-muted py-10">
        <Container>
          <div className="flex flex-col gap-8">
            <ArchiveBanner />
            <PressConferenceArchiveSection
              pressConferences={pressConferences}
            />
          </div>
        </Container>
      </div>

      <Container>
        {/* みらい議会とは セクション */}
        <About />

        {/* チームみらいについて セクション */}
        <TeamMirai />

        {/* 免責事項 */}
        <BillDisclaimer />
      </Container>

      {/* チャット機能 */}
      {siteConfig.features.aiChat && (
        <HomeChatClient
          currentDifficulty={currentDifficulty}
          bills={billsByTag
            .flatMap((x) => x.bills)
            .concat(featuredBills)
            .map(toBillChatContext)}
        />
      )}
    </>
  );
}

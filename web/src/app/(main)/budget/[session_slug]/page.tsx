import type { Metadata } from "next";
import { ChevronRight, Wallet } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { getCouncilSessionBySlug } from "@/features/council-sessions/server/loaders/get-council-session-by-slug";
import { findPreviousCouncilSession } from "@/features/council-sessions/server/repositories/council-session-repository";
import { getBudgetOverviews } from "@/features/budget-overview/server/loaders/get-budget-overviews";
import { hasPublishedOverviewsBySession } from "@/features/budget-overview/server/repositories/budget-repository";
import { BudgetOverviewList } from "@/features/budget-overview/server/components/budget-overview-list";
import { BudgetYearSummarySection } from "@/features/budget-overview/server/components/budget-year-summary-section";
import { BudgetSupplementarySection } from "@/features/budget-overview/server/components/budget-supplementary-section";
import { budgetSupplementaries } from "@/features/budget-overview/shared/budget-supplementary";
import { budgetYearSummaries } from "@/features/budget-overview/shared/budget-year-summaries";
import { applyBudgetOverviewDifficulty } from "@/features/budget-overview/shared/utils/apply-budget-difficulty";
import { BudgetChatClient } from "@/features/budget-overview/client/components/budget-chat-client";
import { siteConfig } from "@/config/site.config";

interface BudgetListPageProps {
  params: Promise<{
    session_slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BudgetListPageProps): Promise<Metadata> {
  const { session_slug } = await params;
  const session = await getCouncilSessionBySlug(session_slug);

  if (!session) {
    return { title: "会期が見つかりません" };
  }

  return {
    title: `${toFiscalYearLabel(session.name)} 分野別の主な施策`,
    description: `${toFiscalYearLabel(session.name)}の予算の主な施策を、分野別にわかりやすく解説します。`,
  };
}

function toFiscalYearLabel(sessionName: string): string {
  const match = sessionName.match(/令和(\d+)年/);
  return match ? `令和${match[1]}年度予算` : sessionName;
}

export default async function BudgetListPage({ params }: BudgetListPageProps) {
  const { session_slug } = await params;

  const [session, currentDifficulty] = await Promise.all([
    getCouncilSessionBySlug(session_slug),
    getDifficultyLevel(),
  ]);
  if (!session) {
    notFound();
  }

  const [overviews, prevSession] = await Promise.all([
    getBudgetOverviews(session.id),
    findPreviousCouncilSession(session.start_date),
  ]);

  // 前回のセッションに budget_overviews があるか確認
  const prevSessionWithBudget = prevSession?.slug
    ? await hasPublishedOverviewsBySession(prevSession.id).then((has) =>
        has ? prevSession : null
      )
    : null;

  return (
    <Container className="py-10 pb-28">
      <header className="mb-8 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
          <Wallet className="size-3.5" />
          {toFiscalYearLabel(session.name)}
        </span>
        <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
          分野別の主な施策
        </h1>
        <p className="text-sm leading-relaxed text-mirai-text-secondary">
          {toFiscalYearLabel(session.name)}
          の特色と、主な施策を、分野ごとにまとめています。
        </p>
      </header>

      {budgetYearSummaries[session_slug] && (
        <BudgetYearSummarySection
          summary={budgetYearSummaries[session_slug]}
          difficulty={currentDifficulty}
        />
      )}

      {budgetSupplementaries[session_slug] && (
        <BudgetSupplementarySection
          supplementary={budgetSupplementaries[session_slug]}
          difficulty={currentDifficulty}
        />
      )}

      <h2 className="mb-4 border-b border-mirai-border pb-2 text-lg font-bold text-mirai-text">
        分野別の主な施策
      </h2>
      <p className="mb-4 text-xs leading-relaxed text-mirai-text-secondary">
        区が「主要施策」として紹介している事業を、分野ごとに並べています。予算全体ではありません。
      </p>
      <BudgetOverviewList
        overviews={overviews.map((o) =>
          applyBudgetOverviewDifficulty(o, currentDifficulty)
        )}
        sessionSlug={session_slug}
      />

      {/* 前年度予算セクション */}
      {prevSessionWithBudget && (
        <div className="mt-12 pt-8 border-t border-mirai-border">
          <h2 className="text-lg font-bold text-mirai-text mb-4">
            前年度の予算
          </h2>
          <Link
            href={`/budget/${prevSessionWithBudget.slug}`}
            className="flex items-center justify-between py-4 px-2 hover:bg-mirai-surface-grouped rounded-lg transition-colors group"
          >
            <span className="font-bold text-mirai-text text-base">
              {prevSessionWithBudget.name}
            </span>
            <ChevronRight className="h-5 w-5 text-mirai-text-muted group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
          </Link>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="rounded-full"
            >
              <Link href="/budget">さらに前の予算を一覧で表示</Link>
            </Button>
          </div>
        </div>
      )}

      {siteConfig.features.aiChat && overviews.length > 0 && (
        <BudgetChatClient
          currentDifficulty={currentDifficulty}
          budget={{
            departmentName: `${session.name} 分野別`,
            themes: overviews.map((o) => ({
              title: o.department_name,
              aiSummary: o.direction,
            })),
          }}
        />
      )}
    </Container>
  );
}

"use client";

import {
  ArrowRight,
  Baby,
  Building,
  Building2,
  Bus,
  ChevronDown,
  Circle,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  Leaf,
  MonitorSmartphone,
  Shield,
  Sprout,
  Stethoscope,
  Store,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CATEGORY_STYLE, DEFAULT_STYLE } from "@/lib/category-visual";
import type { SessionQuestionOverview } from "../../shared/types";
import type {
  TopicEntry,
  TopicGroup,
} from "../../shared/utils/build-topic-groups";
import { PENDING_ANSWER_TEXT } from "../../shared/utils/source-stage";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  GraduationCap,
  HandHeart,
  Sprout,
  HeartHandshake,
  Heart,
  Stethoscope,
  Shield,
  Bus,
  Building2,
  Building,
  Leaf,
  Wallet,
  Store,
  MonitorSmartphone,
  Users,
  Trophy,
  Circle,
};

function TopicCard({
  entry,
  style,
}: {
  entry: TopicEntry;
  style: typeof DEFAULT_STYLE;
}) {
  return (
    <div className={`rounded-xl border ${style.card} overflow-hidden`}>
      <div className="px-4 pt-4 pb-3">
        <h3 className={`mb-2 text-base font-bold ${style.text}`}>
          {entry.title}
        </h3>
        {/* 質問通告のみ（答弁待ち）の場合は質問の内容を出す */}
        <p className="text-sm text-mirai-text leading-relaxed">
          {entry.answerSummary || entry.questionSummary}
        </p>
        {!entry.answerSummary && (
          <p className="mt-1.5 text-xs text-mirai-text-muted">
            {PENDING_ANSWER_TEXT}
          </p>
        )}
      </div>
      <div
        className={`px-4 py-2.5 border-t ${style.header} flex items-center justify-between gap-2`}
      >
        <p className="text-xs text-mirai-text-secondary line-clamp-1 flex-1">
          {entry.questioner.name}議員の質問より
        </p>
        <Link
          href={`/questions/${entry.questioner.id}#topic-${entry.topicIndex}`}
          className={`inline-flex items-center gap-1 text-xs font-medium ${style.text} hover:underline shrink-0`}
        >
          質疑の詳細
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

function ThemeAccordionItem({
  group,
  themeLines,
  isOpen,
  onToggle,
}: {
  group: TopicGroup;
  themeLines: string[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = ICON_MAP[group.iconName] ?? Circle;
  const style = CATEGORY_STYLE[group.categoryLabel] ?? DEFAULT_STYLE;
  const count = group.entries.length;
  const panelId = `theme-panel-${group.categoryLabel}`;
  // 折りたたみ時はテーマの3行プレビューを表示（押すと展開）
  const showPreview = !isOpen && themeLines.length > 0;

  return (
    <div className={`rounded-xl border ${style.card} overflow-hidden`}>
      <Button
        type="button"
        variant="ghost"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`w-full h-auto flex-col items-stretch gap-2 px-4 py-3 rounded-none hover:bg-white/40 ${style.text}`}
      >
        <span className="flex w-full items-center gap-3">
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${style.iconBg}`}
          >
            <Icon className={`h-4 w-4 ${style.text}`} />
          </span>
          <span className="flex-1 text-left font-bold">
            {group.categoryLabel}
          </span>
          <span
            className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${style.iconBg} ${style.text}`}
          >
            {count}件
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
        {showPreview && (
          <span className="flex flex-col gap-1 pl-11 text-left">
            {themeLines.slice(0, 3).map((line) => (
              <span
                key={line}
                className="text-xs leading-relaxed text-mirai-text-secondary font-normal whitespace-normal"
              >
                {line}
              </span>
            ))}
          </span>
        )}
      </Button>
      {isOpen && (
        <div id={panelId} className="px-4 pb-4 pt-1">
          <div className="grid gap-3 sm:grid-cols-2">
            {group.entries.map((entry, i) => (
              <TopicCard
                key={`${entry.title}-${i}`}
                entry={entry}
                style={style}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface SessionQuestionsOverviewProps {
  groups: TopicGroup[];
  overview: SessionQuestionOverview;
}

export function SessionQuestionsOverview({
  groups,
  overview,
}: SessionQuestionsOverviewProps) {
  // デプロイ直後はキャッシュが旧シェイプ（string[]/null）を返すことがあるため防御的に扱う
  const themeLines: Record<string, string[]> =
    overview?.themeLines && typeof overview.themeLines === "object"
      ? overview.themeLines
      : {};
  const [openLabels, setOpenLabels] = useState<Set<string>>(new Set());

  const allOpen = openLabels.size === groups.length && groups.length > 0;

  function toggle(label: string) {
    setOpenLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  function toggleAll() {
    setOpenLabels(
      allOpen ? new Set() : new Set(groups.map((g) => g.categoryLabel))
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-mirai-text-secondary">
          テーマを選んで質疑の中身を確認できます
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={toggleAll}
          className="h-auto px-3 py-1.5 text-xs"
        >
          {allOpen ? "すべて閉じる" : "すべて開く"}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {groups.map((group) => (
          <ThemeAccordionItem
            key={group.categoryLabel}
            group={group}
            themeLines={themeLines[group.categoryLabel] ?? []}
            isOpen={openLabels.has(group.categoryLabel)}
            onToggle={() => toggle(group.categoryLabel)}
          />
        ))}
      </div>
    </div>
  );
}

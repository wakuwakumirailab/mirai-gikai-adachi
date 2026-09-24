import { LayoutGrid, Users } from "lucide-react";
import Link from "next/link";
import {
  buildSessionQuestionsHref,
  type QuestionView,
} from "../../shared/utils/question-view";

interface QuestionViewTabsProps {
  sessionSlug: string;
  current: QuestionView;
}

const TABS = [
  { view: "theme", label: "テーマ別", icon: LayoutGrid },
  { view: "members", label: "議員別", icon: Users },
] as const;

/** 一般質問一覧の「テーマ別／議員別」切り替え。URLの view パラメータで切り替える */
export function QuestionViewTabs({
  sessionSlug,
  current,
}: QuestionViewTabsProps) {
  return (
    <nav
      aria-label="一般質問の表示切り替え"
      className="grid grid-cols-2 gap-1 rounded-full border border-mirai-border bg-white p-1"
    >
      {TABS.map(({ view, label, icon: Icon }) => {
        const isActive = current === view;
        return (
          <Link
            key={view}
            href={buildSessionQuestionsHref(sessionSlug, view)}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-mirai-text-secondary hover:bg-mirai-surface-grouped"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

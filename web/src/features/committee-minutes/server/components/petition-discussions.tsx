import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatJapaneseDate } from "../../shared/utils/format-japanese-date";
import type { PetitionDiscussion } from "../loaders/get-petition-discussions";

type Props = {
  discussions: PetitionDiscussion[];
};

/** 請願・陳情詳細ページに載せる「委員会での審査」の経過 */
export function PetitionDiscussions({ discussions }: Props) {
  if (discussions.length === 0) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-mirai-text">委員会での審査</h2>
      <ol className="flex flex-col gap-3">
        {discussions.map((d) => (
          <li key={d.href + d.topicTitle}>
            <Link
              href={d.href}
              className="block rounded-2xl border border-mirai-border bg-white p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
            >
              <div className="text-xs text-mirai-text-muted">
                {formatJapaneseDate(d.meetingDate)}　{d.committeeName}
              </div>
              {d.conclusion && (
                <p className="mt-2 text-sm text-mirai-text leading-relaxed">
                  {d.conclusion}
                </p>
              )}
              <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-accent">
                この日の委員会を見る
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

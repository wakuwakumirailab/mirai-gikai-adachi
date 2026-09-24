import { Sparkles } from "lucide-react";

interface SessionSummaryLinesProps {
  lines: unknown;
}

/** 定例会全体の「どんな話があった？」3行まとめ。未生成なら何も表示しない */
export function SessionSummaryLines({ lines }: SessionSummaryLinesProps) {
  // デプロイ直後はキャッシュが旧シェイプを返すことがあるため防御的に扱う
  const sessionLines = Array.isArray(lines)
    ? lines.filter((line): line is string => typeof line === "string")
    : [];

  if (sessionLines.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-primary-accent bg-mirai-surface-warm px-5 py-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h2 className="font-bold text-mirai-text">
          どんな話があった？（今回の3行まとめ）
        </h2>
      </div>
      <ol className="flex flex-col gap-2">
        {sessionLines.slice(0, 3).map((line, i) => (
          <li key={line} className="flex gap-2 text-sm text-mirai-text">
            <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
              {i + 1}
            </span>
            <span className="leading-relaxed">{line}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

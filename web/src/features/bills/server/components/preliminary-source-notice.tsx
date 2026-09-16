import { Info } from "lucide-react";

interface PreliminarySourceNoticeProps {
  /** true: 定例会単位（一部/全部の議案が対象）、false: 議案単位（この議案が対象） */
  scope: "session" | "bill";
}

export function PreliminarySourceNotice({
  scope,
}: PreliminarySourceNoticeProps) {
  const message =
    scope === "session"
      ? "この定例会の解説には、正式な会議録が確定する前の速報版会議録をもとに作成したものが含まれます。正式な会議録の公開後、内容を見直す場合があります。"
      : "この解説は、正式な会議録が確定する前の速報版会議録をもとに作成しています。正式な会議録の公開後、内容を見直す場合があります。";

  return (
    <div className="flex items-start gap-2 rounded-lg bg-mirai-surface-grouped px-4 py-3 text-xs leading-relaxed text-mirai-text-secondary">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-mirai-text-muted" />
      <p>{message}</p>
    </div>
  );
}

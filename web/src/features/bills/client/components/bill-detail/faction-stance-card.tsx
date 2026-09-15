import type {
  BillStatusEnum,
  FactionStance,
  StanceTypeEnum,
} from "../../../shared/types";
import { STANCE_LABELS } from "../../../shared/types";
import { abbreviateFactionName } from "../../../shared/utils/abbreviate-faction-name";

function getStanceBadgeStyle(type: StanceTypeEnum) {
  switch (type) {
    case "for":
    case "conditional_for":
      return {
        bg: "bg-stance-for-bg",
        textColor: "text-stance-for",
      };
    case "against":
    case "conditional_against":
      return {
        bg: "bg-stance-against-bg",
        textColor: "text-stance-against",
      };
    default:
      return {
        bg: "bg-mirai-surface-muted",
        textColor: "text-black",
      };
  }
}

// 賛否グループの表示順
const STANCE_ORDER: StanceTypeEnum[] = [
  "for",
  "conditional_for",
  "against",
  "conditional_against",
  "neutral",
  "considering",
  "continued_deliberation",
];

type FactionChipProps = {
  stance: FactionStance;
};

function FactionChip({ stance }: FactionChipProps) {
  const hasDetail = stance.memberNames.length > 0 || !!stance.comment;

  return (
    <span className="group relative inline-block">
      <button
        type="button"
        className="font-semibold text-base text-mirai-text underline decoration-dotted decoration-mirai-text-muted underline-offset-4 outline-none focus-visible:text-primary-accent"
      >
        {abbreviateFactionName(stance.faction.display_name)}
      </button>
      {hasDetail && (
        <>
          {/* 丸が段々大きくなる、吹き出しの尻尾代わりのトレイル */}
          <span className="pointer-events-none absolute left-1 top-full mt-0.5 h-1.5 w-1.5 rounded-full bg-mirai-hero-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" />
          <span className="pointer-events-none absolute left-2.5 top-full mt-2 h-2.5 w-2.5 rounded-full bg-mirai-hero-bg opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100" />
          <span className="pointer-events-none absolute left-4 top-full z-10 mt-3.5 w-max max-w-64 rounded-2xl bg-mirai-hero-bg px-3 py-2 text-xs leading-relaxed text-primary-deep opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            {stance.memberNames.length > 0 && (
              <span>{stance.memberNames.join("、")}</span>
            )}
            {stance.comment && (
              <span
                className={`block whitespace-pre-wrap ${stance.memberNames.length > 0 ? "mt-1.5 border-t border-primary-deep/20 pt-1.5" : ""}`}
              >
                <span className="font-bold">
                  {STANCE_LABELS[stance.stance]}理由：
                </span>
                {stance.comment}
              </span>
            )}
          </span>
        </>
      )}
    </span>
  );
}

type StanceGroupProps = {
  type: StanceTypeEnum;
  stances: FactionStance[];
};

function StanceGroup({ type, stances }: StanceGroupProps) {
  const style = getStanceBadgeStyle(type);

  return (
    <div className="flex flex-wrap items-center gap-3 py-4 border-b last:border-0">
      <span
        className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold ${style.bg} ${style.textColor}`}
      >
        {STANCE_LABELS[type]}
      </span>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {stances.map((stance) => (
          <FactionChip key={stance.id} stance={stance} />
        ))}
      </div>
    </div>
  );
}

interface FactionStanceCardProps {
  stances: FactionStance[];
  billStatus?: BillStatusEnum;
}

export function FactionStanceCard({
  stances,
  billStatus,
}: FactionStanceCardProps) {
  const isPreparing = billStatus === "preparing";

  if (!isPreparing && stances.length === 0) {
    return null;
  }

  const groups = STANCE_ORDER.map((type) => ({
    type,
    stances: stances.filter((s) => s.stance === type),
  })).filter((group) => group.stances.length > 0);

  return (
    <>
      <h2 className="text-[22px] font-bold mb-1">🗳️会派の賛否</h2>
      <p className="mb-3 text-xs text-mirai-text-muted">
        議員、会派は略称で記載しています。賛否は採決時点の名称、所属議員で記載しています。
      </p>
      <div className="rounded-2xl border bg-white px-6 py-2">
        {isPreparing && groups.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">
            議案上程後に各会派の賛否を表明します。
          </p>
        ) : (
          groups.map((group) => (
            <StanceGroup
              key={group.type}
              type={group.type}
              stances={group.stances}
            />
          ))
        )}
      </div>
    </>
  );
}

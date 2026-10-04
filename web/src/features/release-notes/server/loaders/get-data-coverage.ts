import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";
import { unstable_cache } from "next/cache";

export type DataCoverageItem = {
  label: string;
  /** 掲載している最新の会期・日付（例: 令和8年 第3回 定例会）。まだ載っていなければ null */
  latest: string | null;
};

type SessionRef = { name: string; start_date: string } | null;
type RowWithSession = { council_sessions: SessionRef };

function latestSessionName(rows: RowWithSession[] | null) {
  let best: { name: string; start_date: string } | null = null;
  for (const row of rows ?? []) {
    const s = row.council_sessions;
    if (s && (!best || s.start_date > best.start_date)) best = s;
  }
  return best?.name ?? null;
}

function formatYmd(value: string | null | undefined): string | null {
  if (!value) return null;
  const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return `${m[1]}年${Number(m[2])}月${Number(m[3])}日`;
}

async function fetchDataCoverage(): Promise<DataCoverageItem[]> {
  const supabase = createAdminClient();

  const [bills, questions, meetings, petitions, pressConferences] =
    await Promise.all([
      supabase
        .from("bills")
        .select("council_sessions(name, start_date)")
        .eq("publish_status", "published")
        .neq("bill_type", "petition"),
      supabase
        .from("general_questions")
        .select("council_sessions(name, start_date)")
        .eq("publish_status", "published"),
      supabase
        .from("committee_meetings")
        .select("meeting_date")
        .eq("publish_status", "published")
        .order("meeting_date", { ascending: false })
        .limit(1),
      supabase
        .from("bills")
        .select("published_at")
        .eq("bill_type", "petition")
        .eq("publish_status", "published")
        .order("published_at", { ascending: false })
        .limit(1),
      supabase
        .from("press_conferences")
        .select("held_at")
        .eq("status", "published")
        .order("held_at", { ascending: false })
        .limit(1),
    ]);

  const meetingDate = formatYmd(meetings.data?.[0]?.meeting_date);
  const petitionDate = formatYmd(petitions.data?.[0]?.published_at);
  const pressDate = formatYmd(pressConferences.data?.[0]?.held_at);

  return [
    {
      label: "議案",
      latest: latestSessionName(bills.data as unknown as RowWithSession[]),
    },
    {
      label: "代表・一般質問",
      latest: latestSessionName(questions.data as unknown as RowWithSession[]),
    },
    {
      label: "委員会",
      latest: meetingDate ? `${meetingDate}開催分まで` : null,
    },
    {
      label: "請願・陳情",
      latest: petitionDate ? `${petitionDate}受理分まで` : null,
    },
    {
      label: "区長記者会見",
      latest: pressDate ? `${pressDate}開催分まで` : null,
    },
  ];
}

/** 種類ごとに、掲載している最新の会期・日付を返す（更新情報ページ用） */
export const getDataCoverage = unstable_cache(
  fetchDataCoverage,
  ["release-notes-data-coverage"],
  { revalidate: 600 }
);

import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";
import type {
  CommitteeArchive,
  CommitteeMeeting,
  CommitteeMeetingTopic,
  CommitteeType,
  RelatedBill,
  TopicPosition,
} from "../../shared/types";

type TopicRow = {
  id: string;
  topic_order: number;
  title: string;
  summary: string | null;
  summary_easy: string | null;
  conclusion: string | null;
  conclusion_easy: string | null;
  positions: unknown;
  related_bills: unknown;
};

type BillRef = {
  bill_type: "bill" | "petition";
  bill_number: string;
  session_slug?: string;
};

type MeetingRow = {
  id: string;
  committee_name: string;
  committee_slug: string;
  committee_type: CommitteeType;
  meeting_date: string;
  title: string;
  source_document_id: number;
  source_url: string;
  summary: string | null;
  summary_easy: string | null;
  committee_meeting_topics: TopicRow[];
};

function mapTopics(
  rows: TopicRow[],
  resolve: (ref: BillRef) => RelatedBill | null
): CommitteeMeetingTopic[] {
  return [...rows]
    .sort((a, b) => a.topic_order - b.topic_order)
    .map((t) => ({
      id: t.id,
      topicOrder: t.topic_order,
      title: t.title,
      summary: t.summary,
      summaryEasy: t.summary_easy,
      conclusion: t.conclusion,
      conclusionEasy: t.conclusion_easy,
      positions: Array.isArray(t.positions)
        ? (t.positions as TopicPosition[])
        : [],
      relatedBills: (Array.isArray(t.related_bills)
        ? (t.related_bills as BillRef[])
        : []
      )
        .map(resolve)
        .filter((b): b is RelatedBill => b !== null),
    }));
}

function mapMeeting(
  row: MeetingRow,
  resolve: (ref: BillRef) => RelatedBill | null
): CommitteeMeeting {
  return {
    id: row.id,
    committeeName: row.committee_name,
    committeeSlug: row.committee_slug,
    committeeType: row.committee_type,
    meetingDate: row.meeting_date,
    title: row.title,
    sourceDocumentId: row.source_document_id,
    sourceUrl: row.source_url,
    summary: row.summary,
    summaryEasy: row.summary_easy,
    topics: mapTopics(row.committee_meeting_topics ?? [], resolve),
  };
}

/**
 * テーブル未作成による失敗か（マイグレーション適用前の環境）。
 * この場合のみ「データなし」として扱い、それ以外のDB障害はエラーとして伝播させる。
 */
function isMissingTableError(error: { code?: string | null }): boolean {
  // 42P01: undefined_table / PGRST205: スキーマキャッシュにテーブルなし
  return error.code === "42P01" || error.code === "PGRST205";
}

// 会議録の原文（raw_text / speeches）は全文転載しない方針のため取得しない
const SELECT = `
  id,
  committee_name,
  committee_slug,
  committee_type,
  meeting_date,
  title,
  source_document_id,
  source_url,
  summary,
  summary_easy,
  committee_meeting_topics (*)
` as const;

/** 全トピックの関連議案・陳情の参照を、bills を1回引いて表示用リンクに解決する関数を作る */
async function buildBillResolver(
  rows: MeetingRow[]
): Promise<(ref: BillRef) => RelatedBill | null> {
  const refs = rows
    .flatMap((m) => m.committee_meeting_topics ?? [])
    .flatMap((t) =>
      Array.isArray(t.related_bills) ? (t.related_bills as BillRef[]) : []
    );
  if (refs.length === 0) return () => null;

  const numbers = [...new Set(refs.map((r) => r.bill_number))];
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("bills")
    .select(
      "id, name, bill_number, bill_type, publish_status, council_sessions(slug)"
    )
    .in("bill_number", numbers)
    .eq("publish_status", "published");
  if (error) {
    throw new Error(`関連議案の取得に失敗しました: ${error.message}`);
  }
  const bills = (data ?? []) as unknown as {
    id: string;
    name: string;
    bill_number: string;
    bill_type: "bill" | "petition";
    council_sessions: { slug: string } | null;
  }[];

  return (ref) => {
    const hit = bills.find(
      (b) =>
        b.bill_type === ref.bill_type &&
        b.bill_number === ref.bill_number &&
        (ref.bill_type === "petition" ||
          !ref.session_slug ||
          b.council_sessions?.slug === ref.session_slug)
    );
    if (!hit) return null;
    return {
      billType: hit.bill_type,
      billNumber: hit.bill_number,
      name: hit.name,
      href:
        hit.bill_type === "petition"
          ? `/petitions/${hit.id}`
          : `/bills/${hit.id}`,
    };
  };
}

export async function findAllMeetings(): Promise<CommitteeMeeting[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("committee_meetings")
    .select(SELECT)
    .eq("publish_status", "published")
    .order("meeting_date", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw new Error(`委員会会議の取得に失敗しました: ${error.message}`);
  }
  const rows = (data ?? []) as unknown as MeetingRow[];
  const resolve = await buildBillResolver(rows);
  return rows.map((row) => mapMeeting(row, resolve));
}

export async function findMeetingsBySlug(
  slug: string
): Promise<CommitteeMeeting[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("committee_meetings")
    .select(SELECT)
    .eq("committee_slug", slug)
    .eq("publish_status", "published")
    .order("meeting_date", { ascending: false });

  if (error) {
    if (isMissingTableError(error)) return [];
    throw new Error(`委員会会議の取得に失敗しました: ${error.message}`);
  }
  const rows = (data ?? []) as unknown as MeetingRow[];
  const resolve = await buildBillResolver(rows);
  return rows.map((row) => mapMeeting(row, resolve));
}

export async function findMeetingByDocumentId(
  documentId: number
): Promise<CommitteeMeeting | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("committee_meetings")
    .select(SELECT)
    .eq("source_document_id", documentId)
    .eq("publish_status", "published")
    .maybeSingle();

  if (error) {
    if (isMissingTableError(error)) return null;
    throw new Error(`委員会会議の取得に失敗しました: ${error.message}`);
  }
  if (!data) return null;
  const row = data as unknown as MeetingRow;
  return mapMeeting(row, await buildBillResolver([row]));
}

/** 会議データから委員会の一覧（最新開催日つき）を組み立てる */
export function buildArchives(
  meetings: CommitteeMeeting[]
): CommitteeArchive[] {
  const bySlug = new Map<string, CommitteeMeeting[]>();
  for (const m of meetings) {
    const list = bySlug.get(m.committeeSlug) ?? [];
    list.push(m);
    bySlug.set(m.committeeSlug, list);
  }
  return [...bySlug.entries()].map(([slug, list]) => {
    // 一覧は開催日降順なので先頭が最新。名称・区分は最新開催時のものを使う
    const latest = list[0];
    return {
      slug,
      name: latest.committeeName,
      type: latest.committeeType,
      meetingCount: list.length,
      latestMeetingDate: latest.meetingDate,
    };
  });
}

export type PetitionDiscussionRow = {
  meetingDate: string;
  committeeName: string;
  committeeSlug: string;
  sourceDocumentId: number;
  topicTitle: string;
  conclusion: string | null;
  conclusionEasy: string | null;
};

/** 指定した請願・陳情（bill_number）が審査された委員会のトピックを開催日順に返す */
export async function findDiscussionsByPetitionNumber(
  billNumber: string
): Promise<PetitionDiscussionRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("committee_meeting_topics")
    .select(
      `title, conclusion, conclusion_easy,
       committee_meetings!inner (committee_name, committee_slug, meeting_date, source_document_id, publish_status)`
    )
    // 配列を直接渡すとPostgres配列リテラルとして送られるため、JSON文字列で渡す
    .contains(
      "related_bills",
      JSON.stringify([{ bill_type: "petition", bill_number: billNumber }])
    )
    .eq("committee_meetings.publish_status", "published");

  if (error) {
    if (isMissingTableError(error)) return [];
    throw new Error(`委員会の審査状況の取得に失敗しました: ${error.message}`);
  }

  return (
    (data ?? []) as unknown as {
      title: string;
      conclusion: string | null;
      conclusion_easy: string | null;
      committee_meetings: {
        committee_name: string;
        committee_slug: string;
        meeting_date: string;
        source_document_id: number;
      };
    }[]
  )
    .map((r) => ({
      meetingDate: r.committee_meetings.meeting_date,
      committeeName: r.committee_meetings.committee_name,
      committeeSlug: r.committee_meetings.committee_slug,
      sourceDocumentId: r.committee_meetings.source_document_id,
      topicTitle: r.title,
      conclusion: r.conclusion,
      conclusionEasy: r.conclusion_easy,
    }))
    .sort((a, b) => a.meetingDate.localeCompare(b.meetingDate));
}

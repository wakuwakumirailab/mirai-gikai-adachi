import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";
import type { CouncilSession } from "@/features/council-sessions/shared/types";
import type {
  GeneralQuestion,
  SessionQuestionOverview,
} from "../../shared/types";

/** theme_lines(JSON) を Record<string, string[]> に正規化する */
function parseThemeLines(raw: unknown): Record<string, string[]> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (Array.isArray(value)) {
      const lines = value.filter((v): v is string => typeof v === "string");
      if (lines.length > 0) out[key] = lines;
    }
  }
  return out;
}

export async function findPublishedGeneralQuestionsBySession(
  sessionId: string
): Promise<GeneralQuestion[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("general_questions")
    .select("*")
    .eq("council_session_id", sessionId)
    .eq("publish_status", "published")
    .order("session_day", { ascending: true })
    .order("question_order", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch general questions: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    ...row,
    topics: Array.isArray(row.topics) ? row.topics : [],
  })) as GeneralQuestion[];
}

/**
 * セッション単位のオーバービュー（全体3行＋テーマ別3行）を取得する。
 * 行が未生成の場合は lines=null / themeLines={} を返す。
 */
export async function findGeneralQuestionOverviewBySession(
  sessionId: string
): Promise<SessionQuestionOverview> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("general_question_overviews")
    .select("lines, theme_lines")
    .eq("council_session_id", sessionId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to fetch general question overview: ${error.message}`
    );
  }

  const rawLines = data?.lines;
  const lines =
    Array.isArray(rawLines) && rawLines.length > 0 ? rawLines : null;
  return { lines, themeLines: parseThemeLines(data?.theme_lines) };
}

export async function findLatestSessionSlugWithPublishedQuestions(): Promise<
  string | null
> {
  const supabase = createAdminClient();

  const { data: rows, error: qErr } = await supabase
    .from("general_questions")
    .select("council_session_id")
    .eq("publish_status", "published");

  if (qErr || !rows?.length) return null;

  const ids = [
    ...new Set(
      rows.map((r: { council_session_id: string }) => r.council_session_id)
    ),
  ];

  const { data: session, error: sErr } = await supabase
    .from("council_sessions")
    .select("slug")
    .in("id", ids)
    .order("start_date", { ascending: false })
    .limit(1)
    .single();

  if (sErr) return null;
  return session?.slug ?? null;
}

/**
 * 公開済みの一般質問が1件以上ある会期を新しい順に取得する（過去の資料一覧用）
 * is_active = false かつ既に閉会済み（end_date < targetDate）の会期のみを対象とする
 */
export async function findAllSessionsWithGeneralQuestions(
  targetDate: string
): Promise<CouncilSession[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("general_questions")
    .select("council_session_id, council_sessions!inner(*)")
    .eq("publish_status", "published")
    .eq("council_sessions.is_active", false)
    .lt("council_sessions.end_date", targetDate);

  if (error) {
    console.error("Failed to fetch sessions with general questions:", error);
    return [];
  }

  const seen = new Set<string>();
  const sessions: CouncilSession[] = [];
  for (const row of data ?? []) {
    const session = row.council_sessions as unknown as CouncilSession;
    if (session && !seen.has(session.id)) {
      seen.add(session.id);
      sessions.push(session);
    }
  }

  return sessions.sort(
    (a, b) =>
      new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );
}

export async function findPublishedGeneralQuestionById(
  id: string
): Promise<GeneralQuestion | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("general_questions")
    .select("*")
    .eq("id", id)
    .eq("publish_status", "published")
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch general question: ${error.message}`);
  }

  return {
    ...data,
    topics: Array.isArray(data.topics) ? data.topics : [],
  } as GeneralQuestion;
}

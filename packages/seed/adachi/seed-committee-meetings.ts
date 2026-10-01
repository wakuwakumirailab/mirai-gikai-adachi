/**
 * seed-committee-meetings.ts
 *
 * 足立区議会の委員会会議（要約データ）を committee_meetings / committee_meeting_topics に投入する。
 * データは adachi/committee-minutes/<年>.json に置く（会議録の全文・逐語は含めない）。
 * 会議録検索システムの FINO（source_document_id）をキーに upsert し、トピックは入れ直す（冪等）。
 *
 * 使い方:
 *   tsx --env-file=../../.env adachi/seed-committee-meetings.ts 2026            # draft で投入
 *   tsx --env-file=../../.env adachi/seed-committee-meetings.ts 2026 --publish  # published で投入
 *
 * 本番に投入する前に、要約内容をユーザーが会議録と照らして確認すること。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdminClient } from "../shared/helper";

type PositionInput = {
  speaker: string;
  party: string | null;
  role: "member" | "executive";
  text: string;
  text_easy?: string | null;
};

type TopicInput = {
  title: string;
  summary: string;
  summary_easy?: string | null;
  conclusion: string;
  conclusion_easy?: string | null;
  /** 意見が分かれた場合のみ。対立がなければ省略（空配列） */
  positions?: PositionInput[];
  /** このトピックで審査された議案・請願陳情（番号で参照） */
  related_bills?: {
    bill_type: "bill" | "petition";
    bill_number: string;
    session_slug?: string;
  }[];
};

type MeetingInput = {
  /** 会議録検索システムの FINO */
  source_document_id: number;
  committee_name: string;
  committee_slug: string;
  committee_type: "standing" | "special" | "budget" | "audit" | "management";
  meeting_date: string;
  title: string;
  source_url: string;
  summary: string;
  summary_easy?: string | null;
  topics: TopicInput[];
};

type YearFile = { year: number; meetings: MeetingInput[] };

const DATA_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "committee-minutes"
);

async function main() {
  const args = process.argv.slice(2);
  const publish = args.includes("--publish");
  const years = args.filter((a) => !a.startsWith("--"));
  if (years.length === 0) {
    console.error("年（例: 2026）を指定してください");
    process.exit(1);
  }

  const supabase = createAdminClient();
  const status = publish ? "published" : "draft";

  for (const year of years) {
    const data = JSON.parse(
      fs.readFileSync(path.join(DATA_DIR, `${year}.json`), "utf8")
    ) as YearFile;

    for (const m of data.meetings) {
      const { data: row, error } = await supabase
        .from("committee_meetings")
        .upsert(
          {
            source_document_id: m.source_document_id,
            committee_name: m.committee_name,
            committee_slug: m.committee_slug,
            committee_type: m.committee_type,
            meeting_date: m.meeting_date,
            title: m.title,
            source_url: m.source_url,
            summary: m.summary,
            summary_easy: m.summary_easy ?? null,
            speeches: [],
            raw_text: null,
            publish_status: status,
          },
          { onConflict: "source_document_id" }
        )
        .select("id")
        .single();
      if (error || !row) {
        throw new Error(
          `会議の投入に失敗 (${m.source_document_id}): ${error?.message}`
        );
      }

      const { error: delError } = await supabase
        .from("committee_meeting_topics")
        .delete()
        .eq("meeting_id", row.id);
      if (delError) throw new Error(`トピック削除に失敗: ${delError.message}`);

      if (m.topics.length > 0) {
        const { error: insError } = await supabase
          .from("committee_meeting_topics")
          .insert(
            m.topics.map((t, i) => ({
              meeting_id: row.id,
              topic_order: i + 1,
              title: t.title,
              summary: t.summary,
              summary_easy: t.summary_easy ?? null,
              conclusion: t.conclusion,
              conclusion_easy: t.conclusion_easy ?? null,
              positions: t.positions ?? [],
              related_bills: t.related_bills ?? [],
            }))
          );
        if (insError) throw new Error(`トピック投入に失敗: ${insError.message}`);
      }
      console.log(
        `${m.meeting_date} ${m.committee_name} (FINO ${m.source_document_id}): トピック${m.topics.length}件 [${status}]`
      );
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

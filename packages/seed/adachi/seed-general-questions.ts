/**
 * seed-general-questions.ts
 *
 * 足立区議会の一般質問（要約データ）を general_questions / general_question_overviews に投入する。
 * データは adachi/general-questions/<会期slug>.json に置く（会議録の全文は含めない）。
 * 同じ会期の既存データは削除してから入れ直す（冪等）。
 *
 * 使い方:
 *   tsx --env-file=../../.env adachi/seed-general-questions.ts r8-1 r7-4   # 指定した会期
 *   tsx --env-file=../../.env adachi/seed-general-questions.ts --all       # すべての会期
 *   （--publish を付けると publish_status=published で投入。付けない場合は draft）
 *
 * 本番に投入する前に、要約内容をユーザーが会議録と照らして確認すること。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdminClient } from "../shared/helper";

type TopicInput = {
  title: string;
  question_summary: string;
  question_summary_easy?: string | null;
  answer_summary: string;
  answer_summary_easy?: string | null;
  answerer_role: string;
  answerer_name: string;
};

type QuestionInput = {
  questioner_name: string;
  questioner_party: string | null;
  questioner_number: number | null;
  /** 質問区分。representative=代表質問／general=一般質問（省略時はDB既定値の "general"） */
  question_type?: "representative" | "general";
  session_day: number;
  session_date: string;
  question_order: number;
  source_url: string | null;
  summary: string;
  summary_easy?: string | null;
  /** notice=質問通告書（質問のみ・answer_summary は空）／preliminary=速報版会議録／final（省略時）=正式な会議録 */
  source_stage?: "notice" | "preliminary" | "final";
  topics: TopicInput[];
};

type SessionFile = {
  sessionSlug: string;
  overview?: { lines: string[]; themeLines: Record<string, string[]> } | null;
  questions: QuestionInput[];
};

const DATA_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "general-questions"
);

async function main() {
  const args = process.argv.slice(2);
  const publish = args.includes("--publish");
  const all = args.includes("--all");
  const slugs = all
    ? fs
        .readdirSync(DATA_DIR)
        .filter((f) => f.endsWith(".json"))
        .map((f) => f.replace(/\.json$/, ""))
    : args.filter((a) => !a.startsWith("--"));

  if (slugs.length === 0) {
    console.error("会期slugを指定するか --all を付けてください");
    process.exit(1);
  }

  const supabase = createAdminClient();
  const status = publish ? "published" : "draft";

  for (const slug of slugs) {
    const file = path.join(DATA_DIR, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as SessionFile;

    const { data: session, error: sErr } = await supabase
      .from("council_sessions")
      .select("id")
      .eq("slug", data.sessionSlug)
      .single();
    if (sErr || !session) {
      throw new Error(`会期が見つかりません: ${data.sessionSlug}`);
    }

    const { error: delErr } = await supabase
      .from("general_questions")
      .delete()
      .eq("council_session_id", session.id);
    if (delErr) throw new Error(delErr.message);

    const rows = data.questions.map((q) => ({
      ...q,
      council_session_id: session.id,
      raw_text: null,
      publish_status: status,
    }));
    const { error: insErr } = await supabase
      .from("general_questions")
      .insert(rows);
    if (insErr) throw new Error(insErr.message);

    if (data.overview) {
      const { error: ovErr } = await supabase
        .from("general_question_overviews")
        .upsert({
          council_session_id: session.id,
          lines: data.overview.lines,
          theme_lines: data.overview.themeLines,
        });
      if (ovErr) throw new Error(ovErr.message);
    }

    console.log(`✅ ${slug}: ${rows.length}件（${status}）`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

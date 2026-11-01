/**
 * seed-budget.ts
 *
 * 足立区の予算の主要施策（分類 → テーマ → 事業）を、
 * budget_overviews / budget_themes / budget_initiatives に投入する。
 * データは adachi/budget/<会期slug>.json に置く（出典：「予算編成のあらまし」の主要施策）。
 * 金額は千円単位で保存する。
 *
 * 同じ会期の既存データは、削除してから入れ直す（冪等）。
 * 削除は、予算の3つの表だけが対象で、議案など、ほかのデータには触れない。
 *
 * 使い方（packages/seed で実行）:
 *   tsx --env-file=../../.env adachi/seed-budget.ts r8-1            # draft で投入
 *   tsx --env-file=../../.env adachi/seed-budget.ts r8-1 --publish  # published で投入
 *
 * 本番に投入する前に、金額・事業名を、PDFの原文と照らして確認すること。
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdminClient } from "../shared/helper";

type InitiativeInput = {
  title: string;
  description: string | null;
  descriptionEasy?: string | null;
  amount: number | null;
  badge: "new" | "expanded" | "continued" | null;
};

type ThemeInput = {
  title: string;
  summary: string | null;
  summaryEasy?: string | null;
  initiatives: InitiativeInput[];
};

type OverviewInput = {
  slug: string;
  name: string;
  direction: string | null;
  directionEasy?: string | null;
  themes: ThemeInput[];
};

type BudgetFile = {
  sessionSlug: string;
  sourceUrl: string;
  overviews: OverviewInput[];
};

const DATA_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "budget"
);

/** 金額（千円）の合計。金額のない項目しかないときは null */
function sumAmounts(values: (number | null)[]): number | null {
  const nums = values.filter((v): v is number => v != null);
  return nums.length === 0 ? null : nums.reduce((a, b) => a + b, 0);
}

async function main() {
  const args = process.argv.slice(2);
  const publish = args.includes("--publish");
  const slugs = args.filter((a) => !a.startsWith("--"));
  if (slugs.length === 0) {
    throw new Error("会期のslugを指定してください（例: r8-1）");
  }

  const supabase = createAdminClient();
  const status = publish ? "published" : "draft";

  for (const slug of slugs) {
    const file = path.join(DATA_DIR, `${slug}.json`);
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as BudgetFile;

    const { data: session, error: sErr } = await supabase
      .from("council_sessions")
      .select("id")
      .eq("slug", data.sessionSlug)
      .single();
    if (sErr || !session) {
      throw new Error(`会期が見つかりません: ${data.sessionSlug}`);
    }

    // 同じ会期の予算データを削除（themes / initiatives は ON DELETE CASCADE）
    const { error: delErr } = await supabase
      .from("budget_overviews")
      .delete()
      .eq("council_session_id", session.id);
    if (delErr) throw new Error(delErr.message);

    let themeCount = 0;
    let initiativeCount = 0;

    for (const [oi, overview] of data.overviews.entries()) {
      const themeTotals = overview.themes.map((t) =>
        sumAmounts(t.initiatives.map((i) => i.amount))
      );

      const { data: insertedOverview, error: oErr } = await supabase
        .from("budget_overviews")
        .insert({
          council_session_id: session.id,
          department_name: overview.name,
          department_slug: overview.slug,
          direction: overview.direction,
          direction_easy: overview.directionEasy ?? null,
          total_budget: sumAmounts(themeTotals),
          prev_budget: null,
          sort_order: oi,
          source_url: data.sourceUrl,
          publish_status: status,
        })
        .select("id")
        .single();
      if (oErr || !insertedOverview) {
        throw new Error(`overview の登録に失敗: ${oErr?.message}`);
      }

      for (const [ti, theme] of overview.themes.entries()) {
        const { data: insertedTheme, error: tErr } = await supabase
          .from("budget_themes")
          .insert({
            overview_id: insertedOverview.id,
            title: theme.title,
            budget_amount: themeTotals[ti],
            ai_summary: theme.summary,
            ai_summary_easy: theme.summaryEasy ?? null,
            sort_order: ti,
          })
          .select("id")
          .single();
        if (tErr || !insertedTheme) {
          throw new Error(`theme の登録に失敗: ${tErr?.message}`);
        }
        themeCount += 1;

        const rows = theme.initiatives.map((i, ii) => ({
          theme_id: insertedTheme.id,
          title: i.title,
          description: i.description,
          description_easy: i.descriptionEasy ?? null,
          budget_amount: i.amount,
          badge: i.badge,
          sort_order: ii,
        }));
        const { error: iErr } = await supabase
          .from("budget_initiatives")
          .insert(rows);
        if (iErr) throw new Error(`initiative の登録に失敗: ${iErr.message}`);
        initiativeCount += rows.length;
      }
    }

    console.log(
      `✅ ${slug}: 分類${data.overviews.length}・テーマ${themeCount}・事業${initiativeCount}（${status}）`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

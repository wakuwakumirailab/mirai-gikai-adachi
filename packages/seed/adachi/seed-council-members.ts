/**
 * seed-council-members.ts
 *
 * 足立区議会の議員（氏名・会派・所属委員会）を council_members / council_member_committees に投入する。
 * データは adachi/council-members/<年>.json（足立区議会公式サイト「50音順名簿」「委員会構成」より取得）。
 * 議員は全件入れ直す（冪等）。仮データ（seed/main の18名）もここで置き換わる。
 * 会派・委員会がマスタに無い場合は追加する。
 *
 * 使い方:
 *   tsx --env-file=../../.env adachi/seed-council-members.ts 2026
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createAdminClient } from "../shared/helper";

type MemberInput = {
  name: string;
  faction: string;
  committees: string[];
};

type YearFile = { asOf: string; members: MemberInput[] };

const DATA_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "council-members"
);

// マスタに無い場合に追加する会派・委員会
const EXTRA_FACTIONS: { name: string; display_name: string }[] = [
  { name: "no-faction", display_name: "無会派" },
];
const EXTRA_COMMITTEES: { name: string; description: string }[] = [
  {
    name: "総合交通対策調査特別委員会",
    description: "総合交通計画、地域公共交通計画、交通安全計画などの調査研究",
  },
  {
    name: "議会基本条例制定特別委員会",
    description: "議会基本条例の制定に関する調査研究",
  },
];

async function main() {
  const year = process.argv[2];
  if (!year) {
    throw new Error("usage: seed-council-members.ts <year>");
  }
  const file: YearFile = JSON.parse(
    fs.readFileSync(path.join(DATA_DIR, `${year}.json`), "utf8")
  );
  const supabase = createAdminClient();

  // 会派
  for (const f of EXTRA_FACTIONS) {
    const { data } = await supabase
      .from("factions")
      .select("id")
      .eq("display_name", f.display_name)
      .maybeSingle();
    if (!data) {
      const { count } = await supabase
        .from("factions")
        .select("id", { count: "exact", head: true });
      const { error } = await supabase
        .from("factions")
        .insert({ ...f, sort_order: (count ?? 0) + 1, is_active: true });
      if (error) throw new Error(`faction insert failed: ${error.message}`);
      console.log(`+ faction ${f.display_name}`);
    }
  }
  const { data: factions, error: fErr } = await supabase
    .from("factions")
    .select("id, display_name");
  if (fErr || !factions) throw new Error(`factions: ${fErr?.message}`);
  const factionId = new Map(factions.map((f) => [f.display_name, f.id]));

  // 委員会
  for (const c of EXTRA_COMMITTEES) {
    const { data } = await supabase
      .from("committees")
      .select("id")
      .eq("name", c.name)
      .maybeSingle();
    if (!data) {
      const { error } = await supabase
        .from("committees")
        .insert({ ...c, sort_order: 99, is_active: true });
      if (error) throw new Error(`committee insert failed: ${error.message}`);
      console.log(`+ committee ${c.name}`);
    }
  }
  const { data: committees, error: cErr } = await supabase
    .from("committees")
    .select("id, name");
  if (cErr || !committees) throw new Error(`committees: ${cErr?.message}`);
  const committeeId = new Map(committees.map((c) => [c.name, c.id]));

  // 参照を先に解決（未解決があれば何も消さずに終了）
  const problems: string[] = [];
  for (const m of file.members) {
    if (!factionId.has(m.faction)) problems.push(`会派なし: ${m.faction}`);
    for (const c of m.committees) {
      if (!committeeId.has(c)) problems.push(`委員会なし: ${c}`);
    }
  }
  if (problems.length > 0) {
    throw new Error(Array.from(new Set(problems)).join("\n"));
  }

  // 議員を入れ直す（council_member_committees は ON DELETE CASCADE）
  const { error: delErr } = await supabase
    .from("council_members")
    .delete()
    .not("id", "is", null);
  if (delErr) throw new Error(`delete failed: ${delErr.message}`);

  const { data: inserted, error: insErr } = await supabase
    .from("council_members")
    .insert(
      file.members.map((m, i) => ({
        name: m.name,
        faction_id: factionId.get(m.faction) ?? null,
        is_active: true,
        sort_order: i + 1,
      }))
    )
    .select("id, name");
  if (insErr || !inserted) throw new Error(`insert failed: ${insErr?.message}`);

  const idByName = new Map(inserted.map((r) => [r.name, r.id]));
  const relations = file.members.flatMap((m) =>
    m.committees.map((c) => ({
      council_member_id: idByName.get(m.name) as string,
      committee_id: committeeId.get(c) as string,
    }))
  );
  const { error: relErr } = await supabase
    .from("council_member_committees")
    .insert(relations);
  if (relErr) throw new Error(`relations failed: ${relErr.message}`);

  console.log(
    `✅ members=${inserted.length} relations=${relations.length} (as of ${file.asOf})`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// 足立区議会サイトを確認し、新しく公開された会議録（速報版・正式版）を検知する。
// 既知の一覧は state.json に保存し、増えた分だけを標準出力にJSONで返す。
// 区議会サイトへの負荷を避けるため、リクエストは順番に・間隔を空けて行う。
//
// 使い方: node scripts/watch-minutes/check.mjs [--init]
//   --init  現在の一覧を既知として保存するだけ（通知なし）

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://www.gikai-adachi.jp";
const STATE_PATH = join(dirname(fileURLToPath(import.meta.url)), "state.json");
const WAIT_MS = 3000;
const year = new Date(Date.now() + 9 * 3600 * 1000).getUTCFullYear();

const COMMITTEE_TITL =
  "%91%8D%96%B1%2C%8B%E6%96%AF%2C%8EY%8B%C6%8A%C2%8B%AB%2C%8C%FA%90%B6%2C%8C%9A%90%DD%2C%95%B6%8B%B3";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchSjis(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "mirai-gikai-adachi-watch (+https://github.com/wakuwakumirailab/mirai-gikai-adachi)" },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return new TextDecoder("shift_jis").decode(await res.arrayBuffer());
}

const text = (html) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");

/** 速報版：g07_shiryo1.asp の見出し（本会議・各委員会）ごとにPDFリンクを拾う */
function parseShiryo1(html) {
  const items = [];
  let section = "";
  const re = /<h2[^>]*>([^<]*)<\/h2>|<a href='([^']*attach\/shiryo1\/[^']*)'[^>]*>(?:<img[^>]*>)?([^<]*)<\/a>/g;
  for (const m of html.matchAll(re)) {
    if (m[1] !== undefined) {
      section = m[1].trim();
    } else {
      const label = m[3].replace(/\s*\(PDF[^)]*\)\s*/, "").trim();
      items.push({ key: m[2], label: `${section} ${label}`.trim(), url: BASE + m[2] });
    }
  }
  return items;
}

/** 正式版：会議録検索システムの一覧（「令和　８年　…」で始まる行）を拾う */
function parseFormal(html, kind, pageUrl) {
  const items = [];
  // 見出しと日付が別のタグに分かれているため、タグを空白にして1本につないでから拾う
  const flat = text(html).replace(/\s+/g, " ");
  for (const m of flat.matchAll(/令和 [０-９]+年 [^,]*?, \S+?-(?:\d+号|目次)/g)) {
    items.push({ key: `${kind}:${m[0]}`, label: `${kind} ${m[0]}`, url: pageUrl });
  }
  return items;
}

async function collect() {
  const all = [];
  const sources = [
    {
      name: "速報版",
      url: `${BASE}/g07_shiryo1.asp`,
      parse: parseShiryo1,
    },
    {
      name: "正式版（本会議）",
      url: `${BASE}/voices/cgi/voiweb.exe?ACT=100&KTYP=0,1,2,3&SORT=0&FYY=${year}&FMM=&FDD=&TYY=${year}&TMM=&TDD=&KGTP=1,2`,
      page: `${BASE}/voices/g08v_viewh.asp?Sflg=11&FYY=${year}&TYY=${year}`,
      parse: (html, s) => parseFormal(html, "正式版（本会議）", s.page),
    },
    {
      name: "正式版（常任委員会）",
      url: `${BASE}/voices/cgi/voiweb.exe?ACT=100&KTYP=0,1,2,3&SORT=0&FYY=${year}&FMM=&FDD=&TYY=${year}&TMM=&TDD=&KGTP=3&TITL=${COMMITTEE_TITL}`,
      page: `${BASE}/voices/g08v_views.asp?Sflg=30`,
      parse: (html, s) => parseFormal(html, "正式版（常任委員会）", s.page),
    },
  ];
  for (const [i, s] of sources.entries()) {
    if (i > 0) await sleep(WAIT_MS);
    const items = s.parse(await fetchSjis(s.url), s);
    if (items.length === 0) throw new Error(`${s.name}: 1件も取得できませんでした（サイトの構造が変わった可能性）`);
    all.push(...items);
  }
  return all;
}

const init = process.argv.includes("--init");
const current = await collect();
const known = existsSync(STATE_PATH) ? JSON.parse(readFileSync(STATE_PATH, "utf8")) : { keys: [] };
const knownSet = new Set(known.keys);
const added = init ? [] : current.filter((it) => !knownSet.has(it.key));

const keys = [...new Set([...known.keys, ...current.map((it) => it.key)])].sort();
writeFileSync(STATE_PATH, `${JSON.stringify({ keys }, null, 2)}\n`);
console.log(JSON.stringify({ added }, null, 2));

import { COUNCIL_MEMBER_READINGS } from "./council-member-readings";
import { STAFF_NAMES_WITHOUT_RUBY, WORD_READINGS } from "./word-readings";

export type ReadingPart = { text: string; reading?: string };
export type ReadingEntry = { surface: string; parts: ReadingPart[] };

// 漢字の連続 + [読み]、またはそれ以外の文字の連続
const PART_PATTERN = /([一-鿿々〆ヶ髙]+)\[([^\]]+)\]|([^[\]一-鿿々〆ヶ髙]+)/g;

/** "記者[きしゃ]の方[かた]" のような書式を部品に分解する */
export function parseReadingEntry(entry: string): ReadingPart[] {
  const parts: ReadingPart[] = [];
  for (const m of entry.matchAll(PART_PATTERN)) {
    if (m[1]) parts.push({ text: m[1], reading: m[2] });
    else parts.push({ text: m[3] });
  }
  return parts;
}

/** 空白を含む語は、空白あり・なしの両方を一致対象にする（長い順に並べる） */
export function buildReadingEntries(sources: string[]): ReadingEntry[] {
  const entries: ReadingEntry[] = [];
  for (const source of sources) {
    const parts = parseReadingEntry(source);
    const surface = parts.map((p) => p.text).join("");
    entries.push({ surface, parts });
    if (surface.includes(" ")) {
      const compact = parts
        .map((p) => ({ ...p, text: p.text.replace(/ /g, "") }))
        .filter((p) => p.text !== "");
      entries.push({ surface: surface.replace(/ /g, ""), parts: compact });
    }
  }
  return entries.sort((a, b) => b.surface.length - a.surface.length);
}

/** ふりがなを付けない語は、読みなしの1部品として扱う（置き換えるとふりがなが外れる） */
export function buildPlainEntries(names: string[]): ReadingEntry[] {
  return names.map((name) => ({ surface: name, parts: [{ text: name }] }));
}

export const READING_ENTRIES = [
  ...buildReadingEntries([...WORD_READINGS, ...COUNCIL_MEMBER_READINGS]),
  ...buildPlainEntries(STAFF_NAMES_WITHOUT_RUBY),
].sort((a, b) => b.surface.length - a.surface.length);

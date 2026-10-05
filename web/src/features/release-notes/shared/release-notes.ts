/**
 * 更新情報ページの内容。
 * 更新のたびに releaseNotes の先頭へ1件追加してデプロイする（新しい順に並べる）。
 * 一番新しい日付が「最終更新日」として、ホームと更新情報ページに表示される。
 */

export type ReleaseNoteTag = "機能" | "データ" | "改善";

export type ReleaseNote = {
  /** YYYY-MM-DD */
  date: string;
  tag: ReleaseNoteTag;
  /** 利用者向けの1文（専門用語は使わない） */
  text: string;
};

export const releaseNotes: ReleaseNote[] = [
  {
    date: "2026-10-04",
    tag: "機能",
    text: "更新情報のページを公開しました。",
  },
];

/** 今後の予定（予定は変わることがあります） */
export const upcomingPlans: string[] = [
  "予算のページを作成します。",
  "議員のページに、議員の発言のまとめを追加します。",
  "議案の過去のデータを追加します。",
  "区長記者会見の過去のデータを追加します。",
  "募集中のパブリックコメントに、意見を書きやすくする機能を追加します。",
];

export function getLatestUpdateDate(): string | null {
  return releaseNotes[0]?.date ?? null;
}

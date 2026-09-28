/**
 * council_sessions.council_url（議決結果ページ用URL）から会期の内部ID（kaigi）を取り出し、
 * 足立区議会サイトの「代表・一般質問」一覧ページのURLを組み立てる。
 * council_url の kaigi パラメータは "開始日,終了日,内部ID" 形式（例: 2026/09/14,2026/10/20,137）。
 */
export function buildGeneralQuestionsSourceUrl(
  councilUrl: string | null | undefined
): string | null {
  if (!councilUrl) return null;

  try {
    const url = new URL(councilUrl);
    const kaigi = url.searchParams.get("kaigi");
    if (!kaigi) return null;

    const parts = kaigi.split(",");
    const kaigiId = parts[parts.length - 1]?.trim();
    if (!kaigiId) return null;

    return `https://www.gikai-adachi.jp/g07_Shitsumon.asp?Sflg=2&kaigi=${kaigiId}&kensu=100`;
  } catch {
    return null;
  }
}

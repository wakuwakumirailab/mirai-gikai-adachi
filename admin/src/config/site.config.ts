/**
 * サイト設定ファイル（Admin）
 * Fork して別の地方議会向けに使用する場合はこのファイルを変更してください。
 */
export const siteConfig = {
  siteName: "みらい議会ー足立区版",
  cityName: "足立区",
  councilName: "足立区議会",
  councilBaseUrl: "https://www.city.adachi.tokyo.jp/kugikai/",
  // TODO: 足立区議会の議案・議決結果一覧ページの正確なURLに更新する
  councilBillsDetailUrl:
    "https://www.city.adachi.tokyo.jp/kugikai/gikai/gikai/",
  councilFactionExamples:
    "自由民主党足立区議団、公明党、日本共産党足立区議団等",
} as const;

/**
 * 答弁者の氏名にふりがなを付けるか。
 * 区長・副区長・教育長は読みを確認済み（lib/rubyful/word-readings.ts）なので付ける。
 * 部長・課長など、読みを確認できる公開名簿がない職員の氏名は付けない。
 */
export function shouldHideAnswererRuby(role: string | null | undefined) {
  if (!role) return true;
  return !(role.includes("区長") || role.includes("教育長"));
}

/** ふりがなを付けない要素に付ける属性（lib/rubyful/corrections.ts が参照する） */
export function noRubyAttr(role: string | null | undefined) {
  return shouldHideAnswererRuby(role) ? { "data-no-ruby": "" } : {};
}

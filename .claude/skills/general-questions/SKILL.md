---
name: general-questions
description: 一般質問機能の設計・データ管理・UI決定事項のリファレンス
---

# 一般質問機能 リファレンス

## UI設計の決定事項

### セッション一覧ページ `/sessions/[session_slug]/questions`
**テーマ別市民向けビュー**を採用（2026-05-01 確定）。

- `SessionTopicsView` コンポーネント（Server Component）
- `buildTopicGroups()` でトピックをテーマ（17カテゴリ）に自動分類
- 市の答弁を先に・大きく表示（課題より結果を前面に）
- 「質疑の詳細→」で個人ページへ遷移

### 個人詳細ページ `/questions/[id]`
**要約／原文の切り替えトグル**を採用（2026-05-08 確定）。

- `raw_text` と `topics` 両方ある場合 → `QuestionViewToggle`（Client Component）でトグル切り替え
  - デフォルト「要約」: `QuestionChatView`（トピックAIサマリーのチャット形式）
  - 「詳しく（原文）」: `RawTranscriptContent`（原文逐語録、トピックタイトルが区切りとして挿入される）
- どちらか一方のみの場合は従来通り単体表示
- トピックタイトルの挿入位置はターン数をトピック数で等分した比例配置（近似）

## カテゴリ分類（17テーマ + その他）

足立区版は 2026-10-02 に以下の17テーマへ再編（旧9カテゴリから細分化）。画面の並び順は `CATEGORY_ORDER`（`build-topic-groups.ts`）で固定。

子育て・保育 / 教育・学校 / 若者・ユース / 子どもの安全・権利 / 高齢者・介護 / 福祉・サポート / 健康・医療 / 防災・安全 / 道路・交通 / 再開発・まちづくり / 公共施設 / 環境・ごみ・みどり / 税金・家計・財政 / 商店街・しごと・観光 / 行政改革・デジタル / 文化・スポーツ / 地域・多文化共生

- 判定はトピック**タイトル**のキーワード一致で、`CATEGORY_MAP` の**先頭から最初に一致したもの**が採用される（1トピック=1テーマ）。
- 同じラベルのエントリを複数置ける。「優先して判定したい語」（例: 教育の不登校、福祉の障がい者、環境のゴミ箱・省エネ、防災の火災・耐震など）は前のエントリに、汎用語（地域・環境など）は後ろのエントリに置く。
- 「子育て・保育」=乳幼児と家庭、「教育・学校」=学校の制度・運営（小・中学生）、「若者・ユース」=高校生世代〜20代、「子どもの安全・権利」=SNS・性暴力・虐待・自殺・児童養護・共同親権など年代を問わず子どもを守る話、で分ける（2026-10-02 ユーザー合意）。
- アイコンは `session-questions-overview.tsx` の `ICON_MAP`（lucide）、色は `CATEGORY_STYLE`（Tailwind はクラスを文字列で直書き）。新テーマ追加時は両方を更新する。
- **テーマ別3行まとめ**（`general_question_overviews.theme_lines`、seed JSON の `overview.themeLines`）は**テーマ名をキー**にしている。テーマ名を変えると旧キーの行は表示されなくなるので、テーマを変更したら全会期のまとめを書き直す（2026-10-02に r7-2 / r7-3 / r7-4 / r8-1 を新テーマで作成済み。r8-2・r8-3 は未作成）。
- テーマ別3行の反映はテーマ別3行だけを PATCH する（質問データの再投入は不要）。

> ⚠️ **CATEGORY_MAP を変更する際の注意**: キーワードの追加・削除は既存の全トピックの分類に影響する。変更後は **全会期の全トピックが意図したテーマに分類されているか**（特に「その他」が増えていないか）確認すること。キーワード判定には取りこぼし・誤分類があり得るので、気付いたら `build-topic-groups.test.ts` に1語ずつケースを足して直す。

## 関連ファイル

```
web/src/features/general-questions/
├── shared/
│   ├── types/index.ts                          # GeneralQuestion 型定義
│   └── utils/
│       ├── build-topic-groups.ts               # カテゴリ分類ロジック（純粋関数）
│       └── build-topic-groups.test.ts          # テスト
├── server/
│   ├── repositories/general-questions-repository.ts
│   ├── loaders/
│   │   ├── get-general-questions-by-session.ts
│   │   ├── get-general-question-by-id.ts
│   │   └── get-latest-session-with-questions.ts  # トップページバナー用
│   └── components/
│       ├── session-topics-view.tsx             # テーマ別一覧（採用デザイン）
│       ├── raw-transcript-view.tsx             # 原文表示（raw_textのみの場合）
│       └── general-question-list.tsx           # 旧リスト（未使用）
└── client/
    └── components/
        ├── question-chat-view.tsx              # チャット形式（採用デザイン）
        ├── question-view-toggle.tsx            # 要約/原文切り替えトグル（採用デザイン）
        └── general-question-topics.tsx         # 旧アコーディオン（未使用）
```

## データ管理

### データの取込・更新手順
新しい定例会の一般質問を取り込む手順は `update-general-questions` スキルを参照。

### 生データ（会議録テキスト）の場所
```text
docs/fukuoka/meeting-minutes/<会期名>/   # 会議録全文テキスト（会期・日別）
```
（旧: mirai-gikai-fukuoka-master-data リポジトリの output/ に r7-5 の中間JSONがあったが、現在ローカルに存在しない）

### publish_status の管理
現状は **admin UIなし**。DBを直接更新する（2026-04-28 時点の設計書あり）。

```bash
# 本番DBで公開状態に変更（.env.production の値を使用）
source .env.production
curl -s -X PATCH "$SUPABASE_URL/rest/v1/general_questions?council_session_id=eq.<session_id>" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"publish_status": "published"}'
```

### トップページバナー
`GeneralQuestionsBanner` が `get-latest-session-with-questions.ts` で最新の公開済みセッションを動的取得し、`/sessions/[session_slug]/questions` へリンクする。

## トピックタイトル・サマリーの市民向け品質基準

`topics` のタイトル・Qサマリー・Aサマリーは **市民が読む前提** で記述する。

### タイトルの品質基準
- **原文（会議録）に登場する語は変えない**: 「住市総」「公衆衛生医師」「プッシュ型採用広報」など、元の会議録で使われている行政略語・専門用語はそのまま使うこと。誤った言い換えは事実誤認になり、専門語のままの方が安全
- **AI生成で追加した要約語は平易に**: あくまで会議録に存在しないAI生成の補足語・タイトル補完部分を平易にする
- **複合専門語の連続**: タイトルが著しく長くて難解な場合は、原文の語を保ちつつ短くすることを検討する

### タイトルとカテゴリ分類の整合（重要）
`build-topic-groups.ts` の `CATEGORY_MAP` はタイトルのキーワードで分類先を判定する。**タイトルにカテゴリキーワードが含まれないと「その他」に落ちる**。

- 例: 防災系の話題でも「プッシュ型情報発信の強化」というタイトルだと「その他」になる
- → 「**火災警報**のプッシュ型情報発信強化」のようにカテゴリキーワードを含めること

### Qサマリーの文体
- NG: 「〜を**質した**」「〜を**問いただした**」（議会報告調・対立的ニュアンス）
- OK: 「〜を確認した」「〜を求めた」「〜について質問した」

### 複数答弁者の書き方
- `answerer_role`: 「○○局長（氏名）・市長（氏名）」のように役職と氏名をセットで格納
- `answerer_name`: 空にする（UIで `role` と `name` を連結表示するため二重になる）

## AI生成コンテンツの更新ルール

`general_questions.topics` の JSON（要約・答弁者など）を更新する際は **必ずユーザーにレビューを提示してからPATCHを実行すること**。

確認観点：
1. 日本語の自然さ（語尾・助詞・文体）
2. 答弁者の役職と担当内容が一致しているか
3. 中国語漢字の混入がないか
4. 複数トピックをまたぐ場合、A議案の情報がB議案に混入していないか

（CLAUDE.md「AI生成コンテンツのDB更新ルール」も参照）

## 今後の課題（設計書参照）

- Admin UIによる publish_status 管理（設計書: `docs/fukuoka/20260428_1100_一般質問管理画面設計書.md`）
- カテゴリ分類の精度向上（AI分類への移行検討）

※ 新定例会データのインポートフローは `update-general-questions` スキルに整備済み。

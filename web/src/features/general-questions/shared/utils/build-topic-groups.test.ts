import { describe, expect, it } from "vitest";
import type { GeneralQuestion } from "../types";
import { assignCategory, buildTopicGroups } from "./build-topic-groups";

describe("assignCategory", () => {
  it.each([
    ["保育所の待機児童対策", "子育て・保育"],
    ["猛暑対策（熱中症予防支援事業の周知）", "子育て・保育"],
    ["情報活用能力の育成と紙・デジタル併用の学習環境", "教育・学校"],
    ["認知症とともにいつまでも安心して暮らせるまちづくり", "高齢者・介護"],
    ["産後ケアの拡充", "子育て・保育"],
    ["こども誰でも通園制度", "子育て・保育"],
    ["児童館の授乳スペース整備", "子育て・保育"],
    ["いじめ防止対策（プロジェクトチーム新設）", "教育・学校"],
    ["部活動の地域展開", "教育・学校"],
    ["学校統廃合計画の見直し", "教育・学校"],
    ["通常学級に在籍する児童への支援", "教育・学校"],
    ["ヤングケアラーへの支援", "若者・ユース"],
    ["困難を抱える若者への支援", "若者・ユース"],
    ["認知症の人と家族の支援", "高齢者・介護"],
    ["成年後見制度における市民後見人の育成と報酬助成", "高齢者・介護"],
    ["地域包括支援センターの委託料", "高齢者・介護"],
    ["ひきこもり支援", "福祉・サポート"],
    ["障がい者の18歳の壁への対応", "福祉・サポート"],
    ["生活保護世帯の支援", "福祉・サポート"],
    ["膵臓がんの早期発見に向けた検査", "健康・医療"],
    ["18歳以上の軽中等度難聴者への補聴器助成", "健康・医療"],
    ["糖尿病対策の成果", "健康・医療"],
    ["特定健診の受診率", "健康・医療"],
    ["難病患者の交流の場", "健康・医療"],
    ["麻しん対策の強化", "健康・医療"],
    ["木造密集市街地の耐震化促進", "防災・安全"],
    ["危機管理基本方針と事件等緊急事態対処計画", "防災・安全"],
    ["綾瀬エリアの治安と自転車盗対策", "防災・安全"],
    ["地震による液状化への備え", "防災・安全"],
    ["地域の水害への備え", "防災・安全"],
    ["六町駅周辺の自転車走行環境と駐輪場", "道路・交通"],
    ["牛田駅の踏切対策", "道路・交通"],
    ["羽田空港の新飛行ルート", "道路・交通"],
    ["運転免許の自主返納", "道路・交通"],
    ["足タクの利用促進", "道路・交通"],
    ["天神北エリアの回遊性向上", "再開発・まちづくり"],
    ["葬祭施設の設置基準の見直し", "再開発・まちづくり"],
    ["区有地の跡地活用", "再開発・まちづくり"],
    ["旧小学校跡地の活用", "再開発・まちづくり"],
    ["公共施設等総合管理計画に基づく更新", "公共施設"],
    ["指定管理者制度の見直し", "公共施設"],
    ["資源物の持ち去りとリサイクルへの影響", "環境・ごみ・みどり"],
    ["プラスチックの資源循環の推進", "環境・ごみ・みどり"],
    ["掲示板の再資源化に向けた検討", "環境・ごみ・みどり"],
    ["小型充電式電池の回収", "環境・ごみ・みどり"],
    ["北千住駅前における次世代型ゴミ箱の設置", "環境・ごみ・みどり"],
    ["予算編成・財政運営と基金の積極活用", "税金・家計・財政"],
    ["将来世代を守るための区債マネジメントのルール化", "税金・家計・財政"],
    ["物価高支援給付金の個人給付", "税金・家計・財政"],
    [
      "取適法施行を踏まえた価格転嫁・中小企業支援の取組",
      "商店街・しごと・観光",
    ],
    ["若年層への選挙啓発の強化", "行政改革・デジタル"],
    ["大学への期日前投票所の設置", "行政改革・デジタル"],
    ["区の管理職不足と職員の兼務", "行政改革・デジタル"],
    ["公文書管理条例の制定", "行政改革・デジタル"],
    ["駅前マイナンバーカードセンターの設置", "行政改革・デジタル"],
    ["動植物園のリニューアル", "文化・スポーツ"],
    ["歴史ある旧家の保存", "文化・スポーツ"],
    ["東綾瀬公園温水プールの改修", "文化・スポーツ"],
    ["アーバンスポーツの環境整備", "文化・スポーツ"],
    ["銭湯の支援", "文化・スポーツ"],
    ["足立の花火の改革", "文化・スポーツ"],
    ["硬式野球ができる環境", "文化・スポーツ"],
    ["外国籍住民との地域共生", "地域・多文化共生"],
    ["ペットのふんの放置", "地域・多文化共生"],
    ["学校でのDX活用と教育データ連携", "教育・学校"],
    ["SNSリスクから子どもを守る総合的な対策", "子どもの安全・権利"],
    ["こども性暴力防止法の施行に向けた区の準備", "子どもの安全・権利"],
    ["子どもと接する外部指導員の性犯罪歴の確認と研修", "子どもの安全・権利"],
    ["子どもや障がい者への性被害の防止と盗撮カメラ対策", "子どもの安全・権利"],
    ["児童虐待への対応と通話AIシステムの導入", "子どもの安全・権利"],
    ["子どもの自殺対策（SOSの出し方教育）", "子どもの安全・権利"],
    ["児童養護施設とこどもショートステイの拡充", "子どもの安全・権利"],
    ["共同親権の導入に伴う支援制度と周知", "子どもの安全・権利"],
    [
      "学校開放の剣道教室で起きた傷害事件と子どもの安全対策",
      "子どもの安全・権利",
    ],
    ["旧こども家庭支援センター跡地活用事業の推進体制", "再開発・まちづくり"],
    ["中高生世代の自殺対策の推進", "子どもの安全・権利"],
    [
      "居場所機能の拡充とあだち協創フロント・若年者支援協議会の議論の反映",
      "若者・ユース",
    ],
    ["若年層を中心とした自殺対策の強化", "若者・ユース"],
    [
      "学校適正配置が地域コミュニティー・子どもの育つ環境に及ぼす影響への認識",
      "教育・学校",
    ],
    ["若年層への選挙啓発の強化", "行政改革・デジタル"],
    ["高齢者虐待の防止と高齢者の食の場への支援", "高齢者・介護"],
    ["区の広報とSNS発信の強化", "行政改革・デジタル"],
  ] as const)("%s → %s", (title, label) => {
    expect(assignCategory(title).label).toBe(label);
  });

  it("マッチしない → その他", () => {
    expect(assignCategory("特になし").label).toBe("その他");
  });

  it("優先判定の語（省エネ・スポーツなど）は、後ろのカテゴリの語より先に判定される", () => {
    expect(assignCategory("公共建築物の省エネ化").label).toBe(
      "環境・ごみ・みどり"
    );
  });
});

const mockQuestion: GeneralQuestion = {
  id: "q-001",
  council_session_id: "session-1",
  questioner_name: "山田花子",
  questioner_party: "テスト会派",
  questioner_number: 1,
  session_day: 1,
  question_order: 1,
  summary: "保育所の待機児童解消と耐震化促進について質問。",
  topics: [
    {
      title: "保育所の待機児童対策",
      question_summary: "待機児童の解消策は？",
      answer_summary: "令和9年度中に解消予定。",
      answerer_role: "子ども未来局長",
      answerer_name: "田中一郎",
    },
    {
      title: "木造密集市街地の耐震化促進",
      question_summary: "補助を拡充せよ。",
      answer_summary: "令和8年度から150万円に引き上げ。",
      answerer_role: "住宅都市局長",
      answerer_name: "松本雅彦",
    },
  ],
  raw_text: null,
  source_url: null,
  publish_status: "published",
  created_at: "2026-04-01T00:00:00Z",
  updated_at: "2026-04-01T00:00:00Z",
};

describe("buildTopicGroups", () => {
  it("トピックをカテゴリ別に分類する", () => {
    const groups = buildTopicGroups([mockQuestion]);
    const labels = groups.map((g) => g.categoryLabel);
    expect(labels).toContain("子育て・保育");
    expect(labels).toContain("防災・安全");
  });

  it("各グループにentryが含まれる", () => {
    const groups = buildTopicGroups([mockQuestion]);
    const childCare = groups.find((g) => g.categoryLabel === "子育て・保育");
    expect(childCare?.entries).toHaveLength(1);
    expect(childCare?.entries[0].questioner.id).toBe("q-001");
  });

  it("カードはトピック名をtitleに使う", () => {
    const groups = buildTopicGroups([mockQuestion]);
    const childCare = groups.find((g) => g.categoryLabel === "子育て・保育");
    const entry = childCare?.entries[0];
    expect(entry?.title).toBe("保育所の待機児童対策");
  });

  it("同一議員・同一カテゴリの複数トピックもトピックごとに別カードになる", () => {
    const q: GeneralQuestion = {
      id: "q-002",
      council_session_id: "session-1",
      questioner_name: "和田あきひこ",
      questioner_party: null,
      questioner_number: 2,
      session_day: 1,
      question_order: 2,
      summary: "火災警報が平成以降一度も発令されていない実態を指摘。",
      topics: [
        {
          title: "火災警報の発令基準について",
          question_summary: "発令基準の見直しを。",
          answer_summary: "制度の検討を進める。",
          answerer_role: "消防局長",
          answerer_name: "鈴木一郎",
        },
        {
          title: "林野火災注意報の導入について",
          question_summary: "林野火災への対応は？",
          answer_summary: "林野火災注意報の導入を検討する。",
          answerer_role: "消防局長",
          answerer_name: "鈴木一郎",
        },
        {
          title: "災害時のプッシュ型情報発信の必要性",
          question_summary: "住民への情報発信を強化せよ。",
          answer_summary: "プッシュ通知の拡充を検討する。",
          answerer_role: "総務企画局長",
          answerer_name: "佐藤次郎",
        },
      ],
      raw_text: null,
      source_url: null,
      publish_status: "published",
      created_at: "2026-04-01T00:00:00Z",
      updated_at: "2026-04-01T00:00:00Z",
    };

    const groups = buildTopicGroups([q]);
    const bousai = groups.find((g) => g.categoryLabel === "防災・安全");
    expect(bousai?.entries.map((e) => e.title)).toEqual([
      "火災警報の発令基準について",
      "林野火災注意報の導入について",
      "災害時のプッシュ型情報発信の必要性",
    ]);
    // 各カードはそれぞれのトピックの答弁を表示する
    expect(bousai?.entries.map((e) => e.answerSummary)).toEqual([
      "制度の検討を進める。",
      "林野火災注意報の導入を検討する。",
      "プッシュ通知の拡充を検討する。",
    ]);
  });

  it("同一議員でもカテゴリが異なれば別カードになる", () => {
    const q: GeneralQuestion = {
      id: "q-003",
      council_session_id: "session-1",
      questioner_name: "テスト議員",
      questioner_party: null,
      questioner_number: 3,
      session_day: 1,
      question_order: 3,
      summary: "防災と交通について質問。",
      topics: [
        {
          title: "火災警報の改善について",
          question_summary: "警報基準の見直しを。",
          answer_summary: "検討する。",
          answerer_role: "消防局長",
          answerer_name: "A",
        },
        {
          title: "地下鉄延伸計画の現状について",
          question_summary: "地下鉄延伸の見通しは？",
          answer_summary: "条例改正を検討する。",
          answerer_role: "道路下水道局長",
          answerer_name: "B",
        },
      ],
      raw_text: null,
      source_url: null,
      publish_status: "published",
      created_at: "2026-04-01T00:00:00Z",
      updated_at: "2026-04-01T00:00:00Z",
    };

    const groups = buildTopicGroups([q]);
    const labels = groups.map((g) => g.categoryLabel);
    expect(labels).toContain("防災・安全");
    expect(labels).toContain("道路・交通");

    const bousai = groups.find((g) => g.categoryLabel === "防災・安全");
    const kotsu = groups.find((g) => g.categoryLabel === "道路・交通");
    expect(bousai?.entries).toHaveLength(1);
    expect(kotsu?.entries).toHaveLength(1);
  });

  it("空配列は空グループを返す", () => {
    expect(buildTopicGroups([])).toHaveLength(0);
  });

  it("各カードはトピックのindexをtopicIndexに持つ", () => {
    const groups = buildTopicGroups([mockQuestion]);
    const childCare = groups.find((g) => g.categoryLabel === "子育て・保育");
    const bousai = groups.find((g) => g.categoryLabel === "防災・安全");
    expect(childCare?.entries[0].topicIndex).toBe(0);
    expect(bousai?.entries[0].topicIndex).toBe(1);
  });

  it("連続する同カテゴリのトピックもそれぞれ自分のtopicIndexを持つ", () => {
    const q: GeneralQuestion = {
      id: "q-idx",
      council_session_id: "session-1",
      questioner_name: "テスト",
      questioner_party: null,
      questioner_number: 9,
      session_day: 1,
      question_order: 9,
      summary: "",
      topics: [
        // [0] 子育て
        {
          title: "保育の充実",
          question_summary: "q",
          answer_summary: "a",
          answerer_role: "局長",
          answerer_name: "A",
        },
        // [1][2] 防災
        {
          title: "耐震化の推進",
          question_summary: "q",
          answer_summary: "a",
          answerer_role: "局長",
          answerer_name: "A",
        },
        {
          title: "火災警報の見直し",
          question_summary: "q",
          answer_summary: "a",
          answerer_role: "局長",
          answerer_name: "A",
        },
      ],
      raw_text: null,
      source_url: null,
      publish_status: "published",
      created_at: "2026-04-01T00:00:00Z",
      updated_at: "2026-04-01T00:00:00Z",
    };
    const groups = buildTopicGroups([q]);
    const bousai = groups.find((g) => g.categoryLabel === "防災・安全");
    expect(bousai?.entries.map((e) => e.topicIndex)).toEqual([1, 2]);
  });
});

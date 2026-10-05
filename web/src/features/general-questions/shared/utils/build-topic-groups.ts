import type { GeneralQuestion, GeneralQuestionTopic } from "../types";

export type TopicEntry = {
  title: string;
  questionSummary: string;
  answerSummary: string;
  answererRole: string;
  answererName: string;
  /** このトピックが議員の topics 配列内で何番目か（詳細ページのアンカー用） */
  topicIndex: number;
  questioner: {
    id: string;
    name: string;
    party: string | null;
  };
};

export type TopicGroup = {
  categoryLabel: string;
  iconName: string;
  entries: TopicEntry[];
};

// 先に一致したカテゴリが優先されるため、具体的なものを前に置く。
// 同じラベルのエントリを複数置いてよい（優先して判定したい語だけを前に出す用途）。
const CATEGORY_MAP: Array<{
  label: string;
  iconName: string;
  keywords: string[];
}> = [
  {
    label: "若者・ユース",
    iconName: "Sprout",
    keywords: [
      "若者",
      "ユース",
      "ヤングケアラー",
      "SODA",
      "奨学金",
      "中・高生",
      "高校生",
      "成年年齢",
      "若年者支援",
      "若年層を中心とした自殺",
    ],
  },
  {
    label: "子どもの安全・権利",
    iconName: "HandHeart",
    keywords: [
      "SNSリスク",
      "性暴力",
      "性犯罪",
      "性被害",
      "児童虐待",
      "子どもの自殺",
      "中高生世代の自殺",
      "児童養護",
      "ショートステイ",
      "共同親権",
      "傷害事件",
    ],
  },
  {
    label: "再開発・まちづくり",
    iconName: "Building2",
    keywords: ["支援センター跡地"],
  },
  {
    label: "教育・学校",
    iconName: "GraduationCap",
    keywords: [
      "日本語指導",
      "主権者教育",
      "不登校",
      "スクールアシスタント",
      "スクールソーシャル",
      "学力",
      "修学旅行",
      "学校適正配置",
      "学校統廃合",
      "学習環境",
      "情報活用能力",
    ],
  },
  {
    label: "福祉・サポート",
    iconName: "Heart",
    keywords: ["18歳の壁", "ひきこもり", "障がい者", "障がい児", "障害"],
  },
  {
    label: "高齢者・介護",
    iconName: "HeartHandshake",
    keywords: ["認知症とともに"],
  },
  {
    label: "子育て・保育",
    iconName: "Baby",
    keywords: [
      "熱中症予防支援事業",
      "保育",
      "待機児童",
      "産後",
      "子育て",
      "児童館",
      "児童養護",
      "ショートステイ",
      "居場所",
      "こども",
      "子ども",
      "育児",
      "幼稚園",
      "病児",
      "授乳",
      "ベビー",
      "親権",
      "小1",
      "おむつ替え",
      "遊び場",
      "児童虐待",
    ],
  },
  {
    label: "環境・ごみ・みどり",
    iconName: "Leaf",
    keywords: ["ゴミ箱", "ごみ箱", "省エネ", "ZEB"],
  },
  {
    label: "文化・スポーツ",
    iconName: "Trophy",
    keywords: [
      "スポーツ",
      "eスポーツ",
      "アスリート",
      "温水プール",
      "野球",
      "銭湯",
      "花火",
      "動植物園",
      "バスケット",
    ],
  },
  {
    label: "行政改革・デジタル",
    iconName: "MonitorSmartphone",
    keywords: ["マイナンバー", "選挙", "投票"],
  },
  {
    label: "防災・安全",
    iconName: "Shield",
    keywords: [
      "防災",
      "備蓄",
      "災害",
      "火災",
      "仮設住宅",
      "液状化",
      "地震",
      "耐震",
    ],
  },
  {
    label: "公共施設",
    iconName: "Building",
    keywords: [
      "公共施設",
      "本庁舎",
      "複合活用",
      "施設更新",
      "公共建築物",
      "指定管理",
      "統一教会",
      "区施設",
    ],
  },
  {
    label: "再開発・まちづくり",
    iconName: "Building2",
    keywords: [
      "まちづくり",
      "再開発",
      "都市計画",
      "跡地",
      "区有地",
      "タワー",
      "マンション",
      "住宅",
      "空き家",
      "家屋",
      "開発",
      "宿泊施設",
      "民泊",
      "エリアデザイン",
      "複合施設",
      "建築",
      "区画整理",
      "回遊",
      "葬祭",
      "東京大学",
      "駅前ビジョン",
    ],
  },
  {
    label: "教育・学校",
    iconName: "GraduationCap",
    keywords: [
      "学校",
      "教育",
      "給食",
      "不登校",
      "教員",
      "学級",
      "学び",
      "部活動",
      "コミュニティ・スクール",
      "放課後",
      "小・中",
      "いじめ",
      "通級",
      "学童",
      "自然の家",
      "修学",
      "進路",
      "義務教育",
      "外国人児童",
    ],
  },
  {
    label: "高齢者・介護",
    iconName: "HeartHandshake",
    keywords: [
      "高齢者",
      "介護",
      "老人",
      "認知症",
      "孤立",
      "独居",
      "成年後見",
      "特別養護",
      "シルバー",
      "フレイル",
      "デジタルデバイド",
      "移動支援",
      "地域包括",
    ],
  },
  {
    label: "福祉・サポート",
    iconName: "Heart",
    keywords: [
      "福祉",
      "障害",
      "障がい",
      "生活保護",
      "困窮",
      "ひきこもり",
      "ケアラー",
      "犯罪被害",
      "ギャンブル",
      "依存",
      "自殺",
      "日常生活用具",
      "手帳",
      "国民健康保険",
    ],
  },
  {
    label: "健康・医療",
    iconName: "Stethoscope",
    keywords: [
      "ワクチン",
      "医療",
      "コロナ",
      "健康",
      "HPV",
      "衛生",
      "後遺症",
      "肺炎",
      "接種",
      "病院",
      "がん",
      "腫瘍",
      "検診",
      "難聴",
      "補聴器",
      "糖尿病",
      "健診",
      "歯科",
      "難病",
      "感染症",
      "アピアランス",
      "診療",
      "麻しん",
    ],
  },
  {
    label: "防災・安全",
    iconName: "Shield",
    keywords: [
      "耐震",
      "避難",
      "防災",
      "減災",
      "災害",
      "安全",
      "火災",
      "発令",
      "警報",
      "注意報",
      "林野",
      "危機管理",
      "感震",
      "治安",
      "防犯",
      "消火",
      "水害",
      "氾濫",
      "浸水",
      "震災",
      "トイレ",
      "下水道",
      "雨水",
      "液状化",
      "アレフ",
      "オウム",
      "帰宅困難",
    ],
  },
  {
    label: "道路・交通",
    iconName: "Bus",
    keywords: [
      "渋滞",
      "交通",
      "道路",
      "鉄道",
      "バスの",
      "バス廃止",
      "バス路線",
      "路線バス",
      "バス停",
      "自動運転バス",
      "バスと",
      "地下鉄",
      "無電柱",
      "橋梁",
      "駐輪",
      "駅",
      "自転車",
      "自動運転",
      "踏切",
      "歩行者",
      "歩道",
      "オンデマンド",
      "タクシー",
      "足タク",
      "ぐるりん",
      "運転免許",
      "舎人ライナー",
      "ミニ列車",
      "公園整備",
      "飛行",
      "EVバス",
      "コミュニティバス",
      "はるかぜ",
    ],
  },
  {
    label: "環境・ごみ・みどり",
    iconName: "Leaf",
    keywords: [
      "環境",
      "ごみ",
      "リサイクル",
      "脱炭素",
      "CO2",
      "カーボン",
      "太陽光",
      "省エネ",
      "再生可能",
      "温室効果",
      "海洋ごみ",
      "漂着",
      "植栽",
      "資源循環",
      "再資源化",
      "電池",
      "プラスチック",
      "暑さ",
      "猛暑",
      "サステナブル",
      "衣類",
      "デコ活",
      "公園",
      "水辺",
      "みどり",
      "花畑川",
      "緑",
    ],
  },
  {
    label: "税金・家計・財政",
    iconName: "Wallet",
    keywords: [
      "税",
      "財政",
      "予算",
      "行財政",
      "区債",
      "財源",
      "基金",
      "物価",
      "給付金",
      "経常収支",
      "歳出",
      "補助金",
      "決算",
      "防衛費",
      "人口推計",
      "消費税",
      "ネーミングライツ",
      "稼ぐ力",
      "火葬",
    ],
  },
  {
    label: "商店街・しごと・観光",
    iconName: "Store",
    keywords: [
      "商店",
      "中小",
      "事業者",
      "賃上げ",
      "雇用",
      "労働",
      "産業",
      "経済",
      "観光",
      "農業",
      "農林水産",
      "消費喚起",
      "商品券",
      "建設業",
      "起業",
      "スタートアップ",
      "事業承継",
      "金融",
      "取適法",
    ],
  },
  {
    label: "行政改革・デジタル",
    iconName: "MonitorSmartphone",
    keywords: [
      "DX",
      "デジタル",
      "オンライン",
      "窓口",
      "マイナ",
      "行政",
      "職員",
      "人材",
      "広報",
      "区民の声",
      "組織",
      "契約",
      "公文書",
      "AI",
      "申請",
      "ペーパーレス",
      "区政",
      "選挙",
      "投票",
      "後援",
      "区民サービス",
      "アプリ",
      "コンプライアンス",
      "倫理",
      "廃棄",
      "スカーフ",
      "大学",
    ],
  },
  {
    label: "地域・多文化共生",
    iconName: "Users",
    keywords: [
      "町会",
      "自治会",
      "町内会",
      "動物",
      "愛護",
      "飼育",
      "ペット",
      "エサやり",
      "ドッグラン",
      "外国人",
      "外国籍",
      "多文化",
      "国際",
      "共生",
      "人権",
      "差別",
      "男女共同参画",
      "DV",
      "パートナーシップ",
      "拉致",
      "優生保護",
      "盆踊り",
      "共創",
    ],
  },
  {
    label: "文化・スポーツ",
    iconName: "Trophy",
    keywords: [
      "文化",
      "歴史",
      "スポーツ",
      "eスポーツ",
      "アスリート",
      "スタジアム",
      "図書館",
      "ライブラリー",
      "博物館",
      "公民館",
      "動植物園",
      "美術館",
      "プール",
      "バスケットボール",
      "銭湯",
      "デフリンピック",
      "花火",
      "野球",
      "イベント",
    ],
  },
  {
    label: "地域・多文化共生",
    iconName: "Users",
    keywords: ["地域"],
  },
];

// 画面に表示するテーマの並び順（判定の優先順位とは別に固定する）
const CATEGORY_ORDER = [
  "子育て・保育",
  "教育・学校",
  "若者・ユース",
  "子どもの安全・権利",
  "高齢者・介護",
  "福祉・サポート",
  "健康・医療",
  "防災・安全",
  "道路・交通",
  "再開発・まちづくり",
  "公共施設",
  "環境・ごみ・みどり",
  "税金・家計・財政",
  "商店街・しごと・観光",
  "行政改革・デジタル",
  "文化・スポーツ",
  "地域・多文化共生",
  "その他",
];

export function assignCategory(topicTitle: string): {
  label: string;
  iconName: string;
} {
  for (const cat of CATEGORY_MAP) {
    if (cat.keywords.some((kw) => topicTitle.includes(kw))) {
      return { label: cat.label, iconName: cat.iconName };
    }
  }
  return { label: "その他", iconName: "Circle" };
}

function buildEntry(
  q: GeneralQuestion,
  topic: GeneralQuestionTopic,
  topicIndex: number
): TopicEntry {
  return {
    title: topic.title,
    questionSummary: topic.question_summary,
    answerSummary: topic.answer_summary,
    answererRole: topic.answerer_role,
    answererName: topic.answerer_name,
    topicIndex,
    questioner: {
      id: q.id,
      name: q.questioner_name,
      party: q.questioner_party,
    },
  };
}

export function buildTopicGroups(questions: GeneralQuestion[]): TopicGroup[] {
  // 1トピック＝1カード。同じ議員の連続した同カテゴリのトピックもまとめない
  // （まとめると先頭トピックの答弁しか表示されず、件数表示とカード枚数もずれるため）
  const categoryMap = new Map<string, TopicGroup>();

  for (const q of questions) {
    q.topics.forEach((topic, i) => {
      const { label, iconName } = assignCategory(topic.title);
      const entry = buildEntry(q, topic, i);
      const existing = categoryMap.get(label);
      if (existing) {
        existing.entries.push(entry);
      } else {
        categoryMap.set(label, {
          categoryLabel: label,
          iconName,
          entries: [entry],
        });
      }
    });
  }

  const orderedLabels = CATEGORY_ORDER.filter((l) => categoryMap.has(l));

  return orderedLabels.map((l) => categoryMap.get(l) as TopicGroup);
}

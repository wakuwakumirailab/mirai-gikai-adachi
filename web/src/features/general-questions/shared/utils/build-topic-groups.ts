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

const CATEGORY_MAP: Array<{
  label: string;
  iconName: string;
  keywords: string[];
}> = [
  {
    label: "子育て・教育",
    iconName: "Baby",
    keywords: [
      "保育",
      "子ども",
      "給食",
      "学校",
      "育児",
      "児童",
      "教育",
      "不登校",
      "教員",
      "修学",
      "進路",
      "学び",
      "義務教育",
      "外国人児童",
      "いじめ",
      "通級",
      "子育て",
      "産後",
      "ヤングケアラー",
      "こども",
      "小1",
      "中・高生",
      "奨学金",
      "幼稚園",
      "部活動",
      "親権",
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
      "自殺",
      "アピアランス",
      "診療",
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
      "液状化",
      "アレフ",
      "オウム",
    ],
  },
  {
    label: "高齢者・福祉",
    iconName: "Heart",
    keywords: [
      "高齢者",
      "移動支援",
      "国民健康保険",
      "デジタルデバイド",
      "福祉",
      "介護",
      "障害",
      "老人",
      "孤立",
      "独居",
      "成年後見",
      "障がい",
      "生活保護",
      "認知症",
      "ひきこもり",
      "困窮",
    ],
  },
  {
    label: "交通・まちづくり",
    iconName: "Building2",
    keywords: [
      "渋滞",
      "交通",
      "道路",
      "鉄道",
      "バス",
      "地下鉄",
      "まちづくり",
      "再開発",
      "無電柱",
      "橋梁",
      "駐輪",
      "住宅",
      "民泊",
      "回遊",
      "歩行者",
      "駅",
      "自転車",
      "自動運転",
      "踏切",
      "区画整理",
      "飛行",
      "建築",
      "葬祭",
      "エリアデザイン",
      "跡地",
      "区有地",
      "空き家",
      "家屋",
      "歩道",
      "オンデマンド",
      "タクシー",
      "運転免許",
      "舎人ライナー",
      "公園整備",
    ],
  },
  {
    label: "環境・脱炭素",
    iconName: "Leaf",
    keywords: [
      "太陽光",
      "省エネ",
      "カーボン",
      "再生可能",
      "環境保全",
      "脱炭素",
      "ゼロカーボン",
      "温室効果",
      "海洋ごみ",
      "漂着",
      "植栽",
      "リサイクル",
      "資源循環",
      "再資源化",
      "ごみ",
      "電池",
      "プラスチック",
      "暑さ",
      "猛暑",
    ],
  },
  {
    label: "スポーツ・文化",
    iconName: "Trophy",
    keywords: [
      "スポーツ",
      "eスポーツ",
      "アスリート",
      "スタジアム",
      "博物館",
      "公民館",
      "動植物園",
      "植物園",
      "美術館",
      "文化芸術",
      "文化財",
      "プール",
      "バスケットボール",
      "銭湯",
      "歴史",
      "デフリンピック",
      "花火",
      "野球",
      "図書館",
      "ライブラリー",
    ],
  },
  {
    label: "地域・国際交流",
    iconName: "Globe",
    keywords: [
      "農業",
      "観光",
      "地域",
      "国際",
      "外国人",
      "外国籍",
      "多文化",
      "共生",
      "動物",
      "愛護",
      "自治会",
      "町内会",
      "飼育",
      "農林水産",
      "人権",
      "差別",
      "町会",
      "男女共同参画",
      "DV",
      "パートナーシップ",
      "拉致",
      "優生保護",
      "エサやり",
      "ペット",
      "盆踊り",
      "ドッグラン",
    ],
  },
  {
    label: "行財政・経済",
    iconName: "Landmark",
    keywords: [
      "財政",
      "予算",
      "行財政",
      "区債",
      "財源",
      "物価",
      "給付金",
      "契約",
      "職員",
      "広報",
      "窓口",
      "公共施設",
      "基金",
      "区政運営",
      "DX",
      "マイナンバー",
      "ペーパーレス",
      "経済",
      "産業",
      "中小企業",
      "商店街",
      "スタートアップ",
      "起業",
      "雇用",
      "労働",
      "金融",
      "取適法",
      "事業承継",
      "選挙",
      "投票",
      "公文書",
      "区政",
      "決算",
      "大学",
      "指定管理",
      "消費税",
      "後援",
      "AI",
      "税収",
      "人口推計",
      "補助金",
      "区民サービス",
    ],
  },
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

  const orderedLabels = [...CATEGORY_MAP.map((c) => c.label), "その他"].filter(
    (l) => categoryMap.has(l)
  );

  return orderedLabels.map((l) => categoryMap.get(l) as TopicGroup);
}

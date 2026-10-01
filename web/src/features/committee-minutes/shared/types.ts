/** 委員会の区分 */
export type CommitteeType =
  | "standing"
  | "special"
  | "budget"
  | "audit"
  | "management";

/** 意見が分かれたトピックでの、発言者ごとの主張要約 */
export type TopicPosition = {
  /** 発言者の表示名（例: ○○委員／足立福祉事務所長） */
  speaker: string;
  /** 委員の所属会派。執行機関や不明の場合は null */
  party: string | null;
  /** member=委員／executive=執行機関（区側） */
  role: "member" | "executive";
  /** 主張の要約（詳しい版） */
  text: string;
  /** やさしい版。未設定なら text を使う */
  text_easy?: string | null;
};

/** トピックで審査された議案・請願陳情（表示時に bills を引いて解決済み） */
export type RelatedBill = {
  billType: "bill" | "petition";
  billNumber: string;
  name: string;
  /** 詳細ページへのパス（/bills/xxx または /petitions/xxx） */
  href: string;
};

/** 会議内の1トピック（議題・話題のまとまり） */
export type CommitteeMeetingTopic = {
  id: string;
  topicOrder: number;
  title: string;
  /** 何が話し合われたか */
  summary: string | null;
  summaryEasy: string | null;
  /** 結論（可決・継続審査など、または議論の到達点） */
  conclusion: string | null;
  conclusionEasy: string | null;
  /** 意見が分かれた場合の発言者別整理。空なら対立なし */
  positions: TopicPosition[];
  /** このトピックで審査された議案・請願陳情 */
  relatedBills: RelatedBill[];
};

/** 委員会の開催1回分 */
export type CommitteeMeeting = {
  id: string;
  committeeName: string;
  committeeSlug: string;
  committeeType: CommitteeType;
  meetingDate: string;
  title: string;
  sourceDocumentId: number;
  /** 会議録検索システムの該当会議へのリンク（原文を見たい人向け） */
  sourceUrl: string;
  /** 会議全体の要約（詳しい版） */
  summary: string | null;
  summaryEasy: string | null;
  topics: CommitteeMeetingTopic[];
};

/** 委員会（アーカイブの単位） */
export type CommitteeArchive = {
  slug: string;
  /** 委員会名（最新の会議の名称） */
  name: string;
  type: CommitteeType;
  meetingCount: number;
  latestMeetingDate: string;
};

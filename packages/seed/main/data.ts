import type { Database } from "@mirai-gikai/supabase";

type BillInsert = Database["public"]["Tables"]["bills"]["Insert"];
type FactionStanceInsert =
  Database["public"]["Tables"]["faction_stances"]["Insert"];
type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
type BillsTagsInsert = Database["public"]["Tables"]["bills_tags"]["Insert"];
type CouncilSessionInsert =
  Database["public"]["Tables"]["council_sessions"]["Insert"];
type FactionInsert = Database["public"]["Tables"]["factions"]["Insert"];
type CommitteeInsert = Database["public"]["Tables"]["committees"]["Insert"];
type CouncilMemberInsert =
  Database["public"]["Tables"]["council_members"]["Insert"];
type CouncilMemberCommitteeInsert =
  Database["public"]["Tables"]["council_member_committees"]["Insert"];
type InterviewConfigInsert =
  Database["public"]["Tables"]["interview_configs"]["Insert"];
type InterviewQuestionInsert =
  Database["public"]["Tables"]["interview_questions"]["Insert"];
type InterviewSessionInsert =
  Database["public"]["Tables"]["interview_sessions"]["Insert"];
type InterviewMessageInsert =
  Database["public"]["Tables"]["interview_messages"]["Insert"];
type InterviewReportInsert =
  Database["public"]["Tables"]["interview_report"]["Insert"];

// 定例会データ（足立区議会公式サイト「議案の検索」より取得。令和7年度・令和8年度分）
export const councilSessions: CouncilSessionInsert[] = [
  {
    name: "令和7年 第1回 臨時会",
    slug: "r7-1-rinji",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2025%2F06%2F05%2C2025%2F06%2F05%2C129&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2025-06-05",
    end_date: "2025-06-05",
    is_active: false,
  },
  {
    name: "令和7年 第2回 定例会",
    slug: "r7-2",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2025%2F06%2F24%2C2025%2F07%2F11%2C130&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2025-06-24",
    end_date: "2025-07-11",
    is_active: false,
  },
  {
    name: "令和7年 第3回 定例会",
    slug: "r7-3",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2025%2F09%2F16%2C2025%2F10%2F20%2C131&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2025-09-16",
    end_date: "2025-10-20",
    is_active: false,
  },
  {
    name: "令和7年 第4回 定例会",
    slug: "r7-4",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2025%2F12%2F01%2C2025%2F12%2F17%2C132&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2025-12-01",
    end_date: "2025-12-17",
    is_active: false,
  },
  {
    name: "令和7年 第2回 臨時会",
    slug: "r7-2-rinji",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2025%2F12%2F26%2C2025%2F12%2F26%2C133&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2025-12-26",
    end_date: "2025-12-26",
    is_active: false,
  },
  {
    name: "令和8年 第1回 定例会",
    slug: "r8-1",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2026%2F02%2F19%2C2026%2F03%2F24%2C134&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2026-02-19",
    end_date: "2026-03-24",
    is_active: false,
  },
  {
    name: "令和8年 第1回 臨時会",
    slug: "r8-1-rinji",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2026%2F06%2F05%2C2026%2F06%2F05%2C135&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2026-06-05",
    end_date: "2026-06-05",
    is_active: false,
  },
  {
    name: "令和8年 第2回 定例会",
    slug: "r8-2",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2026%2F06%2F22%2C2026%2F07%2F07%2C136&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2026-06-22",
    end_date: "2026-07-07",
    is_active: false,
  },
  {
    name: "令和8年 第3回 定例会",
    slug: "r8-3",
    council_url: "https://www.gikai-adachi.jp/g07_giketsu.asp?kword1=&exp=AND&kword2=&kaigi=2026%2F09%2F14%2C2026%2F10%2F20%2C137&bunrui=&nenfrom=&nento=&kekka=&kensu=100&Sflg=2&smode=3",
    start_date: "2026-09-14",
    end_date: "2026-10-20",
    is_active: false,
  },
];

// 議案データ（足立区議会公式サイト「議案の検索」より取得。令和7年度・令和8年度分、計165件）
// bill_type: "bill" = わかりやすい解説の対象、"procedural" = 一覧のみ表示（指定管理者の指定・契約・購入等の事務手続き議案）
type RealBillSeed = {
  sessionSlug: string;
  billNumber: string;
  name: string;
  publishedAt: string;
  status: BillInsert["status"];
  statusNote: string | null;
  billType: "bill" | "procedural" | "petition";
  /** 請願・陳情の付託委員会（あれば committees.id へ解決する） */
  committeeName?: string;
  /** 事務手続き議案（procedural）の内容を1〜2文で要約したもの */
  proceduralSummary?: string;
};

export const realBillsSeed: RealBillSeed[] = [
  { sessionSlug: "r7-1-rinji", billNumber: "第58号", name: "足立区立公園等に係る移動等円滑化のために必要な特定公園施設の設置に関する基準を定める条例の一部を改正する条例", publishedAt: "2025-06-05", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-1-rinji", billNumber: "第59号", name: "令和7年度足立区一般会計補正予算(第3号）", publishedAt: "2025-06-05", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第60号", name: "令和7年度足立区一般会計補正予算(第4号）", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第61号", name: "令和7年度足立区国民健康保険特別会計補正予算（第1号）", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第62号", name: "令和7年度足立区後期高齢者医療特別会計補正予算（第1号）", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第63号", name: "（仮称）第三上沼田保育園新築電気設備工事請負契約", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第64号", name: "足立区特別区税条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第65号", name: "権利の放棄について", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第66号", name: "足立区江北駅周辺地区地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第67号", name: "足立区綾瀬駅東口周辺地区地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第68号", name: "債権の放棄について", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第69号", name: "足立区育英資金条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第70号", name: "足立区特別職議員報酬等審議会条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第71号", name: "足立区行政委員会の委員及び非常勤の監査委員の報酬及び費用弁償に関する条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第72号", name: "新田学園第二校舎外壁改修その他工事請負契約", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第73号", name: "古千谷小学校全体保全計画にかかる内外装改修その他工事（三期）請負契約", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第74号", name: "区営大谷田二丁目アパート3・5号棟解体工事請負契約", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第75号", name: "花畑川環境整備その1通水工事請負契約", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第76号", name: "区営新田二丁目アパート解体工事請負契約", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第77号", name: "マイボトル式ウォーターサーバーへの買い替えについて", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第78号", name: "学校給食室設備（回転釜及び付属品）の買い替え（足立小学校外6校）について", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第79号", name: "学校給食室設備（食器洗浄機外）の買い替え（足立小学校外9校）について", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第80号", name: "学校給食室設備（熱風消毒保管庫）の買い替え（加平小学校外2校）について", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第81号", name: "学校給食室設備（熱風消毒保管庫）の買い替え（第五中学校外6校）について", publishedAt: "2025-07-02", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第82号", name: "足立区子どもの医療費の助成に関する条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第83号", name: "足立区障がい福祉センター条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第84号", name: "財産の処分について", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第85号", name: "建物売買代金請求訴訟に関する和解について", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-2", billNumber: "第86号", name: "足立区特定教育・保育施設、特定地域型保育事業等の利用者負担に関する条例の一部を改正する条例", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2", billNumber: "第87号", name: "令和7年度足立区一般会計補正予算(第5号）", publishedAt: "2025-07-11", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第88号", name: "令和6年度足立区一般会計歳入歳出決算", publishedAt: "2025-10-20", status: "approved", statusNote: "認定", billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第89号", name: "令和6年度足立区国民健康保険特別会計歳入歳出決算", publishedAt: "2025-10-20", status: "approved", statusNote: "認定", billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第90号", name: "令和6年度足立区介護保険特別会計歳入歳出決算", publishedAt: "2025-10-20", status: "approved", statusNote: "認定", billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第91号", name: "令和6年度足立区後期高齢者医療特別会計歳入歳出決算", publishedAt: "2025-10-20", status: "approved", statusNote: "認定", billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第92号", name: "令和7年度足立区一般会計補正予算(第6号）", publishedAt: "2025-10-20", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第93号", name: "令和7年度足立区介護保険特別会計補正予算（第1号）", publishedAt: "2025-10-20", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第94号", name: "足立区職員の勤務時間、休日、休暇等に関する条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第95号", name: "足立区職員の育児休業等に関する条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第96号", name: "足立区災害対策条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第97号", name: "平野小学校校庭改修その他工事請負契約", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第98号", name: "足立区公衆浴場法施行条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第99号", name: "足立区千住大川端地区再開発地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第100号", name: "足立区に係る防災街区整備地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第101号", name: "特別区道路線の認定について", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第102号", name: "特別区道路線の認定について", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第103号", name: "特別区道路線の認定について", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第104号", name: "足立区乳児等通園支援事業の設備及び運営に関する基準を定める条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第105号", name: "足立区立学童保育室条例の一部を改正する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第106号", name: "理科教育設備物品の購入について", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第107号", name: "委託料精算金請求事件に関する和解について", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-3", billNumber: "第108号", name: "足立区長等の給料の特例に関する条例", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-3", billNumber: "第109号", name: "防災センター等機器賃借（映像系）について", publishedAt: "2025-09-16", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第110号", name: "令和7年度足立区一般会計補正予算（第7号）", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第111号", name: "令和7年度足立区国民健康保険特別会計補正予算（第2号）", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第112号", name: "令和7年度足立区介護保険特別会計補正予算（第2号）", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第113号", name: "足立区議会議員及び足立区長の選挙における選挙運動の公費負担に関する条例の一部を改正する条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第114号", name: "足立区非常勤職員の報酬および費用弁償に関する条例の一部を改正する条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第115号", name: "足立区職員の旅費に関する条例の一部を改正する条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第116号", name: "足立区江北多目的運動場条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第117号", name: "足立区地域学習センターの指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第118号", name: "足立区立図書館の指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第119号", name: "足立区地域体育館の指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第120号", name: "債権の放棄について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第121号", name: "債権の放棄について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第122号", name: "債権の放棄について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第123号", name: "足立区総合ボランティアセンターの指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第124号", name: "足立区ケアハウス六月の指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第125号", name: "足立区高齢者在宅サービスセンター西新井の指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第126号", name: "足立区綾瀬福祉園の指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第127号", name: "足立区大谷田就労支援センターの指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第128号", name: "足立区身体障がい者大谷田ホームの指定管理者の指定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第129号", name: "足立区事務手数料条例の一部を改正する条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第130号", name: "特別区道路線の認定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第131号", name: "特別区道路線の認定について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第132号", name: "特別区道路線の廃止について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第133号", name: "特別区道路線の廃止について", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第134号", name: "足立区立小学校、中学校等の学校医、学校歯科医及び学校薬剤師の公務災害補償に関する条例の一部を改正する条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第135号", name: "足立区の一般職の任期付職員の採用及び給与の特例に関する条例の一部を改正する条例", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第136号", name: "足立区職員の給与に関する条例の一部を改正する条例", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第137号", name: "足立区会計年度任用職員の給与及び費用弁償に関する条例の一部を改正する条例", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第138号", name: "富士見歩道橋架け替え及び周辺護岸整備工事請負契約", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第139号", name: "江北コミュニティセンター大規模改修工事請負契約", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第140号", name: "児童・生徒用Chromebook等の購入について", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第141号", name: "避難所用折り畳み式リクライニングベッド等の購入について", publishedAt: "2025-12-08", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r7-4", billNumber: "第142号", name: "足立区創業支援施設条例の一部を改正する条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第143号", name: "足立区教育委員会いじめ重大事態等調査委員会設置条例", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-4", billNumber: "第144号", name: "令和7年度足立区一般会計補正予算(第8号）", publishedAt: "2025-12-17", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r7-2-rinji", billNumber: "第145号", name: "令和7年度足立区一般会計補正予算（第9号）", publishedAt: "2025-12-26", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第1号", name: "令和7年度足立区一般会計補正予算（第10号）", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第2号", name: "令和7年度足立区国民健康保険特別会計補正予算（第3号）", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第3号", name: "令和7年度足立区介護保険特別会計補正予算（第3号）", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第4号", name: "令和7年度足立区後期高齢者医療特別会計補正予算（第2号）", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第5号", name: "令和8年度足立区一般会計予算", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第6号", name: "令和8年度足立区国民健康保険特別会計予算", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第7号", name: "令和8年度足立区介護保険特別会計予算", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第8号", name: "令和8年度足立区後期高齢者医療特別会計予算", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第9号", name: "足立区組織条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第10号", name: "足立区情報公開条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第11号", name: "足立区職員定数条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "職員定数を2,547人→2,568人など見直し、総定数を3,455人→3,484人に増やします。施行日は令和8年4月1日。" },
  { sessionSlug: "r8-1", billNumber: "第12号", name: "足立区附属機関の構成員の報酬および費用弁償に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第13号", name: "足立区事務手数料条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第14号", name: "足立区いじめ等特別調査委員会設置条例を廃止する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第15号", name: "足立区特別区税条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第16号", name: "足立区後期高齢者医療に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第17号", name: "東京都後期高齢者医療広域連合の規約変更について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "東京都後期高齢者医療広域連合規約を変更し、保険料軽減に係る経費の支弁方法（対象年度）を令和8・9年度分に更新します。" },
  { sessionSlug: "r8-1", billNumber: "第18号", name: "足立区の特定の事務を取り扱う郵便局の指定について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "個人番号カード関連事務を取り扱う郵便局として、足立・足立北・足立西の3局を令和8年4月から1年間指定します。" },
  { sessionSlug: "r8-1", billNumber: "第19号", name: "足立区認知症とともにいつまでもこのまちで条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第20号", name: "足立区介護保険条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第21号", name: "債権の放棄について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "生活保護法に基づく徴収金127万5,000円分の債権を放棄します。債務者が自己破産の免責決定を受け、回収の見込みがないためです。" },
  { sessionSlug: "r8-1", billNumber: "第22号", name: "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第23号", name: "足立区中高層建築物等の建築に係る紛争の予防及び調整条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第24号", name: "足立区建築審査会条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第25号", name: "足立区に係る沿道地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第26号", name: "足立区竹ノ塚駅中央地区地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第27号", name: "特別区道路線の認定について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "足立区江北三丁目地内（延長128.10m）の道路を特別区道として新たに認定します。" },
  { sessionSlug: "r8-1", billNumber: "第28号", name: "特別区道路線の認定について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "足立区千住五丁目地内（延長24.17m）の道路を特別区道として新たに認定します。" },
  { sessionSlug: "r8-1", billNumber: "第29号", name: "特別区道路線の認定について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "足立区西伊興三丁目・古千谷一丁目地内（延長592.56m）の道路を特別区道として新たに認定します。" },
  { sessionSlug: "r8-1", billNumber: "第30号", name: "足立区放課後児童健全育成事業の設備及び運営に関する基準を定める条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第31号", name: "足立区立保育所の指定管理者の指定について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "足立区立青井保育園（社会福祉法人からしだね）と五反野保育園（株式会社日本保育サービス）の指定管理者を、それぞれ令和9年4月から指定します。" },
  { sessionSlug: "r8-1", billNumber: "第32号", name: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第33号", name: "足立区行政委員会の委員及び非常勤の監査委員の報酬及び費用弁償に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第34号", name: "選挙長等の報酬及び費用弁償に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第35号", name: "区議会等の行う調査のため出頭する者及び公聴会に参加する者の費用弁償条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "区議会の調査等に出頭する者・公聴会参加者への費用弁償の区分を、職員旅費条例の改正に合わせて8種類に整理します。" },
  { sessionSlug: "r8-1", billNumber: "第36号", name: "足立区長等の給料等に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第37号", name: "足立区職員の給与に関する条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第38号", name: "足立区こども計画審議会条例を廃止する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第39号", name: "本庁舎北館大規模改修工事第2期請負契約", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "白谷建設株式会社と8億4,700万円で本庁舎北館大規模改修工事（第2期）の請負契約を締結します。工期は令和10年2月29日まで。" },
  { sessionSlug: "r8-1", billNumber: "第40号", name: "本庁舎北館大規模改修電気設備工事第2期請負契約", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "幸信電気株式会社と4億1,690万円で本庁舎北館大規模改修電気設備工事（第2期）の請負契約を締結します。工期は令和10年2月29日まで。" },
  { sessionSlug: "r8-1", billNumber: "第41号", name: "本庁舎北館大規模改修機械設備工事第2期請負契約", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "やんま株式会社と4億9,159万円で本庁舎北館大規模改修機械設備工事（第2期）の請負契約を締結します。工期は令和10年2月29日まで。" },
  { sessionSlug: "r8-1", billNumber: "第42号", name: "庁舎ホール床機構制御システムの更新について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "三菱重工機械システム株式会社と2億4,750万円で庁舎ホールの床機構制御システムを更新します。履行期限は令和9年2月28日。" },
  { sessionSlug: "r8-1", billNumber: "第43号", name: "遮熱レースカーテンの購入について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "むつみ室内装飾店から遮熱レースカーテンを6,930万円で購入します。納期は令和8年5月31日。" },
  { sessionSlug: "r8-1", billNumber: "第44号", name: "災害用備蓄包括管理事業について", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "佐川急便を代表企業とする共同企業体（京都市）と6億5,487万3,356円で災害用備蓄包括管理事業を委託します。履行期限は令和9年3月31日。" },
  { sessionSlug: "r8-1", billNumber: "第45号", name: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第46号", name: "足立区特定教育・保育施設及び特定地域型保育事業並びに特定子ども・子育て支援施設等の運営に関する基準を定める条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第47号", name: "足立区家庭的保育事業等の設備及び運営に関する基準を定める条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第48号", name: "足立区乳児等通園支援事業の設備及び運営に関する基準を定める条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1", billNumber: "第49号", name: "足立区国民健康保険条例の一部を改正する条例", publishedAt: "2026-03-24", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-1-rinji", billNumber: "第50号", name: "特別区道路線の認定について", publishedAt: "2026-06-05", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-1-rinji", billNumber: "第51号", name: "特別区道路線の認定について", publishedAt: "2026-06-05", status: "approved", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-1-rinji", billNumber: "第52号", name: "令和8年度足立区一般会計補正予算(第1号）", publishedAt: "2026-06-05", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-2", billNumber: "第53号", name: "令和8年度足立区一般会計補正予算(第2号）", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-2", billNumber: "第54号", name: "令和8年度足立区介護保険特別会計補正予算（第1号）", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-2", billNumber: "第55号", name: "足立区特別区税条例の一部を改正する条例", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-2", billNumber: "第56号", name: "権利の放棄について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "図書館システムで管理する未返却図書資料（152名分）の返還請求権を放棄します。返却期限から10年経過、または5年経過で連絡先不明になったものが対象です。" },
  { sessionSlug: "r8-2", billNumber: "第57号", name: "足立区介護保険事業者支援施設の大規模改修工事の実施に関する基本協定の締結について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "社会福祉法人聖風会（花畑）が行う介護保険事業者支援施設の大規模改修工事について、区が上限10億円を負担する基本協定を締結します。工期は令和11年3月31日まで。" },
  { sessionSlug: "r8-2", billNumber: "第58号", name: "債権の放棄について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "足立区生業資金貸付金のうち152万5,307円分の債権を放棄します。主債務者が死亡し、連帯保証人（相続人）も生活困窮のため回収の見込みがないことが理由です。" },
  { sessionSlug: "r8-2", billNumber: "第59号", name: "足立区住宅・建築物耐震助成条例の一部を改正する条例", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-2", billNumber: "第60号", name: "足立区立校外施設条例の一部を改正する条例", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-2", billNumber: "第61号", name: "西新井第二小学校全体保全計画にかかる外壁改修その他工事請負契約", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "株式会社丸中工務店と2億9,370万円で外壁改修工事の請負契約を締結します。工期は令和9年2月5日まで。" },
  { sessionSlug: "r8-2", billNumber: "第62号", name: "舎人第一小学校外壁改修その他工事（一期）請負契約", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "株式会社ハヤカワと2億1,230万円で外壁改修工事（一期）の請負契約を締結します。工期は令和9年1月25日まで。" },
  { sessionSlug: "r8-2", billNumber: "第63号", name: "保木間小学校校庭改修工事請負契約", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "誠和光建株式会社と2億9,920万円で校庭改修工事の請負契約を締結します。工期は令和8年12月25日まで。" },
  { sessionSlug: "r8-2", billNumber: "第64号", name: "入谷中学校全体保全計画にかかる内装改修その他工事（二期）請負契約", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "太和工業株式会社と2億8,600万円で内装改修工事（二期）の請負契約を締結します。工期は令和9年1月22日まで。" },
  { sessionSlug: "r8-2", billNumber: "第65号", name: "竹の塚保健センター冷温水発生機改修その他工事請負契約", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "正和工業株式会社東京支社と2億4,840万2,000円で冷温水発生機改修工事の請負契約を締結します。工期は令和9年3月17日まで。" },
  { sessionSlug: "r8-2", billNumber: "第66号", name: "東六月町ひまわり作業所大規模改修建築工事請負契約", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "株式会社似鳥工務店と2億9,425万円で大規模改修建築工事の請負契約を締結します。工期は令和9年7月30日まで。" },
  { sessionSlug: "r8-2", billNumber: "第67号", name: "起震車の購入について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "飛鳥特装株式会社（神奈川県相模原市）から起震車1台を8,118万円で購入します。納期は令和9年2月15日。" },
  { sessionSlug: "r8-2", billNumber: "第68号", name: "区立小中学校児童・生徒・教職員向け災害備蓄用ライスクッキー等の購入について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "船山株式会社東京本店から災害備蓄用ライスクッキー等を3,134万185円で購入します。納期は令和8年8月31日。" },
  { sessionSlug: "r8-2", billNumber: "第69号", name: "学校給食室設備（炊飯器外）の買い替えについて", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "イズミ商事株式会社から炊飯器等の学校給食室設備を4,386万9,375円で買い替えます。納期は令和8年11月30日。" },
  { sessionSlug: "r8-2", billNumber: "第70号", name: "学校給食室設備（回転釜及び付属品）の買い替え（千寿本町小学校外7校）について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "タニコー株式会社城北営業所から回転釜等の学校給食室設備を5,830万円で買い替えます（千寿本町小学校外7校）。" },
  { sessionSlug: "r8-2", billNumber: "第71号", name: "学校給食室設備（回転釜及び付属品）の買い替え（西新井第二小学校外5校）について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "株式会社マルゼン足立営業所から回転釜等の学校給食室設備を4,917万円で買い替えます（西新井第二小学校外5校）。" },
  { sessionSlug: "r8-2", billNumber: "第72号", name: "学校給食室設備（熱風消毒保管庫）の買い替え（足立小学校外3校）について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "株式会社新郷厨房から熱風消毒保管庫の学校給食室設備を6,730万9,000円で買い替えます（足立小学校外3校）。" },
  { sessionSlug: "r8-2", billNumber: "第73号", name: "学校給食室設備（熱風消毒保管庫）の買い替え（鹿浜第一小学校外5校）について", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "株式会社オーキンから熱風消毒保管庫の学校給食室設備を4,345万円で買い替えます（鹿浜第一小学校外5校）。" },
  { sessionSlug: "r8-2", billNumber: "第74号", name: "学校給食室設備（食器洗浄機外）の買い替えについて", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "イズミ商事株式会社から食器洗浄機等の学校給食室設備を6,187万5,000円で買い替えます。納期は令和8年11月30日。" },
  { sessionSlug: "r8-2", billNumber: "第75号", name: "学校給食室設備（コンベクションオーブン外）の買い替えについて", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "有限会社中田屋からコンベクションオーブン等の学校給食室設備を3,353万9,000円で買い替えます。納期は令和8年11月30日。" },
  { sessionSlug: "r8-2", billNumber: "第76号", name: "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "procedural", proceduralSummary: "千住大川端地区A工区の道路整備に伴う土壌汚染対策等工事について、東京製鐵など開発事業者3社が区に上限3億5,000万円を負担する協定を締結します。本会議の採決は賛成33・反対7で、共産党と無所属の一部議員が反対しました。" },
  { sessionSlug: "r8-2", billNumber: "第77号", name: "令和8年度足立区一般会計補正予算（第3号）", publishedAt: "2026-07-07", status: "approved", statusNote: null, billType: "bill" },

  // 令和8年第3回定例会（r8-3、2026-09-14〜2026-10-20）。委員会審査はこれから
  // （総務9/17・区民9/18・産業環境9/24・建設/文教10月・決算特別委員会9/28〜）のため、
  // 審議未了 = submitted。わかりやすい解説（bill_contents）は委員会審査後に別途追加する。
  { sessionSlug: "r8-3", billNumber: "第78号", name: "令和7年度足立区一般会計歳入歳出決算", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第79号", name: "令和7年度足立区国民健康保険特別会計歳入歳出決算", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第80号", name: "令和7年度足立区介護保険特別会計歳入歳出決算", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第81号", name: "令和7年度足立区後期高齢者医療特別会計歳入歳出決算", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第82号", name: "令和8年度足立区一般会計補正予算(第4号）", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第83号", name: "令和8年度足立区国民健康保険特別会計補正予算（第1号）", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第84号", name: "令和8年度足立区介護保険特別会計補正予算（第2号）", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第85号", name: "令和8年度足立区後期高齢者医療特別会計補正予算（第1号）", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第86号", name: "加平小学校人工芝改修工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第87号", name: "青井住区センター大規模改修工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第88号", name: "（仮称）舎人三丁目第二公園整備工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第89号", name: "花畑地域学習センター大規模改修その他工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第90号", name: "花畑地域学習センター大規模改修機械設備工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第91号", name: "東伊興住区センター分館大規模改修工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第92号", name: "足立区印鑑条例の一部を改正する条例", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第93号", name: "債権の放棄について", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第94号", name: "債権の放棄について", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第95号", name: "足立区千住旭町地区地区計画の区域内における建築物の制限に関する条例の一部を改正する条例", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第96号", name: "特別区道路線の認定について", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第97号", name: "足立区長等の給料の特例に関する条例", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第98号", name: "梅島小学校外壁改修工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第99号", name: "千住大橋防災船着場整備工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第100号", name: "花畑地域学習センター大規模改修電気設備工事請負契約", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第101号", name: "東渕江小学校改築工事請負契約の変更について", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "procedural" },
  { sessionSlug: "r8-3", billNumber: "第102号", name: "足立区多文化共生推進計画審議会条例", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
  { sessionSlug: "r8-3", billNumber: "第103号", name: "足立区景観条例の一部を改正する条例", publishedAt: "2026-09-14", status: "submitted", statusNote: null, billType: "bill" },
];

// 請願・陳情データ（足立区議会公式サイト「請願・陳情の検索」より取得。
// 令和7年度・令和8年度の会期に付託されたもの、計27件）
// 受理番号は西暦の暦年でカウントされるため、令和7年2月受理分（07-1・07-2）は
// 議案データと同じく令和6年度以前の会期に付託されており、今回取り込んだ
// 8会期（令和7年度・令和8年度分）の範囲外のため対象外としている。
// 継続審査中のものは直近の付託会期を council_session_id として保持し、
// 審査結果が確定した際に status を更新する運用（福岡市版の継続審査案件と同じ）。
export const realPetitionsSeed: RealBillSeed[] = [
  { sessionSlug: "r7-2", billNumber: "07-3", name: "子どもの心を育てる、情操豊かな音楽の街・足立区にする請願", publishedAt: "2025-06-27", status: "rejected", statusNote: "不採択", billType: "petition", committeeName: "区民委員会" },
  { sessionSlug: "r7-2", billNumber: "07-4", name: "あはき・柔整広告ガイドラインの適正かつ積極的な運用を求める陳情", publishedAt: "2025-06-27", status: "approved", statusNote: "採択", billType: "petition", committeeName: "厚生委員会" },
  { sessionSlug: "r7-2", billNumber: "07-5", name: "足立区の学校図書館の充実を求める陳情", publishedAt: "2025-06-27", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "文教委員会" },
  { sessionSlug: "r7-2", billNumber: "07-6", name: "政党機関紙も庁内取締規則を守り、許可のない勧誘・配達・集金は認めないように足立区議会として足立区に改善することを求める陳情", publishedAt: "2025-06-27", status: "approved", statusNote: "採択", billType: "petition", committeeName: "議会運営委員会" },
  { sessionSlug: "r7-3", billNumber: "07-7", name: "足立区民に対して国民健康保険資格確認書を一斉交付するよう求める陳情", publishedAt: "2025-09-19", status: "rejected", statusNote: "不採択", billType: "petition", committeeName: "区民委員会" },
  { sessionSlug: "r7-3", billNumber: "07-8", name: "地方消費者行政の維持・強化のための対策を求める意見書を国会等に提出することを求める陳情", publishedAt: "2025-09-19", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "産業環境委員会" },
  { sessionSlug: "r7-3", billNumber: "07-9", name: "足立ブランド認定と認定企業への支援の仕組みの改善を求める陳情", publishedAt: "2025-09-19", status: "rejected", statusNote: "不採択", billType: "petition", committeeName: "産業環境委員会" },
  { sessionSlug: "r7-3", billNumber: "07-10", name: "固定資産税及び都市計画税の軽減措置の継続について意見書の提出に関する請願", publishedAt: "2025-10-20", status: "approved", statusNote: "採択", billType: "petition", committeeName: "総務委員会" },
  { sessionSlug: "r7-3", billNumber: "07-11", name: "1,000名以上の死亡被害を出している新型コロナワクチンの潜在的な被害救済のため、足立区民の死亡者の接種歴データと死亡届データを照合したデータ公開を求める陳情", publishedAt: "2025-10-20", status: "rejected", statusNote: "不採択", billType: "petition", committeeName: "厚生委員会" },
  { sessionSlug: "r7-4", billNumber: "07-12", name: "2026年度の国民健康保険料を値上げせず、負担を軽減することを求める陳情", publishedAt: "2025-12-03", status: "rejected", statusNote: "不採択", billType: "petition", committeeName: "区民委員会" },
  { sessionSlug: "r8-1", billNumber: "08-1", name: "学校をより安全で安心な環境にするための陳情", publishedAt: "2026-02-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "文教委員会" },
  { sessionSlug: "r8-1", billNumber: "08-2", name: "区民の平等性を著しく欠く「区民葬儀における新たな助成制度」に関する陳情", publishedAt: "2026-03-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "区民委員会" },
  { sessionSlug: "r8-1", billNumber: "08-3", name: "竹の塚、梅田両地域学習センターホール舞台へのスロープまたは昇降機設置を求める陳情", publishedAt: "2026-03-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "区民委員会" },
  { sessionSlug: "r8-1", billNumber: "08-4", name: "地盤変状の発生区域における地区計画運用と安全な土地利用判断の整理を求める陳情", publishedAt: "2026-03-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "建設委員会" },
  { sessionSlug: "r8-1", billNumber: "08-5", name: "竹の塚中学校と渕江中学校の統合を中止し両校の存続を求める陳情", publishedAt: "2026-03-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "文教委員会" },
  { sessionSlug: "r8-2", billNumber: "08-6", name: "中央本町地域など区中央エリアにおける地域コミュニティ再生への支援等を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "区民委員会" },
  { sessionSlug: "r8-2", billNumber: "08-7", name: "「工場運営企業と周辺住民の共生のための条例」の制定を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "産業環境委員会" },
  { sessionSlug: "r8-2", billNumber: "08-8", name: "mRNAワクチン（レプリコンワクチンを含む）接種事業中止の意見書提出を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "厚生委員会" },
  { sessionSlug: "r8-2", billNumber: "08-9", name: "薬害級の健康被害を出している新型コロナワクチンの副反応の適切な情報収集のため、副反応疑い報告制度の更なる周知を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "厚生委員会" },
  { sessionSlug: "r8-2", billNumber: "08-10", name: "足立区立中学校における平和教育及び校外学習の政治的中立性と安全確保を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "文教委員会" },
  { sessionSlug: "r8-2", billNumber: "08-11", name: "花畑西小学校と桜花小学校の統廃合計画に反対する陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "文教委員会" },
  { sessionSlug: "r8-2", billNumber: "08-12", name: "花畑地区の学校統廃合計画（花畑中学校と花畑北中学校、花畑西小学校と桜花小学校）を中止し、4校の存続を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "文教委員会" },
  { sessionSlug: "r8-2", billNumber: "08-13", name: "乳幼児期からの孤立予防と「助けを求められる子ども」を育てる支援の充実を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "子ども・子育て支援対策調査特別委員会" },
  { sessionSlug: "r8-2", billNumber: "08-14", name: "子どもの視点に立った災害対策の強化を求める陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "災害・オウム対策調査特別委員会" },
  { sessionSlug: "r8-2", billNumber: "08-15", name: "防災体制の是正へ向けての陳情", publishedAt: "2026-06-24", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "災害・オウム対策調査特別委員会" },
  { sessionSlug: "r8-2", billNumber: "08-16", name: "公的支援事業における政治的公平性の確保に関する陳情", publishedAt: "2026-07-07", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "総務委員会" },
  { sessionSlug: "r8-2", billNumber: "08-17", name: "東京女子医大足立医療センターにおける地域医療機能の検証及び区民への情報公開の充実を求める陳情", publishedAt: "2026-07-07", status: "in_committee", statusNote: "継続審査中", billType: "petition", committeeName: "厚生委員会" },
];

export function createBills(
  insertedSessions: { id: string; slug: string | null }[],
  insertedCommittees: { id: string; name: string | null }[]
): BillInsert[] {
  return [...realBillsSeed, ...realPetitionsSeed].map((b) => {
    const session = insertedSessions.find((s) => s.slug === b.sessionSlug);
    const committee = b.committeeName
      ? insertedCommittees.find((c) => c.name === b.committeeName)
      : undefined;
    return {
      name: b.name,
      bill_number: b.billNumber,
      bill_type: b.billType === "petition" ? "petition" : "bill",
      is_procedural: b.billType === "procedural",
      procedural_summary: b.proceduralSummary ?? null,
      status: b.status,
      status_note: b.statusNote,
      published_at: b.publishedAt,
      publish_status: "published",
      is_featured: false,
      council_session_id: session?.id ?? null,
      committee_id: committee?.id ?? null,
    };
  });
}

// 会派データ（足立区議会 サンプル）
// 注: 「みらい」会派は足立区議会には存在しないため含めない。
// これにより run.ts の faction_stances 投入（name === "mirai" を参照）は
// スキップされ、実データ投入まで「会派の賛否」は非表示になる。
export const factions: FactionInsert[] = [
  {
    name: "jimin-adachi",
    display_name: "足立区議会自由民主党",
    sort_order: 1,
    is_active: true,
  },
  {
    name: "komei",
    display_name: "足立区議会公明党",
    sort_order: 2,
    is_active: true,
  },
  {
    name: "adachi-club",
    display_name: "足立区議会民主クラブ",
    sort_order: 3,
    is_active: true,
  },
  {
    name: "kyosan",
    display_name: "日本共産党足立区議団",
    sort_order: 4,
    is_active: true,
  },
  {
    name: "rikken-adachi",
    display_name: "立憲民主党・無所属の会",
    sort_order: 5,
    is_active: true,
  },
  {
    name: "ishin",
    display_name: "日本維新の会",
    sort_order: 6,
    is_active: true,
  },
  {
    name: "tomin-first",
    display_name: "都民ファーストの会足立区議団",
    sort_order: 7,
    is_active: true,
  },
  {
    name: "mushozoku",
    display_name: "無所属",
    // 無所属は常に一覧の最後に表示したいため、他の会派より大きい値を設定する
    sort_order: 11,
    is_active: true,
  },
  // 令和8年時点の会派（是々非々の会）。会派の離合集散が頻繁なため、
  // 過去の会派（adachi-club/rikken-adachi/ishin）は履歴として残しつつ、
  // 現行の会派見解データではこちらを使う。faction_stances は
  // member_names に採決当時の議員名をスナップショットで持つため、
  // 会派再編があっても記録済みデータの正確性には影響しない。
  {
    name: "zezehihi-no-kai",
    display_name: "是々非々の会（維新・参政・無所属・立憲）",
    sort_order: 9,
    is_active: true,
  },
  // 令和8年第1回定例会（3/24）時点で存在した会派。【審議結果一覧】PDFの
  // 凡例に基づく（その後、令和8年9月時点では会派として存在せず、
  // 所属していた土屋のりこ・髙橋まゆみ両議員は無所属となっている）。
  {
    name: "reiwa-shimin",
    display_name: "れいわ新選組・市民派の会あだち",
    sort_order: 10,
    is_active: true,
  },
];

// 委員会データ（足立区議会 常任委員会）
export const committees: CommitteeInsert[] = [
  {
    name: "総務委員会",
    description: "企画、財政、区民税、防災、選挙などについての審査",
    sort_order: 1,
    is_active: true,
  },
  {
    name: "区民委員会",
    description: "地域振興、産業経済、環境、リサイクルなどについての審査",
    sort_order: 2,
    is_active: true,
  },
  {
    name: "厚生委員会",
    description: "福祉、保健、衛生、国民健康保険などについての審査",
    sort_order: 3,
    is_active: true,
  },
  {
    name: "建設委員会",
    description: "都市計画、道路、公園、住宅などについての審査",
    sort_order: 4,
    is_active: true,
  },
  {
    name: "文教委員会",
    description: "学校教育、生涯学習、子育て支援などについての審査",
    sort_order: 5,
    is_active: true,
  },
  {
    name: "産業環境委員会",
    description: "産業経済、環境政策、農業委員会などについての審査",
    sort_order: 6,
    is_active: true,
  },
  {
    name: "議会運営委員会",
    description: "各定例会の運営、議長の諮問事項の調査などについての審査",
    sort_order: 7,
    is_active: true,
  },
  {
    name: "子ども・子育て支援対策調査特別委員会",
    description: "保育ニーズ、幼児教育・保育の質、少子化対策などの調査研究",
    sort_order: 8,
    is_active: true,
  },
  {
    name: "災害・オウム対策調査特別委員会",
    description: "災害対策、減災対策、地域防災計画などの調査研究",
    sort_order: 9,
    is_active: true,
  },
];

// 議員データ（仮データ）
// TODO: 足立区議会の実際の議員名簿に差し替える。
// factionName / committeeNames は挿入時に factions / committees の
// 実IDへ解決するための一時的なキー（DBカラムではない）。
type CouncilMemberSeed = {
  name: string;
  factionName: string;
  committeeNames: string[];
  sortOrder: number;
};

export const councilMembersSeed: CouncilMemberSeed[] = [
  {
    name: "青木 康弘",
    factionName: "jimin-adachi",
    committeeNames: ["総務委員会"],
    sortOrder: 1,
  },
  {
    name: "石田 なおこ",
    factionName: "jimin-adachi",
    committeeNames: ["区民委員会"],
    sortOrder: 2,
  },
  {
    name: "上野 たかし",
    factionName: "jimin-adachi",
    committeeNames: ["建設委員会"],
    sortOrder: 3,
  },
  {
    name: "遠藤 さゆり",
    factionName: "jimin-adachi",
    committeeNames: ["文教委員会"],
    sortOrder: 4,
  },
  {
    name: "小田切 まさる",
    factionName: "jimin-adachi",
    committeeNames: ["厚生委員会", "総務委員会"],
    sortOrder: 5,
  },
  {
    name: "加藤 ひろみ",
    factionName: "komei",
    committeeNames: ["厚生委員会"],
    sortOrder: 6,
  },
  {
    name: "木村 しんじ",
    factionName: "komei",
    committeeNames: ["文教委員会"],
    sortOrder: 7,
  },
  {
    name: "工藤 あきこ",
    factionName: "komei",
    committeeNames: ["区民委員会"],
    sortOrder: 8,
  },
  {
    name: "阪本 ゆうすけ",
    factionName: "adachi-club",
    committeeNames: ["総務委員会"],
    sortOrder: 9,
  },
  {
    name: "柴田 みちこ",
    factionName: "adachi-club",
    committeeNames: ["建設委員会"],
    sortOrder: 10,
  },
  {
    name: "杉本 けんた",
    factionName: "adachi-club",
    committeeNames: ["厚生委員会", "区民委員会"],
    sortOrder: 11,
  },
  {
    name: "瀬戸 なつみ",
    factionName: "kyosan",
    committeeNames: ["文教委員会"],
    sortOrder: 12,
  },
  {
    name: "高梨 じろう",
    factionName: "kyosan",
    committeeNames: ["厚生委員会"],
    sortOrder: 13,
  },
  {
    name: "田村 ひでお",
    factionName: "rikken-adachi",
    committeeNames: ["総務委員会"],
    sortOrder: 14,
  },
  {
    name: "土屋 まゆみ",
    factionName: "rikken-adachi",
    committeeNames: ["建設委員会"],
    sortOrder: 15,
  },
  {
    name: "中野 たくや",
    factionName: "ishin",
    committeeNames: ["区民委員会"],
    sortOrder: 16,
  },
  {
    name: "野口 さちこ",
    factionName: "tomin-first",
    committeeNames: ["文教委員会"],
    sortOrder: 17,
  },
  {
    name: "橋本 かずお",
    factionName: "mushozoku",
    committeeNames: ["厚生委員会"],
    sortOrder: 18,
  },
];

// タグデータ
export const tags: TagInsert[] = [
  {
    label: "まちづくり・環境",
    description: "まちづくり、環境保護、都市計画に関する議案",
    featured_priority: 1,
    emoji: "🌳",
  },
  {
    label: "子育て・教育",
    description: "子育て支援、教育政策、若者支援に関する議案",
    featured_priority: 2,
    emoji: "🎒",
  },
  {
    label: "福祉・医療",
    description: "福祉、医療、高齢者支援に関する議案",
    featured_priority: 3,
    emoji: "🏥",
  },
  {
    label: "予算・財政",
    description: "予算・補正予算、財政状況に関する議案",
    featured_priority: 4,
    emoji: "💴",
  },
  {
    label: "行政・職員",
    description: "区の組織・制度運営、職員に関する議案",
    featured_priority: 5,
    emoji: "📋",
  },
  {
    label: "契約・事業",
    description: "指定管理者の指定、契約締結などの事務手続き的な議案",
    featured_priority: 6,
    emoji: "🚧",
  },
];


// 議案とタグの関連付け
export function createBillsTags(
  insertedBills: { id: string; name: string }[],
  insertedTags: { id: string; label: string }[]
): Omit<BillsTagsInsert, "id" | "created_at">[] {
  const billTagMap: { [billName: string]: string[] } = {
    "足立区子ども医療費助成条例の一部改正": ["子育て・教育"],
    "足立区地域包括ケアシステム推進条例": ["福祉・医療"],
    "足立区公園条例の一部改正": ["まちづくり・環境"],
    "足立区学校給食費の無償化に関する条例": ["子育て・教育"],
    "足立区防災対策基本条例の一部改正": ["まちづくり・環境"],

    // r8-1（令和8年第1回定例会）・r8-2（令和8年第2回定例会）分
    "足立区中高層建築物等の建築に係る紛争の予防及び調整条例の一部を改正する条例": ["まちづくり・環境"],
    "足立区建築審査会条例の一部を改正する条例": ["行政・職員"],
    "足立区に係る沿道地区計画の区域内における建築物の制限に関する条例の一部を改正する条例": ["まちづくり・環境"],
    "足立区竹ノ塚駅中央地区地区計画の区域内における建築物の制限に関する条例の一部を改正する条例": ["まちづくり・環境"],
    "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例": ["まちづくり・環境"],
    "令和7年度足立区一般会計補正予算（第10号）": ["予算・財政"],
    "令和7年度足立区国民健康保険特別会計補正予算（第3号）": ["予算・財政"],
    "令和7年度足立区介護保険特別会計補正予算（第3号）": ["予算・財政"],
    "令和7年度足立区後期高齢者医療特別会計補正予算（第2号）": ["予算・財政"],
    "足立区こども計画審議会条例を廃止する条例": ["行政・職員"],
    "足立区放課後児童健全育成事業の設備及び運営に関する基準を定める条例の一部を改正する条例": ["子育て・教育"],
    "足立区特定乳児等通園支援事業の運営に関する基準を定める条例": ["子育て・教育"],
    "足立区特定教育・保育施設及び特定地域型保育事業並びに特定子ども・子育て支援施設等の運営に関する基準を定める条例の一部を改正する条例": ["子育て・教育"],
    "足立区家庭的保育事業等の設備及び運営に関する基準を定める条例の一部を改正する条例": ["子育て・教育"],
    "足立区乳児等通園支援事業の設備及び運営に関する基準を定める条例の一部を改正する条例": ["子育て・教育"],
    "足立区国民健康保険条例の一部を改正する条例": ["福祉・医療"],
    "令和8年度足立区一般会計予算": ["予算・財政"],
    "令和8年度足立区国民健康保険特別会計予算": ["予算・財政"],
    "令和8年度足立区介護保険特別会計予算": ["予算・財政"],
    "令和8年度足立区後期高齢者医療特別会計予算": ["予算・財政"],
    "令和8年度足立区一般会計補正予算(第2号）": ["予算・財政"],
    "令和8年度足立区介護保険特別会計補正予算（第1号）": ["予算・財政"],
    "足立区特別区税条例の一部を改正する条例": ["予算・財政"],
    "足立区住宅・建築物耐震助成条例の一部を改正する条例": ["まちづくり・環境"],
    "足立区立校外施設条例の一部を改正する条例": ["行政・職員"],
    "令和8年度足立区一般会計補正予算（第3号）": ["予算・財政"],
    "足立区組織条例の一部を改正する条例": ["行政・職員"],
    "足立区情報公開条例の一部を改正する条例": ["行政・職員"],
    "足立区事務手数料条例の一部を改正する条例": ["行政・職員"],
    "足立区いじめ等特別調査委員会設置条例を廃止する条例": ["行政・職員"],
    "足立区附属機関の構成員の報酬および費用弁償に関する条例の一部を改正する条例": ["行政・職員"],
    "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例": ["行政・職員"],
    "足立区行政委員会の委員及び非常勤の監査委員の報酬及び費用弁償に関する条例の一部を改正する条例": ["行政・職員"],
    "選挙長等の報酬及び費用弁償に関する条例の一部を改正する条例": ["行政・職員"],
    "足立区長等の給料等に関する条例の一部を改正する条例": ["行政・職員"],
    "足立区職員の給与に関する条例の一部を改正する条例": ["行政・職員"],
    "足立区後期高齢者医療に関する条例の一部を改正する条例": ["福祉・医療"],
    "足立区認知症とともにいつまでもこのまちで条例": ["福祉・医療"],
    "足立区介護保険条例の一部を改正する条例": ["福祉・医療"],
  };

  const billsTags: Omit<BillsTagsInsert, "id" | "created_at">[] = [];

  for (const bill of insertedBills) {
    const tagLabels = billTagMap[bill.name] || [];
    for (const tagLabel of tagLabels) {
      const tag = insertedTags.find((t) => t.label === tagLabel);
      if (tag) {
        billsTags.push({
          bill_id: bill.id,
          tag_id: tag.id,
        });
      }
    }
  }

  return billsTags;
}

// 会派の賛否データ（委員会会議録の「各会派からの意見」に基づく）
// 会派は離合集散（例:「是々非々の会」）や無所属議員の賛否の分裂が起こり得るため、
// 議員名を採決当時のスナップショットとして member_names に保持する。
// bill は name + publishedAt で一意に特定する（bill_contentsと同じ方式）。
type RealFactionStanceSeed = {
  billName: string;
  billPublishedAt: string;
  factionName: string;
  type: FactionStanceInsert["type"];
  memberNames: string[];
  comment?: string;
};

export const realFactionStancesSeed: RealFactionStanceSeed[] = [
  // 第22号議案 足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例
  // 令和8年3月13日 建設委員会にて審査。委員会では反対表明はぬかが和子委員のみだったが、
  // 本会議（3/24）の採決結果PDF【審議結果一覧】令和8年第1回定例会で会派ごとの
  // 賛否（○×）を確認し、各会派の議決当時の全議員名をスナップショットとして記録。
  {
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "jimin-adachi",
    type: "for",
    // 議長（ただ太郎）は採決に加わらないため11名
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "伊藤",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "zezehihi-no-kai",
    type: "for",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川", "野沢"],
  },
  {
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "reiwa-shimin",
    type: "for",
    memberNames: ["土屋", "髙橋"],
  },
  {
    // 委員会での反対表明はぬかが和子委員のみだったが、本会議の採決結果PDF
    // （【審議結果一覧】令和8年第1回定例会）では反対6票＝共産党の議席数と
    // 一致しており、党として6名全員が反対したことが確認できる。
    billName:
      "足立区西新井公園周辺地区地区計画の区域内における建築物の制限に関する条例",
    billPublishedAt: "2026-03-24",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
    comment:
      "旅館業（民泊より規制が緩い形態）に対する用途制限が条例に盛り込まれなかったことを理由に反対。",
  },

  // 第60号議案 足立区立校外施設条例の一部を改正する条例（令和8年第2回定例会 7/7 本会議・起立採決）
  // 本会議録には個別の賛否は載らないが、【審議結果一覧】令和8年第2回定例会PDFで
  // 会派・議員別の賛否（○×）を確認できる。無所属は市川・野沢が賛成、土屋・髙橋が反対で割れたため2レコードに分ける。
  // なお、令和8年第2回定例会時点で「れいわ新選組・市民派の会あだち」会派は解消しており、
  // 元メンバー（土屋・髙橋）は無所属として記録されている。
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "jimin-adachi",
    type: "for",
    // 議決時の議長（伊藤のぶゆき）は採決に加わらないため11名
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "ただ",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "zezehihi-no-kai",
    type: "for",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川", "野沢"],
  },
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "mushozoku",
    type: "against",
    memberNames: ["土屋", "髙橋"],
  },
  {
    billName: "足立区立校外施設条例の一部を改正する条例",
    billPublishedAt: "2026-07-07",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
  },

  // 第76号議案 （仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年第2回定例会 7/7 本会議・起立採決）
  // 【審議結果一覧】令和8年第2回定例会PDFで確認。共産党全員と無所属の土屋議員が反対（賛成33・反対7）。
  // 同日に採決された第60号議案とは異なり、無所属のうち反対は土屋議員のみ（髙橋議員は賛成）。
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "jimin-adachi",
    type: "for",
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "ただ",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "zezehihi-no-kai",
    type: "for",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川", "野沢", "髙橋"],
  },
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "mushozoku",
    type: "against",
    memberNames: ["土屋"],
  },
  {
    billName:
      "（仮称）千住大川端地区（A工区）開発における道路整備に関する負担協定（令和8年度 土壌汚染対策等工事）",
    billPublishedAt: "2026-07-07",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
  },

  // 第45号議案 足立区特定乳児等通園支援事業の運営に関する基準を定める条例（令和8年第1回定例会 3/24 本会議）
  // 【審議結果一覧】令和8年第1回定例会PDFで確認。共産党とれ市（土屋・髙橋）が反対、他は賛成。
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "jimin-adachi",
    type: "for",
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "伊藤",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "zezehihi-no-kai",
    type: "for",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川", "野沢"],
  },
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "reiwa-shimin",
    type: "against",
    memberNames: ["土屋", "髙橋"],
  },
  {
    billName: "足立区特定乳児等通園支援事業の運営に関する基準を定める条例",
    billPublishedAt: "2026-03-24",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
  },

  // 第49号議案 足立区国民健康保険条例の一部を改正する条例（令和8年第1回定例会 3/24 本会議）
  // 【審議結果一覧】令和8年第1回定例会PDFで確認。共産党とれ市（土屋・髙橋）が反対、他は賛成。
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "jimin-adachi",
    type: "for",
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "伊藤",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "zezehihi-no-kai",
    type: "for",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川", "野沢"],
  },
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "reiwa-shimin",
    type: "against",
    memberNames: ["土屋", "髙橋"],
  },
  {
    billName: "足立区国民健康保険条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
  },

  // 第1号・5号・6号・8号・18号・20号・31号議案（令和8年第1回定例会 3/24 本会議）
  // 【審議結果一覧】令和8年第1回定例会PDFで確認。いずれも共産党とれ市（土屋・髙橋）が反対、他は賛成（賛成32・反対8）。
  ...[
    "令和7年度足立区一般会計補正予算（第10号）",
    "令和8年度足立区一般会計予算",
    "令和8年度足立区国民健康保険特別会計予算",
    "令和8年度足立区後期高齢者医療特別会計予算",
    "足立区の特定の事務を取り扱う郵便局の指定について",
    "足立区介護保険条例の一部を改正する条例",
    "足立区立保育所の指定管理者の指定について",
  ].flatMap(
    (billName): RealFactionStanceSeed[] => [
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "jimin-adachi",
        type: "for",
        memberNames: [
          "白石",
          "吉岡",
          "渡辺",
          "かねだ",
          "鹿浜",
          "工藤",
          "伊藤",
          "くじらい",
          "杉本",
          "しぶや",
          "岡田",
        ],
      },
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "komei",
        type: "for",
        memberNames: [
          "小泉",
          "たがた",
          "いいくら",
          "長井",
          "岡安",
          "くぼた",
          "佐々木",
          "吉田",
          "さの",
          "石毛",
          "水野",
          "太田",
        ],
      },
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "zezehihi-no-kai",
        type: "for",
        memberNames: ["おぐら", "へんみ", "加地", "富田"],
      },
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "tomin-first",
        type: "for",
        memberNames: ["中島", "佐藤", "川村"],
      },
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "mushozoku",
        type: "for",
        memberNames: ["市川", "野沢"],
      },
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "reiwa-shimin",
        type: "against",
        memberNames: ["土屋", "髙橋"],
      },
      {
        billName,
        billPublishedAt: "2026-03-24",
        factionName: "kyosan",
        type: "against",
        memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
      },
    ]
  ),

  // 第36号議案 足立区長等の給料等に関する条例の一部を改正する条例（令和8年第1回定例会 3/24 本会議）
  // 【審議結果一覧】令和8年第1回定例会PDFで確認。共産党のみ反対（賛成34・反対6）、れ市は賛成。
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "jimin-adachi",
    type: "for",
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "伊藤",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "zezehihi-no-kai",
    type: "for",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川", "野沢"],
  },
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "reiwa-shimin",
    type: "for",
    memberNames: ["土屋", "髙橋"],
  },
  {
    billName: "足立区長等の給料等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
  },

  // 第32号議案 足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例（令和8年第1回定例会 3/24 本会議）
  // 【審議結果一覧】令和8年第1回定例会PDFで確認。議員報酬の引き上げ案のため、会派をまたいだ複雑な分裂となった
  // （賛成27・反対13）。共産党・是々非々の会・れ市（土屋・髙橋）が反対、無所属は市川が賛成・野沢が反対で分裂。
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "jimin-adachi",
    type: "for",
    memberNames: [
      "白石",
      "吉岡",
      "渡辺",
      "かねだ",
      "鹿浜",
      "工藤",
      "伊藤",
      "くじらい",
      "杉本",
      "しぶや",
      "岡田",
    ],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "komei",
    type: "for",
    memberNames: [
      "小泉",
      "たがた",
      "いいくら",
      "長井",
      "岡安",
      "くぼた",
      "佐々木",
      "吉田",
      "さの",
      "石毛",
      "水野",
      "太田",
    ],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "tomin-first",
    type: "for",
    memberNames: ["中島", "佐藤", "川村"],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "mushozoku",
    type: "for",
    memberNames: ["市川"],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "mushozoku",
    type: "against",
    memberNames: ["野沢"],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "zezehihi-no-kai",
    type: "against",
    memberNames: ["おぐら", "へんみ", "加地", "富田"],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "reiwa-shimin",
    type: "against",
    memberNames: ["土屋", "髙橋"],
  },
  {
    billName: "足立区議会議員の議員報酬及び費用弁償等に関する条例の一部を改正する条例",
    billPublishedAt: "2026-03-24",
    factionName: "kyosan",
    type: "against",
    memberNames: ["ぬかが", "はたの", "山中", "横田", "小林", "西の原"],
  },
];

export function createFactionStances(
  insertedBills: { id: string; name: string; published_at: string | null }[],
  insertedFactions: { id: string; name: string }[]
): FactionStanceInsert[] {
  return realFactionStancesSeed.map((s) => {
    const bill = insertedBills.find(
      (b) =>
        b.name === s.billName &&
        b.published_at?.slice(0, 10) === s.billPublishedAt
    );
    if (!bill) {
      throw new Error(
        `Bill not found for faction stance: ${s.billName} (${s.billPublishedAt})`
      );
    }

    const faction = insertedFactions.find((f) => f.name === s.factionName);
    if (!faction) {
      throw new Error(`Faction not found for faction stance: ${s.factionName}`);
    }

    return {
      bill_id: bill.id,
      faction_id: faction.id,
      type: s.type,
      comment: s.comment ?? null,
      member_names: s.memberNames,
    };
  });
}

// 議員データを作成（会派名を実IDへ解決）
export function createCouncilMembers(
  insertedFactions: { id: string; name: string }[]
): CouncilMemberInsert[] {
  return councilMembersSeed.map((member) => {
    const faction = insertedFactions.find(
      (f) => f.name === member.factionName
    );
    return {
      name: member.name,
      faction_id: faction?.id ?? null,
      sort_order: member.sortOrder,
      is_active: true,
    };
  });
}

// 議員×委員会の紐付けを作成（挿入済み議員のidと委員会名を実IDへ解決）
export function createCouncilMemberCommittees(
  insertedMembers: { id: string; sort_order: number }[],
  insertedCommittees: { id: string; name: string }[]
): CouncilMemberCommitteeInsert[] {
  const rows: CouncilMemberCommitteeInsert[] = [];

  for (const seedMember of councilMembersSeed) {
    const insertedMember = insertedMembers.find(
      (m) => m.sort_order === seedMember.sortOrder
    );
    if (!insertedMember) continue;

    for (const committeeName of seedMember.committeeNames) {
      const committee = insertedCommittees.find(
        (c) => c.name === committeeName
      );
      if (!committee) continue;

      rows.push({
        council_member_id: insertedMember.id,
        committee_id: committee.id,
      });
    }
  }

  return rows;
}

// インタビュー設定を作成（最初の議案用）
export function createInterviewConfig(
  insertedBills: { id: string; name: string }[]
): Omit<InterviewConfigInsert, "id" | "created_at" | "updated_at"> | null {
  const targetBill = insertedBills[0];
  if (!targetBill) return null;

  return {
    bill_id: targetBill.id,
    name: "デフォルト設定",
    status: "public",
    themes: ["賛否", "理由"],
    knowledge_source: `この議案についてあなたの意見を聞かせてください。`,
  };
}

// インタビュー質問を作成
export function createInterviewQuestions(
  interviewConfigId: string
): Omit<InterviewQuestionInsert, "id" | "created_at" | "updated_at">[] {
  return [
    {
      interview_config_id: interviewConfigId,
      question: "この議案に賛成ですか？反対ですか？",
      follow_up_guide: "ユーザーの立場を明確にしてください。",
      quick_replies: ["賛成", "反対", "どちらでもない"],
      question_order: 1,
    },
    {
      interview_config_id: interviewConfigId,
      question: "その理由を教えてください。",
      follow_up_guide: "具体的な理由を引き出してください。",
      quick_replies: null,
      question_order: 2,
    },
  ];
}

// インタビューセッションを作成（5パターン × 20回 = 100件）
export function createInterviewSessions(
  interviewConfigId: string
): Omit<InterviewSessionInsert, "id" | "created_at" | "updated_at">[] {
  const now = new Date();
  const sessions: Omit<
    InterviewSessionInsert,
    "id" | "created_at" | "updated_at"
  >[] = [];

  // 20回ループして100件作成
  for (let i = 0; i < 20; i++) {
    const baseOffset = i * 86400000 * 3; // 3日ずつずらす

    // パターン1: 完了 + レポートあり（賛成）
    sessions.push({
      interview_config_id: interviewConfigId,
      user_id: `00000000-0000-0000-0000-${String(i * 5 + 1).padStart(12, "0")}`,
      started_at: new Date(
        now.getTime() - baseOffset - 3600000
      ).toISOString(),
      completed_at: new Date(
        now.getTime() - baseOffset - 3000000
      ).toISOString(),
    });

    // パターン2: 完了 + レポートあり（反対）
    sessions.push({
      interview_config_id: interviewConfigId,
      user_id: `00000000-0000-0000-0000-${String(i * 5 + 2).padStart(12, "0")}`,
      started_at: new Date(
        now.getTime() - baseOffset - 7200000
      ).toISOString(),
      completed_at: new Date(
        now.getTime() - baseOffset - 6600000
      ).toISOString(),
    });

    // パターン3: 完了 + レポートあり（中立）
    sessions.push({
      interview_config_id: interviewConfigId,
      user_id: `00000000-0000-0000-0000-${String(i * 5 + 3).padStart(12, "0")}`,
      started_at: new Date(
        now.getTime() - baseOffset - 10800000
      ).toISOString(),
      completed_at: new Date(
        now.getTime() - baseOffset - 10200000
      ).toISOString(),
    });

    // パターン4: 完了したけどレポート未作成
    sessions.push({
      interview_config_id: interviewConfigId,
      user_id: `00000000-0000-0000-0000-${String(i * 5 + 4).padStart(12, "0")}`,
      started_at: new Date(
        now.getTime() - baseOffset - 14400000
      ).toISOString(),
      completed_at: new Date(
        now.getTime() - baseOffset - 13800000
      ).toISOString(),
    });

    // パターン5: 進行中（未完了、レポートなし）
    sessions.push({
      interview_config_id: interviewConfigId,
      user_id: `00000000-0000-0000-0000-${String(i * 5 + 5).padStart(12, "0")}`,
      started_at: new Date(
        now.getTime() - baseOffset - 1800000
      ).toISOString(),
      completed_at: null,
    });
  }

  return sessions;
}

// インタビューメッセージを作成（5パターンをループ）
export function createInterviewMessages(
  sessionIds: string[]
): Omit<InterviewMessageInsert, "id" | "created_at">[] {
  const conversations = [
    // パターン1: 賛成（完了 + レポートあり）
    [
      {
        role: "assistant" as const,
        content: "この議案に賛成ですか？反対ですか？",
      },
      { role: "user" as const, content: "賛成です" },
      {
        role: "assistant" as const,
        content: "その理由を教えてください。",
      },
      {
        role: "user" as const,
        content:
          "なぜなら賛成だからです。区民のためになると思います。",
      },
      {
        role: "assistant" as const,
        content:
          "ありがとうございました。ご意見を承りました。",
      },
    ],
    // パターン2: 反対（完了 + レポートあり）
    [
      {
        role: "assistant" as const,
        content: "この議案に賛成ですか？反対ですか？",
      },
      { role: "user" as const, content: "反対です" },
      {
        role: "assistant" as const,
        content: "その理由を教えてください。",
      },
      {
        role: "user" as const,
        content: "財源が不明確だと思います。",
      },
      {
        role: "assistant" as const,
        content:
          "ありがとうございました。ご意見を承りました。",
      },
    ],
    // パターン3: どちらでもない（完了 + レポートあり）
    [
      {
        role: "assistant" as const,
        content: "この議案に賛成ですか？反対ですか？",
      },
      {
        role: "user" as const,
        content: "どちらでもないです",
      },
      {
        role: "assistant" as const,
        content: "その理由を教えてください。",
      },
      {
        role: "user" as const,
        content: "もっと情報が必要だと思います。",
      },
      {
        role: "assistant" as const,
        content:
          "ありがとうございました。ご意見を承りました。",
      },
    ],
    // パターン4: 完了したけどレポート未作成
    [
      {
        role: "assistant" as const,
        content: "この議案に賛成ですか？反対ですか？",
      },
      { role: "user" as const, content: "賛成です" },
      {
        role: "assistant" as const,
        content: "その理由を教えてください。",
      },
      {
        role: "user" as const,
        content: "良い議案だと思います。",
      },
      {
        role: "assistant" as const,
        content:
          "ありがとうございました。ご意見を承りました。",
      },
    ],
    // パターン5: 進行中（途中で離脱）
    [
      {
        role: "assistant" as const,
        content: "この議案に賛成ですか？反対ですか？",
      },
      {
        role: "user" as const,
        content: "うーん、ちょっと考えさせてください",
      },
    ],
  ];

  const messages: Omit<
    InterviewMessageInsert,
    "id" | "created_at"
  >[] = [];

  sessionIds.forEach((sessionId, sessionIndex) => {
    // 5パターンをループ
    const patternIndex = sessionIndex % 5;
    const conversation = conversations[patternIndex];
    conversation.forEach((msg) => {
      messages.push({
        interview_session_id: sessionId,
        role: msg.role,
        content: msg.content,
      });
    });
  });

  return messages;
}

// インタビューレポートを作成（パターン1,2,3のみ = 5の倍数で0,1,2番目）
export function createInterviewReports(
  sessionIds: string[]
): Omit<
  InterviewReportInsert,
  "id" | "created_at" | "updated_at"
>[] {
  const reportTemplates = [
    {
      stance: "for" as const,
      summary:
        "この議案に賛成。区民のためになると考えている。",
      role: "general_citizen" as const,
      role_description: "議案の内容に賛同する区民",
      opinions: [
        { title: "賛成理由", content: "区民のためになる" },
      ],
    },
    {
      stance: "against" as const,
      summary: "財源の不明確さを理由に反対。",
      role: "work_related" as const,
      role_description: "財政面を懸念する区民",
      opinions: [
        { title: "反対理由", content: "財源が不明確" },
      ],
    },
    {
      stance: "neutral" as const,
      summary:
        "判断するにはより多くの情報が必要と考えている。",
      role: "subject_expert" as const,
      role_description: "慎重な判断を求める区民",
      opinions: [
        { title: "態度保留理由", content: "情報不足" },
      ],
    },
  ];

  const reports: Omit<
    InterviewReportInsert,
    "id" | "created_at" | "updated_at"
  >[] = [];

  // パターン1,2,3（5の倍数で0,1,2番目）のみレポートを作成
  sessionIds.forEach((sessionId, index) => {
    const patternIndex = index % 5;
    if (patternIndex < 3) {
      const loopIndex = Math.floor(index / 5);
      reports.push({
        interview_session_id: sessionId,
        ...reportTemplates[patternIndex],
        is_public_by_user: loopIndex < 5, // 最初の5件は公開
      });
    }
  });

  return reports;
}

// デモ用の固定ID
export const DEMO_SESSION_ID =
  "00000000-0000-0000-0000-000000000001";
export const DEMO_REPORT_ID =
  "00000000-0000-0000-0000-000000000001";

// 4種類のロールを確認するためのデモ用ID
export const DEMO_SESSION_ID_WORK =
  "00000000-0000-0000-0000-000000000002";
export const DEMO_SESSION_ID_DAILY =
  "00000000-0000-0000-0000-000000000003";
export const DEMO_SESSION_ID_CITIZEN =
  "00000000-0000-0000-0000-000000000004";
export const DEMO_REPORT_ID_WORK =
  "00000000-0000-0000-0000-000000000002";
export const DEMO_REPORT_ID_DAILY =
  "00000000-0000-0000-0000-000000000003";
export const DEMO_REPORT_ID_CITIZEN =
  "00000000-0000-0000-0000-000000000004";

// デモ用のインタビューセッション（公開、固定ID）
export function createDemoSession(
  interviewConfigId: string
): InterviewSessionInsert {
  const now = new Date();
  return {
    id: DEMO_SESSION_ID,
    interview_config_id: interviewConfigId,
    user_id: "00000000-0000-0000-0000-000000000000",
    started_at: new Date(now.getTime() - 3600000).toISOString(),
    completed_at: new Date(now.getTime() - 3000000).toISOString(),
  };
}

// デモ用のインタビューメッセージ
export function createDemoMessages(): Omit<
  InterviewMessageInsert,
  "id" | "created_at"
>[] {
  return [
    {
      interview_session_id: DEMO_SESSION_ID,
      role: "assistant",
      content:
        "こんにちは！本日はインタビューにご協力いただきありがとうございます。\n\n足立区議会で審議されている議案について、区民の皆さまのご意見をお聞かせください。この議案について、どのようにお考えですか？",
    },
    {
      interview_session_id: DEMO_SESSION_ID,
      role: "user",
      content:
        "区政のデジタル化や、ムダの削減を達成して欲しい",
    },
    {
      interview_session_id: DEMO_SESSION_ID,
      role: "assistant",
      content:
        "なるほど。区政のデジタル化を通じて、行政サービスの効率化と区民の利便性向上を期待されているということですね。とても重要な指摘だと思います。\n\n具体的に、足立区のどのような行政手続きや窓口サービスがデジタル化されると良いとお考えですか？",
    },
    {
      interview_session_id: DEMO_SESSION_ID,
      role: "user",
      content:
        "区役所の窓口手続きのオンライン化や、行政文書のデジタル化が進むと区民にとって便利になると期待しています。",
    },
    {
      interview_session_id: DEMO_SESSION_ID,
      role: "assistant",
      content:
        "ありがとうございました。ご意見を承りました。",
    },
  ];
}

// デモ用のインタビューレポート（固定ID）
export function createDemoReport(): InterviewReportInsert {
  return {
    id: DEMO_REPORT_ID,
    interview_session_id: DEMO_SESSION_ID,
    stance: "neutral",
    summary: "期待と懸念両方がある",
    role: "subject_expert",
    role_description:
      "足立区在住の会社員\n行政手続きの煩雑さを日常的に感じている",
    opinions: [
      {
        title:
          "区政のデジタル化や、ムダの削減を達成して欲しい",
        content:
          "区役所の窓口手続きのオンライン化や、行政文書のデジタル化が進むと区民にとって便利になると期待している。",
      },
    ],
    is_public_by_user: true,
  };
}

// 追加のデモ用セッション（3種類のロール確認用）
export function createAdditionalDemoSessions(
  interviewConfigId: string
): InterviewSessionInsert[] {
  const now = new Date();
  return [
    {
      id: DEMO_SESSION_ID_WORK,
      interview_config_id: interviewConfigId,
      user_id: "00000000-0000-0000-0000-000000000010",
      started_at: new Date(now.getTime() - 7200000).toISOString(),
      completed_at: new Date(now.getTime() - 6600000).toISOString(),
    },
    {
      id: DEMO_SESSION_ID_DAILY,
      interview_config_id: interviewConfigId,
      user_id: "00000000-0000-0000-0000-000000000011",
      started_at: new Date(now.getTime() - 10800000).toISOString(),
      completed_at: new Date(now.getTime() - 10200000).toISOString(),
    },
    {
      id: DEMO_SESSION_ID_CITIZEN,
      interview_config_id: interviewConfigId,
      user_id: "00000000-0000-0000-0000-000000000012",
      started_at: new Date(now.getTime() - 14400000).toISOString(),
      completed_at: new Date(now.getTime() - 10200000).toISOString(),
    },
  ];
}

// 追加のデモ用メッセージ（3種類のロール確認用）
export function createAdditionalDemoMessages(): Omit<
  InterviewMessageInsert,
  "id" | "created_at"
>[] {
  return [
    // work_related セッション用
    {
      interview_session_id: DEMO_SESSION_ID_WORK,
      role: "assistant",
      content:
        "こんにちは！本日はインタビューにご協力いただきありがとうございます。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_WORK,
      role: "user",
      content:
        "子どもの医療費負担が大きいので、この議案には賛成です。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_WORK,
      role: "assistant",
      content:
        "子育て世帯としてのお立場からのご意見ですね。具体的にどのような影響がありますか？",
    },
    {
      interview_session_id: DEMO_SESSION_ID_WORK,
      role: "user",
      content:
        "共働きで子ども2人を育てていますが、医療費の自己負担が家計を圧迫しています。助成拡充で少しでも負担が減れば助かります。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_WORK,
      role: "assistant",
      content:
        "ありがとうございました。ご意見を承りました。",
    },
    // daily_life_affected セッション用
    {
      interview_session_id: DEMO_SESSION_ID_DAILY,
      role: "assistant",
      content:
        "こんにちは！本日はインタビューにご協力いただきありがとうございます。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_DAILY,
      role: "user",
      content:
        "子どもが小さいので、医療費の負担が軽くなるのは嬉しいです。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_DAILY,
      role: "assistant",
      content:
        "生活への影響が大きいとのことですね。どのような場面で医療費の負担を感じますか？",
    },
    {
      interview_session_id: DEMO_SESSION_ID_DAILY,
      role: "user",
      content:
        "風邪や怪我で小児科にかかることが多く、月に何回も通院することがあります。自己負担が積み重なると大変です。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_DAILY,
      role: "assistant",
      content:
        "ありがとうございました。ご意見を承りました。",
    },
    // general_citizen セッション用
    {
      interview_session_id: DEMO_SESSION_ID_CITIZEN,
      role: "assistant",
      content:
        "こんにちは！本日はインタビューにご協力いただきありがとうございます。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_CITIZEN,
      role: "user",
      content:
        "財源が気になりますが、子育て支援として医療費助成は必要だと思います。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_CITIZEN,
      role: "assistant",
      content:
        "財源と子育て支援のバランスを考えていらっしゃるのですね。どのような点が気になりますか？",
    },
    {
      interview_session_id: DEMO_SESSION_ID_CITIZEN,
      role: "user",
      content:
        "他の行政サービスとのバランスも考えつつ、子育て世帯への支援として医療費助成は拡充すべきだと思います。",
    },
    {
      interview_session_id: DEMO_SESSION_ID_CITIZEN,
      role: "assistant",
      content:
        "ありがとうございました。ご意見を承りました。",
    },
  ];
}

// 追加のデモ用レポート（3種類のロール確認用）
export function createAdditionalDemoReports(): InterviewReportInsert[] {
  return [
    {
      id: DEMO_REPORT_ID_WORK,
      interview_session_id: DEMO_SESSION_ID_WORK,
      stance: "for",
      summary:
        "子育て世帯として医療費負担軽減のため賛成",
      role: "work_related",
      role_description:
        "足立区在住の共働き世帯\n子ども2人\n医療費の負担を日常的に感じている",
      opinions: [
        {
          title: "子どもの医療費負担が大きい",
          content:
            "共働きで子ども2人を育てているが、医療費の自己負担が家計を圧迫している。助成拡充で負担が減れば助かる。",
        },
      ],
      is_public_by_user: true,
    },
    {
      id: DEMO_REPORT_ID_DAILY,
      interview_session_id: DEMO_SESSION_ID_DAILY,
      stance: "for",
      summary:
        "子育て中の保護者として医療費負担軽減を期待",
      role: "daily_life_affected",
      role_description:
        "足立区在住の主婦\n小さい子ども2人の子育て中\n医療費の自己負担を日常的に感じている",
      opinions: [
        {
          title: "子どもの医療費負担が大きい",
          content:
            "風邪や怪我で小児科にかかることが多く、月に何回も通院する。自己負担が積み重なると家計に影響が大きい。",
        },
      ],
      is_public_by_user: true,
    },
    {
      id: DEMO_REPORT_ID_CITIZEN,
      interview_session_id: DEMO_SESSION_ID_CITIZEN,
      stance: "neutral",
      summary:
        "財源と子育て支援のバランスを考慮して判断",
      role: "general_citizen",
      role_description:
        "足立区在住の会社員\n子育て支援に関心あり\n区の財政にも関心がある",
      opinions: [
        {
          title: "財源と子育て支援のバランス",
          content:
            "他の行政サービスとのバランスも考えつつ、子育て世帯への支援として医療費助成は拡充すべきと考える。",
        },
      ],
      is_public_by_user: true,
    },
  ];
}

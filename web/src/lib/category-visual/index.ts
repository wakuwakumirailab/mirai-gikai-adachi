/**
 * 分野（テーマ分類）ごとの、アイコンと色。
 * 一般質問のテーマ別表示と、予算の分野別カードで、同じ見た目にそろえて使う。
 */
import {
  Baby,
  Building,
  Building2,
  Bus,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  Leaf,
  type LucideIcon,
  MonitorSmartphone,
  Shield,
  Sprout,
  Stethoscope,
  Store,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

export type CategoryStyle = {
  card: string;
  header: string;
  text: string;
  iconBg: string;
};

/** 分野名 → アイコン */
export const CATEGORY_ICON: Record<string, LucideIcon> = {
  "子育て・保育": Baby,
  "教育・学校": GraduationCap,
  "若者・ユース": Sprout,
  "子どもの安全・権利": HandHeart,
  "高齢者・介護": HeartHandshake,
  "福祉・サポート": Heart,
  "健康・医療": Stethoscope,
  "防災・安全": Shield,
  "道路・交通": Bus,
  "再開発・まちづくり": Building2,
  公共施設: Building,
  "環境・ごみ・みどり": Leaf,
  "税金・家計・財政": Wallet,
  "商店街・しごと・観光": Store,
  "行政改革・デジタル": MonitorSmartphone,
  "文化・スポーツ": Trophy,
  "地域・多文化共生": Users,
};

export const CATEGORY_STYLE: Record<string, CategoryStyle> = {
  "子育て・保育": {
    card: "bg-pink-50 border-pink-200",
    header: "bg-white/60 border-pink-200",
    text: "text-pink-700",
    iconBg: "bg-pink-100",
  },
  "教育・学校": {
    card: "bg-orange-50 border-orange-200",
    header: "bg-white/60 border-orange-200",
    text: "text-orange-700",
    iconBg: "bg-orange-100",
  },
  "若者・ユース": {
    card: "bg-amber-50 border-amber-200",
    header: "bg-white/60 border-amber-200",
    text: "text-amber-700",
    iconBg: "bg-amber-100",
  },
  "子どもの安全・権利": {
    card: "bg-lime-50 border-lime-200",
    header: "bg-white/60 border-lime-200",
    text: "text-lime-700",
    iconBg: "bg-lime-100",
  },
  "高齢者・介護": {
    card: "bg-rose-50 border-rose-200",
    header: "bg-white/60 border-rose-200",
    text: "text-rose-700",
    iconBg: "bg-rose-100",
  },
  "福祉・サポート": {
    card: "bg-fuchsia-50 border-fuchsia-200",
    header: "bg-white/60 border-fuchsia-200",
    text: "text-fuchsia-700",
    iconBg: "bg-fuchsia-100",
  },
  "健康・医療": {
    card: "bg-red-50 border-red-200",
    header: "bg-white/60 border-red-200",
    text: "text-red-700",
    iconBg: "bg-red-100",
  },
  "防災・安全": {
    card: "bg-teal-50 border-teal-200",
    header: "bg-white/60 border-teal-200",
    text: "text-teal-700",
    iconBg: "bg-teal-100",
  },
  "道路・交通": {
    card: "bg-sky-50 border-sky-200",
    header: "bg-white/60 border-sky-200",
    text: "text-sky-700",
    iconBg: "bg-sky-100",
  },
  "再開発・まちづくり": {
    card: "bg-blue-50 border-blue-200",
    header: "bg-white/60 border-blue-200",
    text: "text-blue-700",
    iconBg: "bg-blue-100",
  },
  公共施設: {
    card: "bg-cyan-50 border-cyan-200",
    header: "bg-white/60 border-cyan-200",
    text: "text-cyan-700",
    iconBg: "bg-cyan-100",
  },
  "環境・ごみ・みどり": {
    card: "bg-emerald-50 border-emerald-200",
    header: "bg-white/60 border-emerald-200",
    text: "text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  "税金・家計・財政": {
    card: "bg-yellow-50 border-yellow-200",
    header: "bg-white/60 border-yellow-200",
    text: "text-yellow-700",
    iconBg: "bg-yellow-100",
  },
  "商店街・しごと・観光": {
    card: "bg-purple-50 border-purple-200",
    header: "bg-white/60 border-purple-200",
    text: "text-purple-700",
    iconBg: "bg-purple-100",
  },
  "行政改革・デジタル": {
    card: "bg-slate-50 border-slate-200",
    header: "bg-white/60 border-slate-200",
    text: "text-slate-700",
    iconBg: "bg-slate-100",
  },
  "文化・スポーツ": {
    card: "bg-violet-50 border-violet-200",
    header: "bg-white/60 border-violet-200",
    text: "text-violet-700",
    iconBg: "bg-violet-100",
  },
  "地域・多文化共生": {
    card: "bg-indigo-50 border-indigo-200",
    header: "bg-white/60 border-indigo-200",
    text: "text-indigo-700",
    iconBg: "bg-indigo-100",
  },
};

export const DEFAULT_STYLE: CategoryStyle = {
  card: "bg-mirai-surface-muted border-border",
  header: "bg-card border-border",
  text: "text-mirai-text-secondary",
  iconBg: "bg-card",
};

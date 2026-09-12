import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";

export const metadata: Metadata = {
  title: `学ぶ | ${siteConfig.siteName}`,
  description: `${siteConfig.cityName}について、データや基礎知識をわかりやすく学べるページです。`,
};

export default function LearnPage() {
  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <BookOpen className="size-3.5" />
            学ぶ
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            {siteConfig.cityName}について学ぶ
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            人口や予算など、{siteConfig.cityName}
            の基礎データをわかりやすくまとめる準備をしています。
          </p>
        </header>

        <p className="py-12 text-center text-sm text-mirai-text-muted">
          このページは準備中です。公開まで今しばらくお待ちください。
        </p>
      </div>
    </Container>
  );
}

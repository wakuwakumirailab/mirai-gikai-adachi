import type { Metadata } from "next";
import { Users } from "lucide-react";
import { Container } from "@/components/layouts/container";
import { siteConfig } from "@/config/site.config";
import { CouncilMemberDirectory } from "@/features/council-members/client/components/council-member-directory";
import { getAllCouncilMembers } from "@/features/council-members/server/loaders/get-all-council-members";

export const metadata: Metadata = {
  title: `議員一覧 | ${siteConfig.siteName}`,
  description: `${siteConfig.councilName}の議員を、会派・所属委員会から検索できます。`,
};

export default async function MembersPage() {
  const members = await getAllCouncilMembers();

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-mirai-gradient-start to-mirai-gradient-end px-6 py-6">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-primary-accent">
            <Users className="size-3.5" />
            議員一覧
          </span>
          <h1 className="text-xl font-bold leading-snug text-mirai-text sm:text-2xl">
            {siteConfig.councilName}の議員
          </h1>
          <p className="text-sm leading-relaxed text-mirai-text-secondary">
            名前・会派・所属委員会から議員を探せます。表示順は開くたびに変わります。
          </p>
        </header>

        <CouncilMemberDirectory members={members} />
      </div>
    </Container>
  );
}

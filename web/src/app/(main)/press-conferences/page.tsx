import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layouts/container";
import { PressConferenceList } from "@/features/press-conferences/client/components/press-conference-list";
import { getPressConferences } from "@/features/press-conferences/server/loaders/get-press-conferences";

export default async function PressConferencesPage() {
  const pressConferences = await getPressConferences();

  return (
    <Container className="py-8">
      <div className="flex flex-col gap-6">
        <Link
          href="/assembly"
          className="inline-flex w-fit items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          議会に戻る
        </Link>

        <PressConferenceList pressConferences={pressConferences} />
      </div>
    </Container>
  );
}

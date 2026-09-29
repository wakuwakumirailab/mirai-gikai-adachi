import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { getDifficultyLevel } from "@/features/bill-difficulty/server/loaders/get-difficulty-level";
import { PressConferenceDetail } from "@/features/press-conferences/client/components/press-conference-detail";
import { getPressConferenceBySlug } from "@/features/press-conferences/server/loaders/get-press-conference-by-slug";
import { applyPressConferenceDifficulty } from "@/features/press-conferences/shared/utils/apply-press-conference-difficulty";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function PressConferencePage({ params }: Props) {
  const { slug } = await params;

  const [rawPressConference, difficultyLevel] = await Promise.all([
    getPressConferenceBySlug(slug),
    getDifficultyLevel(),
  ]);
  if (!rawPressConference) {
    notFound();
  }
  const pressConference = applyPressConferenceDifficulty(
    rawPressConference,
    difficultyLevel
  );

  return (
    <Container className="py-8">
      <div className="mb-4">
        <Link
          href="/press-conferences"
          className="inline-flex items-center gap-1 text-sm text-mirai-text-secondary hover:text-primary-accent"
        >
          <ChevronLeft className="h-4 w-4" />
          区長記者会見の一覧に戻る
        </Link>
      </div>
      <PressConferenceDetail pressConference={pressConference} />
    </Container>
  );
}

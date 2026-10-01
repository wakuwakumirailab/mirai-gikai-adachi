import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { Container } from "@/components/layouts/container";
import { BillDisclaimer } from "@/features/bills/client/components/bill-detail/bill-disclaimer";
import { DifficultyInfoCard } from "@/features/bills/server/components/bill-detail/difficulty-info-card";
import { ContentShareButtons } from "@/features/bills/server/components/share/content-share-buttons";
import { MeetingDetailView } from "@/features/committee-minutes/server/components/meeting-detail-view";
import { getCommitteeMeeting } from "@/features/committee-minutes/server/loaders/get-committee-meeting";

type Props = {
  params: Promise<{ slug: string; documentId: string }>;
};

export default async function CommitteeMeetingPage({ params }: Props) {
  const { slug, documentId } = await params;
  const documentIdNumber = Number(documentId);
  if (!Number.isInteger(documentIdNumber)) {
    notFound();
  }

  const meeting = await getCommitteeMeeting(documentIdNumber);
  if (!meeting || meeting.committeeSlug !== slug) {
    notFound();
  }

  return (
    <Container className="py-8">
      <MeetingDetailView meeting={meeting} />
      <DifficultyInfoCard />
      <div className="my-8">
        <ContentShareButtons
          path={`/committees/${slug}/${documentId}`}
          title={`${meeting.committeeName} ${meeting.meetingDate}`}
        />
      </div>
      <BillDisclaimer
        contentLabel="委員会の情報"
        sourceText={`${siteConfig.councilName}の委員会会議録などの公開情報`}
      />
    </Container>
  );
}

import ChallengeMemberList from "./challenge-member-list";
import SubTitle from "@/app/components/shared/sub-title";

export default async function ChallengeSurvivorsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="px-4 py-6">
      <SubTitle contents="참가자 목록" />
      <ChallengeMemberList challengeId={id} />
    </div>
  );
}

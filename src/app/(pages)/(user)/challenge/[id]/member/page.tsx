import ChallengeMemberList from "./challenge-member-list";
import SubTitle from "@/app/components/shared/sub-title";
import Link from "next/link";

export default async function ChallengeSurvivorsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-8">
      <div>
        <SubTitle contents="참가자 목록" />
        <ChallengeMemberList challengeId={id} />
      </div>

      <div className="text-center">
        <Link
          href={`/challenge/${id}`}
          className="inline-block text-sm text-primary dark:text-primary-dark font-medium border border-primary dark:border-primary-dark px-4 py-2 rounded-full hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-white transition"
        >
          챌린지로 돌아가기
        </Link>
      </div>
    </div>
  );
}

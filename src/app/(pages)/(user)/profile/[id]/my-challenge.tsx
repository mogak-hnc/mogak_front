import { ProfileChallengeResponse } from "@/types/profile.type";
import Link from "next/link";

export default function MyChallenge({
  challenges,
}: {
  challenges: ProfileChallengeResponse[];
}) {
  if (challenges.length === 0) {
    return (
      <div className="bg-white dark:bg-border-dark p-6 rounded-xl shadow text-sm text-gray-500 dark:text-gray-400">
        <h3 className="text-lg font-bold text-primary mb-4">
          참여 중인 모각챌
        </h3>
        <div className="text-center">참여 중인 모각챌이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-border-dark p-6 rounded-xl shadow">
      <h3 className="text-lg font-bold text-primary mb-4">참여 중인 챌린지</h3>
      {challenges.map((challenge) => (
        <Link
          key={challenge.challengeId}
          href={`/challenge/${challenge.challengeId}`}
        >
          <p>✷ {challenge.title}</p>
        </Link>
      ))}
    </div>
  );
}

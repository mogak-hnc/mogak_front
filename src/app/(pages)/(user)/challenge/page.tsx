import { ChallengeMain } from "@/lib/shared/challenge.api";
import ChallengeSearchCard from "./challenge-search-card";

export default async function ChallengePage() {
  const data = await ChallengeMain();
  return (
    <div>
      <ChallengeSearchCard
        title="모각챌"
        description="모여서 각자, 챌린지하기!"
        tags={[{ name: "공식 챌린지" }]}
        sort="최신순"
        section="챌린지"
      />
    </div>
  );
}

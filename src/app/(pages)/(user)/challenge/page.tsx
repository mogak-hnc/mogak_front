import SearchCard from "@/app/components/shared/search-card";
import SearchResultCard from "@/app/components/shared/search-result-card";
import { ChallengeMain } from "@/lib/challenge.api";

export default async function ChallengePage() {
  const data = await ChallengeMain();
  return (
    <div>
      <SearchCard
        type="studySpace"
        title="모각챌"
        description="모여서 각자, 챌린지하기!"
        tags={[{ name: "공식 챌린지" }]}
        sort="최신순"
        section="챌린지"
      />
      <SearchResultCard type="challenge" />
    </div>
  );
}

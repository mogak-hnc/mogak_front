import MainSubCard from "@/app/Component/shared/main-sub-card";
import SearchCard from "@/app/Component/shared/search-card";
import { ChallengeMain } from "@/lib/challenge.api";

export default async function ChallengePage() {
  const data = await ChallengeMain();
  return (
    <div>
      <SearchCard
        title="모각챌"
        description="모여서 각자 챌린지"
        tags={["공식 챌린지"]}
        sort="최신순"
        section="챌린지"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((m) => (
          <MainSubCard
            key={`main-sub-card-${m.type}-${m.title}`}
            {...m}
          ></MainSubCard>
        ))}
      </div>
    </div>
  );
}

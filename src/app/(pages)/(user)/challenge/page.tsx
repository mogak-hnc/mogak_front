import ChallengeSearchCard from "./challenge-search-card";

export const metadata = {
  title: "모각 | 모각챌",
  description: "동기부여를 도와주는 챌린지에 참여해 보세요.",
};

export default async function ChallengePage() {
  return (
    <div>
      <ChallengeSearchCard
        title="모각챌"
        description="모여서 각자, 챌린지하기!"
        tags={[{ name: "공식 챌린지" }]}
        sort="recent"
        section="챌린지"
      />
    </div>
  );
}

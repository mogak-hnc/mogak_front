import ChallengeHeader from "./challenge-header";
import ChallengeSurvivors from "./challenge-survivors";
import ChallengeProofGrid from "./challenge-proof-grid";
import Summary from "./summary";

export default function ChallengeDetailPage() {
  const mockChallenge = {
    isOfficial: true,
    title: "매일 공부 인증하기",
    period: "2025.03.01 ~ 2025.04.01",
    memberCount: 9,
    avatars: [
      "/user1.png",
      "/user2.png",
      "/user3.png",
      "/user4.png",
      "/user5.png",
      "/user6.png",
      "/user7.png",
      "/user8.png",
    ],
    extraCount: 27,
    proofImages: [
      "/proof1.png",
      "/proof2.png",
      "/proof3.png",
      "/proof4.png",
      "/proof5.png",
      "/proof6.png",
      "/proof7.png",
      "/proof8.png",
      "/proof9.png",
      "/proof10.png",
    ],
  };

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <ChallengeHeader
            isOfficial={mockChallenge.isOfficial}
            title={mockChallenge.title}
            period={mockChallenge.period}
            memberCount={mockChallenge.memberCount}
          />

          <ChallengeSurvivors
            avatars={mockChallenge.avatars}
            extraCount={mockChallenge.extraCount}
          />

          <ChallengeProofGrid proofImages={mockChallenge.proofImages} />
        </div>

        <div className="w-full lg:w-[280px] shrink-0">
          <Summary challengeId={`1`} />
        </div>
      </div>
    </div>
  );
}

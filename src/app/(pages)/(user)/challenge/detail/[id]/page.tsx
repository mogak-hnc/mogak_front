import ChallengeHeader from "./challenge-header";
import ChallengeSurvivors from "./challenge-survivors";
import ChallengeProofGrid from "./challenge-proof-grid";
import Summary from "./summary";
import { ChallengeDetail } from "@/lib/server/challenge.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import { convertDate } from "@/utils/shared/date.util";

export default async function ChallengeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // const { id } = await params;
  const { id } = params;
  const jwt = await getJwtFromServerCookie();

  const data = await ChallengeDetail(id, jwt);
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-6">
          <ChallengeHeader
            title={data.title}
            description="챌린지에 참여하고 인증샷을 올려보세요!"
            creatorMemberId={0}
            startDate={convertDate(data.startDate)}
            endDate={convertDate(data.endDate)}
            official={data.official}
            totalParticipants={data.totalParticipants}
          />

          <ChallengeSurvivors
            avatars={data.memberImageList}
            extraCount={Math.max(
              data.totalParticipants - data.memberImageList.length,
              0
            )}
          />

          <ChallengeProofGrid proofImages={data.challengeArticlesThumbnail} />
        </div>

        <div className="w-full lg:w-[280px] shrink-0">
          <Summary challengeId={id} />
        </div>
      </div>
    </div>
  );
}

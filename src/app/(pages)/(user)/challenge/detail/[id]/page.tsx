import ChallengeHeader from "./challenge-header";
import ChallengeSurvivors from "./challenge-survivors";
import ChallengeProofGrid from "./challenge-proof-grid";
import Summary from "./summary";
import { ChallengeDetail } from "@/lib/server/challenge.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";
import { convertDate } from "@/utils/shared/date.util";

const mockChallenge = {
  isOfficial: true,
  title: "매일 공부 인증하기",
  period: "2025.03.01 ~ 2025.04.01",
  memberCount: 9,
  avatars: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_Ee6D7Pt2auO2GNLHfj4l5qq8rqowbtAtQ&s",
    "https://i.namu.wiki/i/k4fnurTFbU379s2QUai0F_3zAsWdao9a_xSBcR4_lCSA56Otn5doMIa1A_Lonub-rhBmBd8n2SJjaszPUwCrJA.gif",
    "https://cdn.spotvnews.co.kr/news/photo/202405/677263_1038673_1035.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmRSjzuijvMQwobCgJuCgMGJP9jA-AO8WzSA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_tNhjmlgYeAgvZm86aoKUWsE1od65Ja0TCA&s",
    "https://lh6.googleusercontent.com/proxy/_inY1793ghjPGi4bFRVCiPh4lnk3r39enUHl8dYxuPeT3RsjlSQ8m0KrfDGdu-KMRPNUE4HFjhkwd2QbyVoFZAOSuVZHKnnZRRrDFCo2LVc7n2MZmP8",
    "https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/cnoC/image/6asksi-WwMQVZPvPre-081XMhO4",
    "https://i.namu.wiki/i/-1aC-3vvDdIdsSixrbHKDLhkkGUuSehoChXOBDWFJGvwVEUrIKZL3FBAyYqMqVivKLh3yo2wYGLc1eVVQ_WTjw.webp",
  ],
  extraCount: 27,
  proofImages: [
    "https://img.freepik.com/free-photo/student-female-hands-performing-written-task-copybook_1163-2552.jpg?semt=ais_hybrid&w=740",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAYyMCSiKlpkHC9RldljpxpTcKeiCx6asv8A&s",
    "https://i.pinimg.com/736x/11/72/30/117230b215e7136e49fae3478a6b845d.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP2C4VDwbmhJMr9v6wxyKfD0RRRv80OSWgrw&s",
    "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjdfMjU3/MDAxNTgyNzk0MzExODk3.ZtBtWmTsumPjYJtjEagoKsBMm6jrlywQJWZTWiwGrTsg.9CylZhkWqvgpmJwU4I7C5d6sVckhRyqIA81BTu7VlAog.JPEG.yellowouk2/1582794311514.jpg?type=w800",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhiU21VIy8T9pQb17j10BpZGl2bggeHr0-g&s",
    "https://i.pinimg.com/736x/a0/9e/02/a09e0213e28ec2ba8e18579a21676378.jpg",
    "https://i.pinimg.com/736x/db/d3/fd/dbd3fdf872dd4cc4e6528ed79563b3c7.jpg",
    "https://i.pinimg.com/736x/46/c0/27/46c02798a1d70981b3bcefec1a00a182.jpg",
    "https://i.pinimg.com/736x/e8/06/38/e80638a4568b84b784e7735c07a8acc2.jpg",
  ],
};

const mockInfo = {
  title: "하루 만보 걷기 챌린지",
  description: "건강을 위해 매일 만보 걷기에 도전해요!",
  creatorMemberId: 1,
  startDate: "2025-04-18",
  endDate: "2025-04-25",
};

export default async function ChallengeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
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

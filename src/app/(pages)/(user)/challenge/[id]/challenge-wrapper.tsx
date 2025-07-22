"use client";

import { convertDate } from "@/utils/shared/date.util";
import ChallengeHeader from "./challenge-header";
import ChallengeSurvivors from "./challenge-survivors";
import ChallengeProofGrid from "./challenge-proof-grid";
import ChallengeSummary from "./challenge-summary";
import { ChallengeDetileResponse } from "@/types/challenge.type";
import { ChallengeDetail } from "@/lib/client/challenge.client.api";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function ChallengeWrapper({
  id,
  initial,
}: {
  id: string;
  initial: ChallengeDetileResponse;
}) {
  const { jwt } = useAuthStore();
  const [data, setData] = useState<ChallengeDetileResponse>(initial);
  const [refreshKey, setRefreshKey] = useState<number>(Date.now());

  useEffect(() => {
    if (!jwt) {
      return;
    }
    refetch();
  }, []);

  const refetch = async () => {
    const reload = await ChallengeDetail(id);
    setData(reload);
    setRefreshKey(Date.now());
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="flex-1 flex flex-col gap-6">
        <ChallengeHeader
          status={data.status}
          title={data.title}
          description="챌린지에 참여하고 인증샷을 올려보세요!"
          challengeOwnerId={data.challengeOwnerId}
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
        {data.joined && data.status !== "BEFORE" && (
          <ChallengeProofGrid challengeId={id} refreshTrigger={refreshKey} />
        )}
      </div>

      <div className="w-full lg:w-[280px] shrink-0">
        <ChallengeSummary challengeId={id} {...data} onRefetch={refetch} />
      </div>
    </div>
  );
}

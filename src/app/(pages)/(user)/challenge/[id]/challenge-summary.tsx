"use client";

import Button from "@/app/components/ui/button";
import { ChallengeDetileResponse } from "@/types/challenge.type";
import { ChallengeSummaryChart } from "./challenge-summary-chart";
import { getDatePercent } from "@/utils/shared/date-percent";

export function SummarySubtitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-bold text-primary mb-2">{children}</h4>;
}

export default function ChallengeSummary(props: ChallengeDetileResponse) {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-md border border-borders dark:border-border-dark">
      {!props.joined && props.status === "BEFORE" && <Button>참가하기</Button>}
      {props.official && (
        <p className="text-sm text-border-dark dark:text-borders">
          이 챌린지를 완수하면 ●●● 뱃지를 획득해요!
        </p>
      )}
      {props.status !== "BEFORE" && (
        <>
          <div className="border-t border-borders dark:border-border-dark pt-4 space-y-5">
            <SummarySubtitle>통계</SummarySubtitle>
            <ChallengeSummaryChart
              label="전체 진행률"
              value={getDatePercent(props.startDate, props.endDate)}
            />
            <ChallengeSummaryChart
              label="생존자 비율"
              value={props.survivorCount / props.totalParticipants}
            />
          </div>
          {props.joined && props.status === "ONGOING" && (
            <div className="border-t border-borders dark:border-border-dark pt-4">
              <SummarySubtitle>인증하기</SummarySubtitle>
              <input type="file" className="text-sm" />
              <Button>등록하기</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

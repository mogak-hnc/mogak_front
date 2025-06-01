"use client";

import Button from "@/app/components/ui/button";
import { ChallengeDetailSummaryProps } from "@/types/challenge.type";
import { ChallengeSummaryChart } from "./challenge-summary-chart";
import { getDatePercent } from "@/utils/shared/date-percent.util";
import { useState } from "react";
import ConfirmModal from "@/app/components/confirm-modal";
import { ChallengeEntryPost } from "@/lib/client/challenge.client.api";
import { getTimeDiffText } from "@/utils/shared/time.util";

export function SummarySubtitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-bold text-primary mb-2">{children}</h4>;
}

export default function ChallengeSummary(props: ChallengeDetailSummaryProps) {
  const [showModal, setShowModal] = useState<boolean>(false);

  const challengeIn = async () => {
    try {
      await ChallengeEntryPost(props.challengeId);
    } catch (err) {
      console.log(`챌린지 참여 실패 : ${err}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-md border border-borders dark:border-border-dark">
      {!props.joined && props.status === "BEFORE" && (
        <Button onClick={() => setShowModal(true)}>참가하기</Button>
      )}
      <div className="flex gap-2 text-sm text-border-dark dark:text-borders">
        챌린지가
        <p className="font-bold text-secondary dark:text-secondary-dark">
          {getTimeDiffText(props.startDate)}
        </p>
        시작됩니다.
      </div>
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
              label="진행률"
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
      {showModal && (
        <ConfirmModal
          message={`${props.title} 챌린지에 참가하시겠습니까?`}
          onCancel={() => setShowModal(false)}
          onConfirm={challengeIn}
        ></ConfirmModal>
      )}
    </div>
  );
}

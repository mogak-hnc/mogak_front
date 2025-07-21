"use client";

import Button from "@/app/components/ui/button";
import { ChallengeDetailSummaryProps } from "@/types/challenge.type";
import { ChallengeSummaryChart } from "./challenge-summary-chart";
import { getDatePercent } from "@/utils/shared/date-percent.util";
import { useEffect, useState } from "react";
import ConfirmModal from "@/app/components/confirm-modal";
import {
  ChallengeEntryPost,
  ChallengeSurvivorsToday,
} from "@/lib/client/challenge.client.api";
import { getTimeDiffText } from "@/utils/shared/time.util";
import Image from "next/image";
import ChallengeProofUploader from "./challenge-proof-uploader";

export function SummarySubtitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-bold text-primary mb-2">{children}</h4>;
}

export default function ChallengeSummary(
  props: ChallengeDetailSummaryProps & { onRefetch: () => void }
) {
  console.log(props);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todayCheck, setTodayCheck] = useState(true);

  useEffect(() => {
    const check = async () => {
      const loadCheck = await ChallengeSurvivorsToday(props.challengeId);
      setTodayCheck(loadCheck);
    };

    check();
  }, [props.challengeId]);

  const challengeIn = async () => {
    try {
      await ChallengeEntryPost(props.challengeId);
      setShowModal(false);
      props.onRefetch();
    } catch (err) {
      console.log(`챌린지 참여 실패 : ${err}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 rounded-md border border-borders dark:border-border-dark">
      {!props.joined && props.status === "BEFORE" && (
        <Button onClick={() => setShowModal(true)}>참가하기</Button>
      )}
      {props.status === "BEFORE" && (
        <div className="flex gap-2 text-sm text-border-dark dark:text-borders">
          챌린지가
          <p className="font-bold text-secondary dark:text-secondary-dark">
            {getTimeDiffText(props.startDate)}
          </p>
          시작됩니다.
        </div>
      )}

      {props.official && (
        <div className="text-sm flex gap-3 text-border-dark dark:text-borders">
          <Image
            src={props.badgeInfo.badgeImageUrl}
            alt="뱃지 이미지"
            width={24}
            height={24}
          />
          이 챌린지를 완수하면
          <p className="font-bold text-secondary dark:text-secondary-dark">
            [ {props.badgeInfo.name} ]
          </p>
          뱃지를 획득해요!
        </div>
      )}
      {props.status !== "BEFORE" && (
        <div>
          <div className="space-y-5">
            <SummarySubtitle>통계</SummarySubtitle>
            <ChallengeSummaryChart
              label="진행률"
              value={getDatePercent(props.startDate, props.endDate)}
            />
            <ChallengeSummaryChart
              label="생존자 비율"
              value={(props.survivorCount / props.totalParticipants) * 100}
            />
          </div>

          {props.joined && props.status === "ONGOING" && (
            <div className="border-t border-borders dark:border-border-dark pt-4">
              <SummarySubtitle>인증하기</SummarySubtitle>
              {todayCheck ? (
                <p className="text-borders dark:text-border-dark text-sm mt-2">
                  오늘 인증이 완료되었어요!
                </p>
              ) : (
                <ChallengeProofUploader
                  challengeId={props.challengeId}
                  onSuccess={() => {
                    setTodayCheck(true);
                    props.onRefetch();
                  }}
                />
              )}
            </div>
          )}
        </div>
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

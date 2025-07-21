"use client";

import Button from "@/app/components/ui/button";
import { ChallengeDetailSummaryProps } from "@/types/challenge.type";
import { ChallengeSummaryChart } from "./challenge-summary-chart";
import { getDatePercent } from "@/utils/shared/date-percent.util";
import { useEffect, useRef, useState } from "react";
import ConfirmModal from "@/app/components/confirm-modal";
import {
  ChallengeEntryPost,
  ChallengeProofPost,
  ChallengeSurvivorsToday,
} from "@/lib/client/challenge.client.api";
import { getTimeDiffText } from "@/utils/shared/time.util";
import Image from "next/image";

export function SummarySubtitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-bold text-primary mb-2">{children}</h4>;
}

export default function ChallengeSummary(
  props: ChallengeDetailSummaryProps & { onRefetch: () => void }
) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [todayCheck, setTodayCheck] = useState(true);
  const [uploadError, setUploadError] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const challengeProof = async () => {
    if (!file) {
      setUploadError("인증 사진을 첨부해 주세요.");
      return;
    }
    setUploadError("");
    setIsUploading(true);

    try {
      await ChallengeProofPost({
        challengeId: props.challengeId,
        title: props.title,
        images: file,
      });

      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTodayCheck(true);

      props.onRefetch();
    } catch (err) {
      console.error("인증 업로드 실패 " + err);
      setUploadError("업로드에 실패했습니다. 다시 시도해 주세요!");
    } finally {
      setIsUploading(false);
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
          <p className="font-bold  text-secondary dark:text-secondary-dark">
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
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) {
                        setFile(selected);
                        setUploadError("");
                      }
                    }}
                    className="text-sm"
                  />
                  <p
                    className={`text-error dark:text-error-dark text-xs mt-1 ${
                      uploadError ? "visible" : "invisible"
                    }`}
                  >
                    {uploadError || "placeholder"}
                  </p>

                  {isUploading ? (
                    <Button disabled className="mt-2 bg-gray-400">
                      업로드 중...
                    </Button>
                  ) : (
                    <Button onClick={challengeProof} className="mt-2">
                      등록하기
                    </Button>
                  )}
                </div>
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

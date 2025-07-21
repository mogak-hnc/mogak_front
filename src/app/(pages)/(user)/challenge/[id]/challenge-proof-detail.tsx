"use client";

import Loading from "@/app/loading";
import { ChallengeArticleDetail } from "@/lib/client/challenge.client.api";
import { ChallengeProofDetailResponse } from "@/types/challenge.type";
import { convertDate } from "@/utils/shared/date.util";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ChallengeProofModalProps {
  challengeId: string;
  articleId: string;
  onClose: () => void;
}

export default function ChallengeProofDetail({
  challengeId,
  articleId,
  onClose,
}: ChallengeProofModalProps) {
  const [data, setData] = useState<ChallengeProofDetailResponse>();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await ChallengeArticleDetail({ challengeId, articleId });
        setData(res);
        console.log(res);
      } catch (err) {
        console.error("인증 상세 불러오기 실패:", err);
      }
    };

    fetchDetail();
  }, [challengeId, articleId]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-background dark:bg-background-dark rounded-2xl shadow-2xl max-w-xl w-full p-5 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
          <span className="text-primary dark:text-primary-dark font-bold">
            {data.nickname}
          </span>

          <div className="flex items-center gap-4">
            <span className="text-border-dark dark:text-borders text-sm">
              {convertDate(data.createdAt)}
            </span>
            <button
              className="text-gray-400 hover:text-gray-800 transition-colors duration-200"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-3">
          <Image
            src={data.imageUrl[0]}
            alt="selected proof"
            width={500}
            height={500}
            className="object-contain rounded-lg max-h-[400px] w-auto border border-gray-200 shadow-sm"
          />
        </div>

        {data.description && (
          <p className="text-sm text-text dark:text-text-dark p-3 rounded-md text-center">
            {data.description}
          </p>
        )}
      </div>
    </div>
  );
}

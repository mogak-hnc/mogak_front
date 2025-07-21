"use client";

import Loading from "@/app/loading";
import { ChallengeArticleDetail } from "@/lib/client/challenge.client.api";
import { ChallengeProofDetailResponse } from "@/types/challenge.type";
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
      className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <Image
          src={data.imageUrl[0]}
          alt="selected proof"
          width={500}
          height={500}
          className="object-contain w-full h-auto rounded"
        />
        {data.description && (
          <p className="text-sm mt-2 text-gray-700">{data.description}</p>
        )}
      </div>
    </div>
  );
}

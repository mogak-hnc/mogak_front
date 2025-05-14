"use client";

import { useEffect, useState } from "react";
import { ChallengeMain } from "@/lib/challenge.api";

import ChallengeMainCard from "@/app/components/shared/challenge-main-card";
import { ChallengeMainProps } from "@/types/challenge.type";

export default function ChallengeResultCard() {
  const [data, setData] = useState<ChallengeMainProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ChallengeMain();
        setData(res);
      } catch (err) {
        console.error("챌린지 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">불러오는 중...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.length > 0 ? (
        data.map((item, index) => <ChallengeMainCard key={index} {...item} />)
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/components/shared/paginaiton";
import { getProfileImage } from "@/utils/shared/profile.util";
import { ChallengeSurvivorsList } from "@/lib/client/challenge.client.api";
import { ChallengeSurvivorsResponse } from "@/types/challenge.type";
import { useAuthStore } from "@/store/authStore";

function ChallengeMemberSkeleton() {
  return (
    <div className="flex flex-col items-center gap-1 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-border" />
      <div className="w-12 h-3 rounded bg-gray-300 dark:bg-border mt-1" />
    </div>
  );
}

export default function ChallengeMemberList({
  challengeId,
}: {
  challengeId: string;
}) {
  const [data, setData] = useState<ChallengeSurvivorsResponse | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const { jwt } = useAuthStore();

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const result = await ChallengeSurvivorsList(challengeId, jwt, pageNum);
      setData(result);
      setPage(pageNum);
    } catch (e) {
      console.error("참가자 목록 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <ChallengeMemberSkeleton key={`skeleton-${i}`} />
            ))
          : data?.content.map((member) => (
              <Link key={member.memberId} href={`/profile/${member.memberId}`}>
                <div className="flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-105">
                  <Image
                    src={getProfileImage(member.memberImageUrl)}
                    alt={member.nickname}
                    width={64}
                    height={64}
                    className={`rounded-full object-cover border ${
                      member.survivor ? "" : "grayscale"
                    }`}
                  />
                  <span className="text-sm">{member.nickname}</span>
                </div>
              </Link>
            ))}
      </div>

      {!loading && data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={fetchData}
        />
      )}
    </div>
  );
}

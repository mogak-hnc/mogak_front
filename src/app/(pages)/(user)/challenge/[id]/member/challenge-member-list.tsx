"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/components/shared/paginaiton";
import { getProfileImage } from "@/utils/shared/profile.util";
import {
  ChallengeMemberPut,
  ChallengeOwnerCheck,
  ChallengeSurvivorsList,
} from "@/lib/client/challenge.client.api";
import { ChallengeSurvivorsResponse } from "@/types/challenge.type";
import { useAuthStore } from "@/store/authStore";
import ConfirmModal from "@/app/components/confirm-modal";

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
  const [isLeader, setIsLeader] = useState(false);
  const [modal, setModal] = useState(false);
  const [targetId, setTargetId] = useState("");
  const [targetNickname, setTargetNickname] = useState("");

  const { jwt } = useAuthStore();

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const result = await ChallengeSurvivorsList(challengeId, jwt, pageNum);
      const ownerCheck = await ChallengeOwnerCheck(challengeId, jwt);

      setData(result);
      setPage(pageNum);
      setIsLeader(ownerCheck);
    } catch (e) {
      console.error("참가자 목록 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  const openModal = ({ id, nickname }: { id: string; nickname: string }) => {
    setTargetId(id);
    setTargetNickname(nickname);
    setModal(true);
  };

  const handleResign = async () => {
    try {
      await ChallengeMemberPut({
        challengeId,
        targetMemberId: targetId,
      });
      setModal(false);
      fetchData(1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <ChallengeMemberSkeleton key={`skeleton-${i}`} />
            ))
          : data?.content.map((member) => (
              <div
                key={member.memberId}
                className="flex flex-col items-center gap-1 transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={getProfileImage(member.memberImageUrl)}
                  alt={member.nickname}
                  width={64}
                  height={64}
                  className={`rounded-full object-cover border ${
                    member.survivor ? "" : "grayscale"
                  }`}
                />

                <div className="flex items-center gap-3">
                  <Link
                    key={member.memberId}
                    href={`/profile/${member.memberId}`}
                  >
                    <span className="text-sm">{member.nickname}</span>
                  </Link>
                  {!member.leader && isLeader && member.survivor && (
                    <div>
                      <span
                        onClick={() =>
                          openModal({
                            id: member.memberId,
                            nickname: member.nickname,
                          })
                        }
                        className="text-error dark:text-error-dark cursor-pointer"
                      >
                        x
                      </span>
                    </div>
                  )}
                </div>

                {member.leader ? (
                  <span className="px-2 py-0.5 text-xs font-semibold text-white bg-primary rounded-full">
                    방장
                  </span>
                ) : (
                  <div className="h-[20px]"></div>
                )}
              </div>
            ))}
      </div>

      {!loading && data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={fetchData}
        />
      )}
      {modal && (
        <ConfirmModal
          message={`${targetNickname} 님을 내보내시겠어요?`}
          onCancel={() => setModal(false)}
          onConfirm={handleResign}
        ></ConfirmModal>
      )}
    </div>
  );
}

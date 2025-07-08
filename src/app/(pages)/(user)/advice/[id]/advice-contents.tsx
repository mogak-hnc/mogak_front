"use client";

import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  timeArrayToSeconds,
  secondsToTimeArray,
  formatTimeArray,
} from "@/utils/shared/time.util";
import { AdviceDetailResponse } from "@/types/advice.type";
import AdviceCommentsCard from "./advice-comments-card";
import { AdviceEmpathyPost } from "@/lib/client/advice.client.api";

import AlertModal from "@/app/components/custom-modal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function AdviceContents({
  id,
  data,
}: {
  id: string;
  data: AdviceDetailResponse;
}) {
  const [showModal, setShowModal] = useState(false);
  const [empathyCount, setEmpathyCount] = useState(data.empathyCount);
  const [hasEmpathized, setHasEmpathized] = useState(data.hasEmpathized);

  const [restSeconds, setRestSeconds] = useState(
    timeArrayToSeconds(data.restTime)
  );

  const jwt = useAuthStore((state) => state.jwt);

  useEffect(() => {
    const timer = setInterval(() => {
      setRestSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEmpathy = async () => {
    if (!jwt) {
      setShowModal(true);
      return;
    }

    try {
      const res = await AdviceEmpathyPost(id);
      const { empathyCount, hasEmpathized } = res;
      setEmpathyCount(empathyCount);
      setHasEmpathized(hasEmpathized);
    } catch (err) {
      console.log("공감 실패 : " + err);
    }
  };

  const router = useRouter();

  const toLogin = () => {
    router.push(`/login`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
      <div className="lg:w-[65%] w-full flex flex-col gap-6">
        <div className="flex items-center justify-between border-borders dark:border-border-dark border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-primary dark:text-primary-dark">
              {data.title}
            </h2>
            <p className="text-sm text-border-dark dark:text-borders">
              {formatTimeArray(secondsToTimeArray(restSeconds))} 남음
            </p>
          </div>
        </div>

        <p className="text-sm text-text dark:text-text-dark whitespace-pre-line">
          {data.body}
        </p>

        <button
          className="flex items-center gap-1 text-error dark:text-error-dark text-sm"
          onClick={handleEmpathy}
        >
          {hasEmpathized ? (
            <AiFillHeart size={18} />
          ) : (
            <AiOutlineHeart size={18} />
          )}
          공감 {empathyCount}개
        </button>
      </div>

      <div className="w-full lg:w-[35%]">
        <AdviceCommentsCard worryId={id} />
      </div>
      {showModal && (
        <AlertModal
          message="로그인 후 이용해 주세요."
          moveMsg="로그인하기"
          onMove={toLogin}
          confirmMsg="닫기"
          onConfirm={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

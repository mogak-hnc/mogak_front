"use client";

import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { convertTime } from "@/utils/shared/date.util";
import { AdviceDetailResponse } from "@/types/advice.type";
import AdviceCommentsCard from "./advice-comments-card";

export default function AdviceContents({
  id,
  data,
}: {
  id: string;
  data: AdviceDetailResponse;
}) {
  const [empathyCount, setEmpathyCount] = useState(data.empathyCount);

  const handleEmpathy = async () => {
    try {
      const res = await fetch(`/api/advice/${id}/empathy`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error();
      }
      setEmpathyCount((prev) => prev + 1);
    } catch {
      alert("공감 실패");
    }
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
              {convertTime(data.restTime)} 남음
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
          <AiFillHeart size={18} />
          공감 {empathyCount}개
        </button>
      </div>

      <div className="w-full lg:w-[35%]">
        <AdviceCommentsCard comments={data.commentResponses} worryId={id} />
      </div>
    </div>
  );
}

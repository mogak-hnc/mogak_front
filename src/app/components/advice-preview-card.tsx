"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdviceCardProps } from "@/types/advice.type";
import { secondToTime } from "@/utils/shared/date.util";

export default function AdvicePreviewCard({
  title,
  commentCount,
  restTime,
  worryId,
}: AdviceCardProps) {
  const convertSeconds = restTime[0] * 3600 + restTime[1] * 60 + restTime[2];
  const [timeLeft, setTimeLeft] = useState<number>(convertSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 60;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link href={`/advice/${worryId}`}>
      <div className="rounded-3xl p-4 shadow-md bg-white dark:bg-border-dark  text-sm flex flex-col justify-between w-[200px] h-[180px]">
        <div className="flex flex-col gap-1">
          <span className="bg-secondary dark:bg-secondary-dark text-base text-black font-bold px-2 py-0.5 rounded w-fit">
            {title}
          </span>
          <span className="text-primary dark:text-primary-dark font-semibold mt-2">
            댓글 {commentCount}개
          </span>
          <span className="text-border-dark dark:text-borders text-xs">
            {secondToTime(timeLeft)} 남음
          </span>
        </div>

        <div className="flex justify-end mt-2">
          <span className="text-yellow-500 font-medium text-sm flex items-center gap-1">
            <span>&#10132;&nbsp;보러가기</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

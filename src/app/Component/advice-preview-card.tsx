import { convertTime } from "@/lib/date";
import { AdvicePreviewCardProps } from "@/types";
import Link from "next/link";

export default function AdvicePreviewCard({
  title,
  commentCount,
  restTime,
  worryId,
}: AdvicePreviewCardProps) {
  return (
    <Link href={`/advice/${worryId}`}>
      <div className="rounded-3xl p-4 shadow-md bg-white dark:bg-border-dark border text-sm flex flex-col justify-between w-[200px] h-[180px]">
        <div className="flex flex-col gap-1">
          <span className="bg-secondary dark:bg-secondary-dark text-black font-bold px-2 py-0.5 rounded w-fit">
            {title}
          </span>
          <span className="text-primary dark:text-primary-dark font-semibold mt-2">
            댓글 {commentCount}개
          </span>
          <span className="text-gray-500 text-xs">{convertTime(restTime)}</span>
        </div>

        <div className="flex justify-end mt-2">
          <span className="text-yellow-500 font-medium text-sm flex items-center gap-1">
            <span>➡️</span>
            <span>보러 가기</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

import { AdviceCommentContentProps } from "@/types/advice.type";
import { formatRelativeTime } from "@/utils/shared/date.util";
import Image from "next/image";

export default function AdviceComment({
  memberId,
  comment,
  createdAt,
  profileImageUrl,
}: AdviceCommentContentProps) {
  const isBot = String(memberId) === "2";

  return (
    <div className="w-full p-4">
      {isBot ? (
        <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 dark:bg-border-dark shadow-sm">
          <Image
            src={profileImageUrl}
            alt="모각봇 프로필"
            width={32}
            height={32}
            className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
          />
          <div className="flex flex-col">
            <p className="text-sm text-text dark:text-text-dark mt-1 break-words">
              {comment}
            </p>
          </div>
        </div>
      ) : (
        <div className="border-b border-borders dark:border-background-dark">
          <p className="text-sm text-text dark:text-text-dark break-words">
            {comment}
          </p>
          <div className="mt-2 text-xs text-borders dark:text-background-dark text-right">
            {formatRelativeTime(createdAt)}
          </div>
        </div>
      )}
    </div>
  );
}

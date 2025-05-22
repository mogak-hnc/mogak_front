import { AdviceDetailCommentProps } from "@/types/advice.type";
import { formatRelativeTime } from "@/utils/shared/date.util";

export default function AdviceComment({
  comment,
  createdAt,
}: AdviceDetailCommentProps) {
  return (
    <div className="w-full border-b border-borders dark:border-border-dark p-4">
      <p className="text-sm text-text dark:text-text-dark break-words">
        {comment}
      </p>

      <div className="mt-2 text-xs text-borders dark:text-border-dark text-right">
        {formatRelativeTime(createdAt)}
      </div>
    </div>
  );
}

import { AdviceDetailCommentProps } from "@/types/advice.type";

export default function AdviceComment({
  comment,
  createdAt,
}: AdviceDetailCommentProps) {
  return (
    <div className="flex items-center gap-5 border-b border-borders dark:border-border-dark p-2">
      <div>{comment}</div>
      <div className="text-sm text-borders dark:text-border-dark">
        {createdAt}
      </div>
    </div>
  );
}

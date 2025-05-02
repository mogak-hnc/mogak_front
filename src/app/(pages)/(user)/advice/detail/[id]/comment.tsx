import { CommentProps } from "@/types";

export default function Comment({ id, message, time, isMe }: CommentProps) {
  return (
    <div key={id} className="flex gap-5 border-b p-2">
      <div>{message}</div>
      <div className="text-sm text-borders dark:text-border-dark">{time}</div>
      <div>
        {isMe && <div className="text-error dark:text-error-dark">x</div>}
      </div>
    </div>
  );
}

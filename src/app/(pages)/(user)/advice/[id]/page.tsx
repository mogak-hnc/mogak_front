import Button from "@/app/components/ui/button";
import { AiFillHeart } from "react-icons/ai";
import Comment from "./comment";

import { convertTime } from "@/utils/shared/date.util";
import { AdviceDetail } from "@/lib/server/advice.server.api";

export default async function AdviceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await AdviceDetail(id);
  return (
    <div className="flex gap-4 max-w-screen-xl mx-auto px-8 py-10">
      <div className="w-[65%] flex flex-col gap-6">
        <div className="flex items-center justify-between border-borders dark:border-border-dark border-b pb-2">
          <div>
            <h2 className="text-lg font-bold text-primary dark:text-primary-dark">
              {data.title}
            </h2>
            <p className="text-sm text-border-dark dark:text-borders">
              {convertTime(data.restTime)} 남음
            </p>
          </div>
          <Button>삭제하기</Button>
        </div>

        <p className="text-sm text-text dark:text-text-dark whitespace-pre-line">
          {data.body}
        </p>

        <div className="flex items-center gap-1 text-error dark:text-error-dark text-sm">
          <AiFillHeart size={18} />
          공감 {data.empathyCount}개
        </div>
      </div>

      <div className="w-[35%]">
        <div className="text-lg font-bold text-primary dark:text-primary-dark">
          댓글
        </div>
        <div>
          {data.commentResponses.map((comment, idx) => (
            <Comment key={idx} {...comment}></Comment>
          ))}
        </div>
      </div>
    </div>
  );
}

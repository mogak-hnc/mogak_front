"use client";

import { useState } from "react";

import Button from "@/app/components/ui/button";
import {
  AdviceCommentContentProps,
  AdviceCommentResponse,
} from "@/types/advice.type";
import AdviceComment from "./advice-comment";
import {
  AdviceCommentPagination,
  AdviceCommentPost,
} from "@/lib/client/advice.client.api";

export default function AdviceCommentsCard({
  comments,
  worryId,
}: {
  comments: AdviceCommentContentProps[];
  worryId: string;
}) {
  const [commentList, setCommentList] =
    useState<AdviceCommentContentProps[]>(comments);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) {
      return;
    }

    try {
      await AdviceCommentPost({ worryId: worryId, comment: input });
      setInput("");
      const commentData = await AdviceCommentPagination({
        worryId: worryId,
        page: 0,
        size: 10,
      });

      setCommentList(commentData.content);
    } catch (err) {
      console.log("댓글 작성 실패 : " + err);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-700 p-4">
      <div className="text-lg font-semibold text-primary dark:text-primary-dark mb-4">
        댓글 {commentList ? commentList.length : 0}개
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          className="w-full p-3 border border-zinc-300 dark:border-zinc-600 resize-none rounded-md bg-white dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
          placeholder="댓글을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>등록</Button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {commentList &&
          commentList.map((comment) => (
            <AdviceComment key={comment.commentId} {...comment} />
          ))}
      </div>
    </div>
  );
}

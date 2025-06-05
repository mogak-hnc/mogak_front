"use client";

import { useEffect, useState } from "react";

import Button from "@/app/components/ui/button";
import { AdviceCommentContentProps } from "@/types/advice.type";
import AdviceComment from "./advice-comment";
import {
  AdviceCommentPagination,
  AdviceCommentPost,
} from "@/lib/client/advice.client.api";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export default function AdviceCommentsCard({ worryId }: { worryId: string }) {
  const [commentList, setCommentList] = useState<AdviceCommentContentProps[]>(
    []
  );
  const [input, setInput] = useState("");

  const jwt = getJwtFromCookie();

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    const commentData = await AdviceCommentPagination({
      worryId: worryId,
      page: 0,
      size: 10,
    });

    setCommentList(commentData.content);
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      return;
    }

    try {
      await AdviceCommentPost({ worryId: worryId, comment: input });
      setInput("");
      loadComments();
    } catch (err) {
      console.log("댓글 작성 실패 : " + err);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-border-dark rounded-xl shadow p-4">
      <div className="text-lg font-semibold text-primary dark:text-primary-dark mb-4">
        댓글 {commentList ? commentList.length : 0}개
      </div>
      {jwt ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full p-3 border border-borders dark:border-border-dark resize-none rounded-md text-sm text-text dark:text-text-dark  focus:ring-2 focus:ring-primary"
            rows={3}
            placeholder="댓글을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit}>등록</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full p-3 resize-none rounded-md text-sm"
            placeholder="로그인 후 댓글을 작성해 보세요."
            readOnly
          />
        </div>
      )}

      <div className="mt-6 space-y-4">
        {commentList &&
          commentList.map((comment) => (
            <AdviceComment key={comment.commentId} {...comment} />
          ))}
      </div>
    </div>
  );
}

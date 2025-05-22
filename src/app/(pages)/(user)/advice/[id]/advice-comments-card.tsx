"use client";

import { useState } from "react";

import Button from "@/app/components/ui/button";
import { AdviceDetailCommentProps } from "@/types/advice.type";
import AdviceComment from "./advice-comment";

export default function AdviceCommentsCard({
  comments,
  worryId,
}: {
  comments: AdviceDetailCommentProps[];
  worryId: string;
}) {
  const [commentList, setCommentList] = useState(comments);
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch(`/api/advice/${worryId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: input }),
      });

      if (!res.ok) throw new Error("댓글 등록 실패");

      const newComment = await res.json();
      setCommentList((prev) => [...prev, newComment]);
      setInput("");
    } catch {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="w-[35%]">
      <div className="text-lg font-bold text-primary dark:text-primary-dark">
        댓글
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <textarea
          className="w-full p-2 border rounded text-sm resize-none"
          rows={3}
          placeholder="댓글을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit}>댓글 작성</Button>
        </div>
      </div>

      <div className="mt-4">
        {commentList.map((comment, idx) => (
          <AdviceComment key={idx} {...comment} />
        ))}
      </div>
    </div>
  );
}

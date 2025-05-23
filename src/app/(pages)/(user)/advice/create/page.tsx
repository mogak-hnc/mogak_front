"use client";

import { useState } from "react";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import SubTitle from "@/app/components/shared/sub-title";
import { AdviceCreatePost } from "@/lib/client/advice.client.api";
import { useRouter } from "next/navigation";
import { DURATION_MAP } from "@/utils/shared/advice-duration";

export default function AdviceWritePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteAfter, setDeleteAfter] = useState(24);

  const DELETE_TIMES = [1, 3, 6, 12, 24];

  const handleSubmit = async () => {
    try {
      const newAdviceId = await AdviceCreatePost({
        title: title,
        contents: content,
        duration: DURATION_MAP[deleteAfter],
      });
      router.push(`/advice/${newAdviceId.worryId}`);
    } catch (err) {
      console.log("게시글 작성 실패");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 flex flex-col gap-6">
      <SubTitle contents="고민 작성하기" />
      <div className="flex justify-between items-center">
        <Input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-semibold w-full"
        />
      </div>

      <textarea
        className="w-full h-60 p-4 rounded-lg border border-border
          bg-white dark:bg-border-dark text-text dark:text-text-dark resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="고민을 작성해 보세요!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-2 flex-wrap">
        {DELETE_TIMES.map((hour) => (
          <button
            key={hour}
            onClick={() => setDeleteAfter(hour)}
            className={`px-3 py-1 rounded-full text-sm border hover:text-secondary dark:hover:text-secondary-dark ${
              deleteAfter === hour
                ? "bg-primary dark:bg-primary-dark text-white"
                : "text-border-dark  dark:text-borders"
            }`}
          >
            {hour}시간
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 mt-5">
        <Button onClick={handleSubmit}>등록하기</Button>
        <p className="text-xs text-center text-border-dark dark:text-borders leading-5">
          시간을 지정하지 않으면 기본으로 24시간 뒤에 사라져요. <br />
          24시간 전에 글을 삭제하고 싶다면, 시간을 꼭 설정해 주세요!
        </p>
      </div>
    </div>
  );
}

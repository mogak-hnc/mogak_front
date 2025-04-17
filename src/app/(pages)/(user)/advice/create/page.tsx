"use client";

import { useState } from "react";
import Input from "@/app/Component/ui/input";
import Button from "@/app/Component/ui/button";
import H1Title from "@/app/Component/ui/h1-title";

const DELETE_TIMES = [1, 3, 6, 12, 24];

export default function AdviceWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteAfter, setDeleteAfter] = useState(24); // 기본 24시간

  const handleSubmit = () => {
    const expireAt = new Date(Date.now() + deleteAfter * 60 * 60 * 1000); // 삭제 시각 계산
    console.log("제출됨", { title, content, deleteAfter, expireAt });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 flex flex-col gap-6">
      <H1Title>고민 작성하기</H1Title>
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
        placeholder="무엇이 고민인가요?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-2 flex-wrap">
        {DELETE_TIMES.map((hour) => (
          <button
            key={hour}
            onClick={() => setDeleteAfter(hour)}
            className={`px-3 py-1 rounded-full text-sm border ${
              deleteAfter === hour
                ? "bg-primary text-white"
                : "text-gray-600 border-gray-300"
            }`}
          >
            {hour}시간
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 mt-8">
        <Button onClick={handleSubmit}>등록하기</Button>
        <p className="text-xs text-center text-border-dark dark:text-borders leading-5">
          시간을 지정하지 않으면 기본으로 24시간 뒤에 사라져요. <br />
          24시간 전에 글을 삭제하고 싶다면, 시간을 꼭 설정해 주세요!
        </p>
      </div>
    </div>
  );
}

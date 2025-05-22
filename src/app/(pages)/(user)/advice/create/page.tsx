"use client";

import { useState } from "react";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import SubTitle from "@/app/components/shared/sub-title";

export default function AdviceWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleteAfter, setDeleteAfter] = useState(24);

  const handleSubmit = () => {
    const expireAt = new Date(Date.now() + deleteAfter * 60 * 60 * 1000);
    console.log("제출됨", { title, content, deleteAfter, expireAt });
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

      <div className="flex flex-col items-center gap-3 mt-5">
        <Button onClick={handleSubmit}>등록하기</Button>
        <p className="text-xs text-center text-border-dark dark:text-borders leading-5">
          모각의 고민상담은 24시간 뒤에 자동으로 사라져요.
        </p>
      </div>
    </div>
  );
}

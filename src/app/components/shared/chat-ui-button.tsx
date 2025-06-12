"use client";

import { FormEvent, useState } from "react";

export default function ChatUiButton() {
  const [msg, setMsg] = useState<string>("");

  const msgHadler = (e: FormEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button className="text-xl text-primary dark:text-primary">＋</button>
      <input
        onInput={msgHadler}
        type="text"
        placeholder="메시지를 입력하세요."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none"
      />
      <button className="text-white bg-primary dark:bg-primary-dark p-2 rounded-full">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </button>
    </div>
  );
}

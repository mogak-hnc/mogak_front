"use client";

import { sendChat } from "@/lib/client/socket.client.api";
import { getClientUser } from "@/utils/client/user.client.util";
import { useState } from "react";

export default function ChatUiButton({
  zoneId,
  joined,
}: {
  zoneId: string;
  joined: boolean;
}) {
  const user = getClientUser();
  const [msg, setMsg] = useState<string>("");

  const msgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };

  const sendChatHandler = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!msg.trim()) return;
    try {
      await sendChat(zoneId, user?.memberId || "", msg);
      setMsg("");
    } catch (err) {
      console.log("채팅 전송 실패 : ", err);
    }
  };

  if (!joined) {
    return null;
  }

  return (
    <form onSubmit={sendChatHandler} className="flex items-center gap-2 mt-4">
      <input
        onChange={msgHandler}
        value={msg}
        type="text"
        placeholder="메시지를 입력하세요."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none"
      />
      <button
        type="submit"
        disabled={!msg.trim()}
        className={`p-2 rounded-full transition-colors ${
          !msg.trim()
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary dark:bg-primary-dark text-white"
        }`}
      >
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
    </form>
  );
}

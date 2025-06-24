"use client";

import { sendChat } from "@/lib/client/socket.client.api";
import { getClientUser } from "@/utils/client/user.client.util";
import { FormEvent, useState } from "react";

export default function ChatUiButton({
  zoneId,
  joined,
}: {
  zoneId: string;
  joined: boolean;
}) {
  const user = getClientUser();

  const [msg, setMsg] = useState<string>("");

  const msgHandler = (e: FormEvent<HTMLInputElement>) => {
    setMsg(e.currentTarget.value);
  };

  const sendChatHandler = async () => {
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
    <div className="flex items-center gap-2 mt-4">
      <input
        onInput={msgHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendChatHandler();
          }
        }}
        value={msg}
        type="text"
        placeholder="메시지를 입력하세요."
        className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none"
      />
      <button
        onClick={sendChatHandler}
        className="text-white bg-primary dark:bg-primary-dark p-2 rounded-full"
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
    </div>
  );
}

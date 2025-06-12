"use client";

import {
  connectAndSubscribeSocket,
  disconnectSocket,
} from "@/lib/client/socket.client.api";
import { ChatHistoryResponse, ZoneChatResponse } from "@/types/zone.type";
import { getClientUser } from "@/utils/client/user.client.util";
import { getProfileImage } from "@/utils/shared/profile.util";
import { useEffect, useState } from "react";
import ChatUiButton from "./chat-ui-button";

type ChatUiProps = {
  messages: ChatHistoryResponse[];
  zoneId: string;
};

export default function ChatUI({ messages, zoneId }: ChatUiProps) {
  const user = getClientUser();

  const [mounted, setMounted] = useState<boolean>(false);
  const [loadMsg, setLoadMsg] = useState<ChatHistoryResponse[]>();

  useEffect(() => {
    setMounted(true);

    connectAndSubscribeSocket<ChatHistoryResponse>({
      topic: `/topic/api/mogak/zone/${zoneId}/message`,
      mogakZoneId: String(zoneId),
      onMessage: (parsedRes) => {
        console.log("받은 메시지:", parsedRes);

        setLoadMsg((prev) => [...(prev ?? messages), parsedRes]);
      },
    });

    return () => {
      disconnectSocket();
    };
  }, [zoneId]);

  if (!mounted) {
    return null;
  }

  const chatMessages = loadMsg ?? messages;

  if (!Array.isArray(chatMessages)) {
    console.error("chatMessages는 배열이 아님:", chatMessages);
    return null;
  }

  return (
    <div className="w-full max-w-md h-[600px] mx-auto p-4 bg-white rounded-3xl shadow border border-borders flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-4">
        {chatMessages.map((msg, idx) =>
          String(msg.memberId) === String(user?.memberId) ? (
            <div key={idx} className="flex justify-end pr-2">
              <div className="bg-secondary dark:bg-secondary-dark text-text px-4 py-2 rounded-2xl rounded-br-none max-w-xs text-sm">
                <p>{msg.message}</p>
                <p className="text-[10px] text-right mt-1 text-yellow-900/80">
                  {msg.now}
                </p>
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-start gap-2">
              <img
                src={getProfileImage(msg.imageUrl)}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />

              <div>
                <p className="text-xs text-text">{msg.nickname}</p>
                <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none border max-w-xs text-sm shadow-sm">
                  <p className="text-text">{msg.message}</p>
                  <p className="text-[10px] text-right text-gray-400 mt-1">
                    {msg.now}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <ChatUiButton zoneId={zoneId} />
    </div>
  );
}

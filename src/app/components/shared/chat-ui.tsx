"use client";

import { useEffect, useRef, useState } from "react";
import { connectAndSubscribeSocket } from "@/lib/client/socket.client.api";
import { getClientUser } from "@/utils/client/user.client.util";
import { getProfileImage } from "@/utils/shared/profile.util";
import ChatUiButton from "./chat-ui-button";
import { ChatHistoryResponse } from "@/types/zone.type";
import { ZoneChat } from "@/lib/client/zone.client.api";
import { JwtPayload } from "@/utils/client/decode-token.client.util";

type ChatUiProps = {
  zoneId: string;
  joined: boolean;
};

export default function ChatUI({ zoneId, joined }: ChatUiProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<JwtPayload | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatHistoryResponse[]>([]);

  useEffect(() => {
    setUser(getClientUser());
    const init = async () => {
      try {
        const res = await ZoneChat(zoneId);
        setChatMessages(res.content ?? []);
      } catch (err) {
        console.error("초기 채팅 불러오기 실패:", err);
      }
    };

    init();
  }, [zoneId]);

  useEffect(() => {
    connectAndSubscribeSocket<ChatHistoryResponse>({
      topic: `/topic/api/mogak/zone/${zoneId}/message`,
      mogakZoneId: String(zoneId),
      onMessage: (parsedRes) => {
        console.log("받은 메시지:", parsedRes);
        setChatMessages((prev) => [...prev, parsedRes]);
      },
    });
  }, [zoneId]);

  useEffect(() => {
    if (containerRef.current) {
      const isAtBottom =
        containerRef.current.scrollHeight - containerRef.current.scrollTop <=
        containerRef.current.clientHeight + 10;
      if (isAtBottom) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }
  }, [chatMessages]);

  if (!joined && chatMessages.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md h-[600px] mx-auto p-4 bg-white rounded-3xl shadow border border-borders flex flex-col">
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-4">
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
      <ChatUiButton zoneId={zoneId} joined={joined} />
    </div>
  );
}

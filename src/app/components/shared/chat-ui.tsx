"use client";

import { useEffect, useRef, useState } from "react";
import { connectAndSubscribeSocket } from "@/lib/client/socket.client.api";
import { getClientUser } from "@/utils/client/user.client.util";
import { getProfileImage } from "@/utils/shared/profile.util";
import ChatUiButton from "./chat-ui-button";
import { JwtPayload } from "@/utils/client/decode-token.client.util";
import { ZoneChat } from "@/lib/client/zone.client.api";
import { ChatMessage, ChatHistoryResponse } from "@/types/zone.type";

type ChatUiProps = {
  zoneId: string;
  joined: boolean;
};

export default function ChatUI({ zoneId, joined }: ChatUiProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [user, setUser] = useState<JwtPayload | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [page, setPage] = useState<number | null>(null);
  // const [totalPages, setTotalPages] = useState(0);
  const size = 15;
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setUser(getClientUser());
    initMessages();
  }, [zoneId]);

  const initMessages = async () => {
    setLoading(true);
    try {
      const firstPageRes: ChatHistoryResponse = await ZoneChat(zoneId, 0, size);
      // setTotalPages(firstPageRes.totalPages);

      const lastPage = Math.max(firstPageRes.totalPages - 1, 0);
      const lastRes: ChatHistoryResponse = await ZoneChat(
        zoneId,
        lastPage,
        size
      );

      setChatMessages(lastRes.content);
      setPage(lastPage);
      setHasMore(lastPage > 0);

      scrollToBottom();
    } catch (err) {
      console.error("초기 채팅 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    connectAndSubscribeSocket<ChatMessage>({
      topic: `/topic/api/mogak/zone/${zoneId}/message`,
      mogakZoneId: String(zoneId),
      onMessage: (parsedRes) => {
        console.log("받은 메시지:", parsedRes);
        setChatMessages((prev) => [...prev, parsedRes]);
        scrollToBottom();
      },
    });
  }, [zoneId]);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const loadPrevPage = async () => {
    if (loading || page === null || page <= 0) return;
    setLoading(true);
    try {
      const prevPage = page - 1;
      const container = containerRef.current;
      const prevScrollHeight = container ? container.scrollHeight : 0;

      const res = await ZoneChat(zoneId, prevPage, size);

      setChatMessages((prev) => [...res.content, ...prev]);
      setPage(prevPage);
      setHasMore(prevPage > 0);

      requestAnimationFrame(() => {
        if (container) {
          container.scrollTop = container.scrollHeight - prevScrollHeight;
        }
      });
    } catch (err) {
      console.error("과거 채팅 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) {
      return;
    }
    if (containerRef.current.scrollTop === 0) {
      loadPrevPage();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, hasMore, loading]);

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

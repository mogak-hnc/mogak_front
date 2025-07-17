"use client";

import { ZoneDetailResponse } from "@/types/zone.type";
import ZoneHeader from "./zone-header";
import ChatUI from "@/app/components/shared/chat-ui";
import { useEffect, useState } from "react";
import {
  connectAndSubscribeSocket,
  disconnectSocket,
} from "@/lib/client/socket.client.api";
import ConfirmModal from "@/app/components/confirm-modal";
import SettingModal from "./setting-modal";
import { useAuthStore } from "@/store/authStore";
import UserCardWrapper from "./user-card-wrapper";

export default function ZoneWrapper({
  id,
  data,
}: {
  id: string;
  data: ZoneDetailResponse;
}) {
  const [joined, setJoined] = useState<boolean>(data.joined);
  const [showModal, setShowModal] = useState(false);
  const [loadData, setLoadData] = useState<ZoneDetailResponse>();
  const [connected, setConnected] = useState(false);
  const [showReconnectModal, setShowReconnectModal] = useState(false);

  const [memberId, setMemberId] = useState<string | null>(null);

  const { jwt } = useAuthStore();
  useEffect(() => {
    setMemberId(jwt);
  }, []);

  useEffect(() => {
    if (!joined) {
      return;
    }

    const timeout = setTimeout(() => {
      if (!connected && id === data.hostMemberId) {
        console.warn("소켓 연결 실패: 재참가 필요");
        setJoined(false);
        setShowReconnectModal(true);
      }
    }, 3000);

    connectAndSubscribeSocket<ZoneDetailResponse>({
      topic: `/topic/api/mogak/zone/${id}`,
      mogakZoneId: id,
      onMessage: (parsedRes) => {
        setConnected(true);
        clearTimeout(timeout);

        console.log("받은 메시지:", parsedRes);

        setLoadData((prev) => {
          const base = prev ?? data;
          return {
            ...base!,
            zoneMemberInfoList: parsedRes.zoneMemberInfoList,
            joinedUserCount: parsedRes.joinedUserCount,
          };
        });
      },
    });

    const handleBeforeUnload = () => {
      if (!memberId) {
        return;
      }

      const payload = new Blob(
        [JSON.stringify({ mogakZoneId: id, memberId })],
        { type: "application/json" }
      );

      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/leave`,
        payload
      );

      disconnectSocket();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearTimeout(timeout);
      setConnected(false);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      disconnectSocket();
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[65%] flex flex-col gap-4">
        <ZoneHeader
          zoneId={id}
          name={data.name}
          imageUrl={data.imageUrl}
          tag={data.tagNames}
          joinedUserCount={(loadData ?? data)?.joinedUserCount}
          hostId={data.hostMemberId}
          joined={joined}
          onJoinSuccess={(b) => setJoined(b)}
          onOpenSetting={() => setShowModal(true)}
          hasPwd={data.passwordRequired}
        />
        <UserCardWrapper zoneId={id} data={loadData ?? data} />
      </div>

      <div className="w-full lg:w-[35%] min-w-[300px]">
        <ChatUI zoneId={id} joined={joined} />
      </div>

      {showReconnectModal && (
        <ConfirmModal
          message="연결이 끊어졌어요. 다시 참가해 주세요!"
          onConfirm={() => {
            setShowReconnectModal(false);
            window.location.reload();
          }}
          onCancel={() => {
            setShowReconnectModal(false);
          }}
        />
      )}
      {showModal && (
        <SettingModal zoneId={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

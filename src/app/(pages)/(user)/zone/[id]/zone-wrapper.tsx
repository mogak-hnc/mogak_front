"use client";

import { ZoneDetailResponse } from "@/types/zone.type";
import ZoneHeader from "./zone-header";
import ChatUI from "@/app/components/shared/chat-ui";
import { useEffect, useState } from "react";
import {
  connectAndSubscribeSocket,
  disconnectSocket,
  setOnConnectedCallback,
} from "@/lib/client/socket.client.api";
import ConfirmModal from "@/app/components/confirm-modal";
import SettingModal from "./setting-modal";
import UserCardWrapper from "./user-card-wrapper";

import ZoneHeaderSkeleton from "@/app/components/skeleton/zone/zone-header-skeleton";
import UserCardSkeleton from "@/app/components/skeleton/shared/user-card-skeleton";

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

  useEffect(() => {
    setOnConnectedCallback(() => {
      console.log("소켓 연결 완료");
      setConnected(true);
    });

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

    return () => {
      clearTimeout(timeout);
      setConnected(false);
      disconnectSocket();
    };
  }, []);

  if (!connected) {
    return (
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[65%] flex flex-col gap-4">
          <ZoneHeaderSkeleton />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <UserCardSkeleton key={idx} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[35%] min-w-[300px]">
          <div className="h-[600px] w-full rounded-3xl bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[65%] flex flex-col gap-4">
        <ZoneHeader
          zoneId={id}
          name={data.name}
          imageUrl={data.imageUrl}
          tag={data.tagNames}
          joinedUserCount={loadData?.joinedUserCount ?? data.joinedUserCount}
          hostId={data.hostMemberId}
          joined={joined}
          onJoinSuccess={(b) => setJoined(b)}
          onOpenSetting={() => setShowModal(true)}
          hasPwd={data.passwordRequired}
        />
        <UserCardWrapper
          zoneId={id}
          data={{
            ...data,
            zoneMemberInfoList:
              loadData?.zoneMemberInfoList ?? data.zoneMemberInfoList,
          }}
        />
      </div>

      <div className="w-full lg:w-[35%] min-w-[300px]">
        <ChatUI zoneId={id} joined={joined} />
      </div>

      {showReconnectModal && (
        <ConfirmModal
          message="연결이 끊어졌어요. 다시 참가해 주세요!"
          onConfirm={() => window.location.reload()}
          onCancel={() => setShowReconnectModal(false)}
        />
      )}
      {showModal && (
        <SettingModal zoneId={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

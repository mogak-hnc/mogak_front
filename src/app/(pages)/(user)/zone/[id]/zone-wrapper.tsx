"use client";

import { StatusType, ZoneDetailResponse } from "@/types/zone.type";
import ZoneHeader from "./zone-header";
import UserCard from "@/app/components/shared/user-card";
import { getProfileImage } from "@/utils/shared/profile.util";
import ChatUI from "@/app/components/shared/chat-ui";
import { useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  subscribeSocket,
} from "@/lib/client/socket.client.api";

export default function ZoneWrapper({
  id,
  data,
}: {
  id: string;
  data: ZoneDetailResponse;
}) {
  const [joined, setJoined] = useState<boolean>(data.joined);
  const [loadData, setLoadData] = useState<ZoneDetailResponse>();

  useEffect(() => {
    connectSocket({
      mogakZoneId: id,
      onConnect: () => {
        subscribeSocket(
          `/topic/api/mogak/zone/${id}`,
          (res: ZoneDetailResponse) => {
            console.log("받은 메시지:", res);

            setLoadData((prev) => {
              if (!prev) {
                return prev;
              }
              return {
                ...prev,
                zoneMemberInfoList: res.zoneMemberInfoList,
                joinedUserCount: res.joinedUserCount,
              };
            });
          }
        );
      },
    });
    return () => {
      disconnectSocket();
    };
  }, [id]);

  return (
    <div className="flex gap-4">
      <div className="w-[65%] flex flex-col gap-4">
        <ZoneHeader
          zoneId={id}
          name={data.name}
          imageUrl={data.imageUrl}
          tag={data.tagNames[0]}
          joinedUserCount={data.joinedUserCount}
          hostId={data.hostMemberId}
          joined={joined}
          onJoinSuccess={() => setJoined(true)}
          hasPwd={data.passwordRequired}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(loadData ?? data).zoneMemberInfoList.map((user) => (
            <UserCard
              key={user.memberId}
              memberId={user.memberId}
              nickname={user.nickname}
              status={user.status as StatusType}
              role={Number(data.hostMemberId) === user.memberId ? "방장" : ""}
              image={getProfileImage(user.imageUrl)}
            />
          ))}
        </div>
      </div>

      <div className="w-[35%]">
        <ChatUI />
        {/* <ChatUI messages={data.chatHistoryResponses} /> */}
      </div>
    </div>
  );
}

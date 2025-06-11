"use client";

import { StatusType, ZoneDetailResponse } from "@/types/zone.type";
import ZoneHeader from "./zone-header";
import UserCard from "@/app/components/shared/user-card";
import { getProfileImage } from "@/utils/shared/profile.util";
import ChatUI from "@/app/components/shared/chat-ui";
import { useEffect, useState } from "react";
import {
  connectAndSubscribeSocket,
  disconnectSocket,
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
    if (!joined) {
      return;
    }

    connectAndSubscribeSocket<ZoneDetailResponse>({
      mogakZoneId: id,
      onMessage: (parsedRes) => {
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

    return () => {
      disconnectSocket();
    };
  }, [joined, id]);

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
          onJoinSuccess={(b) => setJoined(b)}
          hasPwd={data.passwordRequired}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(loadData ?? data)?.zoneMemberInfoList?.map((user) => (
            <UserCard
              key={user.memberId}
              zoneId={id}
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

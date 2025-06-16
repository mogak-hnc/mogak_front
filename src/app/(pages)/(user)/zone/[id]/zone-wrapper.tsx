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
    // console.log("zone-wrapper useEffect");
    if (!joined) {
      // console.log("not joied");
      return;
    }

    // console.log("start connectAndSubscribeSocket");

    console.log("id : " + id);
    connectAndSubscribeSocket<ZoneDetailResponse>({
      topic: `/topic/api/mogak/zone/${id}`,
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
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="w-full lg:w-[65%] flex flex-col gap-4">
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

      <div className="w-full lg:w-[35%] min-w-[300px]">
        <ChatUI
          zoneId={id}
          joined={joined}
          messages={data.chatHistoryResponses}
        />
      </div>
    </div>
  );
}

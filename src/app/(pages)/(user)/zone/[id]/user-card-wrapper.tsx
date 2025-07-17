"use client";

import { useEffect, useState } from "react";
import { connectAndSubscribeSocket } from "@/lib/client/socket.client.api";
import {
  ZoneDetailResponse,
  ZoneStatusResponse,
  StatusType,
} from "@/types/zone.type";
import UserCard from "@/app/components/shared/user-card";
import { getProfileImage } from "@/utils/shared/profile.util";

type Props = {
  zoneId: string;
  data: ZoneDetailResponse;
};

export default function UserCardWrapper({ zoneId, data }: Props) {
  const [members, setMembers] = useState(data.zoneMemberInfoList);

  useEffect(() => {
    setMembers(data.zoneMemberInfoList);
  }, [data.zoneMemberInfoList]);

  useEffect(() => {
    connectAndSubscribeSocket<ZoneStatusResponse>({
      topic: `/topic/api/mogak/zone/${zoneId}/status`,
      mogakZoneId: zoneId,
      onMessage: (parsedRes) => {
        console.log("📥 상태 메시지 수신:", parsedRes);

        setMembers((prev) =>
          prev.map((m) =>
            String(m.memberId) === String(parsedRes.memberId)
              ? { ...m, status: parsedRes.status }
              : m
          )
        );
      },
    });
  }, [zoneId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((user) => (
        <UserCard
          key={user.memberId}
          zoneId={zoneId}
          memberId={user.memberId}
          nickname={user.nickname}
          status={user.status as StatusType}
          role={Number(data.hostMemberId) === user.memberId ? "방장" : ""}
          image={getProfileImage(user.imageUrl)}
        />
      ))}
    </div>
  );
}

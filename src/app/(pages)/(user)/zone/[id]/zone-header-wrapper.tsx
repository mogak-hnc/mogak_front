"use client";

import { useEffect, useState } from "react";
import ZoneHeader from "./zone-header";
import {
  connectSocket,
  disconnectSocket,
} from "@/lib/client/socket.client.api";
import { ZoneHeaderProps } from "@/types/zone.type";

export default function ZoneHeaderWrapper({
  zoneId,
  tag,
  name,
  hostId,
  joinedUserCount,
  imageUrl,
  joined,
  hasPwd,
}: ZoneHeaderProps) {
  const [newJoinedUserCount, setNewJoinedUserCount] =
    useState<number>(joinedUserCount);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    connectSocket({
      mogakZoneId: zoneId,
      token,
      onMessage: (msg) => {
        if (msg.status) {
          // 유저 상태 변경 메시지에서 인원 수 다시 계산
          setNewJoinedUserCount(0);
        }
      },
    });

    return () => disconnectSocket();
  }, []);

  return (
    <ZoneHeader
      zoneId={zoneId}
      name={name}
      imageUrl={imageUrl}
      tag={tag}
      joinedUserCount={joinedUserCount}
      hostId={hostId}
      joined={joined}
      hasPwd={hasPwd}
    />
  );
}

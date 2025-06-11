"use client";

import {
  connectAndSubscribeSocket,
  sendStatus,
} from "@/lib/client/socket.client.api";
import {
  ZoneDetailResponse,
  ZoneStatusResponse,
  ZoneUserCardStatusProps,
} from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";
import { useEffect, useState } from "react";

export default function UserCardStatus({
  zoneId,
  memberId,
  status,
  statusColor,
  translatedStatus,
}: ZoneUserCardStatusProps) {
  const [study, setStudy] = useState<boolean>(status === "공부 중");
  const jwt = getJwtFromCookie();
  const user = jwt ? decodeToken(jwt) : null;

  useEffect(() => {
    connectAndSubscribeSocket<ZoneStatusResponse>({
      mogakZoneId: zoneId,
      onMessage: (parsedRes) => {
        if (String(parsedRes.memberId) !== String(memberId)) {
          return;
        }

        console.log("수신된 상태 메시지:", parsedRes);

        setStudy(String(parsedRes.status) === "STUDYING");
      },
    });
  }, [zoneId]);

  const statusHandler = async () => {
    console.log("statusHandler");
    await sendStatus(zoneId, study ? "RESTING" : "STUDYING", memberId);
    setStudy(!study);
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 mt-1 text-sm font-medium ${statusColor}`}
      >
        <span>✪</span>
        <span>{translatedStatus}</span>
      </div>
      {String(user?.memberId) === String(memberId) && (
        <button
          onClick={statusHandler}
          className="text-white text-xs py-1 my-3 rounded-lg bg-primary dark:bg-primary-dark"
        >
          {study ? "휴식하기" : "공부하기"}
        </button>
      )}
    </>
  );
}

"use client";

import { sendStatus } from "@/lib/client/socket.client.api";
import { ZoneUserCardStatusProps } from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";
import { useState } from "react";

export default function UserCardStatus({
  zoneId,
  memberId,
  status,
  statusColor,
  translatedStatus,
}: ZoneUserCardStatusProps) {
  const [study, setStudy] = useState<boolean>(status === "공부 중");
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  const user = decodeToken(jwt);

  const statusHandler = async () => {
    await sendStatus(zoneId, memberId, study ? "RESTING" : "STUDYING");
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

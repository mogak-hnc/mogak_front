"use client";

import { sendStatus } from "@/lib/client/socket.client.api";
import { useAuthStore } from "@/store/authStore";
import { ZoneUserCardStatusProps } from "@/types/zone.type";
import { decodeToken } from "@/utils/client/decode-token.client.util";
import { useEffect, useState } from "react";

export default function UserCardStatus({
  zoneId,
  memberId,
  study,
  statusColor,
  translatedStatus,
}: ZoneUserCardStatusProps) {
  const { jwt } = useAuthStore();
  const user = jwt ? decodeToken(jwt) : null;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const statusHandler = async () => {
    await sendStatus(zoneId, study ? "RESTING" : "STUDYING", memberId);
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 mt-1 text-sm font-medium ${statusColor}`}
      >
        <span>✪</span>
        <span>{translatedStatus}</span>
      </div>
      {isClient && String(user?.memberId) === String(memberId) && (
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

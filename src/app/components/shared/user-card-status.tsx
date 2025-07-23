"use client";

import { sendStatus } from "@/lib/client/socket.client.api";
import { useAuthStore } from "@/store/authStore";
import { ZoneUserCardStatusProps } from "@/types/zone.type";
import { decodeToken } from "@/utils/client/decode-token.client.util";
import { useMemo } from "react";

export default function UserCardStatus({
  zoneId,
  memberId,
  study,
  statusColor,
  translatedStatus,
}: ZoneUserCardStatusProps) {
  const { jwt } = useAuthStore();
  const user = jwt ? decodeToken(jwt) : null;

  const isMyCard = useMemo(
    () => String(user?.memberId) === String(memberId),
    [user?.memberId, memberId]
  );

  const statusHandler = async () => {
    try {
      await sendStatus(zoneId, study ? "RESTING" : "STUDYING", memberId);
    } catch (err) {
      console.error("상태 전송 실패", err);
    }
  };

  return (
    <>
      <div
        className={`flex items-center gap-1 mt-1 text-sm font-medium ${statusColor}`}
      >
        <span>✪</span>
        <span>{translatedStatus}</span>
      </div>
      {isMyCard && (
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

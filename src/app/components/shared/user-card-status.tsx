"use client";

import { sendStatus } from "@/lib/client/socket.client.api";
import { ZoneUserCardStatusProps } from "@/types/zone.type";
import { useState } from "react";

export default function UserCardStatus({
  zoneId,
  memberId,
  status,
  statusColor,
  translatedStatus,
}: ZoneUserCardStatusProps) {
  const [study, setStudy] = useState<boolean>(status === "공부 중");

  const statusHandler = () => {
    sendStatus(zoneId, memberId, study ? "RESTING" : "STUDYING");
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
      <button
        onClick={statusHandler}
        className="text-white text-xs py-1 my-3 rounded-lg bg-primary dark:bg-primary-dark"
      >
        {study ? "휴식하기" : "공부하기"}
      </button>
    </>
  );
}

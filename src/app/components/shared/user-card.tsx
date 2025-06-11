"use client";

import {
  StatusType,
  ZoneMemberCardProps,
  ZoneStatusResponse,
} from "@/types/zone.type";
import { statusMap } from "@/utils/shared/status.util";
import Link from "next/link";
import UserCardStatus from "./user-card-status";
import { useEffect, useState } from "react";
import { connectAndSubscribeSocket } from "@/lib/client/socket.client.api";

export const statusColorMap: Record<StatusType, string> = {
  "공부 중":
    "text-primary dark:text-primary-dark border-primary dark:border-primary-dark",
  자리비움:
    "text-secondary dark:text-secondary-dark border-secondary dark:border-secondary-dark",
};

export default function UserCard({
  zoneId,
  memberId,
  image,
  nickname,
  role,
  status,
}: ZoneMemberCardProps) {
  const [translatedStatus, setTranslatedStatus] = useState(
    statusMap[status] ?? status
  );
  const [study, setStudy] = useState<boolean>(status === "STUDYING");
  const [statusColor, setStatusColor] = useState(
    statusColorMap[translatedStatus as StatusType] ?? ""
  );

  useEffect(() => {
    connectAndSubscribeSocket<ZoneStatusResponse>({
      topic: `/topic/api/mogak/zone/${zoneId}/status`,
      mogakZoneId: zoneId,
      onMessage: (parsedRes) => {
        if (String(parsedRes.memberId) !== String(memberId)) {
          return;
        }

        console.log("수신된 상태 메시지:", parsedRes);

        setStudy(String(parsedRes.status) === "STUDYING");
        setStatusColor(statusColorMap[statusMap[parsedRes.status]]);
        setTranslatedStatus(
          String(parsedRes.status) === "STUDYING" ? "공부 중" : "자리비움"
        );
      },
    });
  }, [zoneId]);

  return (
    <div className="flex items-center p-4 w-fit">
      {image && (
        <img
          src={image}
          alt="profile"
          className={`w-20 aspect-square rounded-full border-2 object-cover ${statusColor}`}
        />
      )}
      <div className="ml-4 flex flex-col justify-center">
        <Link href={`/profile/${memberId}`}>
          <p className="text-lg font-semibold ">{nickname}</p>{" "}
        </Link>
        {role ? (
          <p className="text-sm text-border-dark dark:text-borders">{role}</p>
        ) : (
          <div className="h-[20px]" />
        )}
        <UserCardStatus
          zoneId={zoneId}
          memberId={String(memberId)}
          status={status}
          study={study}
          statusColor={statusColor}
          translatedStatus={translatedStatus}
        />
      </div>
    </div>
  );
}

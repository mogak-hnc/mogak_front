"use client";

import { StatusType, ZoneMemberCardProps } from "@/types/zone.type";
import { statusMap } from "@/utils/shared/status.util";
import Link from "next/link";
import UserCardStatus from "./user-card-status";
import { getProfileImage } from "@/utils/shared/profile.util";

export const statusColorMap: Record<StatusType, string> = {
  "공부 중":
    "text-primary dark:text-primary-dark border-primary dark:border-primary-dark",
  자리비움:
    "text-secondary dark:text-secondary-dark border-secondary dark:border-secondary-dark",
  오프라인:
    "text-borders dark:text-border-dark border-borders dark:border-border-dark",
};

export default function UserCard({
  zoneId,
  memberId,
  image,
  nickname,
  role,
  status,
}: ZoneMemberCardProps) {
  const translatedStatus = statusMap[status] ?? status;
  const study = status === "STUDYING";
  const statusColor = statusColorMap[translatedStatus as StatusType] ?? "";

  return (
    <div className="flex items-center p-4 w-fit">
      {image && (
        <img
          src={getProfileImage(image)}
          alt="profile"
          className={`w-20 aspect-square rounded-full border-2 object-cover ${statusColor}`}
        />
      )}
      <div className="ml-4 flex flex-col justify-center">
        <Link href={`/profile/${memberId}`}>
          <p className="text-lg font-semibold">{nickname}</p>
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

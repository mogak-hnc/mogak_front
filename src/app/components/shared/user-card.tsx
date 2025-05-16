import { StatusType, ZoneMemberCardProps } from "@/types/zone.type";
import { statusMap } from "@/utils/shared/status.util";
import Link from "next/link";

const statusColorMap: Record<StatusType, string> = {
  "공부 중":
    "text-primary dark:text-primary-dark border-primary dark:border-primary-dark",
  자리비움:
    "text-secondary dark:text-secondary-dark border-secondary dark:border-secondary-dark",
  오프라인:
    "text-borders dark:text-border-dark border-borders dark:border-border-dark",
};

export default function UserCard({
  memberId,
  image,
  nickname,
  role,
  status,
}: ZoneMemberCardProps) {
  const translatedStatus = statusMap[status] ?? status;

  const statusColor = statusColorMap[translatedStatus as StatusType] ?? "";

  return (
    <Link href={`/profile/${memberId}`}>
      <div className="flex items-center p-4 w-fit">
        {image && (
          <img
            src={image}
            alt="profile"
            className={`w-20 aspect-square rounded-full border-2 object-cover ${statusColor}`}
          />
        )}
        <div className="ml-4 flex flex-col justify-center">
          <p className="text-lg font-semibold ">{nickname}</p>
          {role && (
            <p className="text-sm text-border-dark dark:text-borders">{role}</p>
          )}
          <div
            className={`flex items-center gap-1 mt-1 text-sm font-medium ${statusColor}`}
          >
            <span>✪</span>
            <span>{translatedStatus}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

import { ZoneMainProps } from "@/types/zone.type";
import { getProfileImage } from "@/utils/shared/profile.util";
import Link from "next/link";

export default function ZoneMainCard({
  mogakZoneId,
  tag,
  title,
  participants,
}: ZoneMainProps) {
  return (
    <Link href={`/zone/detail/${mogakZoneId}`}>
      <div className="rounded-3xl p-4 shadow-md bg-white dark:bg-border-dark flex flex-col justify-between min-w-[280px] max-w-[320px] h-[180px]">
        <div className="space-y-1">
          {tag && (
            <span className="bg-secondary text-text font-bold px-2 py-0.5 rounded">
              {tag}
            </span>
          )}
          <p className="text-lg font-bold text-text dark:text-text-dark truncate">
            {title}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex -space-x-2">
            {participants?.slice(0, 3).map((src, i) => (
              <img
                key={i}
                src={getProfileImage(src!)}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
                alt={`participant-${i}`}
              />
            ))}
            {participants && participants.length > 3 && (
              <span className="text-xs ml-2">+{participants.length - 3}</span>
            )}
          </div>
          <span className="text-yellow-500 text-sm">➡️ 참가하기</span>
        </div>
      </div>
    </Link>
  );
}

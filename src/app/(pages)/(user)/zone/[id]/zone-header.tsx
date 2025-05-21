import Link from "next/link";
import Button from "@/app/components/ui/button";
import { ZoneHeaderProps, ZoneInOutButtonProps } from "@/types/zone.type";
import ZoneIn from "./zone-in";
import ZoneOut from "./zone-out";
import { getDetailImage } from "@/utils/shared/detail-image.util";

export default function ZoneHeader({
  zoneId,
  tag,
  name,
  hostId,
  joinedUserCount,
  imageUrl,
  joined,
  hasPwd,
}: ZoneHeaderProps) {
  const props: ZoneInOutButtonProps = {
    joined: joined,
    zoneId: zoneId,
    hostId: hostId,
  };

  return (
    <div
      className="relative w-full min-h-[180px] rounded-xl bg-no-repeat bg-cover bg-center dark:bg-none overflow-hidden flex flex-col justify-center mb-6"
      style={{
        backgroundImage: `url(${getDetailImage(imageUrl)})`,
      }}
    >
      <div className="hidden dark:block absolute inset-0 bg-background-dark/80 z-0" />

      <div className="relative z-10 px-6">
        <span className="block text-primary dark:text-primary text-xl mb-1">
          #{tag}
        </span>
        <span className="block text-primary dark:text-primary font-bold text-2xl mb-2">
          {name}
        </span>
        <span className="block my-2 text-border-dark dark:text-borders">
          {joinedUserCount}명이 참가 중이에요!
        </span>
        <div className="flex gap-2">
          <Link href={`/zone/${zoneId}/member`}>
            <Button>모각존 관리</Button>
          </Link>
          <ZoneIn {...props} hasPwd={hasPwd} />
          <ZoneOut {...props} />
        </div>
      </div>
    </div>
  );
}

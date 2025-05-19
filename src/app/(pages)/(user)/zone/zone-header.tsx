import Link from "next/link";
import Button from "../../../components/ui/button";
import { ZoneHeaderProps } from "@/types/zone.type";
import ZoneIn from "./detail/[id]/zone-in";
import ZoneOut from "./detail/[id]/zone-out";
import detailBg from "@/app/components/img/d_background.png";

export default function ZoneHeader({
  zoneId,
  tag,
  name,
  hostId,
  joinedUserCount,
}: ZoneHeaderProps) {
  return (
    <div
      className="relative w-full min-h-[180px] rounded-xl bg-no-repeat bg-cover bg-center dark:bg-none overflow-hidden flex flex-col justify-center mb-6"
      style={{
        backgroundImage: `url(${detailBg.src})`,
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
          <Link href={`/zone/detail/${zoneId}/member`}>
            <Button>모각존 관리</Button>
          </Link>
          <ZoneIn zoneId={zoneId} hostId={hostId} />
          <ZoneOut zoneId={zoneId} hostId={hostId} />
        </div>
      </div>
    </div>
  );
}

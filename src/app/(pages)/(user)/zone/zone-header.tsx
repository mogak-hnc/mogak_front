import Link from "next/link";
import Button from "../../../components/ui/button";
import { ZoneHeaderProps } from "@/types/zone.type";
import ZoneIn from "./detail/[id]/zone-in";
import ZoneOut from "./detail/[id]/zone-out";

export default function ZoneHeader({
  zoneId,
  tag,
  name,
  hostId,
  joinedUserCount,
}: ZoneHeaderProps) {
  return (
    <div className="ml-4 flex flex-col justify-center mb-6">
      <span className="flex gap-3 text-primary dark:text-primary text-xl">
        #{tag}
      </span>
      <span className="text-primary dark:text-primary font-bold text-2xl">
        {name}
      </span>
      <div className="flex gap-2">
        <Link href={`/zone/detail/${zoneId}/member`}>
          <Button>모각존 관리</Button>
        </Link>
        <ZoneIn zoneId={zoneId} hostId={hostId} />
        <ZoneOut zoneId={zoneId} hostId={hostId} />
      </div>
    </div>
  );
}

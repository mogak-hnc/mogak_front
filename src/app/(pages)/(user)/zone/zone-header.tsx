import Link from "next/link";
import Button from "../../../components/ui/button";
import { ZoneHeaderProps } from "@/types/zone.type";

export default function ZoneHeader({
  tag,
  name,
  hostId,
  startDate,
  endDate,
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
      <span>
        {startDate}&nbsp;~&nbsp;
        {endDate ? endDate : "종료시"}| {joinedUserCount}명
      </span>
      <Link href={`/zone/detail/${1}/member`}>
        <Button>모각존 관리</Button>
      </Link>
    </div>
  );
}

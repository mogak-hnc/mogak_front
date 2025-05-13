import Link from "next/link";
import Button from "../ui/button";
import { ZoneDetailProps } from "@/types";

export default function SubCard({
  tagNames,
  hostMemberId,
  name,
  startDate,
  endDate,
  joinedUserCount,
  zoneMemberInfoList,
}: ZoneDetailProps) {
  return (
    <div className="ml-4 flex flex-col justify-center mb-6">
      <span className="flex gap-3 text-primary dark:text-primary text-xl">
        {tagNames.map((tagNames) => (
          <div key={`sub-card-${tagNames}`}>#{tagNames}</div>
        ))}
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

import Link from "next/link";
import Button from "../ui/button";
import { SubCardProps } from "@/types";

export default function SubCard({
  name,
  maxCapacity,
  imageUrl,
  password,
  chatEnabled,
  loginRequired,
  startDate,
  endDate,
  tagNames,
}: SubCardProps) {
  // TODO : 인원수
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
        {endDate ? endDate : "종료시"}
        {/* | {count}명 */}
      </span>
      <Link href={`/zone/detail/${1}/member`}>
        <Button>모각존 관리</Button>
      </Link>
    </div>
  );
}

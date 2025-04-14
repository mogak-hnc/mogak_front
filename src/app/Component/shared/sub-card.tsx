import Link from "next/link";
import Button from "../ui/button";

interface SubCardProps {
  subtitle: string;
  title: string;
  startDate: Date;
  endDate?: Date | ``;
  count: number;
}

export default function SubCard({
  subtitle,
  title,
  startDate,
  endDate,
  count,
}: SubCardProps) {
  return (
    <div className="ml-4 flex flex-col justify-center mb-6">
      <span className="text-primary dark:text-primary text-xl">
        #{subtitle}
      </span>
      <span className="text-primary dark:text-primary font-bold text-2xl">
        {title}
      </span>
      <span>
        {new Date(startDate).toLocaleDateString()}&nbsp;~&nbsp;
        {endDate ? endDate.toLocaleDateString() : "종료시"} | {count}명
      </span>
      <Link href={`/zone/detail/${1}/member`}>
        <Button>모각존 관리</Button>
      </Link>
    </div>
  );
}

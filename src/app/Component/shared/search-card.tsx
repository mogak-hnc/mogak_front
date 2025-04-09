import Link from "next/link";
import Button from "../ui/button";
import Input from "../ui/input";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchCardProps {
  title: string;
  description: string;
  tags: string[];
  sort: string;
  section: string;
}

export default function SearchCard({
  title,
  description,
  tags,
  sort,
  section,
}: SearchCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <span className="text-lg font-semibold">{title}</span>
      <span className="text-sm text-border-dark">{description}</span>
      <div className="mt-2 flex items-center gap-2">
        <Input className="h-10 w-80 bg-white rounded-md" />
        <div className="flex items-center h-10">
          <AiOutlineSearch className="text-primary w-7 h-7" />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className="border border-borders dark:border-border-dark rounded-md px-5 py-1"
            >
              #{tag}
            </div>
          ))}
        </div>
        <select className="bg-white rounded-md px-5 py-2">
          <option>{sort}</option>
        </select>
      </div>
      <Link href={section === "모각존" ? `/zone/create` : `/challenge/create`}>
        <Button>{section} 만들기</Button>
      </Link>
    </div>
  );
}

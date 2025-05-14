"use client";

import Link from "next/link";
import Button from "../ui/button";
import Input from "../ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import H1Title from "../ui/h1-title";
import { TagsProps } from "@/types/shared.type";

type Props = {
  title: string;
  description: string;
  tags: TagsProps[];
  section: string;
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
  search: string;
  onSearchChange: (val: string) => void;
  onSearch: () => void;
};

export default function SearchCardView({
  title,
  description,
  tags,
  section,
  selectedTag,
  onTagClick,
  sort,
  onSortChange,
  search,
  onSearchChange,
  onSearch,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <H1Title>{title}</H1Title>
      <span className="text-sm text-border-dark dark:text-borders">
        {description}
      </span>

      <div className="mt-2 flex items-center gap-2">
        <Input
          value={search}
          onInput={(e) => onSearchChange(e.currentTarget.value)}
        />
        <div className="flex items-center h-10">
          <AiOutlineSearch
            onClick={onSearch}
            className="text-primary w-7 h-7 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <div
              key={`${tag.name}-${index}`}
              onClick={() => onTagClick(tag.name)}
              className={`border cursor-pointer rounded-md px-5 py-1 ${
                selectedTag === tag.name
                  ? "bg-secondary text-white"
                  : "border-borders dark:border-border-dark"
              }`}
            >
              #{tag.name}
            </div>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white dark:bg-border-dark dark:text-text-dark rounded-md px-5 py-2"
        >
          <option value="recent">최신순</option>
          <option value="participant">오래된 순</option>
        </select>
      </div>

      <Link href={section === "모각존" ? `/zone/create` : `/challenge/create`}>
        <Button>{section} 만들기</Button>
      </Link>
    </div>
  );
}

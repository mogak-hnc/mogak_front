"use client";

import Link from "next/link";
import Button from "../ui/button";
import Input from "../ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import H1Title from "../ui/h1-title";
import { SearchCardProps } from "@/types";
import { useSearchResultStore } from "@/store/shared/useSearchResultStore";
import { useEffect, useState } from "react";
import { ZoneSearch } from "@/lib/zone.api";

export default function SearchCard({
  type,
  title,
  description,
  tags,
  sort,
  section,
}: SearchCardProps) {
  const [search, setSearch] = useState<string | null>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [finalSort, setFinalSort] = useState("recent");

  const setData = useSearchResultStore((state) => state.setData);

  const searchData = async () => {
    try {
      const { data } = await ZoneSearch({
        search: search ?? "",
        tag: selectedTag ?? "",
        sort: finalSort,
        page: 0,
        size: 12,
      });
      setData(data);
    } catch (err) {
      console.error("검색 실패", err);
    }
  };

  useEffect(() => {
    searchData();
  }, [selectedTag, finalSort]);

  const toggleTag = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <H1Title>{title}</H1Title>
      <span className="text-sm text-border-dark dark:text-borders">
        {description}
      </span>

      <div className="mt-2 flex items-center gap-2">
        <Input
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
        />
        <div className="flex items-center h-10">
          <AiOutlineSearch
            onClick={() => searchData()}
            className="text-primary w-7 h-7 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <div
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`border cursor-pointer rounded-md px-5 py-1 ${
                selectedTag === tag
                  ? "bg-secondary text-white"
                  : "border-borders dark:border-border-dark"
              }`}
            >
              #{tag}
            </div>
          ))}
        </div>

        <select
          onChange={(e) => setFinalSort(e.target.value)}
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

"use client";

import Link from "next/link";
import Button from "../ui/button";
import Input from "../ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import { TagsProps } from "@/types/shared.type";
import SubTitle from "./sub-title";
import { useAuthStore } from "@/store/authStore";

type Props = {
  title: string;
  description: string;
  section: string;
  sort: string;
  onSortChange: (val: string) => void;
  search: string;
  onSearchChange: (val: string) => void;
  onSearch: () => void;

  tags?: TagsProps[];
  selectedTag?: string | null;
  onTagClick?: (tag: string) => void;

  official?: boolean;
  onOfficialToggle?: () => void;

  status?: string | null;
  onStatusChange?: (val: string | null) => void;
};

export default function SearchCardView({
  title,
  description,
  section,
  sort,
  onSortChange,
  search,
  onSearchChange,
  onSearch,
  tags,
  selectedTag,
  onTagClick,
  official,
  onOfficialToggle,
  status,
  onStatusChange,
}: Props) {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="flex flex-col w-fit items-center gap-2">
      <SubTitle contents={title} />
      <span className="text-sm text-border-dark dark:text-borders">
        {description}
      </span>

      <div className="mt-2 flex items-center gap-2">
        <Input
          value={search}
          onInput={(e) => onSearchChange(e.currentTarget.value)}
        />
        {onStatusChange && (
          <select
            value={status ?? ""}
            onChange={(e) =>
              onStatusChange(e.target.value === "" ? null : e.target.value)
            }
            className="bg-white dark:bg-border-dark dark:text-text-dark rounded-md px-5 py-2"
          >
            <option value="">전체</option>
            <option value="BEFORE">진행 전</option>
            <option value="ONGOING">진행 중</option>
            <option value="COMPLETED">종료</option>
          </select>
        )}
        <div className="flex items-center h-10">
          <AiOutlineSearch
            onClick={onSearch}
            className="text-primary w-7 h-7 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-4 w-full">
        <div className="flex flex-wrap gap-2">
          {tags &&
            tags.map((tag, index) => (
              <div
                key={`${tag.name}-${index}`}
                onClick={() => onTagClick?.(tag.name)}
                className={`border cursor-pointer rounded-md px-5 py-1 ${
                  selectedTag === tag.name
                    ? "bg-secondary text-white"
                    : "border-borders dark:border-border-dark"
                }`}
              >
                #{tag.name}
              </div>
            ))}

          {onOfficialToggle && (
            <div
              onClick={onOfficialToggle}
              className={`border cursor-pointer rounded-md px-5 py-1 ${
                official
                  ? "bg-secondary text-white"
                  : "border-borders dark:border-border-dark"
              }`}
            >
              #공식 챌린지
            </div>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white dark:bg-border-dark dark:text-text-dark rounded-md px-5 py-2"
        >
          <option value="recent">최신순</option>
          <option value="participant">참가자 순</option>
        </select>
      </div>

      {isLoggedIn && (
        <Link
          href={section === "모각존" ? `/zone/create` : `/challenge/create`}
        >
          <Button>{section} 만들기</Button>
        </Link>
      )}
    </div>
  );
}

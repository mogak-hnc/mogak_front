"use client";

import { useEffect, useState } from "react";
import { useSearchResultStore } from "@/store/shared/useSearchResultStore";
import { ChallengeSearchCardProps } from "@/types/challenge.type";
import SearchCardView from "@/app/components/shared/search-card-view";

export default function ChallengeSearchCard({
  title,
  description,
  tags,
  sort,
  section,
}: ChallengeSearchCardProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [finalSort, setFinalSort] = useState(sort);

  const setData = useSearchResultStore((state) => state.setData);

  const fetch = async () => {
    try {
      //   const { data } = await ChallengeSearch({
      //     search,
      //     tag: selectedTag ?? "",
      //     sort: finalSort,
      //     page: 0,
      //     size: 12,
      //   });
      //   setData(data);
    } catch (err) {
      console.error("챌린지 검색 실패", err);
    }
  };

  useEffect(() => {
    fetch();
  }, [selectedTag, finalSort]);

  const toggleTag = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <SearchCardView
      title={title}
      description={description}
      tags={tags}
      section={section}
      selectedTag={selectedTag}
      onTagClick={toggleTag}
      sort={finalSort}
      onSortChange={setFinalSort}
      search={search}
      onSearchChange={setSearch}
      onSearch={fetch}
    />
  );
}

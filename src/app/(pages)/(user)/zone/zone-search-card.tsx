"use client";

import { useEffect, useState } from "react";
import { ZoneSearch } from "@/lib/zone.api";
import { useSearchResultStore } from "@/store/shared/useSearchResultStore";
import { ZoneSearchCardProps } from "@/types/zone.type";
import SearchCardView from "@/app/components/shared/search-card-view";

export default function ZoneSearchCard({
  title,
  description,
  tags,
  sort,
  section,
}: ZoneSearchCardProps) {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [finalSort, setFinalSort] = useState(sort);

  const setData = useSearchResultStore((state) => state.setData);

  const fetch = async () => {
    try {
      const { data } = await ZoneSearch({
        search,
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

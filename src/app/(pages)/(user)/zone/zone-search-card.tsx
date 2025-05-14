"use client";

import { useEffect, useState } from "react";
import SearchCardView from "@/app/components/shared/search-card-view";
import { ZoneMain, ZoneSearch } from "@/lib/zone.api";
import { ZoneMainProps, ZoneSearchCardProps } from "@/types/zone.type";
import { mapSort } from "@/utils/sort";
import ZoneMainCard from "./zone-main-card";

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
  const [data, setData] = useState<ZoneMainProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const { data } = await ZoneSearch({
        search,
        tag: selectedTag ?? "",
        sort: mapSort(finalSort),
        page: 0,
        size: 12,
      });
      setData(data);
    } catch (err) {
      console.error("검색 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInitial = async () => {
    setLoading(true);
    try {
      const data = await ZoneMain();
      setData(data);
      setInitialLoaded(true);
    } catch (err) {
      console.error("초기 모각존 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitial();
  }, []);

  useEffect(() => {
    if (initialLoaded) {
      fetchSearch();
    }
  }, [selectedTag, finalSort]);

  const toggleTag = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <>
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
        onSearch={fetchSearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            불러오는 중...
          </div>
        ) : data.length > 0 ? (
          data.map((item, i) => <ZoneMainCard key={i} {...item} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

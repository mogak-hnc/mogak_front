"use client";

import { useEffect, useState } from "react";
import SearchCardView from "@/app/components/shared/search-card-view";
import { ZoneMainProps, ZoneSearchCardProps } from "@/types/zone.type";
import { mapSort } from "@/utils/shared/sort.util";
import ZoneMainCard from "./zone-main-card";
import { ZoneSearch } from "@/lib/shared/zone.api";
import { ZoneMainCardSkeleton } from "@/app/components/skeleton/zone/zone-main-card-skeleton";
import Pagination from "@/app/components/shared/paginaiton";

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

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await ZoneSearch({
        search,
        tag: selectedTag ?? "",
        sort: finalSort,
        page: pageNumber,
        size: 12,
      });

      console.log(res);

      setData(res.data);
      setPage(res.page);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("모각존 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(0);
  }, [selectedTag, finalSort]);

  const toggleTag = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <>
      <div className="w-full flex justify-center">
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
          onSearch={() => fetchData(0)}
        />
      </div>

      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 mt-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ZoneMainCardSkeleton key={`zone-skeleton-${i}`} />
            ))
          ) : data.length > 0 ? (
            data.map((d, i) => (
              <ZoneMainCard
                key={`zone-main-card-${d.mogakZoneId}-${i}`}
                {...d}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-border-dark dark:text-borders py-10">
              검색 결과가 없습니다.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={fetchData}
          />
        )}
      </div>
    </>
  );
}

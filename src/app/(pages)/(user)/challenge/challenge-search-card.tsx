"use client";

import { useEffect, useState } from "react";
import SearchCardView from "@/app/components/shared/search-card-view";
// import { ChallengeSearch } from "@/lib/challenge.api";
import {
  ChallengeMainProps,
  ChallengeSearchCardProps,
} from "@/types/challenge.type";
import { mapSort } from "@/utils/sort.util";
import ChallengeMainCard from "./challenge-main-card";

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
  const [data, setData] = useState<ChallengeMainProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    setLoading(true);
    // try {
    //   const { data } = await ChallengeSearch({
    //     search,
    //     tag: selectedTag ?? "",
    //     sort: mapSort(finalSort),
    //     page: 0,
    //     size: 12,
    //   });
    //   setData(data);
    // } catch (err) {
    //   console.error("검색 실패", err);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetch();
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
        onSearch={fetch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            불러오는 중...
          </div>
        ) : data.length > 0 ? (
          <div>
            {/* data.map((item, i) => <ChallengeMainCard key={i} {...item} />) */}
          </div>
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

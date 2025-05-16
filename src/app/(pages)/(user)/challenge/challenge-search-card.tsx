"use client";

import { useEffect, useState } from "react";
import SearchCardView from "@/app/components/shared/search-card-view";
import {
  ChallengeMainProps,
  ChallengeSearchCardProps,
} from "@/types/challenge.type";
import { mapSort } from "@/utils/shared/sort.util";
import ChallengeMainCard from "./challenge-main-card";
import { ChallengeMain, ChallengeSearch } from "@/lib/shared/challenge.api";

export default function ChallengeSearchCard({
  title,
  description,
  tags,
  sort,
  section,
}: ChallengeSearchCardProps) {
  const [search, setSearch] = useState("");
  const [official, setOfficial] = useState<"" | "true">("");
  const [finalSort, setFinalSort] = useState(sort);
  const [data, setData] = useState<ChallengeMainProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const fetchInitial = async () => {
    setLoading(true);
    try {
      const data = await ChallengeMain();
      setData(data);
      setInitialLoaded(true);
    } catch (err) {
      console.error("초기 챌린지 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const { data } = await ChallengeSearch({
        search,
        official,
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

  useEffect(() => {
    fetchInitial();
  }, []);

  useEffect(() => {
    if (initialLoaded) {
      fetchSearch();
    }
  }, [official, finalSort]);

  const toggleOfficial = () => {
    setOfficial((prev) => (prev === "true" ? "" : "true"));
  };

  return (
    <>
      <SearchCardView
        title={title}
        description={description}
        section={section}
        official={official === "true"}
        onOfficialToggle={toggleOfficial}
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
          data.map((item, i) => <ChallengeMainCard key={i} {...item} />)
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import SearchCardView from "@/app/components/shared/search-card-view";
import {
  ChallengeMainProps,
  ChallengeSearchCardProps,
  ChallengeStatusType,
} from "@/types/challenge.type";
import { mapSort } from "@/utils/shared/sort.util";
import ChallengeMainCard from "./challenge-main-card";
import { ChallengeSearch } from "@/lib/shared/challenge.api";
import ChallengeMainCardSkeleton from "../../../components/skeleton/challenge/challenge-main-card-skeleton";

export default function ChallengeSearchCard({
  title,
  description,
  sort,
  section,
}: ChallengeSearchCardProps) {
  const [search, setSearch] = useState("");
  const [official, setOfficial] = useState<boolean>(false);
  const [finalSort, setFinalSort] = useState(sort);
  const [data, setData] = useState<ChallengeMainProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await ChallengeSearch({
        search,
        official,
        sort: mapSort(finalSort),
        status: status as ChallengeStatusType,
        page: 0,
        size: 12,
      });
      setData(data);
    } catch (err) {
      console.error("챌린지 검색 실패", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [official, finalSort]);

  const toggleOfficial = () => {
    setOfficial((prev) => !prev);
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <SearchCardView
          title={title}
          description={description}
          section={section}
          official={official}
          onOfficialToggle={toggleOfficial}
          sort={finalSort}
          onSortChange={setFinalSort}
          search={search}
          onSearchChange={setSearch}
          onSearch={fetchData}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ChallengeMainCardSkeleton key={`challenge-skeleton-${i}`} />
          ))
        ) : data.length > 0 ? (
          data.map((item) => (
            <ChallengeMainCard
              key={item.challengeId}
              challengeId={item.challengeId}
              title={item.title}
              description={item.description}
              participants={item.participants}
              official={item.official}
              status={item.status}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}

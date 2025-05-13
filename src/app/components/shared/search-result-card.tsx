"use client";
import { useEffect } from "react";
import MainSubCard from "@/app/components/shared/main-sub-card";
import { ZoneMain } from "@/lib/zone.api";
import { useSearchResultStore } from "@/store/shared/useSearchResultStore";

export default function SearchResultCard({ type }: { type: string }) {
  const data = useSearchResultStore((state) => state.data);
  const setData = useSearchResultStore((state) => state.setData);

  useEffect(() => {
    const fetch = async () => {
      let result;
      if (type === "studySpace") {
        result = await ZoneMain();
      } else {
        // challenge api로 변경
        result = await ZoneMain();
      }

      setData(result);
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.length > 0 ? (
        data.map((m) => (
          <MainSubCard key={`main-sub-card-${m.type}-${m.title}`} {...m} />
        ))
      ) : (
        <div>검색 결과가 없습니다.</div>
      )}
    </div>
  );
}

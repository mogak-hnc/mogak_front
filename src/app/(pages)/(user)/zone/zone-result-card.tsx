"use client";

import { useEffect, useState } from "react";
import { ZoneMain } from "@/lib/zone.api";
import { ZoneMainProps } from "@/types/zone.type";
import ZoneMainCard from "./zone-main-card";

export default function ZoneResultCard() {
  const [data, setData] = useState<ZoneMainProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ZoneMain();
        setData(res);
      } catch (err) {
        console.error("모각존 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-border-dark dark:text-borders py-10">
        불러오는 중...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.length > 0 ? (
        data.map((item, index) => <ZoneMainCard key={index} {...item} />)
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}

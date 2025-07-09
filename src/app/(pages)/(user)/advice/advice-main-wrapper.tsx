"use client";

import { useEffect, useState } from "react";
import SubTitle from "@/app/components/shared/sub-title";
import AdvicePreviewCard from "@/app/components/advice-preview-card";
import Pagination from "@/app/components/shared/paginaiton";
import { AdviceSearch } from "@/lib/shared/advice.api";
import { AdviceSearchResponse } from "@/types/advice.type";

export default function AdviceMainWrapper() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<AdviceSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const result = await AdviceSearch({
        sort: "recent",
        page: pageNumber,
        size: 6,
      });
      setData(result);
      setPage(pageNumber);
    } catch (err) {
      console.error("고민 목록 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (nextPage: number) => {
    fetchData(nextPage);
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <div className="w-full flex flex-col gap-8">
      <SubTitle contents="공감이 많은 고민들" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {loading ? (
          <div className="w-full text-center py-10">로딩 중...</div>
        ) : data && data.content.length > 0 ? (
          data.content.map((m) => (
            <AdvicePreviewCard
              key={`advice-preview-card-${m.worryId}`}
              {...m}
            />
          ))
        ) : (
          <div className="w-full text-center text-border-dark dark:text-borders">
            작성된 고민들이 모두 삭제되었어요.
            <br />
            비밀스러운 고민이 있다면 새로 작성해 보세요!
          </div>
        )}
      </div>

      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

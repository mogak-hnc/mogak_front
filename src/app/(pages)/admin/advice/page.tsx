"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/components/admin/admin-table";
import ConfirmModal from "@/app/components/confirm-modal";
import { AdviceSearch } from "@/lib/shared/advice.api";
import { AdviceSearchResponse } from "@/types/advice.type";

// 숫자 배열 [4, 22] → "4시간 22분" 같은 포맷으로 변환
function formatRestTime(restTime: number[]) {
  const [hours, minutes] = restTime;
  return `${hours}시간 ${minutes}분`;
}

export default function AdminAdvicePage() {
  const [adviceList, setAdviceList] = useState<AdviceSearchResponse[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const res = await AdviceSearch({
          sort: "recent",
          page: 0,
          size: 20,
        });

        const formatted = res.map((item) => ({
          ...item,
          deleteIn: formatRestTime(item.restTime),
        }));

        setAdviceList(formatted);
      } catch (e) {
        console.error("고민 상담 목록 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (targetId !== null) {
      setAdviceList((prev) => prev.filter((item) => item.worryId !== targetId));
    }
    setShowModal(false);
    setTargetId(null);
  };

  const columns = [
    { key: "worryId", label: "ID" },
    {
      key: "title",
      label: "제목",
      linkTo: (row: any) => `/advice/detail/${row.worryId}`,
    },
    { key: "commnetCount", label: "댓글 수" },
    { key: "deleteIn", label: "삭제 예정" },
    {
      key: "actions",
      label: "관리",
      render: (_: any, row: any) => (
        <button
          className="text-sm px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => openModal(row.worryId)}
        >
          삭제
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold text-primary">고민 상담 글 관리</h1>

      {loading ? (
        <p className="text-sm text-center text-gray-400">불러오는 중...</p>
      ) : (
        <AdminTable columns={columns} data={adviceList} />
      )}

      {showModal && (
        <ConfirmModal
          message="정말로 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

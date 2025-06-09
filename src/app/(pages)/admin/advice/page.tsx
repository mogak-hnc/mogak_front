"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/components/admin/admin-table";
import ConfirmModal from "@/app/components/confirm-modal";
import { AdviceSearch } from "@/lib/shared/advice.api";
import { AdviceContentProps } from "@/types/advice.type";
import { convertTime } from "@/utils/shared/date.util";
import { AdviceDelete } from "@/lib/client/advice.client.api";

export default function AdminAdvicePage() {
  const [adviceList, setAdviceList] = useState<AdviceContentProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {
      const res = await AdviceSearch({
        sort: "recent",
        page: 0,
        size: 20,
      });

      const formatted = res.content.map((item) => ({
        ...item,
        deleteIn: convertTime(item.restTime),
      }));

      setAdviceList(formatted);
    } catch (e) {
      console.error("고민 상담 목록 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!targetId) {
      return;
    }
    await AdviceDelete(targetId);
    setShowModal(false);
    setTargetId(null);
    fetchAdvice();
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
      <h1 className="text-lg font-bold text-primary dark:text-primary-dark">
        고민 상담 글 관리
      </h1>

      {loading ? (
        <p className="text-sm text-center text-borders dark:text-border-dark">
          불러오는 중...
        </p>
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

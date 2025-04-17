"use client";

import { useState } from "react";
import AdminTable from "@/app/Component/admin/admin-table";
import ConfirmModal from "@/app/Component/confirm-modal";

const mockAdviceList = [
  {
    id: 1,
    title: "공부가 너무 안돼요",
    createdAt: "2025-04-10",
    deleteIn: "4시간 22분",
  },
  {
    id: 2,
    title: "새벽에 잠이 안 와요",
    createdAt: "2025-04-15",
    deleteIn: "1시간 3분",
  },
];

export default function AdminAdvicePage() {
  const [adviceList, setAdviceList] = useState(mockAdviceList);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (targetId !== null) {
      setAdviceList((prev) => prev.filter((item) => item.id !== targetId));
    }
    setShowModal(false);
    setTargetId(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "title",
      label: "제목",
      linkTo: (row: any) => `/advice/detail/${row.id}`,
    },
    { key: "createdAt", label: "작성일" },
    { key: "deleteIn", label: "삭제 예정" },
    {
      key: "actions",
      label: "관리",
      render: (_: any, row: any) => (
        <button
          className="text-sm px-2 py-1 bg-red-500 text-white rounded"
          onClick={() => openModal(row.id)}
        >
          삭제
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold text-primary">고민 상담 글 관리</h1>
      <AdminTable columns={columns} data={adviceList} />

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

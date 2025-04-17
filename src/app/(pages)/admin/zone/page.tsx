"use client";

import { useState } from "react";
import AdminTable from "@/app/Component/admin/admin-table";
import ConfirmModal from "@/app/Component/confirm-modal";

const mockZones = [
  {
    id: 1,
    name: "카공해요",
    tag: "#카페",
    members: 9,
    createdAt: "2025-04-01",
  },
  {
    id: 2,
    name: "같이 공부해요",
    tag: "#스터디룸",
    members: 5,
    createdAt: "2025-04-12",
  },
];

export default function AdminZonePage() {
  const [zones, setZones] = useState(mockZones);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (targetId !== null) {
      setZones((prev) => prev.filter((z) => z.id !== targetId));
    }
    setShowModal(false);
    setTargetId(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "name",
      label: "이름",
      linkTo: (row: any) => `/zone/detail/${row.id}`,
    },
    { key: "tag", label: "태그" },
    { key: "members", label: "참여 인원" },
    { key: "createdAt", label: "생성일" },
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
      <h1 className="text-lg font-bold text-primary">모각존 관리</h1>
      <AdminTable columns={columns} data={zones} />

      {showModal && (
        <ConfirmModal
          message="정말로 이 모각존을 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

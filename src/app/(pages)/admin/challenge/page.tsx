"use client";

import { useState } from "react";
import Link from "next/link";
import AdminTable from "@/app/Component/admin/admin-table";
import ConfirmModal from "@/app/Component/confirm-modal";

const mockChallenges = [
  {
    id: 1,
    title: "매일 공부 인증하기",
    participants: 12,
    startDate: "2025-03-01",
    endDate: "2025-04-01",
  },
  {
    id: 2,
    title: "알고리즘 챌린지",
    participants: 8,
    startDate: "2025-04-05",
    endDate: "2025-04-30",
  },
];

export default function AdminChallenge() {
  const [challenges, setChallenges] = useState(mockChallenges);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (targetId !== null) {
      setChallenges((prev) => prev.filter((c) => c.id !== targetId));
    }
    setShowModal(false);
    setTargetId(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "제목" },
    { key: "participants", label: "참가자 수" },
    {
      key: "period",
      label: "기간",
      render: (_: any, row: any) => `${row.startDate} ~ ${row.endDate}`,
    },
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
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-primary">챌린지 관리</h1>
        <Link
          href={`/admin/challenge/create`}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded"
        >
          생성하기
        </Link>
      </div>

      <AdminTable columns={columns} data={challenges} />

      {showModal && (
        <ConfirmModal
          message="정말로 이 챌린지를 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

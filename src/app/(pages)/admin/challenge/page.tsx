"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminTable from "@/app/components/admin/admin-table";
import ConfirmModal from "@/app/components/confirm-modal";
import { ChallengeSearch } from "@/lib/shared/challenge.api";

export default function AdminChallengePage() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await ChallengeSearch({
          search: "",
          official: "",
          sort: "recent",
          page: 0,
          size: 20,
        });

        setChallenges(res.data);
      } catch (e) {
        console.error("챌린지 목록 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

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
    {
      key: "title",
      label: "제목",
      linkTo: (row: any) => `/challenge/detail/${row.id}`,
    },
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
        <h1 className="text-lg font-bold text-primary dark:text-primary-dark">
          챌린지 관리
        </h1>
        <Link
          href={`/admin/challenge/create`}
          className="text-sm px-3 py-1 bg-primary dark:bg-primary-dark text-white rounded"
        >
          생성하기
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-center text-gray-400">불러오는 중...</p>
      ) : (
        <AdminTable columns={columns} data={challenges} />
      )}

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

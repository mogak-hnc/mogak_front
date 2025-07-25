"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmModal from "@/app/components/confirm-modal";
import { ChallengeSearch } from "@/lib/shared/challenge.api";
import { ChallengeDelete } from "@/lib/client/challenge.client.api";
import { ChallengeMainProps } from "@/types/challenge.type";
import { challengeMap } from "@/utils/shared/status.util";
import Loading from "@/app/loading";
import AdminTable from "@/app/components/admin/admin-table";
import { Column } from "@/types/admin.type";
import Pagination from "@/app/components/shared/paginaiton";

export default function AdminChallengePage() {
  const [challenges, setChallenges] = useState<ChallengeMainProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [targetName, setTargetName] = useState<string | null>(null);

  const fetchChallenges = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await ChallengeSearch({
        search: "",
        official: null,
        sort: "recent",
        status: "",
        page: pageNumber,
        size: 6,
      });

      setChallenges(res.data);
      setPage(pageNumber);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.error("챌린지 목록 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const openModal = (id: number, title: string) => {
    setTargetId(id);
    setTargetName(title);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (targetId !== null) {
      try {
        await ChallengeDelete(String(targetId));
        await fetchChallenges(page);
      } catch (err) {
        console.error("챌린지 삭제 실패:", err);
      }
    }

    setShowModal(false);
    setTargetId(null);
    setTargetName(null);
  };

  const columns: Column<ChallengeMainProps>[] = [
    {
      key: "id",
      label: "ID",
      render: (_, row) => `${row.challengeId}`,
    },
    {
      key: "title",
      label: "제목",
      linkTo: (row) => `/challenge/${row.challengeId}`,
    },
    {
      key: "participants",
      label: "참가자 수",
      render: (_, row) => `${row.participants?.length ?? 0}`,
    },
    {
      key: "period",
      label: "기간",
      render: (_, row) => `${row.description}`,
    },
    {
      key: "status",
      label: "상태",
      render: (_, row) => `${challengeMap[row.status]}`,
    },
    {
      key: "actions",
      label: "관리",
      render: (_, row) => (
        <button
          className="text-sm px-2 py-1 bg-error dark:bg-error-dark text-white rounded"
          onClick={() => openModal(row.challengeId, row.title)}
        >
          삭제
        </button>
      ),
    },
  ];

  if (loading) return <Loading />;

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

      <AdminTable columns={columns} data={challenges} />

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={fetchChallenges}
        />
      )}

      {showModal && (
        <ConfirmModal
          message={`정말 '${targetName}' 챌린지를 삭제하시겠습니까?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

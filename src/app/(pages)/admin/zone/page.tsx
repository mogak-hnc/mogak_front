"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/components/admin/admin-table";
import ConfirmModal from "@/app/components/confirm-modal";
import { ZoneSearch } from "@/lib/shared/zone.api";

export default function AdminZonePage() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const res = await ZoneSearch({
          sort: "recent",
          page: 0,
          size: 20,
        });
        setZones(res.data);
      } catch (e) {
        console.error("에러:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchZones();
  }, []);
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

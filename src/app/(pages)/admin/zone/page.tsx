"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/components/admin/admin-table";
import ConfirmModal from "@/app/components/confirm-modal";
import { ZoneSearch } from "@/lib/shared/zone.api";
import { ZoneDelete } from "@/lib/client/zone.client.api";
import SubTitle from "@/app/components/shared/sub-title";

export default function AdminZonePage() {
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [targetName, setTargetName] = useState<string | null>(null);

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
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const openModal = (id: number, name: string) => {
    setTargetId(id);
    setTargetName(name);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (targetId !== null) {
      await ZoneDelete(targetId);
      await fetchZones();
    }
    setShowModal(false);
    setTargetId(null);
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "name",
      label: "이름",
      linkTo: (row: any) => `/zone/${row.id}`,
    },
    { key: "tag", label: "태그" },
    { key: "members", label: "참여 인원" },
    { key: "createdAt", label: "생성일" },
    {
      key: "actions",
      label: "관리",
      render: (_: any, row: any) => (
        <button
          className="text-sm px-2 py-1 bg-error dark:bg-error-dark text-white rounded"
          onClick={() => openModal(row.mogakZoneId, row.title)}
        >
          삭제
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SubTitle contents="모각존 관리" />
      <AdminTable columns={columns} data={zones} />

      {showModal && (
        <ConfirmModal
          message={`정말 '${targetName}' 존을 삭제하시겠습니까?`}
          onConfirm={() => confirmDelete()}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

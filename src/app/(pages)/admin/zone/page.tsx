"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/components/admin/admin-table";
import ConfirmModal from "@/app/components/confirm-modal";
import { ZoneSearch } from "@/lib/shared/zone.api";
import { ZoneDelete } from "@/lib/client/zone.client.api";
import Loading from "@/app/loading";
import { ZoneMainProps } from "@/types/zone.type";
import { Column } from "@/types/admin.type";
import Pagination from "@/app/components/shared/paginaiton";

export default function AdminZonePage() {
  const [zones, setZones] = useState<ZoneMainProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [targetName, setTargetName] = useState<string | null>(null);

  const fetchZones = async (pageNumber = 0) => {
    setLoading(true);
    try {
      const res = await ZoneSearch({
        sort: "recent",
        page: pageNumber,
        size: 10,
      });

      setZones(res.data);
      setPage(pageNumber);
      setTotalPages(res.totalPages);
    } catch (e) {
      console.error("에러:", e);
    } finally {
      setLoading(false);
    }
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
      await fetchZones(page);
    }
    setShowModal(false);
    setTargetId(null);
    setTargetName(null);
  };

  const columns: Column<ZoneMainProps>[] = [
    { key: "mogakZoneId", label: "ID" },
    {
      key: "title",
      label: "이름",
      linkTo: (row: ZoneMainProps) => `/zone/${row.mogakZoneId}`,
    },
    { key: "tag", label: "태그" },
    {
      key: "hasPwd",
      label: "공개 여부",
      render: (value) => (value ? "🔒" : ""),
    },
    {
      key: "actions",
      label: "관리",
      render: (_, row: ZoneMainProps) => (
        <button
          className="text-sm px-2 py-1 bg-error dark:bg-error-dark text-white rounded"
          onClick={() => openModal(row.mogakZoneId, row.title)}
        >
          삭제
        </button>
      ),
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-bold text-primary dark:text-primary-dark">
        모각존 관리
      </h1>
      <AdminTable columns={columns} data={zones} />

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={fetchZones}
        />
      )}

      {showModal && (
        <ConfirmModal
          message={`정말 '${targetName}' 존을 삭제하시겠습니까?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

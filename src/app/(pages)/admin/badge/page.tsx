"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/app/components/admin/admin-table";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import { adminBadgeList } from "@/lib/client/badge.client.api";
import { AdminBadgeProps, Column } from "@/types/admin.type";

export default function AdminBadgePage() {
  const [badges, setBadges] = useState<AdminBadgeProps[]>([]);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await adminBadgeList();
      if (data) {
        setBadges(data);
      }
    };
    loadData();
  }, []);

  const handleAddBadge = () => {
    if (!newName || !newImage) {
      return;
    }
  };

  const handleDelete = (id: number) => {
    // 추후 구현 예정
  };

  const columns: Column<AdminBadgeProps>[] = [
    {
      key: "iconUrl",
      label: "이미지",
      render: (src) => (
        <img
          src={String(src)}
          alt="badge"
          className="w-10 h-10 object-contain mx-auto"
        />
      ),
    },
    { key: "name", label: "이름" },
    { key: "description", label: "설명" },
    {
      key: "badgeId" as any,
      label: "관리",
      render: (_value, row) => (
        <div className="flex gap-2 justify-center">
          <button
            className="text-sm px-2 py-1 bg-borders text-text rounded"
            onClick={() => alert(`조건 추가: ${row.badgeId}`)}
          >
            조건 추가
          </button>
          <button
            className="text-sm px-2 py-1 bg-error dark:bg-error-dark text-white rounded"
            onClick={() => handleDelete(row.badgeId)}
          >
            삭제
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-bold text-primary">뱃지 관리</h1>

      <div className="flex items-center gap-4">
        <Input
          placeholder="뱃지 이름"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-40"
        />
        <input
          type="file"
          onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <Button onClick={handleAddBadge}>등록</Button>
      </div>

      <AdminTable columns={columns} data={badges} />
    </div>
  );
}

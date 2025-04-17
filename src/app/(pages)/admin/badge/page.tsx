"use client";

import { useState } from "react";
import AdminTable from "@/app/Component/admin/admin-table";
import Input from "@/app/Component/ui/input";
import Button from "@/app/Component/ui/button";

const mockBadgeList = [
  {
    id: 1,
    name: "꾸준러",
    image: "/badge1.png",
    condition: "챌린지 3개 성공",
  },
  {
    id: 2,
    name: "열정러",
    image: "/badge2.png",
    condition: "하루 10시간 이상 7일 연속",
  },
];

export default function AdminBadgePage() {
  const [badges, setBadges] = useState(mockBadgeList);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleAddBadge = () => {
    if (!newName || !newImage) return;
    const nextId = badges.length + 1;
    const newBadge = {
      id: nextId,
      name: newName,
      image: URL.createObjectURL(newImage),
      condition: "조건 없음",
    };
    setBadges((prev) => [...prev, newBadge]);
    setNewName("");
    setNewImage(null);
  };

  const handleDelete = (id: number) => {
    setBadges((prev) => prev.filter((b) => b.id !== id));
  };

  const columns = [
    {
      key: "image",
      label: "이미지",
      render: (src: string) => (
        <img
          src={src}
          alt="badge"
          className="w-10 h-10 object-contain mx-auto"
        />
      ),
    },
    { key: "name", label: "이름" },
    { key: "condition", label: "조건" },
    {
      key: "actions",
      label: "관리",
      render: (_: any, row: any) => (
        <div className="flex gap-2 justify-center">
          <button
            className="text-sm px-2 py-1 bg-gray-300 text-gray-800 rounded"
            onClick={() => alert(`조건 추가: ${row.id}`)}
          >
            조건 추가
          </button>
          <button
            className="text-sm px-2 py-1 bg-red-500 text-white rounded"
            onClick={() => handleDelete(row.id)}
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

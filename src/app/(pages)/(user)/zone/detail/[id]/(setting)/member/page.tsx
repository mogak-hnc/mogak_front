"use client";

import { useState } from "react";
import Button from "@/app/Component/ui/button";
import ConfirmModal from "@/app/Component/confirm-modal";

const mockMembers = [
  { id: 1, nickname: "피자", image: "/user1.png" },
  { id: 2, nickname: "라이언", image: "/user2.png" },
  { id: 3, nickname: "춘식이", image: "/user3.png" },
];

export default function ZoneDetailMemberPage() {
  const [members, setMembers] = useState(mockMembers);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmKick = () => {
    if (targetId !== null) {
      setMembers((prev) => prev.filter((m) => m.id !== targetId));
    }
    setShowModal(false);
    setTargetId(null);
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-6 px-4">
      <h1 className="text-xl font-bold text-primary dark:text-primary-dark">
        모각존 멤버 관리
      </h1>

      {members.map((m) => (
        <div
          key={m.id}
          className="flex items-center justify-between border p-3 rounded"
        >
          <div className="flex items-center gap-4">
            <img
              src={m.image}
              alt={m.nickname}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{m.nickname}</span>
          </div>
          <Button onClick={() => openModal(m.id)}>강제 탈퇴</Button>
        </div>
      ))}

      {showModal && (
        <ConfirmModal
          message="정말로 이 멤버를 강제 탈퇴시키겠습니까?"
          onConfirm={confirmKick}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

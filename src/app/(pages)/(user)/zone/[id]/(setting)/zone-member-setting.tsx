"use client";

import { useState } from "react";
import Button from "@/app/components/ui/button";
import ConfirmModal from "@/app/components/confirm-modal";
import { ZoneMemberInfo } from "@/types/zone.type";
import { getProfileImage } from "@/utils/shared/profile.util";

export default function ZoneMemberSetting({
  memberData,
}: {
  memberData: ZoneMemberInfo[];
}) {
  const [members, setMembers] = useState(memberData);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const confirmKick = () => {
    if (targetId !== null) {
      setMembers((prev) => prev.filter((m) => m.memberId !== targetId));
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
          key={m.memberId}
          className="flex items-center justify-between border p-3 rounded"
        >
          <div className="flex items-center gap-4">
            <img
              src={getProfileImage(m.imageUrl)}
              alt={m.nickname}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{m.nickname}</span>
          </div>
          <Button onClick={() => openModal(m.memberId)}>강제 탈퇴</Button>
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

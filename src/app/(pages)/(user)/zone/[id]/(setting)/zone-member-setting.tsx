"use client";

import { useState } from "react";
import Button from "@/app/components/ui/button";
import ConfirmModal from "@/app/components/confirm-modal";
import { ZoneMemberInfo } from "@/types/zone.type";
import { getProfileImage } from "@/utils/shared/profile.util";
import {
  ZoneDelegateHost,
  ZoneDetail,
  ZoneKick,
} from "@/lib/client/zone.client.api";
import { useParams } from "next/navigation";

export default function ZoneMemberSetting({
  memberData,
}: {
  memberData: ZoneMemberInfo[];
}) {
  const params = useParams();
  const zoneId = params?.id as string;
  const [members, setMembers] = useState(memberData);
  const [showModal, setShowModal] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [targetDelegateId, setTargetDelegateId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setTargetId(id);
    setShowModal(true);
  };

  const openDelegateModal = (id: number) => {
    setTargetDelegateId(id);
    setShowDelegateModal(true);
  };

  const confirmKick = async () => {
    if (targetId !== null) {
      try {
        await ZoneKick(zoneId, String(targetId));

        const loadMember = await ZoneDetail(zoneId);
        setMembers(loadMember.zoneMemberInfoList);
      } catch (err) {
        console.log(`강제 탈퇴 실패 : `, err);
      }
    }
    setShowModal(false);
    setTargetId(null);
  };

  const confirmDelegate = async () => {
    if (targetDelegateId !== null) {
      try {
        await ZoneDelegateHost(zoneId, String(targetDelegateId));

        const loadMember = await ZoneDetail(zoneId);
        setMembers(loadMember.zoneMemberInfoList);
      } catch (err) {
        console.log(`방장 위임 실패 : `, err);
      }
    }
    setShowDelegateModal(false);
    setTargetDelegateId(null);
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
          <Button onClick={() => openDelegateModal(m.memberId)}>
            방장 위임
          </Button>
          <Button variant="danger" onClick={() => openModal(m.memberId)}>
            강제 탈퇴
          </Button>
        </div>
      ))}

      {showDelegateModal && (
        <ConfirmModal
          message="방장을 이 멤버에게 위엄하시겠습니까?"
          onConfirm={confirmDelegate}
          onCancel={() => setShowDelegateModal(false)}
        />
      )}

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

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
import { sendDetail } from "@/lib/client/socket.client.api";
import SubTitle from "@/app/components/shared/sub-title";

export default function ZoneMemberSetting({
  memberData,
}: {
  memberData: ZoneMemberInfo[];
}) {
  const userId = localStorage.getItem("memberId");
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
        await sendDetail(zoneId);
      } catch (err) {
        console.log(`강제 탈퇴 실패 : `, err);
      } finally {
        setShowModal(false);
        setTargetId(null);
      }
    }
  };

  const confirmDelegate = async () => {
    if (targetDelegateId !== null) {
      try {
        await ZoneDelegateHost(zoneId, String(targetDelegateId));
        await sendDetail(zoneId);
        window.location.reload();
      } catch (err) {
        console.log(`방장 위임 실패 : `, err);
      } finally {
        setTargetDelegateId(null);
      }
    }
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-6 px-4">
      <SubTitle contents="모각존 멤버 관리" />

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
          {String(m.memberId) !== String(userId) ? (
            <div className="flex gap-3">
              <Button onClick={() => openDelegateModal(m.memberId)}>
                방장 위임
              </Button>
              <Button variant="danger" onClick={() => openModal(m.memberId)}>
                강제 탈퇴
              </Button>
            </div>
          ) : (
            <span className="text-sm text-white bg-primary dark:bg-primary-dark px-2 py-1 rounded-full">
              방장
            </span>
          )}
        </div>
      ))}

      {showDelegateModal && (
        <ConfirmModal
          message="방장을 이 멤버에게 위임할까요?"
          onConfirm={confirmDelegate}
          onCancel={() => setShowDelegateModal(false)}
        />
      )}

      {showModal && (
        <ConfirmModal
          message="정말 이 멤버를 강제 탈퇴할까요?"
          onConfirm={confirmKick}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

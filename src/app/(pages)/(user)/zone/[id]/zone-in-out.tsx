"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { ZoneEntryPost, ZoneLeave } from "@/lib/client/zone.client.api";
import {
  decodeToken,
  JwtPayload,
} from "@/utils/client/decode-token.client.util";
import { ZoneInOutButtonProps } from "@/types/zone.type";
import SubTitle from "@/app/components/shared/sub-title";
import { disconnectSocket, sendDetail } from "@/lib/client/socket.client.api";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/components/confirm-modal";
import { useAuthStore } from "@/store/authStore";

type ZoneInProps = ZoneInOutButtonProps & {
  hasPwd: boolean;
  joinedUserCount: number;
  onJoinSuccess: (b: boolean) => void;
};

export default function ZoneInOut({
  zoneId,
  hostId,
  joined,
  hasPwd,
  onJoinSuccess,
}: ZoneInProps) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const focusPwd = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const exitHandler = async () => {
    if (!user) {
      return;
    }

    onJoinSuccess(false);
    await ZoneLeave(zoneId, user.memberId);
    await sendDetail(zoneId);
    disconnectSocket();
    router.push("/zone");
  };

  const { jwt } = useAuthStore();

  useEffect(() => {
    if (!jwt) {
      return;
    }

    const decoded = decodeToken(jwt);
    setUser(decoded);
  }, []);

  const handleJoin = async () => {
    if (hasPwd && !password) {
      focusPwd.current?.focus();
      return;
    }

    if (!jwt || !user) {
      return;
    }

    try {
      onJoinSuccess(true);
      await ZoneEntryPost(zoneId, hasPwd ? password : "");
      await sendDetail(zoneId);

      setShowModal(false);
    } catch (err) {
      console.log("모각존 입장 실패 : " + err);
      setPassword("");
      setErrorMsg("비밀번호가 틀렸습니다. 다시 입력해 보세요.");
    }
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {joined && String(user.memberId) !== String(hostId) ? (
        <Button onClick={() => setShowExitModal(true)}>탈퇴하기</Button>
      ) : (
        <Button
          onClick={() => {
            if (hasPwd) {
              setPassword("");
              setErrorMsg("");
              setShowModal(true);
            } else {
              handleJoin();
            }
          }}
        >
          참가하기
        </Button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background-dark p-6 rounded shadow-lg flex flex-col gap-4 w-80">
            <SubTitle contents="비밀번호 입력" />
            <Input
              ref={focusPwd}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMsg && (
              <p className="text-error dark:text-error-dark text-sm mt-2 flex justify-center">
                {errorMsg}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="etc" onClick={() => setShowModal(false)}>
                취소
              </Button>
              <Button onClick={handleJoin}>입장</Button>
            </div>
          </div>
        </div>
      )}

      {showExitModal && (
        <ConfirmModal
          message="탈퇴하시겠어요? 언제든 다시 참가할 수 있어요."
          onConfirm={exitHandler}
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </>
  );
}

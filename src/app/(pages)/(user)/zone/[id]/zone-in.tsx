"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { ZoneEntryPost } from "@/lib/client/zone.client.api";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import {
  decodeToken,
  JwtPayload,
} from "@/utils/client/decode-token.client.util";
import { ZoneInOutButtonProps } from "@/types/zone.type";
import SubTitle from "@/app/components/shared/sub-title";
import { connectSocket, subscribeSocket } from "@/lib/client/socket.client.api";

type ZoneInProps = ZoneInOutButtonProps & {
  hasPwd: boolean;
  onJoinSuccess: () => void;
};

export default function ZoneIn({
  zoneId,
  hostId,
  joined,
  hasPwd,
  onJoinSuccess,
}: ZoneInProps) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const focusPwd = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const jwt = getJwtFromCookie();
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

    const jwt = getJwtFromCookie();
    if (!jwt) {
      return;
    }

    try {
      await ZoneEntryPost(zoneId, hasPwd ? password : "");
      setShowModal(false);
      onJoinSuccess();

      connectSocket({
        mogakZoneId: zoneId,
        onConnect: () => {
          subscribeSocket(`/topic/api/mogak/zone/${zoneId}`, (res) => {
            console.log("받은 메시지:", res);
          });
        },
      });
    } catch (err) {
      console.log("모각존 입장 실패 : " + err);
      setPassword("");
      setErrorMsg("비밀번호가 틀렸습니다. 다시 입력해 보세요.");
    }
  };

  if (joined || !user || user.memberId === hostId) {
    return null;
  }

  return (
    <>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background-dark p-6 rounded shadow-lg flex flex-col gap-4 w-80">
            {hasPwd && (
              <div>
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
              </div>
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
    </>
  );
}

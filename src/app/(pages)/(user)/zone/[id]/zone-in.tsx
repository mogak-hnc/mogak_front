"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { ZoneEntryPost } from "@/lib/client/zone.client.api";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import {
  decodeToken,
  JwtPayload,
} from "@/utils/client/decode-token.client.util";
import { ZoneInOutButtonProps } from "@/types/zone.type";

export default function ZoneIn({
  zoneId,
  hostId,
  joined,
}: ZoneInOutButtonProps) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const jwt = getJwtFromCookie();
    if (!jwt) {
      return;
    }
    const decoded = decodeToken(jwt);
    setUser(decoded);
  }, []);

  const handleJoin = async () => {
    const jwt = getJwtFromCookie();
    if (!jwt) {
      return;
    }

    try {
      await ZoneEntryPost(zoneId, password, jwt);
      setShowModal(false);
    } catch (err) {
      alert("입장 실패");
    }
  };

  if (joined || !user || user.memberId === hostId) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>참가하기</Button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-background-dark p-6 rounded shadow-lg flex flex-col gap-4 w-80">
            <h2 className="text-lg font-semibold">비밀번호 입력</h2>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

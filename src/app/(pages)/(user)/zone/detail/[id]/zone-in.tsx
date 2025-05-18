"use client";

import { useState } from "react";
import Button from "@/app/components/ui/button";
import Input from "@/app/components/ui/input";
import { ZoneEntryPost } from "@/lib/client/zone.client.api";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { decodeToken } from "@/utils/client/decode-token.client.util";

export default function ZoneIn({
  zoneId,
  hostId,
}: {
  zoneId: string;
  hostId: string;
}) {
  const jwt = getJwtFromCookie();
  const user = jwt ? decodeToken(jwt) : null;

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  const handleJoin = async () => {
    if (!jwt) {
      return;
    }

    await ZoneEntryPost(zoneId, password, jwt);
    setShowModal(false);
  };

  return (
    <>
      {hostId === user?.memberId && (
        <Button onClick={() => setShowModal(true)}>참가하기</Button>
      )}

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
              <Button variant="secondary" onClick={() => setShowModal(false)}>
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

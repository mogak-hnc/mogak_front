"use client";

import Button from "@/app/components/ui/button";
import { ZoneInOutButtonProps } from "@/types/zone.type";
import {
  decodeToken,
  JwtPayload,
} from "@/utils/client/decode-token.client.util";
import { useEffect, useState } from "react";

export default function ZoneSetting({
  hostId,
  onOpenSetting,
}: ZoneInOutButtonProps & { onOpenSetting: () => void }) {
  const [user, setUser] = useState<String | null>(null);

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    setUser(memberId);
  }, []);

  return (
    <>
      {String(user) === String(hostId) && (
        <Button onClick={onOpenSetting}>모각존 관리</Button>
      )}
    </>
  );
}

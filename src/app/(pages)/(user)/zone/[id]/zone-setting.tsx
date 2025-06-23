"use client";

import Button from "@/app/components/ui/button";
import { ZoneInOutButtonProps } from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import {
  decodeToken,
  JwtPayload,
} from "@/utils/client/decode-token.client.util";
import { useEffect, useState } from "react";

export default function ZoneSetting({
  // zoneId,
  hostId,
  onOpenSetting,
}: ZoneInOutButtonProps & { onOpenSetting: () => void }) {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const jwt = getJwtFromCookie();
    if (!jwt) return;
    const decoded = decodeToken(jwt);
    setUser(decoded);
  }, []);

  return (
    <>
      {String(user?.memberId) === String(hostId) && (
        <Button onClick={onOpenSetting}>모각존 관리</Button>
      )}
    </>
  );
}

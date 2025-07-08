"use client";

import Button from "@/app/components/ui/button";
import { useAuthStore } from "@/store/authStore";
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
  const [user, setUser] = useState<JwtPayload | null>(null);

  const { jwt } = useAuthStore();
  useEffect(() => {
    if (!jwt) {
      return;
    }
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

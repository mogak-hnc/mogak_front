"use client";

import Button from "@/app/components/ui/button";
import { ZoneInOutButtonProps } from "@/types/zone.type";
import { useEffect, useState } from "react";

export default function ZoneSetting({
  hostId,
  onOpenSetting,
}: ZoneInOutButtonProps & { onOpenSetting: () => void }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    setUser(memberId);
  }, []);

  return (
    <>
      {String(user) === String(hostId) && (
        <Button
          onClick={() => {
            console.log("모각존 관리 버튼 클릭");
            onOpenSetting();
          }}
        >
          모각존 관리
        </Button>
      )}
    </>
  );
}

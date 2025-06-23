"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ZoneDetailResponse } from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import { ZoneDetail } from "@/lib/client/zone.client.api";

const SpaceSetting = dynamic(() => import("./(setting)/zone-space-setting"));
const MemberSetting = dynamic(() => import("./(setting)/zone-member-setting"));

export default function SettingModal({
  zoneId,
  onClose,
}: {
  zoneId: string;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"space" | "member">("space");
  const [data, setData] = useState<ZoneDetailResponse | null>(null);

  useEffect(() => {
    (async () => {
      const jwt = getJwtFromCookie();
      const res = await ZoneDetail(zoneId, jwt);
      setData(res);
    })();
  }, [zoneId]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[700px] max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">모각존 설정</h2>
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-4 mb-6 border-b pb-2">
          <button
            onClick={() => setTab("space")}
            className={`text-sm font-medium ${
              tab === "space" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            모각존 관리
          </button>
          <button
            onClick={() => setTab("member")}
            className={`text-sm font-medium ${
              tab === "member" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            멤버 관리
          </button>
        </div>

        {data && tab === "space" && <SpaceSetting data={data} />}
        {data && tab === "member" && (
          <MemberSetting data={data.zoneMemberInfoList} />
        )}
      </div>
    </div>
  );
}

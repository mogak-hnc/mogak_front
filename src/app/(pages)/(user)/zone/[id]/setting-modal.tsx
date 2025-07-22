"use client";

import { ZoneDetailResponse } from "@/types/zone.type";
import { useEffect, useState } from "react";
import ZoneSpaceSetting from "./(setting)/zone-space-setting";
import ZoneMemberSetting from "./(setting)/zone-member-setting";

export default function SettingModal({
  zoneId,
  data,
  onClose,
  onImageUpdate,
}: {
  zoneId: string;
  data: ZoneDetailResponse;
  onClose: () => void;
  onImageUpdate: (url: string) => void;
}) {
  const [tab, setTab] = useState<"space" | "member">("space");

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

        {tab === "space" && (
          <ZoneSpaceSetting
            zoneId={zoneId}
            data={data}
            onImageUpdate={onImageUpdate}
          />
        )}
        {tab === "member" && (
          <ZoneMemberSetting memberData={data.zoneMemberInfoList} />
        )}
      </div>
    </div>
  );
}

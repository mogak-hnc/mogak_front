"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { ChallengeForm } from "@/types/challenge.type";
import { adminBadgeList } from "@/lib/client/badge.client.api";
import { AdminBadgeProps } from "@/types/admin.type";

type Props = {
  form: UseFormReturn<ChallengeForm>;
};

export default function BadgeSelector({ form }: Props) {
  const { setValue, watch } = form;

  const [badgeList, setBadgeList] = useState<AdminBadgeProps[]>([]);

  useEffect(() => {
    const loadBadges = async () => {
      const badges = await adminBadgeList();
      if (badges) setBadgeList(badges);
    };
    loadBadges();
  }, []);

  const selectedId = watch("badgeId");

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-3 justify-center">
        {badgeList.map((badge) => (
          <button
            key={badge.badgeId}
            type="button"
            onClick={() => setValue("badgeId", String(badge.badgeId))}
            className={`border rounded px-2 pt-2 pb-1 flex flex-col items-center transition
            w-20 h-24
            ${
              selectedId === String(badge.badgeId)
                ? "border-primary ring-2 ring-primary"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <div className="h-[40px] flex items-center justify-center">
              <Image
                src={badge.iconUrl}
                alt={badge.name}
                width={32}
                height={32}
                className="rounded"
              />
            </div>
            <span className="text-xs text-center mt-1 leading-none">
              {badge.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

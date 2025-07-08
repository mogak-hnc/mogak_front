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
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

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
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-3 gap-4">
        {badgeList.map((badge) => (
          <button
            key={badge.badgeId}
            type="button"
            onClick={() => setValue("badgeId", String(badge.badgeId))}
            className={`border rounded p-2 flex flex-col items-center gap-1 transition
              ${
                String(selectedId) === String(badge.badgeId)
                  ? "border-primary ring-2 ring-primary"
                  : "border-gray-300 hover:border-gray-400"
              }`}
          >
            <Image
              src={badge.iconUrl}
              alt={badge.name}
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-sm">{badge.name}</span>
          </button>
        ))}
      </div>
      {errors.badgeId && (
        <p className="text-error text-sm mt-1">{errors.badgeId.message}</p>
      )}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ZoneCreateForm from "./zone-create-form";
import { useZoneCreateForm } from "./use-zone-create-form";
import { ZoneCreateInput } from "@/types/zone.type";
import { ZoneCreatePost } from "@/lib/client/zone.client.api";

export default function ZoneCreatePage() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);
  const form = useZoneCreateForm();

  const createZoneSubmit = async (data: ZoneCreateInput) => {
    try {
      const res = await ZoneCreatePost(data, photo ?? undefined);
      router.push(`/zone/detail/${res.mogakZoneId}`);
    } catch (err) {
      console.error("모각존 생성 실패", err);
    }
  };

  return (
    <ZoneCreateForm
      form={form}
      onSubmit={form.handleSubmit(createZoneSubmit)}
      photo={photo}
      setPhoto={setPhoto}
    />
  );
}

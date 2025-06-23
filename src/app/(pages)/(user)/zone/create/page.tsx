"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ZoneCreateForm from "./zone-create-form";
import { useZoneCreateForm } from "./use-zone-create-form";
import { ZoneCreateInput } from "@/types/zone.type";
import { ZoneCreatePost, ZoneEntryPost } from "@/lib/client/zone.client.api";
import Loading from "@/app/loading";

export default function ZoneCreatePage() {
  const router = useRouter();

  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useZoneCreateForm();

  const createZoneSubmit = async (data: ZoneCreateInput) => {
    try {
      setIsLoading(true);
      const res = await ZoneCreatePost(data, photo ?? undefined);
      await ZoneEntryPost(res.mogakZoneId, data.password);
      router.push(`/zone/${res.mogakZoneId}`);
    } catch (err) {
      console.error("모각존 생성 실패", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ZoneCreateForm
        form={form}
        onSubmit={form.handleSubmit(createZoneSubmit)}
        photo={photo}
        setPhoto={setPhoto}
      />
    </>
  );
}

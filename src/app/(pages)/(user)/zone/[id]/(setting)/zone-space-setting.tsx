"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import FormField from "@/app/components/shared/form-field";
import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import ConfirmModal from "@/app/components/confirm-modal";
import SubTitle from "@/app/components/shared/sub-title";
import { ZoneDetailResponse, ZoneSettingProps } from "@/types/zone.type";
import { ZoneDelete, ZonePut } from "@/lib/client/zone.client.api";
import { useRouter } from "next/navigation";

export default function ZoneSpaceSetting({
  zoneId,
  data,
  onImageUpdate,
}: {
  zoneId: string;
  data: ZoneDetailResponse;
  onImageUpdate: (url: string) => void;
}) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const { register, handleSubmit } = useForm<ZoneSettingProps>({
    defaultValues: {
      spaceName: data.name,
    },
  });

  const onSubmit = async () => {
    if (!photo) {
      return;
    }

    try {
      await ZonePut(zoneId, photo);
      const newUrl = photo && URL.createObjectURL(photo);
      onImageUpdate(newUrl);
    } catch (err) {
      console.error("모각존 수정 실패:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await ZoneDelete(Number(zoneId));
      router.push("/zone");
    } catch (err) {
      console.log(`모각존 삭제 실패 : `, err);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto px-4 flex flex-col gap-4"
    >
      <SubTitle contents="모각존 관리" />

      <FormField label="모각존 이름">
        <Input {...register("spaceName", { required: true })} disabled />
      </FormField>

      <FormField label="모각존 사진">
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <p className="text-xs text-border-dark dark:text-borders mt-1">
          {photo ? photo.name : "파일이 선택되지 않았습니다."}
        </p>
      </FormField>

      <div className="flex gap-2 mt-4">
        <Button type="submit">저장</Button>
        <Button variant="danger" onClick={() => setShowModal(true)}>
          모각존 삭제하기
        </Button>
      </div>

      {showModal && (
        <ConfirmModal
          message="정말로 이 모각존을 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </form>
  );
}

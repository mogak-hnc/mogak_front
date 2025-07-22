"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import FormField from "@/app/components/shared/form-field";
import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";
import Button from "@/app/components/ui/button";
import ConfirmModal from "@/app/components/confirm-modal";
import SubTitle from "@/app/components/shared/sub-title";
import { ZoneDetailResponse, ZoneSettingProps } from "@/types/zone.type";

export default function ZoneSpaceSetting({
  data,
}: {
  data: ZoneDetailResponse;
}) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ZoneSettingProps>({
    defaultValues: {
      spaceName: data.name,
      tag: data.tagNames[0],
      usePassword: data.passwordRequired,
    },
  });

  const usePassword = watch("usePassword");

  const onSubmit = (data: ZoneSettingProps) => {
    console.log("저장된 값:", data, photo);
  };

  const handleDelete = () => {
    console.log("모각존 삭제 완료");
    setShowModal(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto px-4 flex flex-col gap-4"
    >
      <SubTitle contents="모각존 관리" />

      <FormField label="모각존 이름">
        <Input {...register("spaceName", { required: true })} />
      </FormField>

      <FormField label="모각존 태그">
        <Input {...register("tag")} />
      </FormField>

      <FormField label="모각존 사진">
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {photo ? photo.name : "파일이 선택되지 않았습니다."}
        </p>
      </FormField>

      <FormField label="비밀번호 관리">
        <div className="flex items-center gap-4">
          <Checkbox label="비밀번호 사용하기" {...register("usePassword")} />
          <Input
            placeholder="4글자 비밀번호"
            type="password"
            {...register("password", {
              validate: (value) => {
                if (usePassword && value.length !== 4) {
                  return "비밀번호는 네 글자로 입력해 주세요.";
                }
                return true;
              },
            })}
            disabled={!usePassword}
            className={`w-40 ${
              usePassword && `bg-white dark:bg-border-dark px-5 py-1 rounded-md`
            }`}
          />
        </div>
        {errors.password && (
          <p className="text-error dark:text-error-dark text-sm">
            {errors.password.message}
          </p>
        )}
      </FormField>

      <div className="flex gap-2 mt-4">
        <Button type="submit">저장</Button>
        <Button type="reset">초기화</Button>
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

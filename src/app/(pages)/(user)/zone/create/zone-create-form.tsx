"use client";

import { UseFormReturn } from "react-hook-form";
import { ZoneFormInputs } from "./use-zone-create-form";
import FormField from "@/app/components/shared/form-field";
import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";
import Button from "@/app/components/ui/button";
import H1Title from "@/app/components/ui/h1-title";

type Props = {
  form: UseFormReturn<ZoneFormInputs>;
  onSubmit: () => void;
  photo: File | null;
  setPhoto: (file: File | null) => void;
};

export default function ZoneCreateForm({
  form,
  onSubmit,
  photo,
  setPhoto,
}: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;
  const usePassword = watch("usePassword");

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-[500px] mx-auto px-4 flex flex-col gap-4"
    >
      <H1Title>모각존 만들기</H1Title>

      <FormField label="모각존 이름">
        <Input
          {...register("spaceName", {
            required: "모각존 이름을 입력해 주세요",
            minLength: { value: 2, message: "2글자 이상 입력해 주세요" },
          })}
        />
        {errors.spaceName && (
          <p className="text-red-500 text-sm">{errors.spaceName.message}</p>
        )}
      </FormField>

      <FormField label="모각존 태그">
        <Input placeholder="카페" {...register("tag")} />
      </FormField>

      <FormField label="인원 수">
        <Input
          type="number"
          {...register("capacity", {
            required: "인원 수를 입력해 주세요",
            valueAsNumber: true,
            min: { value: 1, message: "최소 1명 이상이어야 합니다" },
          })}
        />
        {errors.capacity && (
          <p className="text-red-500 text-sm">{errors.capacity.message}</p>
        )}
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
            type="password"
            {...register("password", {
              validate: (value) =>
                !usePassword ||
                value.length >= 4 ||
                "비밀번호는 최소 4자 이상이어야 합니다",
            })}
            disabled={!usePassword}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </FormField>

      <FormField label="채팅 가능 여부">
        <Checkbox label="채팅 사용하기" {...register("useChat")} />
      </FormField>

      <FormField label="참여 조건">
        <Checkbox label="회원만 참여 가능" {...register("memberOnly")} />
      </FormField>

      <FormField label="모각존 기간">
        <div className="flex items-center gap-2">
          <Input type="date" {...register("startDate")} className="w-40" />
          <span className="text-sm">~</span>
          <Input type="date" {...register("endDate")} className="w-40" />
        </div>
      </FormField>

      <Button type="submit">저장</Button>
    </form>
  );
}

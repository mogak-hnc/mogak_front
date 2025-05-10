"use client";

import { useForm } from "react-hook-form";
import FormField from "@/app/Component/shared/form-field";
import Checkbox from "@/app/Component/ui/checkbox";
import Input from "@/app/Component/ui/input";
import Button from "@/app/Component/ui/button";
import { useState } from "react";
import H1Title from "@/app/Component/ui/h1-title";
import { ZoneFormProps } from "@/types";
import { ZoneCreatePost } from "@/lib/zone.api";
import { useRouter } from "next/navigation";

export default function ZoneCreate() {
  const router = useRouter();
  const [photo, setPhoto] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ZoneFormProps>({
    defaultValues: {
      spaceName: "",
      tag: "",
      capacity: 3,
      password: "",
      usePassword: false,
      useChat: true,
      memberOnly: false,
      startDate: "2024-06-10",
      endDate: "2024-06-10",
    },
  });

  const createZoneSubmit = async (data: ZoneFormProps) => {
    const res = await ZoneCreatePost(data);
    router.push(`/advice/detail/${res.mogakZoneId}`);
  };

  const usePassword = watch("usePassword");

  return (
    <form
      onSubmit={handleSubmit(createZoneSubmit)}
      className="max-w-[500px] mx-auto px-4 flex flex-col gap-4"
    >
      <H1Title>모각존 만들기</H1Title>

      <FormField label="모각존 이름">
        <Input placeholder="카공해요" {...register("spaceName")} />
      </FormField>

      <FormField label="모각존 태그">
        <Input placeholder="카페" {...register("tag")} />
      </FormField>

      <FormField label="인원 수">
        <Input
          type="number"
          {...register("capacity", { valueAsNumber: true })}
        />
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
            {...register("password")}
            disabled={!usePassword}
            className={`w-40 ${
              usePassword && `bg-white px-5 py-1 rounded-md`
            } `}
          />
        </div>
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

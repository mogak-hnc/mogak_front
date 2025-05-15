"use client";

import { UseFormReturn } from "react-hook-form";
import FormField from "@/app/components/shared/form-field";
import Input from "@/app/components/ui/input";
import Checkbox from "@/app/components/ui/checkbox";
import Button from "@/app/components/ui/button";
import H1Title from "@/app/components/ui/h1-title";
import { ZoneCreateInput } from "@/types/zone.type";

type Props = {
  form: UseFormReturn<ZoneCreateInput>;
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
          placeholder="모각존1"
          {...register("spaceName", {
            required: "모각존 이름을 입력해 주세요.",
            minLength: { value: 2, message: "2글자 이상 입력해 주세요." },
          })}
        />
        {errors.spaceName && (
          <p className="text-error text-sm">{errors.spaceName.message}</p>
        )}
      </FormField>

      <FormField label="모각존 태그">
        <Input placeholder="기타" {...register("tag")} />
      </FormField>

      <FormField label="인원 수">
        <Input
          type="number"
          {...register("capacity", {
            required: "인원 수를 입력해 주세요.",
            valueAsNumber: true,
            min: { value: 2, message: "두 명 이상으로 입력해 주세요." },
          })}
        />
        {errors.capacity && (
          <p className="text-error text-sm">{errors.capacity.message}</p>
        )}
      </FormField>

      <FormField label="모각존 사진">
        <input
          type="file"
          onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        <p className="text-xs text-borders-500 mt-1">
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
          <p className="text-error text-sm">{errors.password.message}</p>
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
          <Input
            type="date"
            {...register("startDate", {
              validate: (value) => {
                const today = new Date();
                today.setDate(today.getDate() + 1);
                const start = new Date(value);
                if (start < today) {
                  return "시작일은 내일부터 가능해요.";
                }
                return true;
              },
            })}
            className="w-40"
          />
          <span className="text-sm">~</span>
          <Input
            type="date"
            {...register("endDate", {
              validate: (endValue) => {
                const startValue = watch("startDate");
                if (!startValue) return "시작일을 먼저 입력해 주세요.";
                const start = new Date(startValue);
                const end = new Date(endValue);
                if (end <= start) {
                  return "종료일은 시작일 이후여야 합니다.";
                }
                const diffDays =
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
                if (diffDays > 28) {
                  return "시작일로부터 최대 28일까지 설정할 수 있어요.";
                }
                return true;
              },
            })}
            className="w-40"
          />
        </div>

        {(errors.startDate || errors.endDate) && (
          <div className="text-error text-sm mt-1">
            {errors.startDate?.message || errors.endDate?.message}
          </div>
        )}
      </FormField>

      <Button type="submit">저장</Button>
    </form>
  );
}

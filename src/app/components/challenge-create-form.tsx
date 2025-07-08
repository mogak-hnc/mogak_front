"use client";

import Input from "@/app/components/ui/input";
import Button from "@/app/components/ui/button";
import FormField from "@/app/components/shared/form-field";
import { UseFormReturn } from "react-hook-form";
import { ChallengeForm } from "@/types/challenge.type";
import SubTitle from "./shared/sub-title";
import BadgeSelector from "../(pages)/admin/challenge/badge-selector";

type Props = {
  form: UseFormReturn<ChallengeForm>;
  isAdmin?: boolean;
  onSubmit: (data: ChallengeForm) => void;
};

export default function ChallengeCreateForm({
  form,
  isAdmin = false,
  onSubmit,
}: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-[500px] mx-auto mt-10 px-4 flex flex-col gap-4"
    >
      <SubTitle contents={isAdmin ? "공식 챌린지 생성" : "챌린지 만들기"} />

      <FormField label="챌린지 이름">
        <Input
          placeholder="카공해요"
          {...register("name", {
            required: "챌린지 이름을 입력해 주세요.",
            minLength: { value: 2, message: "2글자 이상 입력해 주세요." },
          })}
        />
        {errors.name && (
          <p className="text-error text-sm">{errors.name.message}</p>
        )}
      </FormField>

      <FormField label="챌린지 설명">
        <Input placeholder="매일매일 공부해요!" {...register("description")} />
      </FormField>

      <FormField label="모각존 기간">
        <div className="flex items-center gap-2">
          <Input
            type="date"
            {...register("startDate", {
              validate: (value) => {
                const today = new Date();
                const tomorrow = new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 1
                );
                const start = new Date(value);

                if (start < tomorrow) {
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

                const diffDays = Math.floor(
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
                );

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
          <p className="text-error dark:text-error-dark text-sm mt-1">
            {errors.startDate?.message || errors.endDate?.message}
          </p>
        )}
      </FormField>

      {isAdmin && (
        <FormField label="뱃지 선택">
          <BadgeSelector form={form} />
        </FormField>
      )}

      <Button type="submit">저장</Button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import ChallengeCreateForm from "@/app/components/challenge-create-form";
import { ChallengeForm } from "@/types/challenge.type";

export default function AdminChallengeCreatePage() {
  const form = useForm<ChallengeForm>();

  return (
    <ChallengeCreateForm
      form={form}
      isAdmin
      onSubmit={(data) => {
        console.log("관리자 챌린지 생성:", data);
        alert("공식 챌린지 생성 완료!");
      }}
    />
  );
}

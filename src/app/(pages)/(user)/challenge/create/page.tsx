"use client";

import ChallengeCreateForm from "@/app/components/challenge-create-form";
import { useChallengeForm } from "@/app/components/use-challenge-form";
import { ChallengeForm } from "@/types/challenge.type";

export default function ChallengeCreatePage() {
  const form = useChallengeForm();

  const handleSubmit = (data: ChallengeForm) => {
    console.log("챌린지 생성:", {
      ...data,
      isOfficial: true,
    });
  };

  return (
    <ChallengeCreateForm
      form={form}
      isAdmin={true}
      onSubmit={form.handleSubmit(handleSubmit)}
    />
  );
}

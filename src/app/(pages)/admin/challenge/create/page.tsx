"use client";

import ChallengeCreateForm from "@/app/components/challenge-create-form";
import { ChallengeForm } from "@/types/challenge.type";
import { useChallengeForm } from "@/app/components/use-challenge-form";
import { useRouter } from "next/navigation";
import { ChallengeCreatePost } from "@/lib/client/challenge.client.api";

export default function AdminChallengeCreatePage() {
  const form = useChallengeForm();
  const router = useRouter();

  const handleSubmit = async (data: ChallengeForm) => {
    const res = await ChallengeCreatePost(data);
    router.push(`/challenge/detail/${res.challengeId}`);
  };

  return (
    <ChallengeCreateForm
      form={form}
      isAdmin
      onSubmit={(data) => handleSubmit(data)}
    />
  );
}

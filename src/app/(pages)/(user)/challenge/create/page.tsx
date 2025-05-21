"use client";

import ChallengeCreateForm from "@/app/components/challenge-create-form";
import { useChallengeForm } from "@/app/components/use-challenge-form";
import { ChallengeCreatePost } from "@/lib/client/challenge.client.api";
import { ChallengeForm } from "@/types/challenge.type";
import { useRouter } from "next/navigation";

export default function ChallengeCreatePage() {
  const form = useChallengeForm();
  const router = useRouter();

  const handleSubmit = async (data: ChallengeForm) => {
    const res = await ChallengeCreatePost(data);
    router.push(`/challenge/${res.challengeId}`);
  };

  return (
    <ChallengeCreateForm
      form={form}
      isAdmin={false}
      onSubmit={(data) => handleSubmit(data)}
    />
  );
}

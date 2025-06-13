"use client";

import ChallengeCreateForm from "@/app/components/challenge-create-form";
import { useChallengeForm } from "@/app/components/use-challenge-form";
import Loading from "@/app/loading";
import { ChallengeCreatePost } from "@/lib/client/challenge.client.api";
import { ChallengeForm } from "@/types/challenge.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChallengeCreatePage() {
  const form = useChallengeForm();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (data: ChallengeForm) => {
    try {
      setIsLoading(true);
      const res = await ChallengeCreatePost(data);
      router.push(`/challenge/${res.challengeId}`);
    } catch (err) {
      console.log("챌린지 생성 실패 : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ChallengeCreateForm
      form={form}
      isAdmin={false}
      onSubmit={(data) => handleSubmit(data)}
    />
  );
}

"use client";

import ChallengeCreateForm from "@/app/Component/challenge-create-form";

export default function AdminChallengeCreatePage() {
  return (
    <ChallengeCreateForm
      isAdmin
      onSubmit={(data) => {
        console.log("관리자 챌린지 생성:", data);
        alert("공식 챌린지 생성 완료!");
      }}
    />
  );
}

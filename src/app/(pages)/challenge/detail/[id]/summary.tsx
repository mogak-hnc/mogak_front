"use client";

import Button from "@/app/Component/ui/button";

export default function Summary({ challengeId }: { challengeId: string }) {
  return (
    <div className="flex flex-col gap-6 p-6 rounded-md border border-borders dark:border-border-dark">
      <Button>참가하기</Button>

      <p className="text-sm text-border-dark dark:text-borders">
        이 챌린지를 완수하면 ●●● 뱃지를 획득해요!
      </p>

      <div className="border-t border-borders dark:border-border-dark pt-4">
        <h4 className="font-bold text-primary mb-2">진행률</h4>
      </div>

      <div className="border-t border-borders dark:border-border-dark pt-4">
        <h4 className="font-bold text-primary mb-2">생존자 비율</h4>
      </div>

      <div className="border-t border-borders dark:border-border-dark pt-4">
        <h4 className="font-bold text-primary mb-2">인증하기</h4>
        <input type="file" className="text-sm" />
        <Button>등록하기</Button>
      </div>
    </div>
  );
}

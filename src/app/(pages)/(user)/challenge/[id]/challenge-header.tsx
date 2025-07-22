import ConfirmModal from "@/app/components/confirm-modal";
import Button from "@/app/components/ui/button";
import { ChallengeDelete } from "@/lib/client/challenge.client.api";
import { ChallengeHeaderProps } from "@/types/challenge.type";
import { challengeMap } from "@/utils/shared/status.util";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChallengeHeader({
  challengeId,
  title,
  challengeOwnerId,
  startDate,
  endDate,
  official,
  totalParticipants,
  status,
}: ChallengeHeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const memberId = localStorage.getItem("memberId");

  const deleteChallenge = async () => {
    try {
      await ChallengeDelete(challengeId);
      router.push(`/challenge`);
    } catch (err) {
      console.log(`챌린지 삭제 실패 : `, err);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        {official && (
          <span className="text-xs text-primary font-semibold">
            공식 챌린지
          </span>
        )}
        <p>{challengeMap[status]}</p>
        <h2 className="text-2xl font-bold text-primary mt-1">{title}</h2>
        <p className="text-sm text-border-dark dark:text-borders mt-1">
          {startDate}&nbsp;~&nbsp;{endDate}&nbsp;·&nbsp;{totalParticipants}명
        </p>
      </div>
      {String(memberId) === String(challengeOwnerId) && (
        <Button onClick={() => setShowModal(true)} variant="danger">
          챌린지 삭제하기
        </Button>
      )}
      {showModal && (
        <ConfirmModal
          message={`${title} 챌린지를 정말 삭제할까요?`}
          onCancel={() => setShowModal(false)}
          onConfirm={deleteChallenge}
        ></ConfirmModal>
      )}
    </div>
  );
}

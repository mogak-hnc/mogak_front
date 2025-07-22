import Button from "@/app/components/ui/button";
import { ChallengeHeaderProps } from "@/types/challenge.type";
import { challengeMap } from "@/utils/shared/status.util";

export default function ChallengeHeader({
  title,
  challengeOwnerId,
  startDate,
  endDate,
  official,
  totalParticipants,
  status,
}: ChallengeHeaderProps) {
  const memberId = localStorage.getItem("memberId");

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
        <Button variant="secondary">챌린지 관리</Button>
      )}
    </div>
  );
}

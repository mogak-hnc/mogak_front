import Button from "@/app/components/ui/button";
import { ChallengeHeaderProps } from "@/types/challenge.type";

export default function ChallengeHeader({
  title,
  description,
  creatorMemberId,
  startDate,
  endDate,
  official,
}: ChallengeHeaderProps) {
  const userId = 1;
  return (
    <div className="flex items-center justify-between">
      <div>
        {/* {isOfficial && (
          <span className="text-xs text-primary font-semibold">
            공식 챌린지
          </span>
        )} */}
        <h2 className="text-2xl font-bold text-primary mt-1">{title}</h2>
        <p className="text-sm text-border-dark dark:text-borders mt-1">
          {startDate}&nbsp;~&nbsp;{endDate}
          {/* · {memberCount}명 */}
        </p>
      </div>
      {userId === creatorMemberId && (
        <Button variant="secondary">챌린지 관리</Button>
      )}
    </div>
  );
}

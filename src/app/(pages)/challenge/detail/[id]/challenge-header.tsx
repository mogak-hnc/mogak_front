interface ChallengeHeaderProps {
  isOfficial: boolean;
  title: string;
  period: string;
  memberCount: number;
  showManageButton?: boolean;
}

export default function ChallengeHeader({
  isOfficial,
  title,
  period,
  memberCount,
  showManageButton = true,
}: ChallengeHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {isOfficial && (
          <span className="text-xs text-primary font-semibold">
            공식 챌린지
          </span>
        )}
        <h2 className="text-2xl font-bold text-primary mt-1">{title}</h2>
        <p className="text-sm text-border-dark dark:text-borders mt-1">
          {period} · {memberCount}명
        </p>
      </div>
      {showManageButton && (
        <button className="px-3 py-1 bg-yellow-400 text-white rounded">
          챌린지 관리
        </button>
      )}
    </div>
  );
}

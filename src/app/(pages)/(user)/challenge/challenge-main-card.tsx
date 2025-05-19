import { ChallengeMainProps } from "@/types/challenge.type";
import Link from "next/link";

export default function ChallengeMainCard({
  challengeId,
  title,
  description,
  participants,
  isOfficial,
}: ChallengeMainProps) {
  return (
    <Link href={`/challenge/detail/${challengeId}`}>
      <div className="rounded-3xl p-4 shadow-md bg-white flex flex-col justify-between min-w-[280px] max-w-[320px] h-[180px]">
        <div className="space-y-1">
          {isOfficial && (
            <span className="text-xs text-primary font-semibold">
              공식 챌린지
            </span>
          )}
          <p className="text-lg font-bold text-text truncate">{title}</p>
          {description && (
            <p className="text-sm text-text truncate">{description}</p>
          )}
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex -space-x-2">
            {participants?.slice(0, 3).map((src, i) => (
              <img
                key={i}
                src={src!}
                className="w-6 h-6 rounded-full border-2 border-white object-cover"
                alt={`participant-${i}`}
              />
            ))}
            {participants && participants.length > 3 && (
              <span className="text-xs ml-2">+{participants.length - 3}</span>
            )}
          </div>
          <span className="text-yellow-500 text-sm">➡️ 참가하기</span>
        </div>
      </div>
    </Link>
  );
}

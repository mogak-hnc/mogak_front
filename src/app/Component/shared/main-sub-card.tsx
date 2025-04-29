import { MainSubCardProps } from "@/types";
import Link from "next/link";

export default function MainSubCard({
  type,
  tag,
  title,
  participants,
  description,
  isOfficial,
}: MainSubCardProps) {
  return (
    <Link
      href={type === "studySpace" ? `/zone/detail/1` : `/challenge/detail/1`}
    >
      <div className="rounded-3xl p-4 shadow-md bg-white dark:bg-border-dark flex flex-col justify-between min-w-[280px] max-w-[320px] h-[180px]">
        <div className="space-y-1">
          <div className="flex gap-2 items-center">
            {isOfficial && type === "challenge" && (
              <span className="text-xs text-primary dark:text-primary-dark font-semibold">
                공식 챌린지
              </span>
            )}

            {type === "studySpace" && tag && (
              <span className="bg-secondary dark:bg-secondary-dark text-text font-bold px-2 py-0.5 rounded">
                {tag}
              </span>
            )}
          </div>

          <p className="text-lg font-bold text-text dark:text-text-dark truncate">
            {title}
          </p>

          {type === "challenge" && description && (
            <p className="text-sm text-text dark:text-text-dark truncate">
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex -space-x-2">
            {participants
              .filter((src) => src)
              .slice(0, 3)
              .map((src, i) => (
                <img
                  key={i}
                  src={src!}
                  className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  alt={`participant-${i}`}
                />
              ))}
            {participants.length > 3 && (
              <span className="text-xs ml-2">+{participants.length - 3}</span>
            )}
          </div>

          <button className="flex items-center gap-1 text-yellow-500 font-medium text-sm">
            <span>➡️</span>
            <span>참가하기</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

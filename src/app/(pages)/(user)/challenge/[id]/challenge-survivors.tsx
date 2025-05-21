import { ChallengeSurvivorsProps } from "@/types/challenge.type";
import { getProfileImage } from "@/utils/shared/profile.util";

export default function ChallengeSurvivors({
  avatars,
  extraCount = 0,
}: ChallengeSurvivorsProps) {
  return (
    <div>
      <h3 className="font-semibold text-primary dark:text-primary-dark mb-2">
        생존자
      </h3>
      <div className="flex items-center gap-2">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={getProfileImage(src)}
            alt={`avatar-${i}`}
            className="w-10 h-10 rounded-full border text-border-dark dark:text-borders object-cover"
          />
        ))}
        {extraCount > 0 && (
          <span className="text-sm text-border-dark dark:text-borders">
            + {extraCount}명
          </span>
        )}
      </div>
    </div>
  );
}

type StatusType = "공부 중" | "자리비움" | "오프라인";

export interface ZoneCardProps {
  id: number;
  image: string;
  nickname: string;
  role?: string;
  state: StatusType;
}

const statusColorMap: Record<StatusType, string> = {
  "공부 중":
    "text-primary dark:text-primary-dark border-primary dark:border-primary-dark",
  자리비움:
    "text-secondary dark:text-secondary-dark border-secondary dark:border-secondary-dark",
  오프라인:
    "text-borders dark:text-border-dark border-borders dark:border-border-dark",
};

export default function ZoneCard({
  image,
  nickname,
  role,
  state,
}: ZoneCardProps) {
  return (
    <div className="flex items-center p-4 w-fit">
      <img
        src={image}
        alt="profile"
        className={`w-20 h-20 rounded-full border-2 object-cover ${statusColorMap[state]}`}
      />
      <div className="ml-4 flex flex-col justify-center">
        <p className="text-lg font-semibold ">{nickname}</p>
        {role && (
          <p className="text-sm text-border-dark dark:text-borders">{role}</p>
        )}
        <div
          className={`flex items-center gap-1 mt-1 text-sm font-medium ${statusColorMap[state]}`}
        >
          <span>✪</span>
          <span>{state}</span>
        </div>
      </div>
    </div>
  );
}

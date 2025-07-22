import { ZoneHeaderProps, ZoneInOutButtonProps } from "@/types/zone.type";
import { getDetailImage } from "@/utils/shared/detail-image.util";
import ZoneSetting from "./zone-setting";
import ZoneInOut from "./zone-in-out";

export default function ZoneHeader({
  zoneId,
  tag,
  name,
  hostId,
  joinedUserCount,
  imageUrl,
  joined,
  hasPwd,
  maxCapacity,
  onJoinSuccess,
  onOpenSetting,
}: ZoneHeaderProps & { onOpenSetting: () => void }) {
  const props: ZoneInOutButtonProps = {
    joined: joined,
    zoneId: zoneId,
    hostId: hostId,
  };

  return (
    <div
      className="relative w-full min-h-[180px] rounded-xl bg-no-repeat bg-cover bg-center dark:bg-none overflow-hidden flex flex-col justify-center mb-6"
      style={{
        backgroundImage: `url(${getDetailImage(imageUrl)})`,
      }}
    >
      <div className="hidden dark:block absolute inset-0 bg-background-dark/80 z-0" />

      <div className="relative z-10 px-6">
        <div className="flex gap-3">
          {tag.map((t, index) => (
            <span
              key={index}
              className="block text-primary dark:text-primary text-xl mb-1"
            >
              #{t}
            </span>
          ))}
        </div>
        <span className="block text-primary dark:text-primary font-bold text-2xl mb-2">
          {name}
        </span>
        <div className="flex items-center gap-1 text-sm">
          <svg
            className="w-4 h-4 text-primary dark:text-primary-dark"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM2 18a8 8 0 1116 0H2z" />
          </svg>
          <span
            className={`block my-2 text-sm ${
              joinedUserCount === maxCapacity
                ? "text-error dark:text-error-dark font-bold"
                : "text-border-dark dark:text-borders"
            }`}
          >
            {joinedUserCount} / {maxCapacity}명
          </span>
        </div>

        <div className="flex gap-2">
          <ZoneSetting {...props} onOpenSetting={() => onOpenSetting()} />
          <ZoneInOut
            {...props}
            hasPwd={hasPwd}
            max={joinedUserCount === maxCapacity}
            joinedUserCount={joinedUserCount}
            onJoinSuccess={(b) => onJoinSuccess(b)}
          />
        </div>
      </div>
    </div>
  );
}

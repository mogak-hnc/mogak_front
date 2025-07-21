import UserCardSkeleton from "@/app/components/skeleton/shared/user-card-skeleton";
import ZoneHeaderSkeleton from "@/app/components/skeleton/zone/zone-header-skeleton";

export default function Loading() {
  return (
    <div className="flex gap-4">
      <div className="w-[65%] flex flex-col gap-4">
        <ZoneHeaderSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <UserCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

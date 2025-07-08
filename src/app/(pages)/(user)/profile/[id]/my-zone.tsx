import { ProfileZoneResponse } from "@/types/profile.type";
import Link from "next/link";

export default function MyZone({ zones }: { zones: ProfileZoneResponse[] }) {
  if (zones.length === 0) {
    return (
      <div className="bg-white dark:bg-border-dark p-6 rounded-xl shadow text-sm text-gray-500 dark:text-gray-400">
        <h3 className="text-lg font-bold text-primary mb-4">
          참여 중인 모각존
        </h3>
        <div className="text-center">참여 중인 모각존이 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-border-dark p-6 rounded-xl shadow">
      <h3 className="text-lg font-bold text-primary mb-4">참여 중인 모각존</h3>
      {zones.map((zone) => (
        <Link key={zone.zoneId} href={`/zone/${zone.zoneId}`}>
          <p>✶ {zone.name}</p>
        </Link>
      ))}
    </div>
  );
}

import { ProfileZoneResponse } from "@/types/profile.type";

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
      <ul className="space-y-2 list-inside list-disc text-sm text-gray-800 dark:text-gray-300">
        {zones.map((zone, index) => (
          <li key={index}>{zone.name}</li>
        ))}
      </ul>
    </div>
  );
}

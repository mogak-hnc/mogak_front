import { ProfileBadge, ProfileBadgeAll } from "@/lib/server/profile.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";

export default async function MyBadge({ id }: { id: string }) {
  const jwt = await getJwtFromServerCookie();
  const allBadge = await ProfileBadgeAll(jwt);
  const data = await ProfileBadge(id, jwt);

  const ownedBadgeIds = data.map((badge) => badge.badgeId);

  return (
    <div className="bg-white dark:bg-border-dark p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-primary mb-4">보유 뱃지</h3>

      {allBadge.length > 0 ? (
        <div className="grid grid-cols-5 lg:grid-cols-3 gap-4">
          {allBadge.map((badge) => {
            const isOwned = ownedBadgeIds.includes(badge.badgeId);

            return (
              <div key={badge.badgeId} className="relative group w-20 h-20">
                <img
                  src={badge.iconUrl}
                  alt={`badge-${badge.badgeId}`}
                  className={`w-full h-full object-cover rounded-md transition
              ${isOwned ? "" : "grayscale opacity-50"}`}
                />
                <div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
              w-max max-w-[160px] px-2 py-1 rounded bg-gray-800 text-white text-xs
              opacity-0 group-hover:opacity-100 transition whitespace-pre-line z-10"
                >
                  <p>{badge.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-sm">아직 등록된 뱃지가 없습니다.</div>
      )}
    </div>
  );
}

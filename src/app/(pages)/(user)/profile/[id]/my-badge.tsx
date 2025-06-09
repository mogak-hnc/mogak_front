import { ProfileBadge } from "@/lib/server/profile.server.api";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";

export default async function MyBadge() {
  const jwt = await getJwtFromServerCookie();
  const data = await ProfileBadge(jwt);

  return (
    <div className="bg-white dark:bg-border-dark p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-bold text-primary mb-4">보유 뱃지</h3>
      <div className="grid grid-cols-5 lg:grid-cols-3 gap-2">
        {data && data.length > 0 ? (
          data.map((src, i) => (
            <img
              key={i}
              src={src.iconUrl}
              alt={`badge-${i}`}
              className="w-full h-auto object-contain rounded-md"
            />
          ))
        ) : (
          <div className="text-sm text-border-dark dark:text-borders text-center py-4">
            보유한 뱃지가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

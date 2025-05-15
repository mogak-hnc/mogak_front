import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";

export async function ZoneDetail(mogakZoneId: number) {
  const jwt = getJwtFromServerCookie();

  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/zone/${mogakZoneId}/detail`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`#${mogakZoneId}번 모각존 디테일 fetch 실패`);
  }

  const data = await res.json();

  return data;
}

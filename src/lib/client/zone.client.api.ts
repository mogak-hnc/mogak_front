import { ZoneCreateRequest, ZoneCreateResponse } from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export async function ZoneCreatePost(payload: ZoneCreateRequest) {
  const token = getJwtFromCookie();

  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("모각존 생성 실패");
  }

  const data: ZoneCreateResponse = await res.json();

  return data;
}

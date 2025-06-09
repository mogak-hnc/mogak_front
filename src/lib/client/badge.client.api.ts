import { AdminBadgeProps } from "@/types/admin.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export async function adminBadgeList() {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/badge/all`,
    {
      method: "GET",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`뱃지 목록 정보 fetch 실패: ${err}`);
  }

  const data: AdminBadgeProps[] = await res.json();
  return data;
}

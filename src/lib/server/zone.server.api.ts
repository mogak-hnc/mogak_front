import { ZoneDetailResponse } from "@/types/zone.type";

export async function ZoneDetail(id: number, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/zone/${id}/detail`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`#${id}번 모각존 디테일 fetch 실패`);
  }

  const data: ZoneDetailResponse = await res.json();

  return data;
}

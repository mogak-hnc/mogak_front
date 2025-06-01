import { ZoneDetailResponse } from "@/types/zone.type";

export async function ZoneDetail(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/zone/${id}`,
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
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`${id}번 모각존 상세 불러오기 실패: ${res.status}`);
  }

  const data: ZoneDetailResponse = await res.json();

  return data;
}

import { ChallengeDetileResponse } from "@/types/challenge.type";

export async function ChallengeDetail(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/challenge/${id}`,
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
    throw new Error(`${id}번 챌린지 디테일 실패: ${res.status}`);
  }

  const data: ChallengeDetileResponse = await res.json();

  return data;
}

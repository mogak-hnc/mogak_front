import { AdviceDetailResponse } from "@/types/advice.type";
import { getJwtFromServerCookie } from "@/utils/server/jwt.server.util";

export async function AdviceDetail(worryId: string) {
  const token = await getJwtFromServerCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/worry/${worryId}`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("고민글 detail 불러오기 실패");
  }

  const data: AdviceDetailResponse = await res.json();

  return data;
}

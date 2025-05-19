import {
  ChallengeCreateInput,
  ChallengeCreateRequest,
  ChallengeCreateResponse,
} from "@/types/challenge.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export async function ChallengeCreatePost(input: ChallengeCreateInput) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const payload: ChallengeCreateRequest = {
    title: input.name,
    description: input.description,
    period: `${input.startDate}~${input.endDate}`,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/challenge`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("챌린지 생성 실패");
  }

  const data: ChallengeCreateResponse = await res.json();

  return data;
}

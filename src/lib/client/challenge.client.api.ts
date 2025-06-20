import {
  ChallengeCreateInput,
  ChallengeCreateRequest,
  ChallengeCreateResponse,
  ChallengeProofPostRequest,
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
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge`,
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
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 생성 실패: ${res.status}`);
  }

  const data: ChallengeCreateResponse = await res.json();

  return data;
}

export async function ChallengeEntryPost(challengeId: string) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${challengeId}/join`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 참여 실패: ${res.status}`);
  }

  const data: { challengeId: number } = await res.json();

  return data;
}

export async function ChallengeProofPost(payload: ChallengeProofPostRequest) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const formData = new FormData();

  formData.append(
    "request",
    JSON.stringify({
      description: `${payload.title} 챌린지의 오늘 인증을 완료했습니다!`,
      images: payload.images,
    })
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${payload.challengeId}/verification`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 인증 실패: ${res.status}`);
  }

  const data: { articleId: number } = await res.json();

  return data;
}

export async function ChallengeDelete(challengeId: number) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${challengeId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 삭제 실패: ${res.status}`);
  }

  return await res.json();
}

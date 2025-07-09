import {
  ChallengeCreateInput,
  ChallengeCreateRequest,
  ChallengeCreateResponse,
  ChallengeDetileResponse,
  ChallengeProofPostRequest,
  ChallengeProofResponse,
  ChallengeSurvivorsResponse,
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
    badgeId: input.badgeId,
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

  const json = {
    description: `${payload.title} 챌린지의 오늘 인증을 완료했습니다!`,
  };
  const requestBlob = new Blob([JSON.stringify(json)], {
    type: "application/json",
  });
  formData.append("request", requestBlob);
  formData.append("images", payload.images);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${payload.challengeId}/article/verification`,
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

export async function ChallengeDetail(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${id}`,
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

export async function ChallengeProofList(
  id: string,
  jwt: string | null,
  page: number
) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${id}/article?page=${page}&size=10`,
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
    throw new Error(`${id}번 챌린지 인증 로드 실패: ${res.status}`);
  }

  const data: ChallengeProofResponse = await res.json();

  return data;
}

export async function ChallengeSurvivorsList(
  id: string,
  jwt: string | null,
  page: number
) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${id}/members?page=${page}&size=10`,
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
    throw new Error(`${id}번 챌린지 생존자 로드 실패: ${res.status}`);
  }

  const data: ChallengeSurvivorsResponse = await res.json();

  return data;
}

export async function ChallengeSurvivorsToday(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${id}/article/today`,
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
    throw new Error(`${id}번 챌린지 인증 여부 로드 실패: ${res.status}`);
  }

  const data: boolean = await res.json();

  return data;
}

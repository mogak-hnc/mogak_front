import {
  ChallengeCreateInput,
  ChallengeCreateRequest,
  ChallengeCreateResponse,
  ChallengeDetileResponse,
  ChallengeMemberPutRequest,
  ChallengeMemberPutResponse,
  ChallengeProofDetailRequest,
  ChallengeProofDetailResponse,
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

export async function ChallengeDetail(id: string) {
  const jwt = getJwtFromCookie();
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

export async function ChallengeProofList(id: string, page: number) {
  const jwt = getJwtFromCookie();
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

export async function ChallengeSurvivorsList(id: string, page: number) {
  const jwt = getJwtFromCookie();
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

export async function ChallengeSurvivorsToday(id: string) {
  const jwt = getJwtFromCookie();
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

export async function ChallengeOwnerCheck(id: string) {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${id}/owner`,
    {
      method: "GET",
      headers: {
        Authorization: `${jwt}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`${id}번 챌린지 방장 여부 확인 실패: ${res.status}`);
  }

  const data: boolean = await res.json();

  return data;
}

export async function ChallengeMemberPut({
  challengeId,
  targetMemberId,
}: ChallengeMemberPutRequest) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${challengeId}/members/${targetMemberId}/survivor`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 멤버 내보내기 실패: ${res.status}`);
  }

  const data: ChallengeMemberPutResponse = await res.json();

  return data;
}

export async function ChallengeArticleDetail({
  challengeId,
  articleId,
}: ChallengeProofDetailRequest) {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge/${challengeId}/article/${articleId}`,
    {
      method: "GET",
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`${articleId}번 인증 불러오기 실패: ${res.status}`);
  }

  const data: ChallengeProofDetailResponse = await res.json();

  return data;
}

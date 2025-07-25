import {
  ProfileBadgeProps,
  ProfileChallengeResponse,
  ProfileProps,
  ProfileZoneResponse,
} from "@/types/profile.type";

export async function ProfileInfo(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/profile/${id}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`${id}번 유저 정보 불러오기 실패: ${res.status}`);
  }

  const data: ProfileProps = await res.json();

  return data;
}

export async function ProfileZone(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/profile/${id}/zones`,
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
    throw new Error(`${id}번 유저 모각존 정보 불러오기 실패: ${res.status}`);
  }

  const data: ProfileZoneResponse[] = await res.json();

  return data;
}

export async function ProfileChallenge(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/profile/${id}/challenges`,
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
    throw new Error(`${id}번 유저 모각챌 정보 불러오기 실패: ${res.status}`);
  }

  const data: ProfileChallengeResponse[] = await res.json();

  return data;
}

export async function ProfileBadgeAll(jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/badge/all`, {
    method: "GET",
    headers: {
      Authorization: `${jwt}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`뱃지 전체 리스트 정보 불러오기 실패: ${res.status}`);
  }

  const data: ProfileBadgeProps[] = await res.json();

  return data;
}

export async function ProfileBadge(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/profile/${id}/badge`,
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
    throw new Error(`뱃지 정보 불러오기 실패: ${res.status}`);
  }

  const data: ProfileBadgeProps[] = await res.json();

  return data;
}

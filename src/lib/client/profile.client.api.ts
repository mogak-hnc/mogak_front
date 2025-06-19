import { getJwtFromCookie } from "@/utils/client/auth.client.util";
import {
  ProfileInfoResponse,
  ProfileUpdateRequest,
} from "@/types/profile.type";

export async function profileInfo(
  userId: string,
  jwt: string
): Promise<ProfileInfoResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/profile/${userId}`,
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
    throw new Error(`#${userId}번 유저 정보 fetch 실패: ${err}`);
  }

  const data: ProfileInfoResponse = await res.json();
  return data;
}

export async function profilePatch(jwt: string, payload: ProfileUpdateRequest) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const formData = new FormData();

  if (payload.image) {
    formData.append("image", payload.image);
  } else {
    formData.append("image", new Blob());
  }

  const query = new URLSearchParams();
  query.set("nickname", payload.nickname);
  query.set("showBadge", String(payload.showBadge));
  query.set("deleteImage", String(payload.deleteImage));

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_API_URL
    }/api/mogak/profile?${query.toString()}`,
    {
      method: "PUT",
      headers: {
        Authorization: `${jwt}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error("프로필 수정 실패: " + text);
  }

  return await res.json();
}

export async function profileDelete() {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/auth`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!res.ok) {
    throw new Error("회원 탈퇴 실패");
  }

  return await res.json();
}

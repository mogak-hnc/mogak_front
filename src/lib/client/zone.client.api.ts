import { ZoneCreateInput, ZoneCreateRequest } from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export async function ZoneCreatePost(input: ZoneCreateInput, imageFile?: File) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const payload: ZoneCreateRequest = {
    name: input.spaceName,
    tag: input.tag ?? "기타",
    maxCapacity: input.capacity,
    password: input.usePassword ? input.password : "",
    chatEnabled: input.useChat,
  };

  const formData = new FormData();

  const jsonBlob = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("모각존 생성 실패");
  }

  return await res.json();
}

export async function ZoneEntryPost(
  zoneId: string,
  password: string,
  jwt: string
) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone/${zoneId}/join`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({ password }),
    }
  );

  if (!res.ok) {
    throw new Error("모각존 참여 실패");
  }

  return await res.json();
}

export async function ZoneDelete(mogakZoneId: number) {
  // const token = getJwtFromCookie();
  // if (!token) {
  //   throw new Error("JWT 토큰 없음 / 로그인 필요");
  // }
  // const res = await fetch(`${process.env.BACKEND_API_URL}/api/mogak/worry`);
  // if (!res.ok) {
  //   throw new Error("고민 상담 메인 fetch 실패");
  // }
  // const data: AdviceCardProps[] = await res.json();
  // return data;
}

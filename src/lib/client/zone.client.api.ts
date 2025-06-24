import {
  ZoneCreateInput,
  ZoneCreateRequest,
  ZoneDetailResponse,
} from "@/types/zone.type";
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`모각존 생성 실패: ${res.status}`);
  }

  return await res.json();
}

export async function ZoneEntryPost(zoneId: string, password: string) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/${zoneId}/join`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`모각존 참여 실패: ${res.status}`);
  }

  return await res.json();
}

export async function ZoneDelete(mogakZoneId: number) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/${mogakZoneId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("서버 응답:", errorText);
    throw new Error(`모각존 삭제 실패: ${res.status}`);
  }

  return await res.json();
}

export async function ZoneLeave(mogakZoneId: string, memberId: string) {
  const jwt = getJwtFromCookie();

  console.log("paylode : ", mogakZoneId, memberId);

  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/leave`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mogakZoneId, memberId }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`${mogakZoneId}번 나가기 (leave) 실패: ${res.status}`);
  }

  const data: { mogakZoneId: string; memberId: string } = await res.json();

  return data;
}

export async function ZoneDetail(id: string) {
  const jwt = getJwtFromCookie();

  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/${id}`,
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

export async function ZoneKick(mogakZoneId: string, targetMemberId: string) {
  const jwt = getJwtFromCookie();
  console.log("jwt : ", jwt);
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/${mogakZoneId}/kick`,
    {
      method: "DELETE",
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ targetMemberId }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(
      `${mogakZoneId}번 존 ${targetMemberId}번 유저 강제 탈퇴 실패: ${res.status}`
    );
  }

  return await res.json();
}

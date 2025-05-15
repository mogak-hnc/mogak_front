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
    period: `${input.startDate}~${input.endDate}`,
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

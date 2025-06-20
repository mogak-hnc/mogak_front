import { AdminBadgePostRequest, AdminBadgeProps } from "@/types/admin.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export async function adminBadgeList() {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/badge/all`,
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
    throw new Error(`뱃지 목록 정보 fetch 실패: ${err}`);
  }

  const data: AdminBadgeProps[] = await res.json();
  return data;
}

export async function adminBadgePost(
  payload: AdminBadgePostRequest,
  imageFile?: File
) {
  const token = getJwtFromCookie();
  if (!token) {
    return;
  }

  const formData = new FormData();

  console.log([JSON.stringify(payload)]);

  const jsonBlob = new Blob([JSON.stringify(payload)], {
    type: "application/json",
  });
  formData.append("request", jsonBlob);

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/badge`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`뱃지 생성 실패: ${err}`);
  }

  const data: { badgeId: string } = await res.json();
  return data;
}

export async function adminBadgeDelete(id: string) {
  const jwt = getJwtFromCookie();
  if (!jwt) {
    return;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/badge/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`뱃지 삭제 실패: ${err}`);
  }

  const data: string = await res.json();
  return data;
}

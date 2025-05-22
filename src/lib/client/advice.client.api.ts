import { AdviceCommentRequest, AdviceCreateProps } from "@/types/advice.type";
import { getJwtFromCookie } from "@/utils/client/auth.client.util";

export async function AdviceCreatePost(payload: AdviceCreateProps) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/worry`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title, body: payload.contents }),
    }
  );

  if (!res.ok) {
    throw new Error("고민글 작성 실패");
  }

  return await res.json();
}

export async function AdviceCommentPost(payload: AdviceCommentRequest) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const { worryId, comment } = payload;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/worry/${worryId}/comment`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }
  );

  if (!res.ok) {
    throw new Error("댓글 작성 실패");
  }

  return await res.json();
}

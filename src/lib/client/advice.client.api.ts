import {
  AdviceCommentPaginationRequest,
  AdviceCommentPaginationResponse,
  AdviceCommentRequest,
  AdviceCommentResponse,
  AdviceCreateProps,
  AdviceEmpathyResponse,
} from "@/types/advice.type";
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
      body: JSON.stringify({
        title: payload.title,
        body: payload.contents,
        duration: payload.duration,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`고민글 작성 실패: ${res.status}`);
  }

  const data: { worryId: string } = await res.json();

  return data;
}

export async function AdviceCommentPagination(
  payload: AdviceCommentPaginationRequest
) {
  const { worryId, page, size } = payload;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/worry/${worryId}/comments?page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`${worryId}번 게시글 댓글 로드 실패: ${res.status}`);
  }

  const data: AdviceCommentPaginationResponse = await res.json();

  return data;
}

export async function AdviceCommentPost(payload: AdviceCommentRequest) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  console.log(payload);

  const { worryId, comment } = payload;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/worry/${worryId}/comment`,
    {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`댓글 작성 실패: ${res.status}`);
  }

  const data: AdviceCommentResponse = await res.json();

  return data;
}

export async function AdviceDelete(worryId: number) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/worry/${worryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`고민글 삭제 실패: ${res.status}`);
  }

  const data: { worry: string } = await res.json();

  return data;
}

export async function AdviceEmpathyPost(worryId: string) {
  const token = getJwtFromCookie();
  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/worry/${worryId}/empathy`,
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
    throw new Error(`공감 토글 실패: ${res.status}`);
  }

  const data: AdviceEmpathyResponse = await res.json();

  return data;
}

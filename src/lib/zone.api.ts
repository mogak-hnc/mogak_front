import {
  MainSubCardProps,
  ZoneDetailProps,
  ZoneFormProps,
  ZoneSearchProps,
} from "@/types";
import { getJwtFromCookie } from "@/utils/auth";

export async function ZoneMain() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`
  );

  if (!res.ok) {
    throw new Error("모각존 메인 fetch 실패");
  }

  const raw = await res.json();

  const data: MainSubCardProps[] = raw.map((item: any) => ({
    type: "studySpace",
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
  }));

  return data;
}

export async function ZoneSearch({
  search,
  tag,
  sort,
  page,
  size,
}: ZoneSearchProps) {
  const query = new URLSearchParams({
    search,
    tag,
    sort,
    page: String(page),
    size: String(size),
  });

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/api/mogak/zone/list?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("모각존 검색 결과 fetch 실패");
  }

  const raw = await res.json();

  const data: MainSubCardProps[] = raw.content.map((item: any) => ({
    type: "studySpace",
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
  }));

  return {
    data,
    page: raw.page,
  };
}

export async function ZoneCreatePost(payload: ZoneFormProps) {
  console.log(JSON.stringify(payload));

  const token = getJwtFromCookie();

  if (!token) {
    throw new Error("JWT 토큰이 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("모각존 생성 실패");
  }

  const data: ZoneDetailProps = await res.json();

  return data;
}

import { TagsProps } from "@/types/shared.type";
import {
  ZoneCreateRequest,
  ZoneCreateResponse,
  ZoneMainProps,
  ZoneSearchProps,
} from "@/types/zone.type";
import { getJwtFromCookie } from "@/utils/client/auth.util";
import { getJwtFromServerCookie } from "../utils/server/jwt.server.util";

export async function ZoneMain() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`
  );

  if (!res.ok) {
    throw new Error("모각존 메인 fetch 실패");
  }

  const raw = await res.json();

  const data: ZoneMainProps[] = raw.map((item: any) => ({
    type: "studySpace",
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
  }));

  return data;
}

export async function ZoneTags() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone/tags`
  );

  if (!res.ok) {
    throw new Error("모각존 태그 fetch 실패");
  }

  const data: TagsProps[] = await res.json();

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

  const data: ZoneMainProps[] = raw.content.map((item: any) => ({
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
  }));

  return {
    data,
    page: raw.page,
  };
}

export async function ZoneDetail(mogakZoneId: number) {
  const jwt = getJwtFromServerCookie();

  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/zone/${mogakZoneId}/detail`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`#${mogakZoneId}번 모각존 디테일 fetch 실패`);
  }

  const data = await res.json();

  return data;
}

export async function ZoneCreatePost(payload: ZoneCreateRequest) {
  // console.log(JSON.stringify(payload));

  const token = getJwtFromCookie();

  if (!token) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
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

  const data: ZoneCreateResponse = await res.json();

  return data;
}

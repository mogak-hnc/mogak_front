import { TagsProps } from "@/types/shared.type";
import {
  MogakZone,
  ZoneMainProps,
  ZoneSearchProps,
  ZoneSearchResponse,
} from "@/types/zone.type";

export async function ZoneTags() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/zone/tags`
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`모각존 태그 불러오기 실패: ${res.status}`);
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
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }
  if (tag) {
    query.set("tag", tag);
  }
  query.set("sort", sort);
  query.set("page", String(page));
  query.set("size", String(size));

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/zone?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`모각존 검색 결과 불러오기 실패: ${res.status}`);
  }
  const raw: ZoneSearchResponse = await res.json();

  const data: ZoneMainProps[] = raw.content.map((item: MogakZone) => ({
    mogakZoneId: item.mogakZoneId,
    tag: item.tagNames,
    title: item.name,
    participants: item.memberImageUrls ?? [],
    hasPwd: item.passwordRequired,
  }));

  return {
    data,
    page: raw.number,
    totalPages: raw.totalPages,
    totalElements: raw.totalElements,
    isLast: raw.last,
  };
}

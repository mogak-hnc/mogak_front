import { TagsProps } from "@/types/shared.type";
import { ZoneMainProps, ZoneSearchProps } from "@/types/zone.type";

export async function ZoneMain() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`
  );

  if (!res.ok) {
    throw new Error("모각존 메인 fetch 실패");
  }

  const raw = await res.json();

  const data: ZoneMainProps[] = raw.map((item: any) => ({
    mogakZoneId: item.mogakZoneId,
    type: "studySpace",
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
    hasPwd: item.passwordRequired,
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
  }/api/mogak/zone/list?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("모각존 검색 결과 fetch 실패");
  }

  const raw = await res.json();

  const data: ZoneMainProps[] = raw.content.map((item: any) => ({
    mogakZoneId: item.mogakZoneId,
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
    hasPwd: item.passwordRequired,
  }));

  console.log(data);

  return {
    data,
    page: raw.number,
    totalPages: raw.totalPages,
    totalElements: raw.totalElements,
    isLast: raw.last,
  };
}

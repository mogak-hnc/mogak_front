import {
  AdviceCardProps,
  AdviceSearchRequest,
  AdviceSearchResponse,
} from "@/types/advice.type";

export async function AdviceMain() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/mogak/worry`);

  if (!res.ok) {
    throw new Error("고민 상담 메인 fetch 실패");
  }

  const data: AdviceCardProps[] = await res.json();

  return data;
}

export async function AdviceSearch({ sort, page, size }: AdviceSearchRequest) {
  const query = new URLSearchParams();

  query.set("sort", sort);
  query.set("page", String(page));
  query.set("size", String(size));

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/api/mogak/worry/list?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("모각존 검색 결과 fetch 실패");
  }

  const data: AdviceSearchResponse[] = await res.json();

  return data;
}

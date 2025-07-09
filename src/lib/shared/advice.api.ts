import { AdviceSearchRequest, AdviceSearchResponse } from "@/types/advice.type";

export async function AdviceSearch({ sort, page, size }: AdviceSearchRequest) {
  const query = new URLSearchParams();

  query.set("sort", sort);
  query.set("page", String(page));
  query.set("size", String(size));

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/worry/list?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`모각존 검색 결과 불러오기 실패: ${res.status}`);
  }

  const data: AdviceSearchResponse = await res.json();

  return data;
}

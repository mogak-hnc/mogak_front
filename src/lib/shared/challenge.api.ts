import {
  ChallengeMainProps,
  ChallengeSearchRequest,
  ChallengeSearchResponse,
} from "@/types/challenge.type";
import { convertDate } from "@/utils/shared/date.util";

export async function ChallengeMain() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/challenge`
  );

  if (!res.ok) {
    throw new Error("챌린지 메인 fetch 실패");
  }

  const raw = await res.json();

  const data: ChallengeMainProps[] = raw.map((item: any) => ({
    title: item.title,
    participants: item.memberImageUrls ?? [],
    description: `${convertDate(item.startDate)} ~ ${convertDate(
      item.endDate
    )}`,
    isOfficial: item.official,
  }));

  return data;
}

export async function ChallengeSearch({
  search,
  official,
  sort,
  page,
  size,
}: ChallengeSearchRequest) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }
  query.set("official", official);
  query.set("sort", sort);
  query.set("page", String(page));
  query.set("size", String(size));

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/api/mogak/challenge/list?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("챌린지 검색 결과 fetch 실패");
  }

  const data: ChallengeSearchResponse = await res.json();

  console.log(data);

  return {
    data: data.content,
    page: data.number,
    totalPages: data.totalPages,
    totalElements: data.totalElements,
    isLast: data.last,
  };
}

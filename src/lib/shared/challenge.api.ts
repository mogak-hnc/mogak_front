import {
  ChallengeMainProps,
  ChallengeMainResponse,
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
    challengeId: item.challengeId,
    title: item.title,
    participants: item.memberImageUrls ?? [],
    description: `${convertDate(item.startDate)} ~ ${convertDate(
      item.endDate
    )}`,
    official: item.official,
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
  console.log(search, official, sort, page, size);
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }
  query.set("official", String(official));
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

  const row: ChallengeSearchResponse = await res.json();

  const data: ChallengeMainProps[] = row.content.map((item) => ({
    challengeId: item.challengeId,
    title: item.title,
    participants: item.memberImageUrl ?? [],
    description: `${convertDate(item.startDate)} ~ ${convertDate(
      item.endDate
    )}`,
    official: item.official,
  }));

  return {
    data: data,
    page: row.number,
    totalPages: row.totalPages,
    totalElements: row.totalElements,
    isLast: row.last,
  };
}

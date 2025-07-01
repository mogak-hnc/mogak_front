import {
  ChallengeMainProps,
  ChallengeMainResponse,
  ChallengeSearchRequest,
  ChallengeSearchResponse,
} from "@/types/challenge.type";
import { convertDate } from "@/utils/shared/date.util";

export async function ChallengeMain() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/challenge`
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 메인 불러오기 실패: ${res.status}`);
  }

  const raw: ChallengeMainResponse[] = await res.json();

  const data: ChallengeMainProps[] = raw.map((item: ChallengeMainResponse) => ({
    challengeId: item.challengeId,
    title: item.title,
    participants: item.memberImageUrls ?? [],
    description: `${convertDate(item.startDate)} ~ ${convertDate(
      item.endDate
    )}`,
    official: item.official,
    status: item.status,
  }));

  return data;
}

export async function ChallengeSearch({
  search,
  official,
  sort,
  page,
  size,
  status,
}: ChallengeSearchRequest) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }
  if (status) {
    query.set("status", status);
  }
  if (official) {
    query.set("official", String(official));
  }
  query.set("sort", sort);
  query.set("page", String(page));
  query.set("size", String(size));

  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_API_URL
  }/challenge?${query.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`챌린지 검색 결과 불러오기 실패: ${res.status}`);
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
    status: item.status,
  }));

  return {
    data: data,
    page: row.number,
    totalPages: row.totalPages,
    totalElements: row.totalElements,
    isLast: row.last,
  };
}

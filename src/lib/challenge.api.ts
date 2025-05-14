import { ChallengeMainProps } from "@/types/challenge.type";
import { convertDate } from "@/utils/date.util";

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

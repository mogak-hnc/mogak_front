import { MainSubCardProps } from "@/types";
import { convertDate } from "@/utils/date";

export async function ChallengeMain() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/mogak/challenge`);

  if (!res.ok) {
    throw new Error("챌린지 메인 fetch 실패");
  }

  const raw = await res.json();

  const data: MainSubCardProps[] = raw.map((item: any) => ({
    type: "challenge",
    title: item.title,

    participants: item.memberImageUrls ?? [],
    description: `${convertDate(item.startDate)} ~ ${convertDate(
      item.endDate
    )}`,
    isOfficial: item.official,
  }));

  return data;
}

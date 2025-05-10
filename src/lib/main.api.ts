import { SubCardProps } from "@/types";

export async function MainZoneChallenge() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/mogak`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    throw new Error("메인 fetch 실패");
  }

  const data: SubCardProps = await res.json();

  return data;
}

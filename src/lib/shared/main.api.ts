import { MainResponse } from "@/types/main.type";

export async function MainZoneChallenge() {
  const res = await fetch(`${process.env.BACKEND_API_URL}`, {
    next: { revalidate: 30 },
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("서버 응답:", err);
    throw new Error(`메인 불러오기 실패: ${res.status}`);
  }

  const data: MainResponse = await res.json();

  return data;
}

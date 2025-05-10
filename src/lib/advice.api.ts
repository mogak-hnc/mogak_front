import { AdvicePreviewCardProps } from "@/types";

export async function AdviceMain() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/mogak/worry`);

  if (!res.ok) {
    throw new Error("고민 상담 메인 fetch 실패");
  }

  const data: AdvicePreviewCardProps[] = await res.json();

  return data;
}

import { MainSubCardProps, ZoneDetailProps, ZoneFormProps } from "@/types";

export async function ZoneMain() {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/mogak/zone`);

  if (!res.ok) {
    throw new Error("모각존 메인 fetch 실패");
  }

  const raw = await res.json();

  const data: MainSubCardProps[] = raw.map((item: any) => ({
    type: "studySpace",
    tag: item.tagNames?.[0] ?? "",
    title: item.name,
    participants: item.memberImageUrls ?? [],
  }));

  return data;
}

export async function ZoneCreatePost(payload: ZoneFormProps) {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/zone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("모각존 생성 실패");
  }

  const data: ZoneDetailProps = await res.json();

  return data;
}

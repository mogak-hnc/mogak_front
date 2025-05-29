import { ProfileProps } from "@/types/profile.type";

export async function ProfileInfo(id: string, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/profile/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`#${id}번 유저 정보 fetch 실패`);
  }

  const data: ProfileProps = await res.json();

  return data;
}

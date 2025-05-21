import { AdminLoginValue } from "@/types/auth.type";

export async function AdminLogin(payload: AdminLoginValue) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/mogak/auth/admin-login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("서버 응답:", errorText);
    throw new Error(`챌린지 삭제 실패: ${res.status}`);
  }

  return await res.json();
}

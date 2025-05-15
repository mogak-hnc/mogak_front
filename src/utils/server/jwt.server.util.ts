import { cookies } from "next/headers";

export async function getJwtFromServerCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("jwt")?.value ?? null;
}

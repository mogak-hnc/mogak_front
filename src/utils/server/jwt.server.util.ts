import { cookies } from "next/headers";

export function getJwtFromServerCookie(): string | null {
  const cookieStore = cookies();

  const token = (cookieStore as any).get("jwt")?.value;
  return token ?? null;
}

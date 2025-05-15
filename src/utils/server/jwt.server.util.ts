import { cookies } from "next/headers";

export function getJwtFromServerCookie(): string | null {
  const token = (cookies() as any).get("jwt")?.value ?? null;
  return token ?? null;
}

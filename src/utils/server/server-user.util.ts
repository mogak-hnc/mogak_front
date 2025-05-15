import { cookies as nextCookies } from "next/headers";
import { decodeToken, JwtPayload } from "@/utils/client/decode-token.util";

export function getServerUser(): JwtPayload | null {
  const token = (nextCookies() as any).get("jwt")?.value;

  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  const now = Date.now() / 1000;
  if (decoded.exp < now) return null;

  return decoded;
}

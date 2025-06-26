import {
  JwtPayload,
  decodeToken,
} from "@/utils/client/decode-token.client.util";

import { getJwtFromCookie } from "./auth.client.util";

export function getClientUser(): JwtPayload | null {
  const token = getJwtFromCookie();
  if (!token) {
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return null;
  }

  const now = Date.now() / 1000;
  if (decoded.exp < now) {
    return null;
  }

  return decoded;
}

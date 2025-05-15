/* 
서버에서 쿠키에 저장된 jwt 토큰을 읽고 사용자 정보 반환
클라이언트 컴포넌트에서 사용 불가능
 
@returns 유저 정보 객체 (jwt payload) 혹은 null
*/

import { cookies as nextCookies } from "next/headers";
import {
  decodeToken,
  JwtPayload,
} from "@/utils/client/decode-token.client.util";

export function getServerUser(): JwtPayload | null {
  const token = (nextCookies() as any).get("jwt")?.value;

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

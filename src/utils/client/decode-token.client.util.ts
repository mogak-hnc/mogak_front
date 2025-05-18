/* 
jwt 토큰을 디코딩하여 사용자 정보 (payload) 추출

@param token - jwt 문자열
@returns 디코딩된 사용자 정보 객체 혹은 null (실패시)
*/

import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  memberId: string;
  nickname: string;
  role: "ROLE_MEMBER" | "ROLE_ADMIN";
  iat: number;
  exp: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    console.error("JWT 디코딩 실패:", err);
    return null;
  }
}

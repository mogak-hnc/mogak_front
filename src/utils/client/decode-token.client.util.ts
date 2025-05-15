const jwtDecode = require("jwt-decode") as <T>(token: string) => T;

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

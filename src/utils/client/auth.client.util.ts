/* 
클라이언트에서 document.cookie를 파싱하여 jwt 추출
브라우저에서만 사용
httpOnly일 경우 접근 불가능
 
@returns 쿠키에 저장된 jwt 토큰 혹은 null
*/

export function getJwtFromCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1] ?? null
  );
}

/* 
서버에서 jwt 쿠키 값 반환
클라이언트 컴포넌트에서 사용 불가능
 
@returns 쿠키에 저장된 jwt 토큰값 혹은 null
*/

import { cookies } from "next/headers";

export async function getJwtFromServerCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("jwt")?.value ?? null;
}

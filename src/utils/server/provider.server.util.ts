/* 
서버에서 provider 쿠키 값 반환
클라이언트 컴포넌트에서 사용 불가능
 
@returns 쿠키에 저장된 provider 값 혹은 null
*/

import { cookies } from "next/headers";

export async function getProviderFromServerCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("provider")?.value ?? null;
}

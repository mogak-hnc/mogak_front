export async function ZoneDetail(id: number, jwt: string | null) {
  if (!jwt) {
    throw new Error("JWT 토큰 없음 / 로그인 필요");
  }

  console.log("id : " + id);
  console.log("jwt : " + jwt);
  console.log(
    "url : " + `${process.env.BACKEND_API_URL}/api/mogak/zone/${id}/detail`
  );

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/mogak/zone/${id}/detail`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("status", res.status);
  console.log("headers", res.headers);
  console.log("text", await res.text());

  if (!res.ok) {
    throw new Error(`#${id}번 모각존 디테일 fetch 실패`);
  }

  const data = await res.json();

  return data;
}

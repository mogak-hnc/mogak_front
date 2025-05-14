import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!accessToken) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  try {
    const kakaoRes = await fetch("https://kapi.kakao.com/v1/user/unlink", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!kakaoRes.ok) {
      const error = await kakaoRes.json();
      return NextResponse.json({ error }, { status: kakaoRes.status });
    }

    /* DB delete 처리 */

    const response = NextResponse.redirect(`${process.env.FRONTEND_API_URL}`);
    response.cookies.set("jwt", "", { path: "/", expires: new Date(0) });

    return response;
  } catch (err) {
    console.error("카카오 탈퇴 오류:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

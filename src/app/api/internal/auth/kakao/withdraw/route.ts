import { getProviderFromServerCookie } from "@/utils/server/provider.server.util";
import { getServerUser } from "@/utils/server/user.server.util";
import { NextResponse } from "next/server";

export async function POST() {
  const token = await getServerUser();

  if (!token) {
    return NextResponse.json({ error: "No access token" }, { status: 401 });
  }

  const provider = await getProviderFromServerCookie();

  if (provider !== "kakao") {
    return NextResponse.json({ message: "not kakao user" }, { status: 200 });
  }

  try {
    const kakaoRes = await fetch("https://kapi.kakao.com/v1/user/unlink", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!kakaoRes.ok) {
      const error = await kakaoRes.json();
      return NextResponse.json({ error }, { status: kakaoRes.status });
    }

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

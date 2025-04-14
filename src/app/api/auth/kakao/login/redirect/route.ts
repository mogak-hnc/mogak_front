import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        code,
        client_secret: process.env.KAKAO_CLIENT_SECRET!,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { error: "Token fetch failed", tokenData },
        { status: 500 }
      );
    }

    const accessToken = tokenData.access_token;

    const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userData = await userRes.json();

    const userInfo = {
      provider: "kakao",
      providerId: userData.id,
    };

    // const backendRes = await fetch(
    //   `${process.env.BACKEND_API_URL}/api/auth/kakao`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userInfo),
    //   }
    // );

    // const { token } = await backendRes.json();

    // const response = NextResponse.redirect(
    //   `${process.env.LOGIN_SUCCESS_REDIRECT_URL}?token=${token}`
    // );
    // response.cookies.set("jwt", token, { path: "/" });

    // return response;

    return NextResponse.redirect("http://localhost:3000");
  } catch (err) {
    console.error("카카오 로그인 처리 오류:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

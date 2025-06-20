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

    const userInfo: { provider: string; providerId: string } = {
      provider: "kakao",
      providerId: userData.id,
    };

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/auth/social-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );

    const { token, memberId } = await res.json();

    const response = NextResponse.redirect(`${process.env.FRONTEND_API_URL}`);
    response.cookies.set("jwt", token, { path: "/" });
    response.cookies.set("provider", "kakao");

    response.headers.set(
      "Location",
      `${process.env.FRONTEND_API_URL}/login/callback?memberId=${memberId}`
    );

    return response;
  } catch (err) {
    console.error("카카오 로그인 처리 오류:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

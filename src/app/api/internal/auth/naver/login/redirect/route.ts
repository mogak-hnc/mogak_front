import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const next = url.searchParams.get("next") || "/";

    if (!code || !state) {
      return NextResponse.json(
        { error: "code or state 없음" },
        { status: 400 }
      );
    }

    const tokenRes = await fetch("https://nid.naver.com/oauth2.0/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID!,
        client_secret: process.env.NAVER_CLIENT_SECRET!,
        code,
        state,
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

    const userRes = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userRes.json();

    const userInfo = {
      provider: "naver",
      providerId: userData.response.id,
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

    const redirectUrl = `${
      process.env.FRONTEND_API_URL
    }/login/callback?memberId=${memberId}&token=${token}&next=${encodeURIComponent(
      next
    )}`;

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("jwt", token, { path: "/", httpOnly: false });
    response.cookies.set("provider", "naver");

    return response;
  } catch (err) {
    console.error("네이버 로그인 처리 오류:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

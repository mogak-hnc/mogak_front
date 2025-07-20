import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const next = searchParams.get("next") || "/";

  const clientId = process.env.KAKAO_REST_API_KEY!;
  const redirectUri = process.env.KAKAO_REDIRECT_URI!;

  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${encodeURIComponent(
    next
  )}`;

  return NextResponse.redirect(kakaoUrl);
}

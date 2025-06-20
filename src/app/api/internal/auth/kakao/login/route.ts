import { NextResponse } from "next/server";

export async function GET() {
  const redirectUri = process.env.KAKAO_REDIRECT_URI!;
  const clientId = process.env.KAKAO_REST_API_KEY!;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

  return NextResponse.redirect(kakaoUrl);
}

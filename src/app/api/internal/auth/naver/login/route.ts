import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const clientId = process.env.NAVER_CLIENT_ID!;
  const redirectUri = process.env.NAVER_REDIRECT_URI!;
  const state = crypto.randomUUID();

  const { searchParams } = new URL(req.url);
  const next = searchParams.get("next") || "/";

  const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}?next=${encodeURIComponent(
    next
  )}&state=${state}`;

  return NextResponse.redirect(authUrl);
}

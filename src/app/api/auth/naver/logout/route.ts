import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    "https://nid.naver.com/nidlogin.logout"
  );

  response.cookies.set("jwt", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}

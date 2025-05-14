import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(process.env.FRONTEND_API_URL!);

  response.cookies.set("jwt", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}

import { NextResponse } from "next/server";
import { AdminLogin } from "@/lib/client/auth.client.api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = await AdminLogin(body);

    const redirectUrl = `${process.env.FRONTEND_API_URL}/admin/zone`;
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set("jwt", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err) {
    console.error("관리자 로그인 에러:", err);
    return new NextResponse("로그인 실패", { status: 401 });
  }
}

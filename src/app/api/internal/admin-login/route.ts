import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/admin-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const message = await res.text();

    if (!res.ok) {
      return new NextResponse(message || "로그인 실패", { status: res.status });
    }

    const { token } = JSON.parse(message);

    const response = NextResponse.json({ token });

    response.cookies.set("jwt", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (err) {
    console.error("관리자 로그인 에러:", err);
    return new NextResponse("서버 오류", { status: 500 });
  }
}

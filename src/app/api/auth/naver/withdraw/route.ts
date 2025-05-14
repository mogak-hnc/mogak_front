import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 네이버는 연결 끊기 api 없음 (유저가 직접 해야함)
    // 내부 회원 탈퇴 처리만 하기 (DB, 쿠키 삭제)
    /* DB delete 처리 */
    const response = NextResponse.redirect(`${process.env.FRONTEND_API_URL}`);
    response.cookies.set("jwt", "", { path: "/", expires: new Date(0) });

    return response;
  } catch (err) {
    console.error("네이버 탈퇴 오류:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

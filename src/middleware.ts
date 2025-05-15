import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/client/decode-token.client.util";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;

  const pathname = request.nextUrl.pathname;

  // 로그인
  const protectedPaths = [
    "/zone/create",
    "/challenge/create",
    "/advice",
    "/login/info",
    "/profile",
  ];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인 + 관리자
  const isAdminOnly = pathname.startsWith("/admin");

  if (isAdminOnly) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = decodeToken(token);

    if (!decoded || decoded.role !== "ROLE_ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/zone/create",
    "/challenge/create",
    "/advice",
    "/login/info",
    "/profile",
    "/admin/:path*",
  ],
};

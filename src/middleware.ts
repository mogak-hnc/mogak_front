import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/client/decode-token.client.util";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedPaths = [
    "/advice/create",
    "/login/info",
    "/profile",
    "/zone/",
    "/challenge/",
  ];

  const isProtected = protectedPaths.some(
    (path) => pathname.startsWith(path) && pathname !== "/zone"
  );

  const makeLoginUrl = (loginPath = "/login") => {
    const loginUrl = new URL(loginPath, request.url);
    loginUrl.searchParams.set("next", pathname);
    return loginUrl;
  };

  if (isProtected && !token) {
    return NextResponse.redirect(makeLoginUrl());
  }

  if (isProtected && token) {
    const decoded = decodeToken(token);
    const nowInSec = Math.floor(Date.now() / 1000);

    if (!decoded || decoded.exp < nowInSec) {
      return NextResponse.redirect(makeLoginUrl());
    }
  }

  const isAdminOnly = pathname.startsWith("/admin");
  if (isAdminOnly) {
    if (!token) {
      return NextResponse.redirect(makeLoginUrl("/login/admin"));
    }

    const decoded = decodeToken(token);
    if (!decoded || decoded.role !== "ROLE_ADMIN") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/advice/create",
    "/login/info",
    "/profile/:path*",
    "/zone/:path*",
    "/challenge/:path*",
    "/admin/:path*",
  ],
};

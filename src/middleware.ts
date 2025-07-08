import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "./utils/client/decode-token.client.util";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;

  const pathname = request.nextUrl.pathname;

  const protectedPaths = ["/advice/create", "/login/info", "/profile"];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isProtected && token) {
    const decoded = decodeToken(token);

    const nowInSec = Math.floor(Date.now() / 1000);

    if (!decoded || decoded.exp < nowInSec) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const isAdminOnly = pathname.startsWith("/admin");

  if (isAdminOnly) {
    if (!token) {
      return NextResponse.redirect(new URL("/login/admin", request.url));
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
    "/admin/:path*",
  ],
};

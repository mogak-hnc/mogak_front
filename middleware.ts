import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;

  const protectedPaths = [
    "/zone/create",
    "/challenge/create",
    "/advice",
    "/login/info",
    "/profile",
  ];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
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
  ],
};

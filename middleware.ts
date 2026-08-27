import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isDashboard || isAdminRoute) {
    const jwtSecret = process.env.JWT_SECRET?.trim();

    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jwtVerify(token, secret);

      const role = payload.role as string;

      if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/login", "/auth/register"],
};

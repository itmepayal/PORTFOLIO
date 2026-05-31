import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

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
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);

      const role = payload.role as string;

      if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

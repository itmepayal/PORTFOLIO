import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import {
  CMS_GATE_COOKIE,
  hasCmsGateAccess,
  shouldSetCmsGateCookie,
} from "@/lib/cms-gate";
import { CMS_LOGIN_PATH } from "@/lib/auth-paths";

function notFound() {
  return new NextResponse(null, { status: 404 });
}

function gone() {
  return new NextResponse(null, { status: 410 });
}

function redirectHome(req: NextRequest) {
  return NextResponse.redirect(new URL("/", req.url));
}

function withCmsGateCookie(response: NextResponse) {
  response.cookies.set(CMS_GATE_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
  return response;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth")) {
    return gone();
  }

  if (pathname === "/api/account/register") {
    return gone();
  }

  if (
    pathname === "/api/account/login" &&
    process.env.NODE_ENV === "production" &&
    !hasCmsGateAccess(req)
  ) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const isCmsLogin = pathname === CMS_LOGIN_PATH;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isCmsLogin) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!hasCmsGateAccess(req)) {
      return notFound();
    }

    const response = NextResponse.next();
    if (shouldSetCmsGateCookie(req)) {
      return withCmsGateCookie(response);
    }

    return response;
  }

  if (isDashboard || isAdminRoute) {
    const jwtSecret = process.env.JWT_SECRET?.trim();

    if (!jwtSecret) {
      console.error("JWT_SECRET is not configured");
      return redirectHome(req);
    }

    if (!token) {
      return notFound();
    }

    try {
      const secret = new TextEncoder().encode(jwtSecret);
      const { payload } = await jwtVerify(token, secret);
      const role = payload.role as string;

      if (isAdminRoute && role !== "admin") {
        return redirectHome(req);
      }

      return NextResponse.next();
    } catch {
      return notFound();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/auth/:path*",
    "/cms-access",
    "/api/account/login",
    "/api/account/register",
  ],
};

import type { NextRequest } from "next/server";

export const CMS_GATE_COOKIE = "cms_gate";

export function getCmsAccessKey(): string | undefined {
  return process.env.CMS_ACCESS_KEY?.trim() || undefined;
}

export function hasCmsGateAccess(req: NextRequest): boolean {
  const accessKey = getCmsAccessKey();

  if (!accessKey) {
    return process.env.NODE_ENV !== "production";
  }

  const queryKey = req.nextUrl.searchParams.get("key");
  if (queryKey === accessKey) {
    return true;
  }

  return req.cookies.get(CMS_GATE_COOKIE)?.value === "1";
}

export function shouldSetCmsGateCookie(req: NextRequest): boolean {
  const accessKey = getCmsAccessKey();
  if (!accessKey) return false;
  return req.nextUrl.searchParams.get("key") === accessKey;
}

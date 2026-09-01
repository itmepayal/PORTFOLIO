import { cookies } from "next/headers";
import { CMS_GATE_COOKIE } from "@/lib/cms-gate";

export async function hasCmsGateFromCookies(): Promise<boolean> {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const accessKey = process.env.CMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return false;
  }

  const cookieStore = await cookies();
  return cookieStore.get(CMS_GATE_COOKIE)?.value === "1";
}

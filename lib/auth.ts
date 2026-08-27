import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import type { UserRole } from "@/lib/jwt";

export interface AuthSession {
  userId: string;
  role: UserRole;
}

export async function getAuthSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !process.env.JWT_SECRET) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.userId;
    const role = payload.role;

    if (typeof userId !== "string" || typeof role !== "string") {
      return null;
    }

    return { userId, role: role as UserRole };
  } catch {
    return null;
  }
}

export async function requireAuthSession(): Promise<AuthSession> {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

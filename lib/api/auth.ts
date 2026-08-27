import { getAuthSession } from "@/lib/auth";
import { jsonError } from "@/lib/api/http";

export async function requireAuthSessionOrResponse() {
  const session = await getAuthSession();
  if (!session) {
    return { session: null, response: jsonError("Unauthorized", 401) };
  }
  return { session, response: null };
}

import { getErrorMessage } from "@/lib/utils";

export function jsonSuccess<T extends Record<string, unknown>>(
  data: T,
  status = 200,
) {
  return Response.json({ success: true, ...data }, { status });
}

export function jsonError(message: string, status: number) {
  return Response.json({ success: false, message }, { status });
}

export function jsonFromError(error: unknown, fallback = "Request failed") {
  return jsonError(getErrorMessage(error, fallback), 500);
}

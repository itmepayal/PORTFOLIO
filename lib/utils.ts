import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidMediaUrl(value?: string | null): boolean {
  const src = value?.trim();
  if (!src) return false;
  return src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/");
}

export function getErrorMessage(
  error: unknown,
  fallback = "An unexpected error occurred",
): string {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return fallback
}

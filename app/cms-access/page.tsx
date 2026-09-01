import { notFound } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { hasCmsGateFromCookies } from "@/lib/cms-gate-server";

export const dynamic = "force-dynamic";

export default async function CmsAccessPage() {
  if (!(await hasCmsGateFromCookies())) {
    notFound();
  }

  return <LoginForm />;
}

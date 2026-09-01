"use client";

import { getErrorMessage } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HiOutlineMail } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import { AuthCardHeader, AuthLayout } from "./AuthLayout";
import { AuthPasswordInput } from "./AuthPasswordInput";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      toast.success("Signed in successfully");
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCardHeader />

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-5 px-7 py-8 sm:px-8"
      >
        <div>
          <div className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-chart-3">
            Private CMS
          </div>
          <h1 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
            Portfolio CMS
          </h1>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">
            Private content management for Payal Yadav&apos;s personal portfolio
            at itspayal.in. Not affiliated with any bank, payment service, or
            third-party login provider.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="login-email"
            className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
          >
            Email
          </label>
          <div className="relative flex items-center">
            <HiOutlineMail
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
            />
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 pl-10 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>

        <AuthPasswordInput
          id="login-password"
          label="Admin passphrase"
          placeholder="••••••••"
          autoComplete="off"
          value={password}
          onChange={setPassword}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            clipPath:
              "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
          className="mt-0.5 flex items-center justify-center gap-2 bg-linear-to-br from-primary to-secondary-foreground px-8 py-3.5 font-mono text-[0.82rem] tracking-[0.05em] text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Opening dashboard…" : "Open dashboard"}
          {!loading && (
            <HiArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </button>
      </form>

      <div className="border-t border-border px-7 py-5 text-center sm:px-8">
        <Link
          href="/"
          className="font-mono text-[0.68rem] text-primary no-underline hover:opacity-80"
        >
          ← Back to Payal Yadav portfolio
        </Link>
      </div>
    </AuthLayout>
  );
};

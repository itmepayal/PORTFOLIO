"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";

export default function LoginPage() {
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
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16 sm:px-[5%]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklch, var(--color-primary) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-[-10%] top-[10%] h-75 w-75 rounded-full sm:h-100 sm:w-100 lg:h-125 lg:w-125"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 18%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[5%] h-62.5 w-62.5 rounded-full sm:h-85 sm:w-85 lg:h-100 lg:w-100"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-secondary-foreground) 12%, transparent) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.15, 1, 1.15], opacity: [1, 0.8, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-1 w-full max-w-110 border border-border bg-card/60 backdrop-blur-[18px]"
      >
        <div className="flex items-center gap-3 border-b border-border px-7 py-5">
          <span className="whitespace-nowrap bg-linear-to-br from-primary to-secondary-foreground bg-clip-text font-mono text-[1.1rem] font-bold tracking-tight text-transparent">
            &lt;PY./&gt;
          </span>

          <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-mono text-[0.64rem] tracking-[0.08em] text-muted-foreground">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-chart-3" />
            All systems operational
          </span>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5 px-7 py-8 sm:px-8"
        >
          <div>
            <div className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-chart-3">
              Dashboard access
            </div>
            <h1 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
              Welcome back
            </h1>
            <p className="mt-1 text-[0.8rem] font-light text-muted-foreground">
              New here?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-primary no-underline hover:opacity-80"
              >
                Create an account →
              </Link>
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

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-password"
              className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <HiOutlineLockClosed
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
              />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 pl-10 pr-11 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 text-muted-foreground transition-colors hover:text-primary"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="size-4.5" />
                ) : (
                  <HiOutlineEye className="size-4.5" />
                )}
              </button>
            </div>
          </div>

          <div className="-mt-1 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 font-mono text-[0.68rem] text-muted-foreground">
              <input
                type="checkbox"
                defaultChecked
                className="accent-primary"
              />
              Remember me
            </label>
            <a
              href="#"
              className="font-mono text-[0.68rem] tracking-[0.03em] text-primary no-underline hover:opacity-80"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
            className="mt-0.5 flex items-center justify-center gap-2 bg-linear-to-br from-primary to-secondary-foreground px-8 py-3.5 font-mono text-[0.82rem] tracking-[0.05em] text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
            {!loading && (
              <HiArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </button>
        </form>

        <div className="border-t border-border px-7 py-5 text-center sm:px-8">
          <p className="font-mono text-[0.68rem] text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary no-underline hover:opacity-80"
            >
              Create account →
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { getErrorMessage } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { HiArrowRight } from "react-icons/hi2";
import { AuthCardHeader, AuthLayout } from "./AuthLayout";
import { AuthFormFooter } from "./AuthFormFooter";
import { AuthPasswordInput } from "./AuthPasswordInput";

export const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (!agree) {
      toast.error("Please accept Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      router.push("/auth/login");
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
        onSubmit={handleRegister}
        className="flex flex-col gap-5 px-7 py-8 sm:px-8"
      >
        <div>
          <div className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-chart-3">
            Create account
          </div>
          <h1 className="text-[1.5rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
            Join the platform
          </h1>
          <p className="mt-1 text-[0.8rem] font-light text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-primary no-underline hover:opacity-80"
            >
              Sign in →
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-name"
            className="font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
          >
            Full Name
          </label>
          <div className="relative flex items-center">
            <HiOutlineUser
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground"
            />
            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 pl-10 text-[0.86rem] text-foreground outline-none transition-colors focus:border-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="register-email"
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
              id="register-email"
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
          id="register-password"
          label="Password"
          placeholder="Create a password"
          autoComplete="new-password"
          value={password}
          onChange={setPassword}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <label className="-mt-1 flex cursor-pointer items-start gap-2 font-mono text-[0.68rem] text-muted-foreground">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="mt-0.5 accent-primary"
          />
          I agree to the{" "}
          <a href="#" className="text-primary no-underline hover:opacity-80">
            Terms
          </a>{" "}
          &amp;{" "}
          <a href="#" className="text-primary no-underline hover:opacity-80">
            Privacy Policy
          </a>
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            clipPath:
              "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
          className="mt-0.5 flex items-center justify-center gap-2 bg-linear-to-br from-primary to-secondary-foreground px-8 py-3.5 font-mono text-[0.82rem] tracking-[0.05em] text-white transition-opacity duration-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account…" : "Create Account"}
          {!loading && (
            <HiArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </button>
      </form>

      <AuthFormFooter
        prompt="Already have an account?"
        linkHref="/auth/login"
        linkLabel="Sign in →"
      />
    </AuthLayout>
  );
};

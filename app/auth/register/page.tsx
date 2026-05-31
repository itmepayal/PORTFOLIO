"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineUser,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Account created successfully");

      setName("");
      setEmail("");
      setPassword("");

      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-6">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[70px_70px] opacity-[0.04]" />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-4xl border border-border/60 bg-card/70 p-6 shadow-2xl backdrop-blur-2xl"
      >
        {/* HEADER */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <HiOutlineSparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
              Create Account
            </span>
          </div>

          <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
            <HiOutlineShieldCheck className="h-8 w-8 text-primary" />
          </div>

          <h1 className="mt-4 text-3xl font-black">Join Platform</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create account and start your journey
          </p>
        </div>

        {/* FORM */}
        <form className="mt-6 space-y-4" onSubmit={handleRegister}>
          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative mt-1">
              <HiOutlineUser className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 w-full rounded-xl border border-border/60 bg-background/60 pl-11 pr-4 text-sm outline-none focus:border-primary"
                placeholder="Enter full name"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <HiOutlineMail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full rounded-xl border border-border/60 bg-background/60 pl-11 pr-4 text-sm outline-none focus:border-primary"
                placeholder="Enter email"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <HiOutlineLockClosed className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 w-full rounded-xl border border-border/60 bg-background/60 pl-11 pr-11 text-sm outline-none focus:border-primary"
                placeholder="Create password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
            </div>
          </div>

          {/* TERMS */}
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mt-1 h-4 w-4"
            />
            I agree to Terms & Privacy Policy
          </label>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl border border-border/60 bg-background/60 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have account?{" "}
          <Link href="/auth/login" className="text-primary">
            Sign In
          </Link>
        </p>
      </motion.div>
    </section>
  );
}

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
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text-raw)",
        fontFamily: "var(--font-sans)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "1.5rem 1rem",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(91,110,245,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,110,245,.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Glow top-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(91,110,245,.18) 0%, transparent 70%)",
          top: 0,
          left: "-15%",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(167,139,250,.12) 0%, transparent 70%)",
          bottom: "-5%",
          right: 0,
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 440,
          background: "var(--card-raw)",
          border: "1px solid var(--border-raw)",
          boxShadow: "var(--shadow)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.4rem 2rem 1.2rem",
            borderBottom: "1px solid var(--border-raw)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "1.1rem",
              fontWeight: 700,
              background:
                "linear-gradient(135deg, var(--accent-raw), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            &lt;PY./&gt;
          </span>

          <span
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.64rem",
              color: "var(--muted-raw)",
              letterSpacing: "0.08em",
            }}
          >
            {/* Blinking dot */}
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                flexShrink: 0,
                animation: "py-blink 2s ease-in-out infinite",
              }}
            />
            All systems operational
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* Title block */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--cyan)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}
            >
              Dashboard access
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "var(--text-raw)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--muted-raw)",
                fontWeight: 300,
                marginTop: "0.3rem",
                marginBottom: 0,
              }}
            >
              New here?{" "}
              <Link
                href="/auth/register"
                style={{
                  color: "var(--accent-raw)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Create an account →
              </Link>
            </p>
          </div>

          {/* Email field */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <label
              htmlFor="login-email"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.64rem",
                color: "var(--muted-raw)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Email
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HiOutlineMail
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0.9rem",
                  color: "var(--muted-raw)",
                  fontSize: "0.95rem",
                  pointerEvents: "none",
                }}
              />
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border-raw)",
                  color: "var(--text-raw)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.86rem",
                  padding: "0.78rem 1rem 0.78rem 2.55rem",
                  outline: "none",
                  borderRadius: 0,
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent-raw)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border-raw)")
                }
              />
            </div>
          </div>

          {/* Password field */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}
          >
            <label
              htmlFor="login-password"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.64rem",
                color: "var(--muted-raw)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Password
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HiOutlineLockClosed
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0.9rem",
                  color: "var(--muted-raw)",
                  fontSize: "0.95rem",
                  pointerEvents: "none",
                }}
              />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border-raw)",
                  color: "var(--text-raw)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.86rem",
                  padding: "0.78rem 2.8rem 0.78rem 2.55rem",
                  outline: "none",
                  borderRadius: 0,
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--accent-raw)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--border-raw)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "0.85rem",
                  background: "none",
                  border: "none",
                  color: "var(--muted-raw)",
                  cursor: "pointer",
                  padding: "0.25rem",
                  lineHeight: 0,
                }}
              >
                {showPassword ? (
                  <HiOutlineEyeOff size={17} />
                ) : (
                  <HiOutlineEye size={17} />
                )}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-0.25rem",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--muted-raw)",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                defaultChecked
                style={{ accentColor: "var(--accent-raw)" }}
              />
              Remember me
            </label>
            <a
              href="#"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--accent-raw)",
                textDecoration: "none",
                letterSpacing: "0.03em",
              }}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.82rem",
              letterSpacing: "0.05em",
              padding: "0.9rem 2rem",
              background:
                "linear-gradient(135deg, var(--accent-raw), var(--accent2))",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
              width: "100%",
              marginTop: "0.1rem",
              opacity: loading ? 0.5 : 1,
              transition: "opacity .2s, transform .2s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
            {!loading && (
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </form>

        <div
          style={{
            padding: "1rem 2rem 1.5rem",
            borderTop: "1px solid var(--border-raw)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              color: "var(--muted-raw)",
              margin: 0,
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              style={{
                color: "var(--accent-raw)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Create account →
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

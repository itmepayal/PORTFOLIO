"use client";

import Link from "next/link";
import { useState } from "react";

import { motion } from "framer-motion";

import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
} from "react-icons/hi";

import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section
      className="
        relative

        flex
        min-h-screen
        items-center
        justify-center

        overflow-hidden

        bg-background

        px-4
        py-10
      "
    >
      {/* =============================================================== */}
      {/* BACKGROUND */}
      {/* =============================================================== */}

      <div
        className="
          absolute
          inset-0

          bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)]

          bg-size-[70px_70px]

          opacity-[0.04]
        "
      />

      {/* GLOW */}

      <div
        className="
          absolute

          left-[-10%]
          top-[-10%]

          h-104
          w-104

          rounded-full

          bg-primary/20

          blur-3xl
        "
      />

      <div
        className="
          absolute

          bottom-[-10%]
          right-[-10%]

          h-112
          w-md

          rounded-full

          bg-chart-3/20

          blur-3xl
        "
      />

      {/* =============================================================== */}
      {/* CARD */}
      {/* =============================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          z-10

          w-full
          max-w-md

          overflow-hidden

          rounded-4xl

          border
          border-border/60

          bg-card/70

          p-8

          shadow-2xl
          shadow-primary/10

          backdrop-blur-2xl
        "
      >
        {/* CARD OVERLAY */}

        <div
          className="
            absolute
            inset-0

            bg-linear-to-br
            from-primary/5
            via-transparent
            to-chart-3/5
          "
        />

        {/* SHINE */}

        <div
          className="
            absolute
            inset-y-0
            -left-1/2

            w-1/2

            rotate-12

            bg-white/10

            blur-2xl
          "
        />

        {/* CONTENT */}

        <div className="relative z-10">
          {/* TOP BADGE */}

          <div className="flex justify-center">
            <div
              className="
                inline-flex
                items-center

                gap-2

                rounded-full

                border
                border-primary/20

                bg-primary/10

                px-4
                py-2
              "
            >
              <HiOutlineSparkles
                className="
                  h-4
                  w-4

                  text-primary
                "
              />

              <span
                className="
                  text-xs
                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-primary
                "
              >
                Secure Login
              </span>
            </div>
          </div>

          {/* ICON */}

          <div
            className="
              mx-auto

              mt-6

              flex
              h-20
              w-20

              items-center
              justify-center

              rounded-[1.8rem]

              border
              border-primary/20

              bg-primary/10

              shadow-lg
              shadow-primary/10
            "
          >
            <HiOutlineShieldCheck
              className="
                h-10
                w-10

                text-primary
              "
            />
          </div>

          {/* HEADING */}

          <div className="mt-6 text-center">
            <h1
              className="
                text-4xl

                font-black

                tracking-[-0.05em]
              "
            >
              Welcome Back
            </h1>

            <p
              className="
                mt-3

                text-sm
                leading-7

                text-muted-foreground
              "
            >
              Login to access your dashboard, projects, analytics, and developer
              workspace.
            </p>
          </div>

          {/* SOCIAL LOGIN */}

          <div
            className="
              mt-8

              grid
              grid-cols-2

              gap-4
            "
          >
            <button
              type="button"
              className="
                flex
                items-center
                justify-center

                gap-2

                rounded-2xl

                border
                border-border/60

                bg-background/60

                px-4
                py-3.5

                text-sm
                font-semibold

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/30
                hover:bg-accent/50
              "
            >
              <FaGoogle className="h-4 w-4" />
              Google
            </button>

            <button
              type="button"
              className="
                flex
                items-center
                justify-center

                gap-2

                rounded-2xl

                border
                border-border/60

                bg-background/60

                px-4
                py-3.5

                text-sm
                font-semibold

                backdrop-blur-xl

                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-primary/30
                hover:bg-accent/50
              "
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </button>
          </div>

          {/* DIVIDER */}

          <div
            className="
              relative

              my-8

              flex
              items-center
              justify-center
            "
          >
            <div className="absolute inset-x-0 h-px bg-border" />

            <span
              className="
                relative

                bg-card

                px-4

                text-[11px]

                uppercase

                tracking-[0.25em]

                text-muted-foreground
              "
            >
              Continue With Email
            </span>
          </div>

          {/* FORM */}

          <form className="space-y-5">
            {/* EMAIL */}

            <div className="space-y-2">
              <label
                className="
                  text-sm
                  font-medium
                "
              >
                Email Address
              </label>

              <div className="relative">
                <HiOutlineMail
                  className="
                    absolute
                    left-4
                    top-1/2

                    h-5
                    w-5

                    -translate-y-1/2

                    text-muted-foreground
                  "
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    h-14
                    w-full

                    rounded-2xl

                    border
                    border-border/60

                    bg-background/60

                    pl-12
                    pr-4

                    text-sm

                    outline-none

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    placeholder:text-muted-foreground/70

                    focus:border-primary
                    focus:ring-4
                    focus:ring-primary/10
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className="space-y-2">
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <label
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="
                    text-xs
                    font-medium

                    text-primary

                    hover:underline
                  "
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <HiOutlineLockClosed
                  className="
                    absolute
                    left-4
                    top-1/2

                    h-5
                    w-5

                    -translate-y-1/2

                    text-muted-foreground
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="
                    h-14
                    w-full

                    rounded-2xl

                    border
                    border-border/60

                    bg-background/60

                    pl-12
                    pr-12

                    text-sm

                    outline-none

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    placeholder:text-muted-foreground/70

                    focus:border-primary
                    focus:ring-4
                    focus:ring-primary/10
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2

                    -translate-y-1/2

                    text-muted-foreground

                    transition-colors
                    duration-300

                    hover:text-primary
                  "
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="h-5 w-5" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* OPTIONS */}

            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <label
                className="
                  flex
                  items-center

                  gap-2

                  text-sm

                  text-muted-foreground
                "
              >
                <input
                  type="checkbox"
                  className="
                    h-4
                    w-4

                    rounded

                    border-border
                  "
                />
                Remember me
              </label>

              <span
                className="
                  text-xs

                  text-muted-foreground
                "
              >
                Protected Login
              </span>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="
                group

                relative

                mt-2

                flex
                h-14
                w-full

                items-center
                justify-center

                overflow-hidden

                rounded-2xl

                text-sm
                font-semibold

                text-primary-foreground

                shadow-xl
                shadow-primary/20

                transition-all
                duration-300

                hover:scale-[1.02]
                hover:shadow-2xl
              "
            >
              <div
                className="
                  absolute
                  inset-0

                  bg-linear-to-r
                  from-primary
                  via-chart-3
                  to-chart-2
                "
              />

              <div
                className="
                  absolute
                  inset-0

                  opacity-0

                  bg-white/10

                  transition-opacity
                  duration-300

                  group-hover:opacity-100
                "
              />

              <span className="relative z-10">Sign In</span>
            </button>
          </form>

          {/* FOOTER */}

          <div
            className="
              mt-8

              text-center

              text-sm

              text-muted-foreground
            "
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="
                font-semibold

                text-primary

                hover:underline
              "
            >
              Create Account
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

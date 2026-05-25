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
  HiOutlineUser,
} from "react-icons/hi";

import { FaGithub, FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
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
        py-6
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

      {/* GLOW EFFECTS */}

      <div
        className="
          absolute

          left-[-10%]
          top-[-10%]

          h-96
          w-[24rem]

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

          h-104
          w-104

          rounded-full

          bg-chart-3/20

          blur-3xl
        "
      />

      {/* =============================================================== */}
      {/* REGISTER CARD */}
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

          p-6

          shadow-2xl
          shadow-primary/10

          backdrop-blur-2xl
        "
      >
        {/* OVERLAY */}

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
          {/* BADGE */}

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
                  text-[10px]
                  font-semibold

                  uppercase

                  tracking-[0.2em]

                  text-primary
                "
              >
                Create Account
              </span>
            </div>
          </div>

          {/* ICON */}

          <div
            className="
              mx-auto

              mt-4

              flex
              h-16
              w-16

              items-center
              justify-center

              rounded-2xl

              border
              border-primary/20

              bg-primary/10
            "
          >
            <HiOutlineShieldCheck
              className="
                h-8
                w-8

                text-primary
              "
            />
          </div>

          {/* HEADER */}

          <div className="mt-4 text-center">
            <h1
              className="
                text-3xl

                font-black

                tracking-[-0.05em]
              "
            >
              Join Platform
            </h1>

            <p
              className="
                mt-2

                text-sm
                leading-6

                text-muted-foreground
              "
            >
              Create your account and start managing your developer workspace
              securely.
            </p>
          </div>

          {/* SOCIAL BUTTONS */}

          <div
            className="
              mt-6

              grid
              grid-cols-2

              gap-3
            "
          >
            <button
              type="button"
              className="
                flex
                items-center
                justify-center

                gap-2

                rounded-xl

                border
                border-border/60

                bg-background/60

                px-4
                py-3

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

                rounded-xl

                border
                border-border/60

                bg-background/60

                px-4
                py-3

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

              my-6

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

                text-[10px]

                uppercase

                tracking-[0.25em]

                text-muted-foreground
              "
            >
              Continue With Email
            </span>
          </div>

          {/* FORM */}

          <form className="space-y-4">
            {/* FULL NAME */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>

              <div className="relative">
                <HiOutlineUser
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
                  type="text"
                  placeholder="Enter your full name"
                  className="
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-border/60

                    bg-background/60

                    pl-11
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

            {/* EMAIL */}

            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>

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
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-border/60

                    bg-background/60

                    pl-11
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
              <label className="text-sm font-medium">Password</label>

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
                  placeholder="Create password"
                  className="
                    h-12
                    w-full

                    rounded-xl

                    border
                    border-border/60

                    bg-background/60

                    pl-11
                    pr-11

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

            {/* TERMS */}

            <label
              className="
                flex
                items-start

                gap-2

                text-xs

                py-2

                text-muted-foreground
              "
            >
              <input
                type="checkbox"
                className="
                  mt-0.5

                  h-4
                  w-4
                "
              />

              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="
                    text-primary

                    hover:underline
                  "
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="
                    text-primary

                    hover:underline
                  "
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* BUTTON */}

            <button
              type="submit"
              className="
                group

                relative

                mt-2

                flex
                h-12
                w-full

                items-center
                justify-center

                overflow-hidden

                rounded-xl

                text-sm
                font-semibold

                text-primary-foreground

                shadow-xl
                shadow-primary/20

                transition-all
                duration-300

                hover:scale-[1.01]
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

              <span className="relative z-10">Create Account</span>
            </button>
          </form>

          {/* FOOTER */}

          <div
            className="
              mt-6

              text-center

              text-sm

              text-muted-foreground
            "
          >
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="
                font-semibold

                text-primary

                hover:underline
              "
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

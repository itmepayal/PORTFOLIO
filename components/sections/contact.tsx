"use client";
import { motion } from "framer-motion";
import { Sparkles, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "../common/container";

export const Contact = () => {
  return (
    <Container>
      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-0

            h-112.5
            w-112.5

            -translate-x-1/2

            rounded-full

            bg-primary/10

            blur-3xl
          "
        />
      </div>

      {/* ====================================================== */}
      {/* MAIN CONTAINER */}
      {/* ====================================================== */}

      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        {/* ====================================================== */}
        {/* GRID LAYOUT */}
        {/* ====================================================== */}

        <div
          className="
            grid
            items-center

            gap-14

            lg:grid-cols-2
            lg:gap-16
          "
        >
          {/* ====================================================== */}
          {/* LEFT CONTENT */}
          {/* ====================================================== */}

          <div className="space-y-7 text-center lg:text-left">
            {/* ====================================================== */}
            {/* BADGE */}
            {/* ====================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-white/10

                  bg-background/50

                  px-4
                  py-2

                  text-xs
                  sm:text-sm

                  backdrop-blur-xl
                "
              >
                <Sparkles className="size-4 text-primary" />
                Let’s Connect
              </div>
            </motion.div>

            {/* ====================================================== */}
            {/* TITLE */}
            {/* ====================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <h2
                className="
                  text-4xl
                  sm:text-5xl
                  lg:text-6xl

                  font-black

                  leading-none
                  tracking-[-0.04em]
                "
              >
                Have an idea?
                <br />
                <span
                  className="
                    bg-linear-to-r
                    from-primary
                    via-purple-400
                    to-pink-400

                    bg-clip-text
                    text-transparent
                  "
                >
                  Let’s build it.
                </span>
              </h2>
            </motion.div>

            {/* ====================================================== */}
            {/* DESCRIPTION */}
            {/* ====================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.15,
              }}
              className="
                max-w-xl

                mx-auto
                lg:mx-0

                text-sm
                sm:text-base

                leading-7
                sm:leading-8

                text-muted-foreground
              "
            >
              I help turn ideas into scalable digital products. Whether it’s a
              startup, feature, backend system, or realtime platform — I’m open
              to collaborating on impactful projects.
            </motion.p>

            {/* ====================================================== */}
            {/* EMAIL CARD */}
            {/* ====================================================== */}

            <motion.div
              whileHover={{
                y: -4,
              }}
              className="
                group

                flex
                items-center
                gap-4

                rounded-3xl

                border
                border-white/10

                bg-background/50

                p-5
                sm:p-6

                backdrop-blur-xl

                transition-all
                duration-300

                hover:border-primary/30
              "
            >
              {/* ====================================================== */}
              {/* ICON */}
              {/* ====================================================== */}

              <div
                className="
                  flex
                  size-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-primary/10
                  text-primary
                "
              >
                <Mail className="size-5" />
              </div>

              {/* ====================================================== */}
              {/* EMAIL INFO */}
              {/* ====================================================== */}

              <div className="text-left">
                <p className="text-xs text-muted-foreground">Email me</p>

                <p
                  className="
                    text-sm
                    sm:text-base

                    font-medium

                    break-all
                  "
                >
                  itme.payalyadav@gmail.com
                </p>
              </div>
            </motion.div>

            {/* ====================================================== */}
            {/* RESPONSE TIME */}
            {/* ====================================================== */}

            <div
              className="
                flex
                items-center
                justify-center
                lg:justify-start

                gap-2

                text-xs
                sm:text-sm

                text-muted-foreground
              "
            >
              <Clock className="size-4 text-primary" />
              Usually replies within a few hours
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT CONTENT */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="relative"
          >
            {/* ====================================================== */}
            {/* CARD GLOW */}
            {/* ====================================================== */}

            <div
              className="
                absolute
                -inset-1

                rounded-4xl

                bg-linear-to-r
                from-primary/20
                to-pink-400/10

                blur-2xl
                opacity-40
              "
            />

            {/* ====================================================== */}
            {/* CONTACT CARD */}
            {/* ====================================================== */}

            <Card
              className="
                relative

                overflow-hidden

                rounded-4xl

                border
                border-white/10

                bg-background/80

                backdrop-blur-2xl

                shadow-[0_10px_60px_rgba(0,0,0,0.35)]
              "
            >
              <CardContent className="p-6 sm:p-8 lg:p-10">
                {/* ====================================================== */}
                {/* FORM HEADER */}
                {/* ====================================================== */}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold">Send a message</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    I typically respond within a few hours
                  </p>
                </div>

                {/* ====================================================== */}
                {/* CONTACT FORM */}
                {/* ====================================================== */}

                <form className="space-y-5">
                  {/* ====================================================== */}
                  {/* NAME INPUT */}
                  {/* ====================================================== */}

                  <div className="space-y-2">
                    <Label>Name</Label>

                    <Input
                      placeholder="Your name"
                      className="
                        h-12
                        rounded-xl
                        border-white/10
                        bg-background/50
                      "
                    />
                  </div>

                  {/* ====================================================== */}
                  {/* EMAIL INPUT */}
                  {/* ====================================================== */}

                  <div className="space-y-2">
                    <Label>Email</Label>

                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="
                        h-12
                        rounded-xl
                        border-white/10
                        bg-background/50
                      "
                    />
                  </div>

                  {/* ====================================================== */}
                  {/* MESSAGE TEXTAREA */}
                  {/* ====================================================== */}

                  <div className="space-y-2">
                    <Label>Message</Label>

                    <textarea
                      rows={6}
                      placeholder="Tell me about your idea..."
                      className="
                        w-full

                        resize-none
                        outline-none

                        rounded-2xl

                        border
                        border-white/10

                        bg-background/50

                        px-4
                        py-4

                        text-sm

                        transition-all

                        focus:border-primary/40
                        focus:ring-2
                        focus:ring-primary/20
                      "
                    />
                  </div>

                  {/* ====================================================== */}
                  {/* SUBMIT BUTTON */}
                  {/* ====================================================== */}

                  <Button
                    className="
                      group

                      h-12
                      w-full

                      rounded-xl

                      text-sm
                      font-medium
                    "
                  >
                    Send Message
                    <Send
                      className="
                        ml-2
                        size-4

                        transition-transform
                        duration-300

                        group-hover:translate-x-1
                      "
                    />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

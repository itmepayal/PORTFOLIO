"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, Send, Clock } from "lucide-react";

import { Section } from "@/components/common/section";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <Section id="contact" className="mt-3 md:mt-0">
      <BackgroundBlobs />

      <div className="mx-auto px-0 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ================= LEFT ================= */}
          <div className="space-y-6 text-center lg:text-left">
            {/* BADGE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background/60 backdrop-blur text-xs">
                <Sparkles className="size-4 text-primary" />
                Let’s Connect
              </div>
            </motion.div>

            {/* HEADING */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              Have an idea? <br />
              <span className="bg-linear-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let’s build it.
              </span>
            </h2>

            {/* DESC */}
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto lg:mx-0">
              I help turn ideas into scalable products. Whether it's a startup,
              feature, or system design — I’m open to collaborating.
            </p>

            {/* EMAIL CARD */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 p-4 rounded-xl border bg-background/50 backdrop-blur"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="size-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Email me</p>
                <p className="text-sm font-medium break-all">
                  itme.payalyadav@gmail.com
                </p>
              </div>
            </motion.div>

            <p className="flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-primary" />
              Usually replies within a few hours
            </p>
          </div>

          {/* ================= RIGHT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* GLOW */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-pink-400/10 blur-2xl opacity-40 rounded-2xl" />

            <Card className="relative rounded-2xl border bg-background/80 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {/* TITLE */}
                <div>
                  <h3 className="text-lg font-semibold">Send a message</h3>
                  <p className="text-sm text-muted-foreground">
                    I typically respond within a few hours
                  </p>
                </div>

                {/* FORM */}
                <form className="space-y-5">
                  {/* NAME */}
                  <div className="space-y-1.5">
                    <Label>Name</Label>
                    <Input
                      placeholder="Your name"
                      className="text-sm bg-transparent! focus-visible:ring-primary"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="text-sm bg-transparent! focus-visible:ring-primary"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-1.5">
                    <Label>Message</Label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your idea..."
                      className="w-full px-3 py-2 text-sm rounded-md border bg-background/50 outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* BUTTON */}
                  <Button className="w-full h-11 rounded-lg text-sm font-medium group bg-primary hover:bg-primary/90">
                    Send Message
                    <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

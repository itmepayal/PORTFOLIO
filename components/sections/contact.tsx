"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, MessageSquare, Send } from "lucide-react";

import { Section } from "@/components/common/section";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export const Contact = () => {
  return (
    <Section id="contact">
      <BackgroundBlobs />
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ================= LEFT ================= */}
        <div className="w-full flex flex-col gap-6 sm:gap-8 text-center lg:text-left">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Badge
              className="
      inline-flex items-center gap-2
      px-5 py-4

      rounded-full
      border border-border/60

      bg-background/70
      backdrop-blur-xl

      text-foreground

      shadow-sm

      hover:bg-accent/40
      transition-all duration-300
    "
            >
              <Sparkles className="size-4 text-primary" />
              <span className="text-xs font-medium tracking-wide">
                Let’s Connect
              </span>
            </Badge>
          </motion.div>

          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Let’s build something <span className="text-primary">great</span>{" "}
            together.
          </h1>

          {/* DESC */}
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto lg:mx-0">
            Whether you have an idea, a project, or just want to connect — I’m
            always open to meaningful conversations.
          </p>

          {/* CONTACT INFO */}
          <div className="grid gap-3 sm:gap-4 mt-4">
            {/* EMAIL */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border transition"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Mail className="size-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium break-all">
                  itme.payalyadav@gmail.com
                </p>
              </div>
            </motion.div>

            {/* STATUS */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card border transition"
            >
              <div className="p-2 rounded-lg bg-green-500/10">
                <MessageSquare className="size-4 text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium">Available for work</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          <div className="relative">
            {/* GLOW */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-transparent blur-xl opacity-40" />

            <Card className="relative rounded-2xl border bg-background/80 backdrop-blur-xl shadow-xl">
              <CardContent className="p-6 sm:p-8 space-y-5 sm:space-y-6">
                {/* TITLE */}
                <div>
                  <h3 className="text-lg font-semibold">Send a message</h3>
                  <p className="text-sm text-muted-foreground">
                    I’ll get back within 24 hours
                  </p>
                </div>

                {/* FORM */}
                <form className="space-y-4 sm:space-y-5">
                  {/* NAME */}
                  <div className="space-y-1.5">
                    <Label className="font-normal">Name*</Label>
                    <Input
                      placeholder="John Doe"
                      className="bg-transparent! focus-visible:ring-primary"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="space-y-1.5">
                    <Label className="font-normal">Email*</Label>
                    <Input
                      type="email"
                      placeholder="john@gmail.com"
                      className="bg-transparent! focus-visible:ring-primary"
                    />
                  </div>

                  {/* MESSAGE */}
                  <div className="space-y-1.5">
                    <Label>Message</Label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-3 py-2 text-sm rounded-md border bg-transparent outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* BUTTON */}
                  <Button className="w-full h-10 sm:h-11 rounded-lg text-sm font-medium group">
                    Send Message
                    <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

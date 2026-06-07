"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "../common/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await fetch("/api/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        toast.success("Message sent successfully");
        setOpenSuccessModal(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [formData],
  );

  return (
    <Container>
      {/* ====================================================== */}
      {/* BACKGROUND */}
      {/* ====================================================== */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className=" absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        <div className=" absolute right-0 bottom-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>
      {/* ====================================================== */}
      {/* MAIN CONTAINER */}
      {/* ====================================================== */}
      <div className=" relative z-10 mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* ====================================================== */}
        {/* GRID */}
        {/* ====================================================== */}
        <div className=" grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* ====================================================== */}
          {/* LEFT CONTENT */}
          {/* ====================================================== */}
          <div className="space-y-8 text-center lg:text-left">
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
              <div className=" inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-4 py-2.5 backdrop-blur-xl shadow-sm">
                <Sparkles className="size-4 text-primary" />
                <span className=" text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Let&apos;s Connect
                </span>
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
              <h2 className=" text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.05em] leading-[0.95]">
                Have an idea?
                <span className=" mt-2 block bg-linear-to-r from-primary via-chart-3 to-chart-4 bg-clip-text text-transparent">
                  Let&apos;s build it.
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
              className=" max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-7 sm:leading-8 text-muted-foreground"
            >
              I help transform ideas into scalable digital products with
              enterprise-grade backend systems, realtime infrastructure,
              authentication, caching, APIs, and modern user experiences.
            </motion.p>

            {/* ====================================================== */}
            {/* CONTACT INFO CARD */}
            {/* ====================================================== */}
            <motion.a
              href="mailto:itme.payalyadav@gmail.com"
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className=" group relative block overflow-hidden rounded-3xl border border-border bg-background/70 p-5 sm:p-6 backdrop-blur-2xl shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
            >
              <div className=" absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex items-center gap-4">
                <div className=" flex size-14 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/15">
                  <Mail className="size-5" />
                </div>
                <div className="text-left">
                  <p className=" text-[11px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Email Me
                  </p>
                  <p className=" mt-1 text-sm sm:text-base font-semibold break-all transition-colors duration-300 group-hover:text-primary">
                    itme.payalyadav@gmail.com
                  </p>
                </div>
              </div>
            </motion.a>
            <div className=" flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock className="size-4 text-primary" />
              Usually replies within a few hours
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT SIDE */}
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
            {/* OUTER GLOW */}
            {/* ====================================================== */}
            <div className=" absolute -inset-1 rounded-4xl bg-linear-to-r from-primary/20 via-chart-3/10 to-chart-4/10 blur-2xl opacity-40" />
            {/* ====================================================== */}
            {/* CARD */}
            {/* ====================================================== */}
            <Card className=" relative overflow-hidden rounded-4xl border border-border bg-background/80 backdrop-blur-2xl shadow-2xl">
              <div className=" absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
              <CardContent className="relative z-10 p-6 sm:p-8 lg:p-10">
                {/* ====================================================== */}
                {/* HEADER */}
                {/* ====================================================== */}
                <div className="mb-8">
                  <h3 className=" text-2xl sm:text-3xl font-black tracking-tight">
                    Send a message
                  </h3>
                  <p className=" mt-2 text-sm text-muted-foreground">
                    Let&apos;s discuss your next backend or full-stack project.
                  </p>
                </div>

                {/* ====================================================== */}
                {/* FORM */}
                {/* ====================================================== */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Name</Label>
                    <Input
                      placeholder="Your name"
                      className=" h-12 rounded-2xl border-border bg-background/60 transition-all duration-300 focus-visible:border-primary/40 focus-visible:ring-primary/20"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Email</Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className=" h-12 rounded-2xl border-border bg-background/60 transition-all duration-300 focus-visible:border-primary/40 focus-visible:ring-primary/20"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Message</Label>
                    <textarea
                      rows={6}
                      placeholder="Tell me about your project..."
                      className=" w-full resize-none outline-none rounded-2xl border border-border bg-background/60 px-4 py-4 text-sm transition-all duration-300 focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className=" group h-12 w-full rounded-2xl text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/30"
                  >
                    {loading ? "Sending..." : "Send Message"}
                    <Send className=" ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Dialog open={openSuccessModal} onOpenChange={setOpenSuccessModal}>
        <DialogContent className="overflow-hidden border-border/50 bg-background/95 backdrop-blur-2xl w-[92vw] sm:max-w-xl! rounded-3xl sm:rounded-4xl p-0 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-32 sm:h-40 bg-linear-to-b from-emerald-500/15 to-transparent pointer-events-none" />
          <div className="absolute -top-10 -right-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 p-5 sm:p-8 md:p-10">
            <DialogHeader className="space-y-4 sm:space-y-5">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
                  <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-xl">
                    <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-emerald-500" />
                  </div>
                </div>
              </motion.div>
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 sm:px-4 sm:py-2">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] text-emerald-500">
                    Successfully Submitted
                  </span>
                </div>
              </div>
              <DialogTitle className="text-center text-2xl sm:text-3xl font-black tracking-tight">
                Thank You 🚀
              </DialogTitle>
              <DialogDescription className="mx-auto max-w-md text-center text-sm sm:text-base leading-6 sm:leading-7 text-muted-foreground">
                Your project enquiry has been received successfully.
                <br />
                <br />
                I'll review your requirements and get back to you within
                <span className="font-semibold text-foreground"> 24 hours</span>
                .
              </DialogDescription>
              <div className="rounded-2xl sm:rounded-3xl border border-border bg-muted/40 p-4 sm:p-5 text-left">
                <h4 className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold">
                  What happens next?
                </h4>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex gap-2 sm:gap-3">
                    <span className="font-bold text-primary shrink-0">01</span>
                    <span>I review your project requirements.</span>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <span className="font-bold text-primary shrink-0">02</span>
                    <span>I analyze scope, timeline and tech stack.</span>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <span className="font-bold text-primary shrink-0">03</span>
                    <span>You receive a detailed response via email.</span>
                  </div>
                </div>
              </div>
            </DialogHeader>
            <Button
              onClick={() => setOpenSuccessModal(false)}
              className="mt-6 sm:mt-8 h-11 sm:h-12 w-full rounded-2xl font-semibold shadow-lg shadow-primary/20"
            >
              Awesome ✨
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

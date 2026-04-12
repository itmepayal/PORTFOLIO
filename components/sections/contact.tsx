"use client";

import { motion } from "framer-motion";
import { Sparkles, Mail, MessageSquare, Send } from "lucide-react";
import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <Section
      id="contact"
      className="relative md:py-32 px-6 md:px-12 overflow-hidden text-sm"
    >
      <BackgroundBlobs />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <Badge className="flex w-fit items-center gap-2 px-5 py-4 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <Sparkles className="size-4 text-white/70" />
            <span className="text-white/80">Get In Touch</span>
          </Badge>
          <h1 className="text-3xl md:text-5xl font-semibold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
            Let’s Work Together
          </h1>
          <p className="text-white/60 leading-relaxed max-w-md">
            Have a project in mind or just want to say hi? Fill out the form and
            I’ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col gap-4 mt-4 text-sm">
            <div className="flex items-center gap-3 text-white/70">
              <Mail className="size-4" />
              itme.payalyadav@gmail.com
            </div>
            <div className="flex items-center gap-3 text-white/70">
              <MessageSquare className="size-4" />
              <span>Available for freelance & full-time</span>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="p-px rounded-3xl bg-linear-to-br from-white/10 to-white/5">
            <Card className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white/90">Send Message</CardTitle>
                <CardDescription className="text-white/50">
                  Quick response guaranteed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="grid gap-2">
                      <Label className="text-white/70">Name</Label>
                      <div className="relative">
                        <Input
                          required
                          placeholder="John Doe"
                          className="pl-1 bg-white/5 border-white/10 focus:border-white/30"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label className="text-white/70">Email</Label>
                      <div className="relative">
                        <Input
                          required
                          type="email"
                          placeholder="john@gmail.com"
                          className="pl-1 bg-white/5 border-white/10 focus:border-white/30"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label className="text-white/70">Message</Label>
                    <div className="relative">
                      <textarea
                        required
                        rows={5}
                        className="pl-1 pr-3 py-2 text-sm rounded-md border border-white/10 bg-white/5 text-white/80 outline-none focus:border-white/30 resize-none w-full"
                        placeholder="Write your message..."
                      />
                    </div>
                  </div>
                  <Button className="relative w-full rounded-xl bg-white text-black font-medium transition-all hover:scale-[1.02] disabled:opacity-50">
                    Send Message
                    <Send className="ml-2 size-4" />
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

"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
    <Section id="contact" className="py-24 md:py-32 px-6 md:px-12">
      <BackgroundBlobs />

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-14">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="flex items-center text-primary gap-2 px-4 py-1.5 text-sm rounded-full border border-border/50 bg-secondary/50 backdrop-blur-sm">
            <Sparkles className="size-4" />
            Contact
          </Badge>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Let’s Work Together
          </h1>
          <p className="text-muted-foreground max-w-md text-sm md:text-base">
            Open for freelance, full-time roles, or collaborations. Feel free to
            reach out anytime.
          </p>
        </motion.div>

        {/* Form Section */}
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="w-full border border-border/50 bg-background/50 backdrop-blur-md">
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
                <CardDescription>
                  Fill out the form and I’ll get back to you
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="flex flex-col gap-5">
                  {/* Name + Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2 text-left">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>

                    <div className="grid gap-2 text-left">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="grid gap-2 text-left">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={5}
                      className="px-3 py-2 text-sm rounded-md border border-border/50 bg-transparent outline-none focus:border-border resize-none"
                      placeholder="Write your message..."
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" className="mt-2 w-full">
                    Send Message
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

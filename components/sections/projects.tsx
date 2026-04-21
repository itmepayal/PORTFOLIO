"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Zap,
} from "lucide-react";
import { IconGitBranch } from "@tabler/icons-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

const projects = [
  {
    id: 1,
    type: "backend",
    title: "Authentication System",
    description:
      "Secure and scalable authentication system with advanced security layers.",
    tech: ["Node.js", "MongoDB", "JWT", "2FA"],
    highlights: [
      "OTP + 2FA based login flow",
      "Refresh token rotation & blacklist",
      "Role-based access control",
    ],
    metrics: [
      { label: "Requests / Day", value: "10K+" },
      { label: "Latency Reduction", value: "35%" },
      { label: "Security", value: "Protected" },
    ],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    type: "backend",
    title: "Submission Service",
    description:
      "Distributed code execution service using queue-based architecture.",
    tech: ["Node.js", "Redis", "BullMQ", "Workers"],
    highlights: [
      "Queue-based async processing",
      "Auto retry & failure handling",
      "Horizontally scalable workers",
    ],
    metrics: [
      { label: "Jobs / Day", value: "5K+" },
      { label: "Failure Handling", value: "Auto Retry" },
      { label: "Scalability", value: "Horizontal" },
    ],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    type: "fullstack",
    title: "E-Commerce",
    description:
      "Full-stack e-commerce platform with authentication, cart, and payments.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    highlights: [
      "User authentication & cart system",
      "Product filtering & search",
      "Secure checkout flow",
    ],
    image: "/projects/ecom/main.png",
    screens: ["/projects/ecom/1.png", "/projects/ecom/2.png"],
    github: "#",
    live: "#",
  },
];

export function Projects() {
  const [selected, setSelected] = useState<any>(null);

  // ================= DETAIL VIEW =================
  if (selected) {
    return (
      <Section id="#" className="space-y-12">
        {/* Back */}
        <Button
          variant="outline"
          onClick={() => setSelected(null)}
          className="gap-2 text-muted-foreground"
        >
          <ArrowLeft size={16} /> Back
        </Button>

        {/* Title */}
        <div className="space-y-3 max-w-2xl">
          <h1 className="text-xl md:text-2xl font-semibold">
            {selected.title}
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {selected.description}
          </p>
        </div>

        {/* Hero */}
        {selected.type === "fullstack" && selected.image && (
          <div className="rounded-xl overflow-hidden border">
            <img src={selected.image} className="w-full" />
          </div>
        )}

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tech */}
            <div>
              <h3 className="text-xs uppercase text-muted-foreground mb-2">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md border text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xs uppercase text-muted-foreground mb-3">
                {selected.type === "fullstack" ? "Features" : "Highlights"}
              </h3>

              <div className="space-y-3">
                {selected.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <CheckCircle2
                      size={16}
                      className="text-muted-foreground mt-0.5"
                    />
                    <p className="text-muted-foreground">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Screens */}
            {selected.type === "fullstack" && selected.screens && (
              <div>
                <h3 className="text-xs uppercase text-muted-foreground mb-3">
                  UI Preview
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {selected.screens.map((img: string, i: number) => (
                    <img key={i} src={img} className="rounded-lg border" />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button asChild size="sm">
                <a href={selected.github} target="_blank">
                  <IconGitBranch size={14} />
                  Code
                </a>
              </Button>

              <Button variant="outline" asChild size="sm">
                <a href={selected.live} target="_blank">
                  <ExternalLink size={14} />
                  Live
                </a>
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          {selected.type === "backend" && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase text-muted-foreground">
                Impact
              </h3>

              {selected.metrics.map((m: any, i: number) => (
                <div key={i} className="p-4 rounded-lg border">
                  <p className="text-lg font-medium">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    );
  }

  // ================= LIST =================
  return (
    <Section id="projects" className="space-y-10">
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <Card className="group relative overflow-hidden border bg-background/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md hover:-translate-y-1">
              {/* Subtle Glow Accent */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-br from-primary/5 to-transparent" />

              <CardContent className="relative z-10 p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold leading-snug tracking-tight group-hover:text-primary transition">
                    {p.title}
                  </h3>

                  <span
                    className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md border
  ${
    p.type === "fullstack"
      ? "text-green-500 border-green-500/20 bg-green-500/5"
      : "text-blue-500 border-blue-500/20 bg-blue-500/5"
  }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full
    ${p.type === "fullstack" ? "bg-green-500" : "bg-blue-500"}`}
                    />
                    {p.type === "fullstack" ? "Fullstack" : "Backend"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                  {p.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-muted/40 text-muted-foreground group-hover:bg-muted/60 transition"
                    >
                      {t}
                    </span>
                  ))}

                  {p.tech.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">
                      +{p.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-border/60 group-hover:bg-border transition" />

                {/* Footer */}
                <button
                  onClick={() => setSelected(p)}
                  className="text-[13px] text-muted-foreground hover:text-primary flex items-center gap-1 transition"
                >
                  View Project
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Zap,
} from "lucide-react";

import { IconBrandGithub } from "@tabler/icons-react";

import { Section } from "@/components/common/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// =========================================
// TYPES
// =========================================
type ProjectType = "backend" | "fullstack";

interface Project {
  id: number;
  type: ProjectType;
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  metrics?: { label: string; value: string }[];
  image?: string;
  github: string;
  live: string;
}

// =========================================
// DATA
// =========================================
const projects: Project[] = [
  {
    id: 1,
    type: "backend",
    title: "Authentication System",
    description:
      "Secure authentication system with JWT, refresh tokens, OTP and 2FA security layer.",
    tech: ["Node.js", "MongoDB", "JWT", "2FA"],
    highlights: [
      "OTP + 2FA login flow",
      "Refresh token rotation",
      "Role-based access control",
    ],
    image: "/projects/auth.png",
    metrics: [
      { label: "Requests / Day", value: "10K+" },
      { label: "Latency", value: "-35%" },
      { label: "Security", value: "High" },
    ],
    github: "#",
    live: "#",
  },
  {
    id: 2,
    type: "backend",
    title: "Queue Service",
    description:
      "Distributed job processing system using Redis + BullMQ workers.",
    tech: ["Node.js", "Redis", "BullMQ"],
    highlights: [
      "Queue-based processing",
      "Auto retry mechanism",
      "Worker scaling support",
    ],
    image: "/projects/queue.png",
    metrics: [
      { label: "Jobs / Day", value: "5K+" },
      { label: "Reliability", value: "99.9%" },
      { label: "Scaling", value: "Auto" },
    ],
    github: "#",
    live: "#",
  },
  {
    id: 3,
    type: "fullstack",
    title: "E-Commerce Platform",
    description:
      "Full-stack ecommerce app with cart, payments, auth and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    highlights: [
      "Cart & checkout system",
      "Secure payments",
      "Admin dashboard",
    ],
    image: "/projects/ecom.png",
    github: "#",
    live: "#",
  },
];

// =========================================
// CONFIG
// =========================================
const ITEMS_PER_PAGE = 2;

// =========================================
// COMPONENT
// =========================================
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return projects.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  // ================= DETAIL VIEW =================
  if (selected) {
    return (
      <Section id="" className="space-y-10">
        <Button
          variant="outline"
          onClick={() => setSelected(null)}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        {/* HERO */}
        {selected.image && (
          <div className="rounded-2xl overflow-hidden border shadow-lg">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-[320px] object-cover"
            />
          </div>
        )}

        {/* TITLE */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{selected.title}</h1>
          <p className="text-muted-foreground text-sm max-w-2xl">
            {selected.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* TECH */}
            <div>
              <h3 className="text-xs uppercase text-muted-foreground mb-3">
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border bg-background/40"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* FEATURES */}
            <div>
              <h3 className="text-xs uppercase text-muted-foreground mb-3">
                Highlights
              </h3>

              <div className="space-y-2">
                {selected.highlights.map((h) => (
                  <div key={h} className="flex gap-2 text-sm">
                    <CheckCircle2 size={16} className="text-primary" />
                    {h}
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <Button asChild size="sm">
                <a href={selected.github} target="_blank">
                  <IconBrandGithub size={14} />
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

          {/* METRICS */}
          {selected.metrics && (
            <div className="space-y-4">
              <h3 className="text-xs uppercase text-muted-foreground">
                Impact
              </h3>

              {selected.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 rounded-xl border bg-background/40 hover:shadow-md transition"
                >
                  <p className="text-lg font-semibold">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    );
  }

  // ================= LIST VIEW =================
  return (
    <Section id="#" className="space-y-10">
      <div className="grid md:grid-cols-3 gap-8">
        {paginated.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group overflow-hidden border bg-background/60 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl">
              {/* IMAGE */}
              {p.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={p.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                    alt={p.title}
                  />
                </div>
              )}

              <CardContent className="p-5 space-y-4">
                {/* HEADER */}
                <div className="flex justify-between">
                  <h3 className="font-semibold group-hover:text-primary transition">
                    {p.title}
                  </h3>

                  <Badge variant="outline">{p.type}</Badge>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {p.description}
                </p>

                {/* CTA */}
                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setSelected(p)}
                    className="text-sm flex items-center gap-1 hover:text-primary"
                  >
                    View Case Study <ArrowRight size={14} />
                  </button>

                  <Zap
                    size={14}
                    className="opacity-50 group-hover:opacity-100"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>

        <span className="text-sm text-muted-foreground">
          {page} / {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </Section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/common/section";
import { Card } from "@/components/ui/card";
import { DSASection } from "../proof/dsa-section";
import { BackgroundBlobs } from "../backgrounds/background-blobs";

const tabs = ["DSA", "System Design"];

const stats = [
  {
    title: "LeetCode",
    solved: 103,
    total: 3902,
    easy: 29,
    medium: 65,
    hard: 9,
    description:
      "Consistently solving algorithmic challenges with a focus on patterns, time-space optimization, and writing production-level clean code.",
  },
  {
    title: "Striver A2Z",
    solved: 225,
    total: 1074,
    easy: 86,
    medium: 87,
    hard: 52,
    description:
      "Following a structured DSA roadmap, mastering core concepts from basics to advanced topics with a strong emphasis on problem-solving depth.",
  },
];

export function Resume() {
  const [active, setActive] = useState("DSA");

  return (
    <Section id="skills-proof">
      <BackgroundBlobs />
      {/* TABS */}
      <div className="flex justify-start">
        <div className="flex items-center gap-1 p-1 rounded-2xl border border-border bg-muted/40 backdrop-blur-md shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative px-5 py-2 text-sm font-medium rounded-xl transition-colors"
            >
              {/* Active Background */}
              {active === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-xl bg-background border border-border shadow-sm"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Text */}
              <span
                className={`relative z-10 transition-colors duration-200 ${
                  active === tab
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        {/* ================= DSA ================= */}
        {active === "DSA" && <DSASection active={active} stats={stats} />}

        {/* ================= SYSTEM DESIGN ================= */}
        {active === "System Design" && (
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[
                "Client",
                "Load Balancer",
                "API Server",
                "Redis Cache",
                "Database",
                "Queue",
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <div className="p-3 rounded-lg bg-card border flex-1">
                    {step}
                  </div>
                </div>
              ))}
            </div>

            <Card className="p-6 rounded-2xl space-y-4 hover:shadow-xl transition">
              <h4 className="font-semibold text-lg">Food Delivery System</h4>

              <p className="text-sm text-muted-foreground">
                Designed a scalable backend architecture handling high traffic
                using caching and async queues.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Node.js", "Redis", "Kafka", "Scaling"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        )}
      </motion.div>
    </Section>
  );
}

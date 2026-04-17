"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

/* ================= SYSTEM DATA ================= */
const systems = [
  {
    name: "Food Delivery",
    icon: "🍔",
    flow: [
      { name: "Client", desc: "User sends request via app/web" },
      { name: "Load Balancer", desc: "Distributes traffic" },
      { name: "API Server", desc: "Handles logic & auth" },
      { name: "Redis Cache", desc: "Fast data access" },
      { name: "Database", desc: "Stores persistent data" },
      { name: "Kafka Queue", desc: "Async processing" },
    ],
    features: [
      "⚡ Horizontal scaling",
      "🚀 Redis caching",
      "📩 Kafka queues",
      "🔒 Auth & rate limiting",
      "📦 Microservices ready",
    ],
    tech: ["Node.js", "Redis", "Kafka", "MongoDB", "Docker", "Nginx"],
  },
  {
    name: "Chat System",
    icon: "💬",
    flow: [
      { name: "Client", desc: "User sends message" },
      { name: "WebSocket Server", desc: "Real-time communication" },
      { name: "Message Queue", desc: "Async delivery" },
      { name: "Redis", desc: "Online users cache" },
      { name: "DB", desc: "Message storage" },
    ],
    features: [
      "⚡ Real-time messaging",
      "📡 WebSockets",
      "🟢 Presence tracking",
      "📩 Message queue",
    ],
    tech: ["Node.js", "Socket.io", "Redis", "MongoDB"],
  },
];

/* ================= MAIN ================= */
export const SystemDesign = ({ active }: { active: string }) => {
  const [activeSystem, setActiveSystem] = useState(systems[0]);

  if (active !== "System Design") return null;

  return (
    <div className="space-y-6">
      {/* ================= SYSTEM SWITCH ================= */}
      <div className="flex gap-2 flex-wrap">
        {systems.map((sys) => (
          <button
            key={sys.name}
            onClick={() => setActiveSystem(sys)}
            className={`px-4 py-2 rounded-xl text-sm border transition-all duration-200 ${
              activeSystem.name === sys.name
                ? "bg-primary/10 text-white shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {sys.icon} {sys.name}
          </button>
        ))}
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid lg:grid-cols-2 gap-10 h-112.5 md:h-125 lg:h-137.5">
        {/* ================= LEFT FLOW ================= */}
        <div className="space-y-4 overflow-y-auto pr-2 custom-scroll">
          {activeSystem.flow.map((step, i) => (
            <div key={i} className="flex items-start gap-4 group">
              {/* DOT + LINE */}
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full" />
                {i !== activeSystem.flow.length - 1 && (
                  <div className="w-0.5 h-10 bg-border group-hover:bg-primary transition" />
                )}
              </div>

              {/* STEP CARD */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-card border flex-1 hover:shadow-md transition"
              >
                <p className="text-sm font-medium">{step.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {step.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT CARD ================= */}
        <Card className="p-6 rounded-2xl flex flex-col justify-between h-87.5">
          {/* ================= TOP CONTENT ================= */}
          <div className="space-y-5 overflow-y-auto pr-1 custom-scroll">
            {/* HEADER */}
            <div>
              <h4 className="font-semibold text-lg">
                {activeSystem.icon} {activeSystem.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Scalable system design handling high traffic with optimized
                latency and reliability.
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-2">
              {activeSystem.features.map((f, i) => (
                <p key={i} className="text-xs text-muted-foreground">
                  {f}
                </p>
              ))}
            </div>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-2">
              {activeSystem.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* ================= BOTTOM METRICS ================= */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm font-semibold">1M+</p>
              <p className="text-xs text-muted-foreground">Users</p>
            </div>
            <div>
              <p className="text-sm font-semibold">99.9%</p>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </div>
            <div>
              <p className="text-sm font-semibold">&lt;200ms</p>
              <p className="text-xs text-muted-foreground">Latency</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

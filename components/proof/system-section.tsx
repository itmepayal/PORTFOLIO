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
      "Horizontal scaling",
      "Redis caching",
      "Kafka queues",
      "Auth & rate limiting",
      "Microservices ready",
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
      "Real-time messaging",
      "WebSockets",
      "Presence tracking",
      "Message queue",
    ],
    tech: ["Node.js", "Socket.io", "Redis", "MongoDB"],
  },
];

/* ================= MAIN ================= */
export const SystemDesign = ({ active }: { active: string }) => {
  const [activeSystem, setActiveSystem] = useState(systems[0]);

  if (active !== "System Design") return null;

  return (
    <div className="space-y-8">
      {/* ================= SYSTEM SWITCH ================= */}
      <div className="flex gap-3 flex-wrap">
        {systems.map((sys) => {
          const isActive = activeSystem.name === sys.name;

          return (
            <button
              key={sys.name}
              onClick={() => setActiveSystem(sys)}
              className={`relative px-5 py-2.5 rounded-xl text-sm border transition-all duration-300 ${
                isActive
                  ? "bg-primary text-white shadow-lg border-primary"
                  : "bg-background/60 text-muted-foreground hover:bg-accent border-border"
              }`}
            >
              <span className="relative z-10">
                {sys.icon} {sys.name}
              </span>

              {/* glow */}
              {isActive && (
                <span className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-70" />
              )}
            </button>
          );
        })}
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= FLOW ================= */}
        <div className="relative space-y-6">
          {/* vertical line */}
          <div className="absolute left-2 top-0 h-full w-0.5 bg-linear-to-b from-primary via-primary/40 to-transparent" />

          {activeSystem.flow.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative flex items-start gap-4 group"
            >
              {/* DOT */}
              <div className="relative z-10">
                <div className="w-4 h-4 rounded-full bg-primary shadow-md group-hover:scale-110 transition" />
              </div>

              {/* CARD */}
              <motion.div
                whileHover={{ y: -4 }}
                className="flex-1 p-4 rounded-xl border bg-background/70 backdrop-blur-xl hover:shadow-lg transition-all"
              >
                <p className="text-sm font-semibold">{step.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {step.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ================= DETAILS ================= */}
        <Card className="relative p-6 rounded-2xl border bg-background/70 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          {/* glow */}
          <div className="absolute -inset-1 bg-linear-to-r from-primary/10 to-transparent blur-xl opacity-40" />

          {/* TOP */}
          <div className="relative space-y-6">
            <div>
              <h4 className="text-lg font-semibold">
                {activeSystem.icon} {activeSystem.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-2">
                Scalable system handling high traffic with optimized latency and
                reliability.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeSystem.features.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="text-xs px-3 py-2 rounded-lg bg-muted/50 border"
                >
                  {f}
                </motion.div>
              ))}
            </div>

            {/* TECH */}
            <div className="flex flex-wrap gap-2">
              {activeSystem.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* BOTTOM METRICS */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t mt-6">
            <Metric label="Users" value="1M+" />
            <Metric label="Uptime" value="99.9%" />
            <Metric label="Latency" value="<200ms" />
          </div>
        </Card>
      </div>
    </div>
  );
};

/* ================= METRIC ================= */
const Metric = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

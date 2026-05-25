"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { menu } from "./menu";

export default function SidebarMenu() {
  return (
    <div className="mt-8 space-y-2">
      {menu.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.button
            key={index}
            whileHover={{ x: 4 }}
            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-all
              
              ${
                item.active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </div>

            <ChevronRight className="h-4 w-4 opacity-50" />
          </motion.button>
        );
      })}
    </div>
  );
}

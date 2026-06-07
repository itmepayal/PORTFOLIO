"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { menu } from "./menu";

interface SidebarMenuProps {
  search: string;
}

export default function SidebarMenu({ search }: SidebarMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const filteredMenu = menu.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );
  const handleClick = (item: (typeof menu)[number]) => {
    router.push(item.href);
  };
  return (
    <div className="mt-8 space-y-3">
      {filteredMenu.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <motion.button
            key={item.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(item)}
            className={`
              group relative flex w-full items-center justify-between
              overflow-hidden rounded-2xl border px-4 py-3.5
              transition-all duration-300
              ${
                isActive
                  ? `
                    border-primary/30
                    bg-primary
                    text-primary-foreground
                    shadow-lg shadow-primary/25
                  `
                  : `
                    border-border/50
                    bg-card/40 backdrop-blur-xl
                    hover:border-primary/20 hover:bg-accent/60
                  `
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeSidebarGlow"
                className="absolute inset-0 bg-linear-to-r from-primary/10 to-primary/5"
              />
            )}
            <div className="relative z-10 flex items-center gap-3">
              <div
                className={`
                  flex h-10 w-10 items-center justify-center rounded-xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary/15"
                  }
                `}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span
                  className={`
                    text-sm font-semibold tracking-tight
                    ${isActive ? "text-primary-foreground" : "text-foreground"}
                  `}
                >
                  {item.label}
                </span>
                <span
                  className={`
                    text-[11px]
                    ${
                      isActive
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }
                  `}
                >
                  Manage {item.label.toLowerCase()}
                </span>
              </div>
            </div>
            <motion.div
              animate={{ x: isActive ? 4 : 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <ChevronRight
                className={`h-4 w-4 transition-all ${
                  isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                }`}
              />
            </motion.div>
            <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/10 transition-all duration-300" />
          </motion.button>
        );
      })}
      {filteredMenu.length === 0 && (
        <div className="rounded-2xl border border-dashed p-4 text-center text-sm text-muted-foreground">
          No menu items found
        </div>
      )}
    </div>
  );
}

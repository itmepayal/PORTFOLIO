"use client";

import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi2";
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
            whileHover={{ x: 6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(item)}
            className={`group relative flex w-full items-center justify-between overflow-hidden border px-4 py-3.5 transition-all duration-300 ${
              isActive
                ? "border-primary/40 bg-linear-to-br from-primary to-secondary-foreground text-white"
                : "border-border bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-card/60"
            }`}
            style={
              isActive
                ? {
                    clipPath:
                      "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                  }
                : undefined
            }
          >
            {!isActive && (
              <>
                <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 75%)",
                  }}
                />
              </>
            )}

            <div className="relative z-10 flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                  isActive
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-border bg-background text-primary"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col items-start">
                <span
                  className={`text-sm font-semibold tracking-tight ${
                    isActive ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`font-mono text-[0.62rem] uppercase tracking-widest ${
                    isActive ? "text-white/70" : "text-muted-foreground"
                  }`}
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
              <HiChevronRight
                className={`h-4 w-4 transition-all ${
                  isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                }`}
              />
            </motion.div>
          </motion.button>
        );
      })}
      {filteredMenu.length === 0 && (
        <div className="border border-dashed border-border p-4 text-center font-mono text-[0.72rem] uppercase tracking-widest text-muted-foreground">
          No menu items found
        </div>
      )}
    </div>
  );
}

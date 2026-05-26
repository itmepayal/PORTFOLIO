"use client";

import { motion } from "framer-motion";

import { ChevronRight, Sparkles } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { menu } from "./menu";

export default function SidebarMenu() {
  const pathname = usePathname();

  const router = useRouter();

  const handleClick = (item: any) => {
    router.push(item.href);
  };

  return (
    <div className="mt-8 flex flex-col gap-2">
      {menu.map((item, index) => {
        const Icon = item.icon;

        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <motion.button
            key={item.key}
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
              delay: index * 0.05,
            }}
            whileHover={{
              x: 4,
            }}
            whileTap={{
              scale: 0.985,
            }}
            onClick={() => handleClick(item)}
            className={`
              group relative flex w-full items-center justify-between
              overflow-hidden rounded-3xl border p-3.5

              transition-all duration-300 ease-out

              ${
                isActive
                  ? `
                    border-primary/20
                    bg-primary
                    text-primary-foreground

                    shadow-xl
                    shadow-primary/20
                  `
                  : `
                    border-border/50
                    bg-card/60
                    backdrop-blur-2xl

                    hover:border-primary/15
                    hover:bg-accent/70
                  `
              }
            `}
          >
            {/* ACTIVE BACKGROUND */}
            {isActive && (
              <>
                <motion.div
                  layoutId="sidebar-active-bg"
                  className="
                    absolute inset-0

                    bg-linear-to-r
                    from-white/10
                    via-white/5
                    to-transparent
                  "
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />

                {/* ACTIVE INDICATOR */}
                <motion.div
                  layoutId="sidebar-indicator"
                  className="
                    absolute left-0 top-3 bottom-3
                    w-1 rounded-r-full bg-white
                  "
                />
              </>
            )}

            {/* HOVER GLOW */}
            <div
              className="
                absolute inset-0 opacity-0
                transition-opacity duration-300
                group-hover:opacity-100
              "
            >
              <div
                className="
                  absolute -right-10 top-0
                  h-28 w-28 rounded-full
                  bg-primary/10 blur-3xl
                "
              />
            </div>

            {/* LEFT SIDE */}
            <div className="relative z-10 flex items-center gap-3">
              {/* ICON */}
              <div
                className={`
                  relative flex h-12 w-12 items-center justify-center
                  rounded-2xl border

                  transition-all duration-300

                  ${
                    isActive
                      ? `
                        border-white/10
                        bg-white/10
                        text-white
                      `
                      : `
                        border-border/50
                        bg-background/70
                        text-primary

                        group-hover:border-primary/20
                        group-hover:bg-primary/10
                      `
                  }
                `}
              >
                {/* ICON GLOW */}
                {isActive && (
                  <div
                    className="
                      absolute inset-0 rounded-2xl
                      bg-white/10 blur-xl
                    "
                  />
                )}

                <Icon className="relative z-10 h-5 w-5" />
              </div>

              {/* TEXT */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      text-sm font-semibold tracking-tight

                      ${
                        isActive ? "text-primary-foreground" : "text-foreground"
                      }
                    `}
                  >
                    {item.label}
                  </span>

                  {item.new && (
                    <div
                      className="
                        flex items-center gap-1
                        rounded-full

                        bg-emerald-500/15
                        px-2 py-0.5

                        text-[10px] font-bold
                        text-emerald-500
                      "
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      NEW
                    </div>
                  )}
                </div>

                <span
                  className={`
                    mt-0.5 text-[11px] font-medium

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

            {/* RIGHT SIDE */}
            <div className="relative z-10 flex items-center gap-2">
              {/* BADGE */}
              {item.badge && (
                <div
                  className={`
                    flex h-6 min-w-6 items-center justify-center
                    rounded-full px-2

                    text-[10px] font-bold

                    ${
                      isActive
                        ? `
                          bg-white/15
                          text-white
                        `
                        : `
                          bg-primary/10
                          text-primary
                        `
                    }
                  `}
                >
                  {item.badge}
                </div>
              )}

              {/* ARROW */}
              <motion.div
                animate={{
                  x: isActive ? 4 : 0,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <ChevronRight
                  className={`
                    h-4 w-4 transition-all duration-300

                    ${
                      isActive
                        ? `
                          opacity-100
                          text-white
                        `
                        : `
                          opacity-40
                          text-muted-foreground

                          group-hover:translate-x-1
                          group-hover:opacity-80
                          group-hover:text-primary
                        `
                    }
                  `}
                />
              </motion.div>
            </div>

            {/* HOVER BORDER */}
            <div
              className="
                absolute inset-0 rounded-3xl
                border border-primary/0

                transition-all duration-300
                group-hover:border-primary/10
              "
            />
          </motion.button>
        );
      })}
    </div>
  );
}

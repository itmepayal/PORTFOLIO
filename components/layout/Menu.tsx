"use client";

/* =========================
  DEPENDENCIES
   ========================= */
import Link from "next/link";
import { useState } from "react";

/* =========================
  DATA
   ========================= */
import { SECTIONS } from "@/constants/sections";

/* =========================
  UI COMPONENTS
   ========================= */
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

/* =========================
  ICONS
   ========================= */
import { Menu } from "lucide-react";

/* =========================================================
  COMPONENT: MenuSheet
   ========================================================= */
export const MenuSheet = () => {
  /* -------------------------
    STATE
     ------------------------- */
  const [active, setActive] = useState("#home");

  return (
    /* =========================
      FLOATING WRAPPER
       ========================= */
    <div className="fixed right-2 top-2 z-50">
      <Sheet>
        {/* -------------------------
            TRIGGER BUTTON
           ------------------------- */}
        <SheetTrigger asChild>
          <button
            aria-label="Open Menu"
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition flex items-center justify-center"
          >
            <Menu className="w-4 h-4" />
          </button>
        </SheetTrigger>

        {/* -------------------------
            SHEET CONTENT
           ------------------------- */}
        <SheetContent
          side="right"
          className="flex flex-col w-80 bg-card border-l border-border"
        >
          {/* -------------------------
              HEADER
             ------------------------- */}
          <div className="px-6 py-5">
            <p className="text-xs text-muted-foreground tracking-wider uppercase">
              Navigation
            </p>

            <SheetTitle className="text-lg font-semibold mt-1">Menu</SheetTitle>
          </div>

          <Separator />

          {/* -------------------------
              NAVIGATION
             ------------------------- */}
          <nav className="flex flex-col px-3 gap-1">
            {SECTIONS.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.href;

              return (
                <SheetClose asChild key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg text-sm
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-accent text-foreground font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <Separator />

          {/* -------------------------
              FOOTER
             ------------------------- */}
          <div className="mt-auto px-6 py-5 text-center">
            <p className="text-xs text-muted-foreground">© 2026 Payal Yadav</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

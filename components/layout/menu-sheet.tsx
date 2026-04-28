import Link from "next/link";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import { IconMenu2, IconHome, IconStar, IconMail } from "@tabler/icons-react";

export const MenuSheet = () => {
  const [active, setActive] = useState("#home");

  const links = [
    { name: "Home", href: "#home", icon: IconHome },
    { name: "Skills", href: "#skills", icon: IconStar },
    { name: "Proof", href: "#proof", icon: IconStar },
    { name: "Education", href: "#education", icon: IconStar },
    { name: "Contact", href: "#contact", icon: IconMail },
  ];
  return (
    <div className="fixed right-2 top-2 z-50">
      <Sheet>
        {/* Trigger */}
        <SheetTrigger asChild>
          <button
            aria-label="Open Menu"
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg transition flex items-center justify-center"
          >
            <IconMenu2 className="w-4 h-4" />
          </button>
        </SheetTrigger>

        {/* Content */}
        <SheetContent
          side="right"
          className="flex flex-col w-80 bg-card border-l border-border"
        >
          {/* Header */}
          <div className="px-6 py-5">
            <p className="text-xs text-muted-foreground tracking-wider uppercase">
              Navigation
            </p>
            <h2 className="text-lg font-semibold mt-1">Menu</h2>
          </div>

          <Separator />

          {/* Links */}
          <nav className="flex flex-col px-3 gap-1">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.href;

              return (
                <SheetClose asChild key={item.href}>
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
                    {item.name}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <Separator />

          {/* Footer */}
          <div className="mt-auto px-6 py-5 text-center">
            <p className="text-xs text-muted-foreground">© 2026 Payal Yadav</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

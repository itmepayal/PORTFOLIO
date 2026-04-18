"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  IconMenu2,
  IconHome,
  IconUser,
  IconFileText,
  IconBriefcase,
  IconStar,
  IconMail,
  IconSend,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export const MenuSheet = () => {
  const links = [
    { name: "Home", href: "#home", icon: IconHome },
    { name: "About", href: "#about", icon: IconUser },
    { name: "Resume", href: "#resume", icon: IconFileText },
    { name: "Projects", href: "#projects", icon: IconBriefcase },
    { name: "Education", href: "#education", icon: IconStar },
    { name: "Skills", href: "#skills", icon: IconStar },
    { name: "Contact", href: "#contact", icon: IconMail },
  ];

  return (
    <div className="fixed right-3 top-3 md:right-5 md:top-3 z-50">
      <Sheet>
        {/* Trigger */}
        <SheetTrigger asChild>
          <Button
            aria-label="Open menu"
            className="h-10 w-10 rounded-full bg-secondary border border-primary hover:scale-105 transition"
          >
            <IconMenu2 className="w-5 h-5 text-white" />
          </Button>
        </SheetTrigger>

        {/* Content */}
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-white text-lg tracking-wide">
              Menu
            </SheetTitle>
          </SheetHeader>

          <Separator className="my-3" />

          {/* Links */}
          <div className="flex flex-col gap-2">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-3 px-4 py-3 text-gray-300 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/5 hover:translate-x-1"
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm tracking-wide">{item.name}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>

          <Separator className="my-4" />

          {/* Socials */}
          <div className="flex gap-3 justify-center">
            <Link href="https://github.com/" target="_blank">
              <div className="p-3 rounded border border-white/20 hover:bg-white/10 transition">
                <IconBrandGithub className="size-5 text-gray-300 hover:text-white" />
              </div>
            </Link>

            <Link href="https://linkedin.com/" target="_blank">
              <div className="p-3 rounded border border-white/20 hover:bg-white/10 transition">
                <IconBrandLinkedin className="size-5 text-gray-300 hover:text-white" />
              </div>
            </Link>
          </div>

          <Separator className="my-4" />

          {/* CTA */}
          <SheetClose asChild>
            <Button className="mt-auto py-5 bg-white text-black flex items-center gap-2 justify-center rounded-xl transition-all duration-300 hover:bg-gray-200 hover:scale-[1.02]">
              <IconSend className="w-5 h-5" />
              Hire Me
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

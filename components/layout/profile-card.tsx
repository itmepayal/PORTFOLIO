"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Mail, MapPin, Phone, MessageCircle, Circle } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export const ProfileCard = () => {
  const contactItems = [
    {
      icon: Mail,
      text: "itme.payalyadav@gmail.com",
      href: "mailto:itme.payalyadav@gmail.com",
    },
    {
      icon: Phone,
      text: "+91 7228832443",
      href: "tel:+917228832443",
    },
    {
      icon: MessageCircle,
      text: "WhatsApp",
      href: "https://wa.me/917228832443",
    },
    {
      icon: MapPin,
      text: "Bhilad, Valsad District, Gujarat",
    },
  ];

  const socials = [
    { icon: IconBrandGithub, link: "#" },
    { icon: IconBrandLinkedin, link: "#" },
  ];

  return (
    <div className="flex flex-col gap-4 items-center justify-between min-h-screen py-4 px-4">
      {/* Profile Card */}
      <div>
        <Card className="w-[92vw] max-w-sm md:w-96 bg-transparent border border-border shadow-lg rounded-xl p-5 sm:p-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-border shadow-sm">
                <Image
                  src="/profile.jpeg"
                  alt="profile"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Status Dot */}
              <span className="absolute bottom-4.5 right-4.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-green-700 animate-pulse" />
            </div>
          </div>

          <CardContent className="flex flex-col items-center text-center mt-4 sm:mt-5 gap-2.5">
            <h2 className="text-lg sm:text-xl font-semibold text-card-foreground">
              Payal Yadav
            </h2>

            <Badge variant="secondary" className="text-xs sm:text-sm">
              Full Stack Developer
            </Badge>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs leading-relaxed">
              Building scalable backend systems & modern full-stack apps with
              clean architecture.
            </p>
          </CardContent>

          <CardFooter className="mt-4 sm:mt-5">
            <Button className="w-full rounded-lg h-10 sm:h-11">
              Let’s Work Together
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Contact Card */}
      <div>
        <Card className="w-[92vw] max-w-sm md:w-96 bg-transparent border border-border shadow-lg rounded-xl p-5 sm:p-6">
          <CardHeader className="pb-2 sm:pb-3 space-y-2">
            <Badge
              variant="outline"
              className="w-fit text-xs flex items-center gap-2 px-3 py-2 bg-green-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available for work
            </Badge>

            <CardTitle className="text-sm sm:text-base">Get in Touch</CardTitle>

            <CardDescription className="text-xs sm:text-sm">
              Let’s build something meaningful together
            </CardDescription>
          </CardHeader>

          {/* Contact Items */}
          <CardContent className="flex flex-col gap-1.5 sm:gap-2 mt-2">
            {contactItems.map((item, i) => {
              const Icon = item.icon;

              const content = (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-all duration-200 cursor-pointer">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-xs sm:text-sm text-card-foreground truncate">
                    {item.text}
                  </span>
                </div>
              );

              return item.href ? (
                <Link href={item.href} key={i} target="_blank">
                  {content}
                </Link>
              ) : (
                <div key={i}>{content}</div>
              );
            })}
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-3 mt-4">
            {/* Socials */}
            <div className="flex gap-2 sm:gap-3">
              {socials.map((item, i) => {
                const Icon = item.icon;

                return (
                  <Link href={item.link} key={i} target="_blank">
                    <div className="p-2 sm:p-2.5 rounded-lg border border-border hover:bg-accent transition-all duration-200">
                      <Icon className="size-4 sm:size-5 text-muted-foreground hover:text-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

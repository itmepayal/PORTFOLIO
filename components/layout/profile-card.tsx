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

import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
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
      href: "tel:+7228832443",
    },
    {
      icon: MessageCircle,
      text: "WhatsApp",
      href: "https://wa.me/7228832443",
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
    <div className="flex flex-col items-center gap-6 md:fixed md:top-6 md:left-10">
      {/* Profile Card */}
      <Card className="w-[90vw] max-w-sm md:w-96 bg-card border border-border shadow-lg rounded-xl p-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-border shadow-sm">
              <Image
                src="/profile.jpeg"
                alt="profile"
                width={158}
                height={158}
                className="object-cover w-full h-full rounded-full"
              />
            </div>

            {/* Status Dot */}
            <span className="absolute bottom-4.5 right-4.5 h-3 w-3 rounded-full bg-green-500 border border-green-500 animate-pulse" />
          </div>
        </div>

        <CardContent className="flex flex-col items-center text-center mt-5 gap-2">
          <h2 className="text-xl font-semibold text-card-foreground">
            Payal Yadav
          </h2>

          <Badge variant="secondary">Full Stack Developer</Badge>

          <p className="text-sm text-muted-foreground max-w-xs">
            Building scalable backend systems & modern full-stack apps with
            clean architecture.
          </p>
        </CardContent>

        <CardFooter className="mt-4">
          <Button className="w-full rounded-lg">Let’s Work Together</Button>
        </CardFooter>
      </Card>

      {/* Contact Card */}
      <Card className="w-[90vw] max-w-sm md:w-96 bg-card border border-border shadow-lg rounded p-6">
        <CardHeader className="pb-3">
          <Badge variant="outline" className="w-fit">
            Available for work
          </Badge>

          <CardTitle className="text-base">Get in Touch</CardTitle>

          <CardDescription>
            Let’s build something meaningful together
          </CardDescription>
        </CardHeader>

        {/* Contact Items */}
        <CardContent className="flex flex-col gap-2">
          {contactItems.map((item, i) => {
            const Icon = item.icon;

            const content = (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition cursor-pointer">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-card-foreground">
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
        <CardFooter className="flex flex-col gap-4 mt-3">
          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((item, i) => {
              const Icon = item.icon;

              return (
                <Link href={item.link} key={i} target="_blank">
                  <div className="p-2.5 rounded-lg border border-border hover:bg-accent transition">
                    <Icon className="size-5 text-muted-foreground hover:text-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Button variant="outline" className="w-full rounded-lg">
            Contact Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

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
      text: "your@email.com",
      href: "mailto:your@email.com",
    },
    {
      icon: Phone,
      text: "+91 9876543210",
      href: "tel:+919876543210",
    },
    {
      icon: MessageCircle,
      text: "WhatsApp",
      href: "https://wa.me/919876543210",
    },
    {
      icon: MapPin,
      text: "Vadodara, India",
    },
  ];

  const socials = [
    { icon: IconBrandGithub, link: "#" },
    { icon: IconBrandLinkedin, link: "#" },
  ];

  return (
    <div className="flex flex-col items-center gap-6 md:fixed md:top-6 md:left-10">
      <Card className="w-[90vw] max-w-sm md:w-96 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-lg">
            <Image
              src="/profile.jpeg"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <CardContent className="flex flex-col items-center text-center mt-4 gap-2">
          <h2 className="text-xl font-semibold text-white">Payal Yadav</h2>

          <Badge className="bg-secondary text-white border-none px-2">
            Full Stack Developer
          </Badge>

          <p className="text-sm text-gray-400 max-w-xs">
            Building scalable backend systems & modern full-stack apps with
            clean architecture.
          </p>
        </CardContent>

        <CardFooter className="my-4">
          <Button className="w-full rounded-xl bg-white text-black hover:bg-gray-200 transition">
            Let’s Work Together
          </Button>
        </CardFooter>
      </Card>

      <Card className="w-[90vw] max-w-sm md:w-96 bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5">
        <CardHeader className="pb-3">
          <Badge className="w-fit bg-green-500/20 text-green-400 border-none my-1">
            Available for work
          </Badge>

          <CardTitle className="text-white text-lg">Get in Touch</CardTitle>

          <CardDescription className="text-gray-400">
            Let’s build something amazing together
          </CardDescription>
        </CardHeader>

        {/* Contact Items */}
        <CardContent className="flex flex-col gap-2">
          {contactItems.map((item, i) => {
            const Icon = item.icon;

            const content = (
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition cursor-pointer">
                <Icon className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-200">{item.text}</span>
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
        <CardFooter className="flex flex-col gap-4 my-1">
          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((item, i) => {
              const Icon = item.icon;

              return (
                <Link href={item.link} key={i} target="_blank">
                  <div className="p-3 rounded-xl border border-white/10 hover:bg-white/10 transition">
                    <Icon className="size-5 text-gray-300 hover:text-white" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Button className="w-full rounded-xl bg-white text-black hover:bg-gray-200">
            Contact Me
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

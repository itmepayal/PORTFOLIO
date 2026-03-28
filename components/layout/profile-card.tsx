"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Link from "next/link";

export const ProfileCard = () => {
  return (
    <div className="flex items-center justify-center md:fixed md:top-5 md:left-5">
      <Card className="w-[90vw] max-w-sm md:w-96 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden transition hover:scale-[1.03]">
        <div className="relative h-64 md:h-80 w-full overflow-hidden px-4 pb-4 md:px-5">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src="/profile.jpeg"
              alt="Payal Yadav profile"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent rounded-2xl" />
        </div>

        <CardContent className="flex flex-col items-center text-center px-4 py-3 gap-2">
          <h2 className="text-lg md:text-xl font-semibold text-white">
            Payal Yadav
          </h2>

          <p className="text-sm text-gray-300">Full Stack Developer</p>

          <p className="text-sm text-gray-400 max-w-55">
            Building scalable apps, real-time systems & modern UI.
          </p>

          <div className="flex gap-3 mt-3">
            {[IconBrandGithub, IconBrandLinkedin].map((Icon, i) => (
              <Link href="#" key={i}>
                <div className="p-3 rounded border border-white/20 hover:bg-white/10 transition">
                  <Icon className="size-5 text-gray-300 hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-5">
          <Button className="w-full rounded-xl py-5 bg-white text-black">
            Let's Work
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

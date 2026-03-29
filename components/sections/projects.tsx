"use client";

import { motion } from "framer-motion";
import { Sparkles, ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Projects = () => {
  return (
    <Section
      id="projects"
      className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden"
    >
      <BackgroundBlobs />

      <div className="flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Badge className="flex w-fit items-center gap-2 px-4 py-2.5 rounded-full text-primary border-primary/45 bg-secondary/60 backdrop-blur-md">
            <Sparkles className="size-4" />
            Projects
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Carousel className="w-full max-w-72 md:max-w-fit">
            <CarouselContent className="-ml-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-2">
                    <Card className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      {/* Image */}
                      <div className="relative">
                        <img
                          src={`https://picsum.photos/500/300?random=${index}`}
                          alt="Project"
                          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="secondary">Featured</Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardHeader className="relative z-10">
                        <CardAction>
                          <Badge variant="outline">Full Stack</Badge>
                        </CardAction>

                        <CardTitle>Project {index + 1}</CardTitle>

                        <CardDescription>
                          Scalable full-stack application with authentication,
                          API integration, and clean architecture.
                        </CardDescription>
                      </CardHeader>

                      {/* Footer */}
                      <CardFooter className="flex gap-2">
                        <Button size="sm" className="flex-1 gap-2 py-4 px-5">
                          <ExternalLink className="size-4" />
                          Live
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 gap-2  py-4 px-5"
                        >
                          <IconBrandGithub className="size-4" />
                          GitHub
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </Section>
  );
};

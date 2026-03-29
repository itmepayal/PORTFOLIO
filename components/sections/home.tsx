"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Section } from "@/components/common/section";
import { Badge } from "@/components/ui/badge";
import { BackgroundBlobs } from "@/components/backgrounds/background-blobs";
import { Roles } from "@/components/home/roles";
import { CTAButtons } from "@/components/home/cta-buttons";
export const Home = () => {
  const roles = ["Full Stack Developer", "Backend Developer"];
  return (
    <Section
      id="home"
      className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden"
    >
      {" "}
      <BackgroundBlobs />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {" "}
        <Badge className="flex w-fit items-center gap-2 px-4 py-3 mb-4 rounded-full border-primary/45 bg-secondary/60 backdrop-blur-md text-foreground border">
          {" "}
          <Sparkles className="size-4" /> Introduction{" "}
        </Badge>{" "}
      </motion.div>{" "}
      {/* Heading */}{" "}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl sm:text-4xl md:text-6xl font-semibold leading-tight tracking-tight"
      >
        {" "}
        Hi, I'm{" "}
        <span className="bg-linear-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
          {" "}
          Payal Yadav{" "}
        </span>{" "}
        <br /> <Roles roles={roles} />{" "}
      </motion.h2>{" "}
      {/* Description */}{" "}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed"
      >
        {" "}
        I design and develop scalable backend systems and modern full-stack
        applications, focusing on performance, security, and clean architecture
        to deliver reliable and efficient solutions.{" "}
      </motion.p>{" "}
      {/* CTA Buttons */}{" "}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {" "}
        <CTAButtons />{" "}
      </motion.div>{" "}
    </Section>
  );
};

"use client";

import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Container } from "../common/container";

export const GithubPanel = () => {
  return (
    <Container>
      <section className="relative mx-auto overflow-hidden py-6">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,var(--color-foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-foreground)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute left-1/4 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-56 w-56 rounded-full bg-chart-3/10 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/2 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="mb-12 text-center">
            <p className="inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-primary uppercase tracking-[0.25em] text-[10px] sm:text-xs md:text-sm font-semibold">
              Open Source
            </p>
            <h2 className="mt-5 bg-linear-to-r from-foreground via-primary to-chart-3 bg-clip-text text-3xl font-black tracking-[-0.05em] text-transparent sm:text-4xl md:text-5xl">
              GitHub Contributions
            </h2>
            <p className="mx-auto mt-5 max-w-xs text-xs leading-6 text-muted-foreground xs:max-w-md sm:max-w-2xl sm:text-base lg:max-w-3xl">
              A visual representation of my coding consistency, open-source
              activity, and contribution journey throughout the year.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-border/70  p-6 shadow-xl backdrop-blur-xl md:p-10"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/3 via-transparent to-chart-3/3" />
            <div className="relative z-10 overflow-x-auto">
              <GitHubCalendar
                username="itmepayal"
                blockSize={14}
                blockMargin={5}
                fontSize={14}
                colorScheme="dark"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

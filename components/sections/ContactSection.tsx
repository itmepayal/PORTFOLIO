"use client";

import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { FiArrowRight, FiDownload } from "react-icons/fi";

export const Contact = () => {
  return (
    <Container>
      <section
        id="contact"
        className="border-y border-border bg-card py-12 sm:py-16 md:py-20"
      >
        <div className="mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="
              relative mx-auto overflow-hidden border border-border bg-secondary
              px-5 py-8 sm:px-10 sm:py-12
              grid grid-cols-1 items-center gap-8 text-center
              lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:text-left
            "
          >
            <div
              className="pointer-events-none absolute -right-[15%] -top-[40%] aspect-square w-[min(420px,80%)] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <div className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-primary sm:mb-4 sm:text-[0.68rem]">
                05 — Get In Touch
              </div>
              <h2 className="mb-3 text-[clamp(1.5rem,5vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.02em] sm:mb-3.5">
                Let&apos;s build
                <br />
                something great.
              </h2>
              <p className="mx-auto max-w-95 text-[0.85rem] font-light text-muted-foreground sm:text-[0.92rem] lg:mx-0">
                Whether you have a role, a project, or just want to talk code —
                my inbox is always open.
              </p>
            </div>

            <div className="relative z-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
              <a
                href="mailto:itme.payalyadav@gmail.com"
                className="
                  inline-flex items-center justify-center gap-2 bg-linear-to-br
                  from-primary to-accent2 px-6 py-3.5 font-mono text-[0.78rem]
                  tracking-wide text-white transition-all duration-200
                  hover:-translate-y-0.5 hover:opacity-90 sm:py-4 sm:text-[0.82rem]
                "
              >
                Send a Message
                <FiArrowRight className="size-3.5 shrink-0" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="
                  inline-flex items-center justify-center gap-2 border
                  border-border px-6 py-3 font-mono text-[0.74rem] tracking-wide
                  text-muted-foreground transition-colors duration-200
                  hover:border-primary hover:text-primary sm:py-3.5 sm:text-[0.78rem]
                "
              >
                <FiDownload className="size-3.5 shrink-0" />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Container>
  );
};

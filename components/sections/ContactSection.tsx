"use client";

import { motion } from "framer-motion";
import { Container } from "../common/Container";
import { ContactForm } from "../common/ContactForm";
import { FiDownload } from "react-icons/fi";
import { monoLabelPrimary, sectionTitle } from "@/lib/ui";

const RESUME_PATH = "/pdf/PAYAL_YADAV.pdf";

export const Contact = () => {
  return (
    <Container id="contact" background="card">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden border border-border bg-secondary px-5 py-8 sm:px-10 sm:py-12 lg:px-12"
      >
        <div
          className="pointer-events-none absolute -right-[15%] -top-[40%] aspect-square w-[min(420px,80%)]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <div className={monoLabelPrimary}>05 — GET IN TOUCH</div>
            <h2 className={`mt-1 ${sectionTitle}`}>
              Let&apos;s build something great.
            </h2>
            <p className="mt-4 max-w-md text-[0.85rem] font-light leading-relaxed text-muted-foreground sm:text-[0.92rem]">
              Whether you have a role, a project, or just want to talk code —
              send a message or reach out directly.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:itme.payalyadav@gmail.com"
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 font-mono text-[0.74rem] tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                itme.payalyadav@gmail.com
              </a>
              <a
                href={RESUME_PATH}
                download
                className="inline-flex items-center justify-center gap-2 border border-primary/30 bg-primary/10 px-6 py-3 font-mono text-[0.74rem] tracking-wide text-primary transition-colors hover:border-primary"
              >
                <FiDownload className="size-3.5 shrink-0" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="border border-border bg-card/40 p-5 backdrop-blur-sm sm:p-6">
            <p className="mb-4 font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground">
              Send a message
            </p>
            <ContactForm />
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

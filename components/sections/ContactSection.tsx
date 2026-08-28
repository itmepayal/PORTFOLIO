"use client";

import { FiDownload } from "react-icons/fi";
import { Container } from "../common/Container";
import { ContactForm } from "../common/ContactForm";
import { SectionHeader } from "../common/SectionHeader";
import { SITE } from "@/lib/site";

const linkClass =
  "inline-flex items-center justify-center gap-2 border px-6 py-3 font-mono text-[0.74rem] tracking-wide transition-colors";

export const Contact = () => {
  return (
    <Container id="contact" background="card">
      <div className="border border-border bg-secondary px-5 py-8 sm:px-10 sm:py-12 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeader
              label="05 — GET IN TOUCH"
              title="Let's build something great."
              subtitle="Have a role, a project, or want to talk code? Send a message or reach out directly."
            />
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${SITE.email}`}
                className={`${linkClass} border-border text-muted-foreground hover:border-primary hover:text-primary`}
              >
                {SITE.email}
              </a>
              <a
                href={SITE.resumePath}
                download
                className={`${linkClass} border-primary/30 bg-primary/10 text-primary hover:border-primary`}
              >
                <FiDownload className="size-3.5" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="border border-border bg-card/40 p-5 sm:p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Send a message
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
};

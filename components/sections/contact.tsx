"use client";
import { Container } from "../common/container";

export const Contact = () => {
  return (
    <Container>
      <div
        className="
          relative mx-auto overflow-hidden rounded-none border border-border
          px-6 py-12 sm:px-10 sm:py-12
          grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-10
          items-center text-center lg:text-left bg-secondary
        "
      >
        <div
          className="pointer-events-none absolute -right-[15%] -top-[40%] h-105 w-105 rounded-full"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)",
          }}
        />

        {/* ====================================================== */}
        {/* LEFT — eyebrow, headline, sub                             */}
        {/* ====================================================== */}
        <div className="relative z-10">
          <div className="mb-4 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
            06 — Get In Touch
          </div>
          <h2 className="mb-3.5 font-sans text-[clamp(1.7rem,3.4vw,2.6rem)] font-bold leading-[1.15] tracking-[-0.02em]">
            Let&apos;s build
            <br />
            something great.
          </h2>
          <p className="mx-auto lg:mx-0 max-w-[380px] text-[0.92rem] font-light text-muted-foreground">
            Whether you have a role, a project, or just want to talk code — my
            inbox is always open.
          </p>
        </div>

        {/* ====================================================== */}
        {/* RIGHT — actions                                           */}
        {/* ====================================================== */}
        <div className="relative z-10 flex flex-row flex-wrap items-center justify-center gap-3.5">
          <a
            href="mailto:itme.payalyadav@gmail.com"
            className="
              inline-block rounded-none bg-linear-to-br from-primary to-chart-2
              px-6 py-4 font-mono text-[0.82rem] tracking-wide text-white
              transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90
            "
          >
            Send a Message →
          </a>
          <a
            href="/resume.pdf"
            download
            className="
              inline-flex items-center justify-center gap-2 rounded-none border
              border-border px-6 py-3.5 font-mono text-[0.78rem] tracking-wide
              text-muted-foreground transition-colors duration-200
              hover:border-primary hover:text-primary
            "
          >
            ↓ Download Resume
          </a>
        </div>
      </div>
    </Container>
  );
};

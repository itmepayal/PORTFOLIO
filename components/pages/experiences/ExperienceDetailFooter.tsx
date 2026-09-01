import Link from "next/link";
import { HiArrowRight, HiBriefcase, HiExternalLink } from "react-icons/hi";
import { CLIP_PATH } from "@/components/pages/shared/detail-constants";
import { isSafeHttpsUrl } from "@/lib/utils";
import type { Experience } from "./experience-types";

export const ExperienceDetailActions = ({
  experience,
  tenure,
  onBack,
}: {
  experience: Experience;
  tenure: string;
  onBack: () => void;
}) => (
  <section className="bg-surface px-[5%] py-12">
    <div className="mx-auto flex max-w-300 flex-wrap items-center justify-center gap-3 border border-border bg-card p-6">
      {isSafeHttpsUrl(experience.companyWebsite) && (
        <a
          href={experience.companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 bg-linear-to-br from-primary to-accent2 px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 sm:flex-none"
          style={{ clipPath: CLIP_PATH }}
        >
          <HiExternalLink className="size-4" />
          Visit {experience.company}
        </a>
      )}
      <button
        onClick={onBack}
        className="inline-flex flex-1 items-center justify-center gap-2 border border-border px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary sm:flex-none"
      >
        <HiBriefcase className="size-4" />
        All Experiences
      </button>
      <div className="hidden h-6 w-px bg-border sm:block" />
      <p className="hidden font-mono text-[0.68rem] text-muted-foreground sm:block">
        {tenure}
      </p>
    </div>
  </section>
);

export const ExperienceDetailCta = ({ onBack }: { onBack: () => void }) => (
  <section className="px-[5%] py-12">
    <div className="relative mx-auto max-w-300 overflow-hidden border border-border bg-card p-8 text-center sm:p-14">
      <div
        className="absolute -top-[40%] right-[-15%] h-105 w-105 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-primary) 16%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-primary">
          Interested in working together?
        </div>
        <h3 className="mb-4 text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-4xl">
          Let&apos;s build
          <br />
          <span className="bg-linear-to-r from-primary via-accent2 to-cyan bg-clip-text text-transparent">
            something remarkable.
          </span>
        </h3>
        <p className="mx-auto mb-8 max-w-md text-sm font-light text-muted-foreground">
          Available for freelance backend projects, API architecture reviews, and
          full-stack collaborations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-linear-to-br from-primary to-accent2 px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
            style={{ clipPath: CLIP_PATH }}
          >
            Get in touch
            <HiArrowRight className="size-3.5" />
          </Link>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 border border-border px-7 py-3 font-mono text-[0.78rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            View all experiences
          </button>
        </div>
      </div>
    </div>
  </section>
);

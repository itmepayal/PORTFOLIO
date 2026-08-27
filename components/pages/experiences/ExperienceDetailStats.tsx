import { HiLocationMarker } from "react-icons/hi";
import { DetailStatBlock } from "@/components/pages/shared/DetailStatBlock";
import type { Experience } from "./experience-types";

export const ExperienceDetailStats = ({
  experience,
  durationLabel,
}: {
  experience: Experience;
  durationLabel: string;
}) => (
  <section className="px-[5%] pt-px">
    <div className="mx-auto max-w-300">
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        <DetailStatBlock
          label="Company site"
          value={
            <a
              href={experience.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-cyan"
            >
              Visit site ↗
            </a>
          }
        />
        <DetailStatBlock
          label="Location"
          value={
            <span className="flex items-center gap-1.5">
              <HiLocationMarker className="size-3.5 shrink-0 text-primary" />
              {experience.location}
            </span>
          }
        />
        <DetailStatBlock label="Duration" value={durationLabel} />
        <DetailStatBlock
          label="Technologies"
          value={experience.technologies.length}
        />
      </div>
    </div>
  </section>
);

export const ExperienceDetailAbout = ({
  experience,
}: {
  experience: Experience;
}) => (
  <section className="px-[5%] py-12">
    <div className="mx-auto max-w-300">
      <div className="relative overflow-hidden border border-border bg-card p-6 sm:p-8">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-linear-to-b from-primary to-accent2" />
        <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
          About this role
        </div>
        <p className="text-sm font-light leading-7 text-muted-foreground sm:text-[0.95rem] sm:leading-[1.85rem]">
          {experience.description}
        </p>
      </div>
    </div>
  </section>
);

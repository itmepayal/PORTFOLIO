import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";
import type { Experience } from "./experience-types";

type ExperienceDetailHeroProps = {
  experience: Experience;
  accentLine: string;
  tenure: string;
  onBackHome: () => void;
};

export const ExperienceDetailHero = ({
  experience,
  accentLine,
  tenure,
  onBackHome,
}: ExperienceDetailHeroProps) => (
  <>
    <div className="px-[5%]">
      <div className="mx-auto max-w-300">
        <button
          onClick={onBackHome}
          className="group mb-8 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-foreground transition-colors duration-200 hover:text-primary"
        >
          <HiArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to Home
        </button>
      </div>
    </div>

    <section className="px-[5%]">
      <div className="relative mx-auto max-w-300 border border-border bg-card">
        <div
          className="absolute left-0 right-0 top-0 h-0.5"
          style={{ background: accentLine }}
        />
        <div className="relative h-64 w-full overflow-hidden sm:h-80 md:h-96">
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-accent2/15" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[40px_40px]" />
          {experience.companyLogo && (
            <Image
              src={experience.companyLogo}
              alt=""
              aria-hidden="true"
              unoptimized
              fill
              className="object-contain opacity-[0.06] blur-[1px] scale-110 select-none pointer-events-none m-auto w-[55%] max-w-xs"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-cyan">
              {experience.position}
            </span>
            {experience.current && (
              <span className="border border-green/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-green">
                ● Active
              </span>
            )}
            {experience.featured && (
              <span className="border border-orange/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-orange">
                ★ Featured
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            {experience.company}
          </h1>
          <p className="mt-2 font-mono text-[0.7rem] text-white/55">{tenure}</p>
        </div>
      </div>
    </section>
  </>
);

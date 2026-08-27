import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";
import { getProjectWorkTypeLabel } from "@/lib/project";
import { DEFAULT_PROJECT_HERO_IMAGE } from "@/lib/site";
import { isValidMediaUrl } from "@/lib/utils";
import type { Project } from "./project-types";

type ProjectDetailHeroProps = {
  project: Project;
  accentLine: string;
  formattedDate: string;
  onBackHome: () => void;
};

export const ProjectDetailHero = ({
  project,
  accentLine,
  formattedDate,
  onBackHome,
}: ProjectDetailHeroProps) => {
  const heroSrc = isValidMediaUrl(project.image)
    ? project.image.trim()
    : DEFAULT_PROJECT_HERO_IMAGE;

  return (
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
          <Image
            src={heroSrc}
            alt={project.title}
            unoptimized
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.15em] text-cyan">
              {project.category}
            </span>
            <span className="border border-cyan/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-cyan">
              {getProjectWorkTypeLabel(project.workType)}
            </span>
            {project.workType === "company" && project.company && (
              <span className="border border-primary/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-primary">
                {project.company}
              </span>
            )}
            {project.featured && (
              <span className="border border-orange/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-orange">
                ★ Featured
              </span>
            )}
            <span className="border border-green/40 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-green">
              Published
            </span>
          </div>
          <h1 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 font-mono text-[0.7rem] text-white/55">
            {formattedDate}
          </p>
        </div>
      </div>
    </section>
  </>
  );
};

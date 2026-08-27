import {
  getProjectOrganizationDisplay,
  getProjectOrganizationLabel,
  getProjectWorkTypeLabel,
} from "@/lib/project";
import { DetailStatBlock } from "@/components/pages/shared/DetailStatBlock";
import type { Project } from "./project-types";

export const ProjectDetailStats = ({ project }: { project: Project }) => (
  <section className="px-[5%] pt-px">
    <div className="mx-auto max-w-300">
      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3">
        <DetailStatBlock
          label="Live demo"
          value={
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-cyan"
            >
              View site ↗
            </a>
          }
        />
        <DetailStatBlock
          label="Source code"
          value={
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary transition-colors hover:text-cyan"
            >
              GitHub ↗
            </a>
          }
        />
        <DetailStatBlock
          label="Work type"
          value={getProjectWorkTypeLabel(project.workType)}
        />
        <DetailStatBlock
          label={getProjectOrganizationLabel(project.workType)}
          value={getProjectOrganizationDisplay(project)}
        />
        <DetailStatBlock label="Technologies" value={project.tech.length} />
        <DetailStatBlock label="Key features" value={project.features.length} />
      </div>
    </div>
  </section>
);

export const ProjectDetailAbout = ({ project }: { project: Project }) => (
  <section className="px-[5%] py-12">
    <div className="mx-auto max-w-300">
      <div className="relative overflow-hidden border border-border bg-card p-6 sm:p-8">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-linear-to-b from-primary to-accent2" />
        <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
          About this project
        </div>
        <p className="text-sm font-light leading-7 text-muted-foreground sm:text-[0.95rem] sm:leading-[1.85rem]">
          {project.description}
        </p>
      </div>
    </div>
  </section>
);

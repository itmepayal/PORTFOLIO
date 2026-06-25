"use client";

import { BrainCircuit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const SkillHeader = () => {
  const router = useRouter();

  return (
    <div className="group relative overflow-hidden border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60">
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white"
            style={{
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          >
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
              Skills
            </h2>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
              Highlight your strengths, technologies and development expertise.
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/skills/create")}
          className="group/btn inline-flex items-center justify-center gap-2.5 bg-linear-to-br from-primary to-secondary-foreground px-6 py-3 font-mono text-[0.75rem] uppercase tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
          style={{
            clipPath:
              "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
          }}
        >
          <Plus className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:rotate-90" />
          Create Skill
        </button>
      </div>
    </div>
  );
};

export default SkillHeader;

"use client";

import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ExperienceHeader = () => {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-5 backdrop-blur-xl">
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
            <p className="text-sm text-muted-foreground">
              Organize and showcase your professional experience, achievements,
              leadership roles, and career growth.
            </p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/dashboard/experiences/create")}
          className="h-11 rounded-xl px-5 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceHeader;

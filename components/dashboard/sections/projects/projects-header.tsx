"use client";

import { motion } from "framer-motion";

import { FolderKanban, Filter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const ProjectsHeader = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
      {/* LEFT */}

      <div className="flex items-start gap-5">
        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.05,
          }}
          className="
            relative
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-[28px]
            bg-linear-to-br
            from-primary/20
            via-primary/10
            to-primary/5
            text-primary
            shadow-2xl
            shadow-primary/20
          "
        >
          <FolderKanban className="h-8 w-8" />
        </motion.div>

        <div>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Projects
          </h1>

          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Manage enterprise-grade products & systems.
          </p>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="outline" className="h-12 rounded-2xl">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>

        <Button
          onClick={() => router.push("/dashboard/projects/create")}
          className="
            h-12
            rounded-2xl
            bg-linear-to-r
            from-primary
            to-primary/80
            shadow-lg
            shadow-primary/20
          "
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsHeader;

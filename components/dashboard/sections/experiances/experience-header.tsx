"use client";

import { motion } from "framer-motion";
import { Briefcase, Filter, Plus } from "lucide-react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const ExperienceHeader = () => {
  const router = useRouter();

  return (
    <div
      className="
        flex
        flex-col
        gap-6
        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      {/* ====================================================== */}
      {/* LEFT SECTION */}
      {/* ====================================================== */}

      <div className="flex items-start gap-5">
        {/* ====================================================== */}
        {/* ICON BOX */}
        {/* ====================================================== */}

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
          <Briefcase className="h-8 w-8" />
        </motion.div>

        {/* ====================================================== */}
        {/* TITLE + DESCRIPTION */}
        {/* ====================================================== */}

        <div>
          <h2
            className="
              text-4xl
              font-black
              tracking-tight
              md:text-4xl
            "
          >
            Experiences
          </h2>

          <p
            className="
              mt-3
              text-sm
              text-muted-foreground
              md:text-base
            "
          >
            Manage and showcase your professional work experience, internships,
            freelance projects, responsibilities, achievements, and career
            journey.
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* RIGHT SECTION */}
      {/* ====================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* ====================================================== */}
        {/* FILTER BUTTON */}
        {/* ====================================================== */}

        <Button
          variant="outline"
          className="
            h-12
            rounded-2xl
          "
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>

        {/* ====================================================== */}
        {/* CREATE EXPERIENCE BUTTON */}
        {/* ====================================================== */}

        <Button
          onClick={() => router.push("/dashboard/experiences/create")}
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
          Create Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceHeader;

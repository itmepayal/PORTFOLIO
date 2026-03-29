"use client";

import { Button } from "../ui/button";
import { FolderIcon, Download } from "lucide-react";

export const CTAButtons = () => (
  <div className="flex flex-col sm:flex-row gap-4 pt-4">
    <Button className="flex items-center justify-center gap-2 px-6 py-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <FolderIcon className="size-4" />
      My Projects
    </Button>
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2 px-6 py-5 backdrop-blur-md hover:bg-accent hover:-translate-y-1 transition-all duration-300"
    >
      <Download className="size-4" />
      Download CV
    </Button>
  </div>
);

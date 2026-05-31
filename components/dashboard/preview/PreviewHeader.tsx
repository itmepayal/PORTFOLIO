"use client";

import { ReactNode } from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type PreviewHeaderProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
};

const PreviewHeader = ({ icon, title, description }: PreviewHeaderProps) => {
  return (
    <CardHeader className="space-y-4">
      <div className="flex items-center gap-3">
        {/* ICON BOX */}
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}

        {/* TEXT */}
        <div>
          <CardTitle>{title}</CardTitle>

          {description && <CardDescription>{description}</CardDescription>}
        </div>
      </div>
    </CardHeader>
  );
};

export default PreviewHeader;

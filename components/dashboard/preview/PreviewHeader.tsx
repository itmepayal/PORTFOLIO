"use client";

import { ReactNode } from "react";

type PreviewHeaderProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
};

const PreviewHeader = ({ icon, title, description }: PreviewHeaderProps) => {
  return (
    <div className="space-y-4 border-b border-border px-1 pb-5">
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white"
            style={{
              clipPath:
                "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-[1.15rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 font-mono text-[0.7rem] text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewHeader;

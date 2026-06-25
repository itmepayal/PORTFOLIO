"use client";

import { ReactNode } from "react";

type FormCardProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
};

const FormCard = ({ title, description, icon, children }: FormCardProps) => {
  return (
    <div className="overflow-hidden border border-border bg-card/40 backdrop-blur-[18px]">
      <div className="h-1 w-full bg-linear-to-r from-primary via-secondary-foreground to-chart-3" />

      {(title || description || icon) && (
        <div className="border-b border-border px-6 pb-5 pt-6">
          <div className="flex items-center gap-4">
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
              {title && (
                <h2 className="text-[1.25rem] font-bold leading-tight tracking-[-0.02em] text-foreground">
                  {title}
                </h2>
              )}

              {description && (
                <p className="mt-0.5 font-mono text-[0.7rem] text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8 p-6">{children}</div>
    </div>
  );
};

export default FormCard;

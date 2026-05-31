"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ReactNode } from "react";

type FormCardProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
};

const FormCard = ({ title, description, icon, children }: FormCardProps) => {
  return (
    <Card
      className="
        rounded-4xl
        border-border/50
        bg-background/70
        shadow-2xl
        backdrop-blur-xl
      "
    >
      {/* TOP BAR */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary/60 to-primary rounded-t-4xl" />

      {/* HEADER */}
      {(title || description || icon) && (
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            {icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h2 className="text-xl font-semibold tracking-tight">
                  {title}
                </h2>
              )}

              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        </CardHeader>
      )}

      {/* CONTENT */}
      <CardContent className="space-y-8">{children}</CardContent>
    </Card>
  );
};

export default FormCard;

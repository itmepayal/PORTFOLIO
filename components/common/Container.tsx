import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { sectionBackgroundClass, sectionInner, sectionPadding } from "@/lib/ui";

type SectionBackground = "default" | "surface" | "secondary" | "card";

interface ContainerProps {
  children: ReactNode;
  id?: string;
  background?: SectionBackground;
  className?: string;
  innerClassName?: string;
  noPadding?: boolean;
}

export const Container = ({
  children,
  id,
  background = "default",
  className,
  innerClassName,
  noPadding = false,
}: ContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        !noPadding && sectionPadding,
        sectionBackgroundClass(background),
        className,
      )}
    >
      <div className={cn(sectionInner, innerClassName)}>{children}</div>
    </section>
  );
};

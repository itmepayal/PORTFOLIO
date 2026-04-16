import React from "react";

type SectionProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export const Section = ({ id, children, className = "" }: SectionProps) => {
  return (
    <section
      id={id}
      className={`
        relative
        rounded-2xl
        border border-border
        bg-background/40 backdrop-blur-md
        shadow-sm

        md:mx-3 md:ml-0
        md:my-4
        mx-3
        p-5 md:p-6 lg:py-14.5
        transition-all duration-300
        hover:shadow-md

        ${className}
      `}
    >
      {children}
    </section>
  );
};

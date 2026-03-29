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
        mt-5 md:mt-0 md:ml-96 md:mr-20
        px-4 md:px-6 py-6 md:py-10
        rounded-2xl
        border border-border/60
        bg-background/70 backdrop-blur-xl
        shadow-sm hover:shadow-md
        transition-all duration-300
        ${className}
      `}
    >
      <div className="w-full max-w-6xl flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
};

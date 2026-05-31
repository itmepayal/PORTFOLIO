"use client";

import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <div
      className="
        min-h-screen
        bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_40%),linear-gradient(to_bottom_right,hsl(var(--background)),hsl(var(--background)))]
      "
    >
      <div className="mx-auto w-full max-w-375">{children}</div>
    </div>
  );
};

export default PageContainer;

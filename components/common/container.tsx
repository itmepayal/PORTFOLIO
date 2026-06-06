import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <section className=" relative overflow-hidden py-8 sm:py-10">
      {children}
    </section>
  );
};

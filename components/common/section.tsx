type SectionProps = {
  id: string;
  children: React.ReactNode;
};

export const Section = ({ id, children }: SectionProps) => {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center text-white"
    >
      {children}
    </section>
  );
};

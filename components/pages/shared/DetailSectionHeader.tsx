export const DetailSectionHeader = ({
  index,
  title,
}: {
  index: string;
  title: string;
}) => (
  <div className="mb-6 flex items-end gap-4">
    <div>
      <div className="mb-1 font-mono text-[0.68rem] tracking-[0.15em] text-primary">
        {index}
      </div>
      <h2 className="text-[clamp(1.3rem,2.4vw,1.9rem)] font-bold tracking-[-0.02em] leading-[1.1] text-foreground">
        {title}
      </h2>
    </div>
    <div className="mb-1.5 h-px min-w-10 flex-1 bg-linear-to-r from-border to-transparent" />
  </div>
);

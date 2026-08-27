import { HiArrowLeft } from "react-icons/hi";

export const DetailNotFound = ({
  entity,
  onBack,
}: {
  entity: string;
  onBack: () => void;
}) => (
  <div className="flex min-h-screen items-center justify-center bg-background px-[5%]">
    <div className="max-w-sm space-y-5 text-center">
      <div className="font-mono text-[0.68rem] tracking-[0.2em] text-primary">
        ERROR · 404
      </div>
      <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
        {entity} not found
      </h2>
      <p className="text-sm font-light text-muted-foreground">
        This {entity.toLowerCase()} doesn&apos;t exist or has been removed.
      </p>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-[0.78rem] tracking-[0.05em] text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
      >
        <HiArrowLeft className="size-3.5" />
        Go Back
      </button>
    </div>
  </div>
);

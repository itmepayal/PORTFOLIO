"use client";

import { MessageSquareMore, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const EnquiryHeader = () => {
  const router = useRouter();

  return (
    <div className="group relative overflow-hidden border border-border bg-card/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/60">
      {/* Corner accents */}
      <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-5 w-5 border-b-2 border-r-2 border-primary/0 transition-all duration-300 group-hover:border-primary/70" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Left — icon + title */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center border border-border bg-linear-to-br from-primary to-secondary-foreground text-white"
            style={{
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
            }}
          >
            <MessageSquareMore className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-foreground">
              Enquiries
            </h2>
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
              Manage customer enquiries, track and respond to incoming requests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryHeader;

"use client";

import { ReactNode } from "react";

type PreviewFooterProps = {
  onClick?: () => void;
  loading?: boolean;
  icon?: ReactNode;
  label: string;
  loadingLabel?: string;
};

const PreviewFooter = ({
  onClick,
  loading,
  icon,
  label,
  loadingLabel = "Loading...",
}: PreviewFooterProps) => {
  return (
    <div className="border-t border-border px-1 py-4">
      <button
        onClick={onClick}
        disabled={loading}
        style={{
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}
        className="group flex h-12 w-full items-center justify-center gap-2.5 bg-linear-to-br from-primary to-secondary-foreground font-mono text-[0.8rem] tracking-[0.05em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {icon && <span className="flex items-center">{icon}</span>}
        {loading ? loadingLabel : label}
      </button>
    </div>
  );
};

export default PreviewFooter;

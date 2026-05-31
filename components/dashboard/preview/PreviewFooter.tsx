"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { CardFooter } from "@/components/ui/card";

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
    <CardFooter>
      <Button
        onClick={onClick}
        disabled={loading}
        className="h-12 w-full rounded-2xl font-medium shadow-lg shadow-primary/10"
      >
        {icon && <span className="mr-2">{icon}</span>}
        {loading ? loadingLabel : label}
      </Button>
    </CardFooter>
  );
};

export default PreviewFooter;

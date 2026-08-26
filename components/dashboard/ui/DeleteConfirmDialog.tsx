"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  dashboardCornerAccentBottom,
  dashboardCornerAccentTop,
  clipPathButton,
} from "@/lib/ui";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmText: string;
  entityLabel?: string;
  title?: string;
  description?: string;
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
}

export const DeleteConfirmDialog = ({
  open,
  onOpenChange,
  confirmText,
  entityLabel = "item",
  title,
  description,
  onConfirm,
  loading = false,
}: DeleteConfirmDialogProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleOpenChange = (next: boolean) => {
    if (!next) setInputValue("");
    onOpenChange(next);
  };

  const trimmedConfirm = confirmText.trim();
  const trimmedInput = inputValue.trim();
  const isMatch =
    trimmedConfirm.length > 0 && trimmedInput === trimmedConfirm;

  const handleConfirm = async () => {
    if (!isMatch || loading) return;
    await onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "z-[200] gap-0 overflow-visible rounded-none border border-border bg-card p-0 shadow-2xl sm:max-w-[28rem]",
          "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
        )}
        overlayClassName="z-[199] bg-black/70 backdrop-blur-sm"
      >
        <div className="relative">
          <span className={dashboardCornerAccentTop} />
          <span className={dashboardCornerAccentBottom} />

          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            disabled={loading}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center border border-border bg-background/80 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6 pr-14">
            <div className="mb-4 flex h-11 w-11 items-center justify-center border border-red-500/30 bg-red-500/10 text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <DialogTitle className="text-left text-lg font-bold tracking-[-0.02em] text-foreground">
              {title ?? `Delete ${entityLabel}`}
            </DialogTitle>

            <DialogDescription className="mt-2 text-left text-sm leading-relaxed text-muted-foreground">
              {description ??
                `This action cannot be undone. Type the ${entityLabel} name below to permanently delete it.`}
            </DialogDescription>

            <div className="mt-6 space-y-3">
              <label
                htmlFor="delete-confirm-input"
                className="block font-mono text-[0.64rem] uppercase tracking-widest text-muted-foreground"
              >
                Type{" "}
                <span className="text-primary">&quot;{trimmedConfirm}&quot;</span>{" "}
                to confirm
              </label>
              <input
                id="delete-confirm-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={trimmedConfirm}
                disabled={loading}
                autoComplete="off"
                className="h-12 w-full border border-border bg-background px-4 text-[0.86rem] text-foreground outline-none transition-colors focus:border-red-500/60 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleOpenChange(false)}
              className="h-10 border border-border bg-background px-5 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!isMatch || loading}
              onClick={handleConfirm}
              style={{ clipPath: clipPathButton }}
              className="inline-flex h-10 min-w-[8rem] items-center justify-center gap-2 bg-red-600 px-5 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete permanently"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

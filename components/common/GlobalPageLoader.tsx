"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";
import { PageLoader } from "./PageLoader";

export function GlobalPageLoader() {
  const { isLoading, isNavigating, progress, statusMessage } = useLoading();

  // Lock body scroll while global loader is visible
  useEffect(() => {
    if (!isLoading) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLoading]);

  return (
    <>
      {/* Route Navigation Top Progress Bar */}
      <AnimatePresence>
        {isNavigating && !isLoading && (
          <motion.div
            key="route-nav-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-0 z-[99999] h-1 bg-transparent pointer-events-none"
          >
            <motion.div
              className="h-full bg-linear-to-r from-primary via-chart-3 to-chart-2 shadow-[0_0_12px_var(--color-primary)]"
              initial={{ width: "15%" }}
              animate={{ width: "88%" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Global Page Loader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="global-page-loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 0.98,
              filter: "blur(6px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
            className="fixed inset-0 z-[99999] pointer-events-auto"
          >
            <PageLoader
              fullScreen
              label={statusMessage}
              sublabel="INITIALIZING EXPERIENCE"
              progress={progress}
              showProgress
              showTechOrbit
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { GlobalPageLoader as default };

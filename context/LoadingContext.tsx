"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";

export interface LoadingContextType {
  isLoading: boolean;
  isInitialLoad: boolean;
  isNavigating: boolean;
  progress: number;
  statusMessage: string;
  registerCriticalTask: (
    taskId: string,
    label?: string,
  ) => (success?: boolean) => void;
  trackPromise: <T>(
    taskId: string,
    promise: Promise<T>,
    options?: { critical?: boolean; label?: string },
  ) => Promise<T>;
  markTaskComplete: (taskId: string, success?: boolean) => void;
  preloadImages: (urls: (string | null | undefined)[]) => Promise<void>;
  startRouteLoading: (destination?: string) => void;
  finishRouteLoading: () => void;
}

const defaultContextValue: LoadingContextType = {
  isLoading: false,
  isInitialLoad: false,
  isNavigating: false,
  progress: 100,
  statusMessage: "System ready",
  registerCriticalTask: () => () => {},
  trackPromise: <T,>(_taskId: string, promise: Promise<T>) => promise,
  markTaskComplete: () => {},
  preloadImages: () => Promise.resolve(),
  startRouteLoading: () => {},
  finishRouteLoading: () => {},
};

const LoadingContext = createContext<LoadingContextType>(defaultContextValue);

const STABILIZATION_DELAY_MS = 250; // Grace period for child components to register their initial critical tasks
const INITIAL_SAFETY_TIMEOUT_MS = 5000; // Safety timeout to guarantee loader never hangs indefinitely
const NAVIGATION_SAFETY_TIMEOUT_MS = 3000; // Safety timeout for client route transitions

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(15);
  const [statusMessage, setStatusMessage] = useState(
    "Initializing system runtime...",
  );

  // Registered tasks tracking
  const registeredTasksRef = useRef<
    Map<string, { completed: boolean; success: boolean; label?: string }>
  >(new Map());
  const milestonesRef = useRef({
    domReady: false,
    fontsReady: false,
    windowLoaded: false,
  });

  const mountedAtRef = useRef<number>(0);
  const stabilizationPassedRef = useRef(false);
  const completionTriggeredRef = useRef(false);
  const initialSafetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const stabilizationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const navSafetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressAnimRef = useRef<ReturnType<
    typeof requestAnimationFrame
  > | null>(null);
  const currentPathRef = useRef<string>(pathname || "");

  // Smoothly animate progress value towards target
  const animateProgressTo = useCallback(
    (target: number, onComplete?: () => void) => {
      if (progressAnimRef.current) {
        cancelAnimationFrame(progressAnimRef.current);
      }

      const step = () => {
        setProgress((current) => {
          if (current >= target) {
            if (onComplete) onComplete();
            return target;
          }
          const delta = Math.max(0.6, (target - current) * 0.18);
          const next = Math.min(target, current + delta);
          if (next >= target) {
            if (onComplete) onComplete();
            return target;
          }
          progressAnimRef.current = requestAnimationFrame(step);
          return next;
        });
      };

      progressAnimRef.current = requestAnimationFrame(step);
    },
    [],
  );

  // Complete initial load sequence smoothly
  const completeInitialLoad = useCallback(() => {
    if (completionTriggeredRef.current) return;
    completionTriggeredRef.current = true;

    if (initialSafetyTimerRef.current) {
      clearTimeout(initialSafetyTimerRef.current);
      initialSafetyTimerRef.current = null;
    }
    if (stabilizationTimerRef.current) {
      clearTimeout(stabilizationTimerRef.current);
      stabilizationTimerRef.current = null;
    }

    setStatusMessage("System ready");
    animateProgressTo(100, () => {
      // Clean handoff to application UI
      setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);

        // Safely remove static preloader veil with smooth fade-out
        if (typeof document !== "undefined") {
          const preloader = document.getElementById("app-preloader");
          if (preloader) {
            preloader.style.opacity = "0";
            preloader.style.pointerEvents = "none";
            preloader.style.filter = "blur(4px)";
            setTimeout(() => {
              try {
                preloader.remove();
              } catch {
                // Ignore if already removed
              }
            }, 350);
          }
        }
      }, 180);
    });
  }, [animateProgressTo]);

  const recalculateProgress = useCallback(() => {
    if (completionTriggeredRef.current) return;

    const milestones = milestonesRef.current;
    const tasks = Array.from(registeredTasksRef.current.values());

    let weightTotal = 0;
    let weightCompleted = 0;

    // Milestone 1: DOM Ready (Weight: 15)
    weightTotal += 15;
    if (milestones.domReady) weightCompleted += 15;

    // Milestone 2: Fonts Loaded (Weight: 20)
    weightTotal += 20;
    if (milestones.fontsReady) weightCompleted += 20;

    // Milestone 3: Window / Assets Loaded (Weight: 15)
    weightTotal += 15;
    if (milestones.windowLoaded) weightCompleted += 15;

    // Milestone 4: Registered Critical Tasks (Weight: 50)
    if (tasks.length > 0) {
      weightTotal += 50;
      const completedTasks = tasks.filter((t) => t.completed).length;
      weightCompleted += (completedTasks / tasks.length) * 50;
    } else {
      // If no tasks registered yet, check if stabilization period has passed
      if (stabilizationPassedRef.current) {
        weightTotal += 50;
        if (milestones.domReady && milestones.fontsReady) {
          weightCompleted += 50;
        }
      } else {
        weightTotal += 50;
        // Hold progress below 45% during stabilization to await task registration
        weightCompleted += 10;
      }
    }

    const rawCalculated = Math.min(
      95,
      Math.max(15, Math.round((weightCompleted / weightTotal) * 100)),
    );

    // Update status message dynamically based on actual progress
    if (rawCalculated < 30) {
      setStatusMessage("Booting runtime environment...");
    } else if (rawCalculated < 55) {
      setStatusMessage("Loading typography & core assets...");
    } else if (rawCalculated < 85) {
      setStatusMessage("Connecting API services...");
    } else {
      setStatusMessage("Preparing interface & rendering...");
    }

    animateProgressTo(rawCalculated);

    // Completion conditions:
    // 1. DOM is ready
    // 2. Fonts or window loaded
    // 3. Stabilization delay has elapsed (so child components had time to register)
    // 4. All registered tasks are completed (or 0 tasks after stabilization)
    const allMilestonesDone =
      milestones.domReady && (milestones.fontsReady || milestones.windowLoaded);
    const tasksSatisfied =
      tasks.length > 0
        ? tasks.every((t) => t.completed)
        : stabilizationPassedRef.current;

    if (
      allMilestonesDone &&
      tasksSatisfied &&
      stabilizationPassedRef.current &&
      !completionTriggeredRef.current
    ) {
      completeInitialLoad();
    }
  }, [animateProgressTo, completeInitialLoad]);

  // Register a critical task to wait for
  const registerCriticalTask = useCallback(
    (taskId: string, label?: string) => {
      registeredTasksRef.current.set(taskId, {
        completed: false,
        success: true,
        label,
      });
      recalculateProgress();

      return (success: boolean = true) => {
        const task = registeredTasksRef.current.get(taskId);
        if (task) {
          task.completed = true;
          task.success = success;
        } else {
          registeredTasksRef.current.set(taskId, {
            completed: true,
            success,
            label,
          });
        }
        recalculateProgress();
      };
    },
    [recalculateProgress],
  );

  // Directly mark a task complete
  const markTaskComplete = useCallback(
    (taskId: string, success: boolean = true) => {
      const task = registeredTasksRef.current.get(taskId);
      if (task) {
        task.completed = true;
        task.success = success;
      } else {
        registeredTasksRef.current.set(taskId, { completed: true, success });
      }
      recalculateProgress();
    },
    [recalculateProgress],
  );

  // Helper to wrap a promise as a critical loading task with automatic graceful error recovery
  const trackPromise = useCallback(
    <T,>(
      taskId: string,
      promise: Promise<T>,
      options?: { critical?: boolean; label?: string },
    ): Promise<T> => {
      const finish = registerCriticalTask(taskId, options?.label);
      return promise
        .then((result) => {
          finish(true);
          return result;
        })
        .catch((error) => {
          console.warn(
            `[LoadingContext] Task "${taskId}" settled with error (gracefully handled):`,
            error,
          );
          finish(false); // Graceful recovery, never block loader indefinitely on failure
          throw error;
        });
    },
    [registerCriticalTask],
  );

  // Image preloading helper for critical visual assets
  const preloadImages = useCallback(
    (urls: (string | null | undefined)[]): Promise<void> => {
      if (typeof window === "undefined") return Promise.resolve();
      const valid = urls.filter(
        (u): u is string => typeof u === "string" && u.trim().length > 0,
      );
      if (valid.length === 0) return Promise.resolve();

      return trackPromise(
        `preload-images-${valid.length}`,
        Promise.all(
          valid.map(
            (src) =>
              new Promise<void>((resolve) => {
                const img = new Image();
                let settled = false;
                const finish = () => {
                  if (!settled) {
                    settled = true;
                    resolve();
                  }
                };
                img.onload = finish;
                img.onerror = finish;
                setTimeout(finish, 2000); // 2s max per image to never block
                img.src = src;
              }),
          ),
        ).then(() => {}),
      );
    },
    [trackPromise],
  );

  // Route Navigation Handlers
  const startRouteLoading = useCallback((destination?: string) => {
    setIsNavigating(true);
    setStatusMessage(
      destination ? `Loading ${destination}...` : "Loading view...",
    );

    if (navSafetyTimerRef.current) clearTimeout(navSafetyTimerRef.current);
    navSafetyTimerRef.current = setTimeout(() => {
      setIsNavigating(false);
    }, NAVIGATION_SAFETY_TIMEOUT_MS);
  }, []);

  const finishRouteLoading = useCallback(() => {
    if (navSafetyTimerRef.current) {
      clearTimeout(navSafetyTimerRef.current);
      navSafetyTimerRef.current = null;
    }
    setIsNavigating(false);
  }, []);

  // Initial load orchestrator
  useEffect(() => {
    mountedAtRef.current = Date.now();

    // 1. DOM Ready check
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      milestonesRef.current.domReady = true;
    } else {
      const onDomReady = () => {
        milestonesRef.current.domReady = true;
        recalculateProgress();
      };
      document.addEventListener("DOMContentLoaded", onDomReady, { once: true });
    }

    // 2. Window Load check
    if (document.readyState === "complete") {
      milestonesRef.current.windowLoaded = true;
    } else {
      const onWindowLoad = () => {
        milestonesRef.current.windowLoaded = true;
        recalculateProgress();
      };
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // 3. Document Fonts check
    if ("fonts" in document) {
      document.fonts.ready
        .then(() => {
          milestonesRef.current.fontsReady = true;
          recalculateProgress();
        })
        .catch(() => {
          milestonesRef.current.fontsReady = true;
          recalculateProgress();
        });
    } else {
      milestonesRef.current.fontsReady = true;
    }

    // 4. Stabilization window: ensures child components on initial mount register tasks
    stabilizationTimerRef.current = setTimeout(() => {
      stabilizationPassedRef.current = true;
      recalculateProgress();
    }, STABILIZATION_DELAY_MS);

    // 5. Safety Timeout: Never hang infinitely under any network failure or proxy stall
    initialSafetyTimerRef.current = setTimeout(() => {
      if (!completionTriggeredRef.current) {
        console.warn(
          "[LoadingProvider] Safety timeout reached, completing load sequence.",
        );
        milestonesRef.current.domReady = true;
        milestonesRef.current.fontsReady = true;
        milestonesRef.current.windowLoaded = true;
        stabilizationPassedRef.current = true;
        completeInitialLoad();
      }
    }, INITIAL_SAFETY_TIMEOUT_MS);

    recalculateProgress();

    return () => {
      if (initialSafetyTimerRef.current)
        clearTimeout(initialSafetyTimerRef.current);
      if (stabilizationTimerRef.current)
        clearTimeout(stabilizationTimerRef.current);
      if (navSafetyTimerRef.current) clearTimeout(navSafetyTimerRef.current);
      if (progressAnimRef.current)
        cancelAnimationFrame(progressAnimRef.current);
    };
  }, [completeInitialLoad, recalculateProgress]);

  // Track route changes
  useEffect(() => {
    const fullPath =
      pathname +
      (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    if (currentPathRef.current !== fullPath) {
      currentPathRef.current = fullPath;
      finishRouteLoading();
    }
  }, [pathname, searchParams, finishRouteLoading]);

  // Intercept client link clicks for route transitions
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      try {
        const url = new URL(anchor.href, window.location.href);

        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.hash) return;

        if (url.pathname !== window.location.pathname) {
          const displayLabel =
            url.pathname.replace(/^\//, "").split("/")[0] || "Home";
          const formatted =
            displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1);
          startRouteLoading(formatted);
        }
      } catch {
        // Ignore invalid URL
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, {
        capture: true,
      });
    };
  }, [startRouteLoading]);

  const value = useMemo(
    () => ({
      isLoading,
      isInitialLoad,
      isNavigating,
      progress,
      statusMessage,
      registerCriticalTask,
      trackPromise,
      markTaskComplete,
      preloadImages,
      startRouteLoading,
      finishRouteLoading,
    }),
    [
      isLoading,
      isInitialLoad,
      isNavigating,
      progress,
      statusMessage,
      registerCriticalTask,
      trackPromise,
      markTaskComplete,
      preloadImages,
      startRouteLoading,
      finishRouteLoading,
    ],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  return context || defaultContextValue;
}

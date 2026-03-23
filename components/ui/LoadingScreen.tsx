"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { TextShimmer } from "./text-shimmer";

interface LoadingScreenProps {
  show: boolean;
}

export function LoadingScreen({ show }: LoadingScreenProps) {
  const [stage, setStage] = React.useState<"loading" | "curtain" | "done">("loading");
  const prefersReducedMotion = React.useRef(false);

  React.useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  React.useEffect(() => {
    if (!show) return;

    if (prefersReducedMotion.current) {
      // Skip animation stages if reduced motion is preferred
      const timer = setTimeout(() => setStage("done"), 1000);
      return () => clearTimeout(timer);
    }

    // Stage 1: Black loading screen - 1.5 seconds
    const stage1Timer = setTimeout(() => {
      setStage("curtain");
    }, 1500);

    // Stage 2: Curtain animation - 1 second
    // Stage 3: Done - fade out
    const stage2Timer = setTimeout(() => {
      setStage("done");
    }, 1500 + 1000);

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
    };
  }, [show]);

  if (!show || stage === "done") return null;

  return (
    <>
      {stage === "loading" && (
        <>
          {/* Stage 1: Pure black loading screen */}
          <motion.div
            className="fixed inset-0 z-[9999] bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Loading text with shimmer */}
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <TextShimmer className="text-sm tracking-[0em] font-light text-white" duration={2}>
              P-W Loading
            </TextShimmer>
          </motion.div>
        </>
      )}

      {stage === "curtain" && (
        <>
          {/* Stage 2: Stepped curtain animation - four panels */}
          <motion.div
            className="fixed inset-0 z-[9999] bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          />

          {/* Four stepped panels - stacked horizontally */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="fixed left-0 right-0 z-[10000] bg-black"
              style={{
                top: `${index * 25}%`,
                height: "25%",
                transformOrigin: "left",
              }}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </>
  );
}

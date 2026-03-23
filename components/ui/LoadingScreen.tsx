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

    // Stage 2: Curtain animation - blocks lift away
    // Total: 0.24s delay (top block) + 1.0s duration + 0.1s buffer = 1.34s
    const stage2Timer = setTimeout(() => {
      setStage("done");
    }, 1500 + 1350);

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

          {/* Loading text */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center" style={{ opacity: 1, pointerEvents: 'none' }}>
            <TextShimmer variant="dark" duration={1.2} className="text-sm font-light" style={{ fontSize: '14px', letterSpacing: '0em' }}>
              P-W Loading
            </TextShimmer>
          </div>
        </>
      )}

      {stage === "curtain" && (
        <>
          {/* Fade overlay - dims as blocks lift away */}
          <motion.div
            className="fixed inset-0 z-[9999] bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 1.3,
              ease: [0.22, 1, 0.36, 1],
              delay: 0,
            }}
            pointerEvents="none"
          />

          {/* Stage 2: Four separate columns lifting upward */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className="fixed top-0 bottom-0 z-[10000] bg-black"
              style={{
                left: `${index * 25}%`,
                width: "25%",
                willChange: "transform",
              }}
              initial={{ translateY: 0 }}
              animate={{ translateY: "-100vh" }}
              transition={{
                duration: 1.0,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </>
      )}
    </>
  );
}

"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface HeadlinePanelProps {
  activeTab: string;
  headline: string;
  isInitialLoad?: boolean;
}

export default function HeadlinePanel({ activeTab, headline, isInitialLoad = false }: HeadlinePanelProps) {
  const hasAnimatedRef = React.useRef(false);
  const [shouldTriggerAnimation, setShouldTriggerAnimation] = React.useState(false);

  React.useEffect(() => {
    // Only animate after loading sequence completes (isInitialLoad goes from true to false)
    if (!isInitialLoad && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      setShouldTriggerAnimation(true);
    }
  }, [isInitialLoad]);

  return (
    <div className="mt-8 w-full h-[200px] md:h-[240px] lg:h-[280px] flex items-start">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={shouldTriggerAnimation ? "animated" : "initial"}
          initial={
            shouldTriggerAnimation
              ? { opacity: 0, filter: "blur(36px)", translateY: 30 }
              : { opacity: 0 }
          }
          animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={
            shouldTriggerAnimation
              ? { duration: 2.4, ease: "easeOut" }
              : { duration: 0.15, ease: "easeOut" }
          }
          className="font-sans text-[42px] leading-[1.06] tracking-[-0.01em] text-[var(--text-primary)] md:text-[58px] lg:text-[72px]"
        >
          {headline}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

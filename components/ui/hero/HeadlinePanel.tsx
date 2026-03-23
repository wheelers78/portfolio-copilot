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
  const shouldAnimate = !isInitialLoad && !hasAnimatedRef.current && activeTab === "Everyone";

  React.useEffect(() => {
    if (shouldAnimate) {
      hasAnimatedRef.current = true;
    }
  }, [shouldAnimate]);

  return (
    <div className="mt-8 w-full h-[200px] md:h-[240px] lg:h-[280px] flex items-start">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={activeTab}
          initial={
            shouldAnimate
              ? { opacity: 0, filter: "blur(16px)", translateY: 20 }
              : { opacity: 0 }
          }
          animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={
            shouldAnimate
              ? { duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }
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

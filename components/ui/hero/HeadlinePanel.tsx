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
  const [animationTrigger, setAnimationTrigger] = React.useState(false);
  const shouldAnimate = !isInitialLoad && !hasAnimatedRef.current && activeTab === "Everyone";

  React.useEffect(() => {
    console.log('useEffect running:', { shouldAnimate, animationTrigger, isInitialLoad, activeTab });
    if (shouldAnimate && !animationTrigger) {
      console.log('Setting animationTrigger to true');
      hasAnimatedRef.current = true;
      setAnimationTrigger(true);
    }
  }, [isInitialLoad, activeTab, animationTrigger]);

  return (
    <div className="mt-8 w-full h-[200px] md:h-[240px] lg:h-[280px] flex items-start">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={`${activeTab}-${animationTrigger}`}
          initial={
            shouldAnimate
              ? { opacity: 0.4, filter: "blur(50px)", translateY: 40 }
              : { opacity: 0 }
          }
          animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={
            shouldAnimate
              ? { duration: 2.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
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

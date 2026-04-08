"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { SplitTextHeading } from "../SplitTextHeading";

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
    <div className="mt-8 w-full h-[200px] md:h-[240px] lg:h-[280px] flex items-start overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <SplitTextHeading
          key={activeTab}
          text={headline}
          trigger={shouldTriggerAnimation}
          staggerDelay={0.1}
          wordDelay={0.06}
          duration={0.5}
          className="font-sans text-[24px] font-medium leading-[1.15] tracking-tight text-[var(--text-primary)] md:text-[46px] lg:text-[62px]"
        />
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";

interface HeadlinePanelProps {
  activeTab: string;
  headline: string;
}

export default function HeadlinePanel({ activeTab, headline }: HeadlinePanelProps) {
  return (
    <div className="mt-8 w-full h-[200px] md:h-[240px] lg:h-[280px] flex items-start">
      <AnimatePresence mode="wait" initial={false}>
        <motion.h1
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="font-sans text-[42px] leading-[1.06] tracking-[-0.01em] text-[var(--text-primary)] md:text-[58px] lg:text-[72px]"
        >
          {headline}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}

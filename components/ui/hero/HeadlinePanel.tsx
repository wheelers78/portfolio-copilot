"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface HeadlinePanelProps {
  activeTab: string;
  headline: string;
  isInitialLoad?: boolean;
}

export default function HeadlinePanel({ activeTab, headline, isInitialLoad = false }: HeadlinePanelProps) {
  return (
    <div className="mt-8 w-full h-[200px] md:h-[240px] lg:h-[280px] flex items-start">
      <motion.h1
        key={activeTab}
        initial={{ opacity: 0, filter: "blur(30px)", translateY: 30 }}
        animate={{ opacity: 1, filter: "blur(0px)", translateY: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="font-sans text-[42px] leading-[1.06] tracking-[-0.01em] text-[var(--text-primary)] md:text-[58px] lg:text-[72px]"
      >
        {headline}
      </motion.h1>
    </div>
  );
}

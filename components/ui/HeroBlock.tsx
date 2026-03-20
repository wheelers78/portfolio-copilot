"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tabs from "./Tabs";

interface HeroBlockProps {
  audiences: string[];
  activeTab: string;
  onTabChange: (audience: string) => void;
  headline: string;
}

export default function HeroBlock({
  audiences,
  activeTab,
  onTabChange,
  headline,
}: HeroBlockProps) {
  return (
    <section className="absolute inset-x-6 top-1/2 z-20 -translate-y-1/2 md:inset-x-8 lg:inset-x-10">
      <div className="max-w-[1040px]">
        <Tabs audiences={audiences} activeTab={activeTab} onTabChange={onTabChange} />

        <div className="mt-4 max-w-[920px]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="font-sans text-[42px] leading-[1.05] tracking-[-0.01em] text-[var(--text-primary)] md:text-[58px] lg:text-[72px]"
            >
              {headline}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

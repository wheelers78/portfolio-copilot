"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoImage } from "./brand-logo";

export interface BrandLogoRailProps {
  brands: Array<{
    name: string;
    alt: string;
    scale?: number;
  }>;
  slotCount?: number;
  transitionDuration?: number;
  slotDelay?: number;
  pauseAfterCycle?: number;
}

export const BrandLogoRail = ({
  brands,
  slotCount = 3,
  transitionDuration = 0.7,
  slotDelay = 0.08,
  pauseAfterCycle = 0.5,
}: BrandLogoRailProps) => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Continuous flow: each slot changes sequentially, then immediately repeats
    const totalSlotTime = (slotCount - 1) * slotDelay + transitionDuration;
    const cycleTotalTime = totalSlotTime + pauseAfterCycle;

    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, cycleTotalTime * 1000);

    return () => clearInterval(timer);
  }, [slotCount, slotDelay, transitionDuration, pauseAfterCycle]);

  // Softer cubic-bezier for premium, settling feel
  const premiumEase = [0.22, 1, 0.36, 1];

  const logoVariants = {
    exit: {
      opacity: 0,
      y: -3,
      transition: {
        duration: transitionDuration * 0.4,
        ease: "easeOut",
      },
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: transitionDuration * 0.65,
        ease: premiumEase,
      },
    },
  };

  return (
    <div className="flex justify-center w-full py-4">
      <div className="flex gap-8 items-center justify-center">
        {Array.from({ length: slotCount }).map((_, slotIndex) => {
          // Calculate which logo should be shown in this slot at this cycle
          const logoIndex = (cycle + slotIndex) % brands.length;

          return (
            <div
              key={slotIndex}
              className="flex items-center justify-center"
              style={{
                width: "80px",
                height: "28px",
                position: "relative",
              }}
            >
              <AnimatePresence mode="sync">
                <motion.div
                  key={`${cycle}-${slotIndex}-${logoIndex}`}
                  className="flex items-center justify-center absolute inset-0"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{
                    opacity: {
                      duration: transitionDuration * 0.65,
                      ease: premiumEase,
                      delay: slotIndex * slotDelay,
                    },
                    y: {
                      duration: transitionDuration * 0.65,
                      ease: premiumEase,
                      delay: slotIndex * slotDelay,
                    },
                    filter: {
                      duration: transitionDuration * 0.65,
                      ease: premiumEase,
                      delay: slotIndex * slotDelay,
                    },
                  }}
                >
                  <LogoImage
                    name={brands[logoIndex].name}
                    alt={brands[logoIndex].alt}
                    className="w-full h-full object-contain"
                    style={brands[logoIndex].scale ? { transform: `scale(${brands[logoIndex].scale})` } : undefined}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { useFadeInOnView } from "@/hooks/useFadeInOnView";

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
}

/**
 * Component that fades in and slides up content when it enters the viewport
 * Premium animation for images and content sections
 */
export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
}: FadeInUpProps) {
  const { ref, isInView } = useFadeInOnView({ threshold, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {
              opacity: 0,
              y: 20,
            }
      }
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

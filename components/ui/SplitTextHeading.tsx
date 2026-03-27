"use client";

import React from "react";
import { motion } from "framer-motion";

interface SplitTextHeadingProps {
  text: string;
  className?: string;
  trigger?: boolean;
  staggerDelay?: number;
  wordDelay?: number;
  duration?: number;
  coloredWords?: Record<number, string>; // Map word index to class name
}

/**
 * Premium split-text heading animation
 * Animates each word in sequence with subtle fade-in and upward motion
 * No bounce, elegant and refined for portfolio hero sections
 */
export function SplitTextHeading({
  text,
  className = "",
  trigger = true,
  staggerDelay = 0,
  wordDelay = 0.08,
  duration = 0.5,
  coloredWords = {},
}: SplitTextHeadingProps) {
  const words = text.split(/(\s+)/); // Split by spaces but keep them

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: wordDelay,
        delayChildren: staggerDelay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // easeOut cubic-bezier
      },
    },
  };

  let wordIndex = 0;

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
    >
      {words.map((word, index) => {
        if (word === " ") {
          // Regular space element for natural text wrapping
          return <span key={index}> </span>;
        }

        const currentWordIndex = wordIndex;
        wordIndex += 1;
        const customClass = coloredWords[currentWordIndex];

        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block ${customClass || ""}`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h1>
  );
}

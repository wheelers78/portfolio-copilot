'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  variant?: 'light' | 'dark';
}

export function TextShimmer({
  children,
  as: _Component = 'p',
  className,
  duration = 2,
  spread = 2,
  variant = 'light',
}: TextShimmerProps) {
  const minOpacity = variant === 'dark' ? 0.7 : 0.4;
  const maxOpacity = 1;
  const glowColor = variant === 'dark' ? 'rgba(224, 224, 224, 0.8)' : 'rgba(0, 0, 0, 0.4)';

  return (
    <motion.span
      className={cn(
        'relative inline-block',
        className
      )}
      style={{
        color: variant === 'dark' ? '#ffffff' : '#a1a1aa',
      }}
      animate={{
        textShadow: [
          `0 0 10px ${glowColor}`,
          `0 0 25px ${glowColor}`,
          `0 0 10px ${glowColor}`,
        ],
        opacity: [minOpacity, maxOpacity, minOpacity],
      }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
}

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
  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  const baseColor = variant === 'dark' ? '#ffffff' : '#a1a1aa';
  const shimmerColor = variant === 'dark' ? '#e0e0e0' : '#000';

  return (
    <motion.span
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
        'text-transparent',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `linear-gradient(90deg, transparent calc(50% - var(--spread)), ${shimmerColor}, transparent calc(50% + var(--spread))), linear-gradient(${baseColor}, ${baseColor})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '250% 100%, auto',
        } as React.CSSProperties
      }
    >
      {children}
    </motion.span>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState } from "react";

interface AnimatedBackgroundProps {
  children:
    | React.ReactElement<{ "data-id": string }>
    | React.ReactElement<{ "data-id": string }>[];
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: object;
  enableHover?: boolean;
}

export default function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition = { type: "spring", bounce: 0.15, duration: 0.35 },
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultValue ?? null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = (id: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActiveId(id);
    onValueChange?.(id);
  };

  const handleLeave = () => {
    // Defer clearing so mouseenter on the next sibling fires first,
    // preventing a flicker between adjacent items.
    leaveTimer.current = setTimeout(() => {
      setActiveId(null);
      onValueChange?.(null);
    }, 0);
  };

  const handleClick = (id: string, isActive: boolean) => {
    if (!enableHover) {
      const next = isActive ? null : id;
      setActiveId(next);
      onValueChange?.(next);
    }
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;

        const id = child.props["data-id"] as string;
        const isActive = activeId === id;

        return (
          <div
            key={id}
            className="relative"
            onMouseEnter={enableHover ? () => handleEnter(id) : undefined}
            onMouseLeave={enableHover ? handleLeave : undefined}
            onClick={!enableHover ? () => handleClick(id, isActive) : undefined}
          >
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="animated-background"
                  className={cn("absolute inset-0 rounded-md", className)}
                  transition={transition}
                />
              )}
            </AnimatePresence>
            <div className="relative z-10">{child}</div>
          </div>
        );
      })}
    </>
  );
}

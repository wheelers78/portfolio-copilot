"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TabsRailProps {
  audiences: string[];
  activeTab: string;
  onTabChange: (audience: string) => void;
  isInitialLoad?: boolean;
}

interface TabPosition {
  left: number;
  width: number;
}

export default function TabsRail({ audiences, activeTab, onTabChange, isInitialLoad = false }: TabsRailProps) {
  const [activePosition, setActivePosition] = useState<TabPosition>({ left: 0, width: 0 });
  const [hoveredPosition, setHoveredPosition] = useState<TabPosition | null>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeButton = tabsRef.current[audiences.indexOf(activeTab)];
    if (activeButton) {
      setActivePosition({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab, audiences]);

  const handleMouseEnter = (audience: string) => {
    const index = audiences.indexOf(audience);
    const button = tabsRef.current[index];
    if (button) {
      setHoveredPosition({
        left: button.offsetLeft,
        width: button.offsetWidth,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredPosition(null);
  };

  const position = hoveredPosition || activePosition;

  return (
    <motion.nav
      aria-label="Audience navigation"
      className="w-full"
      initial={isInitialLoad ? undefined : { opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={
        isInitialLoad
          ? { duration: 0 }
          : { duration: 1.0, delay: 1.7, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="relative overflow-x-auto scrollbar-hide">
        <ul className="flex items-center gap-6 pb-3 min-w-max">
          {audiences.map((audience, index) => {
            const isActive = audience === activeTab;

            return (
              <li key={audience}>
                <button
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  type="button"
                  onClick={() => onTabChange(audience)}
                  onMouseEnter={() => handleMouseEnter(audience)}
                  onMouseLeave={handleMouseLeave}
                  aria-current={isActive ? "true" : undefined}
                  className={`px-0 py-0 text-[16px] leading-none tracking-[-0.01em] font-normal transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {audience}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Animated underline */}
        <div
          className="absolute bottom-0 h-[1.5px] bg-[var(--text-primary)] transition-all duration-300 ease-out"
          style={{
            left: `${position.left}px`,
            width: `${position.width}px`,
          }}
        />
      </div>
    </motion.nav>
  );
}

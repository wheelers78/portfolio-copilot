"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWindowManager } from "@/lib/useWindowManager";
import { ColorOrb } from "@/components/ui/ai-input";
import styles from "./Dock.module.css";

const UserIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 9C10.4283 9 11.3182 9.36901 11.9746 10.0254C12.631 10.6818 13 11.5717 13 12.5V15H12V12.5C12 12.1717 11.9352 11.8463 11.8096 11.543C11.6839 11.2398 11.4996 10.9645 11.2676 10.7324C11.0355 10.5004 10.7602 10.3161 10.457 10.1904C10.1537 10.0648 9.8283 10 9.5 10H6.5C5.83696 10 5.20126 10.2636 4.73242 10.7324C4.26358 11.2013 4 11.837 4 12.5V15H3V12.5C3 11.5717 3.36901 10.6818 4.02539 10.0254C4.68177 9.36901 5.57174 9 6.5 9H9.5ZM8 1C8.92826 1 9.81823 1.36901 10.4746 2.02539C11.131 2.68177 11.5 3.57174 11.5 4.5C11.5 5.19219 11.2947 5.86879 10.9102 6.44434C10.5257 7.01977 9.97919 7.46847 9.33984 7.7334C8.70035 7.99828 7.99627 8.06762 7.31738 7.93262C6.63845 7.79757 6.01487 7.46409 5.52539 6.97461C5.03591 6.48513 4.70243 5.86155 4.56738 5.18262C4.43238 4.50374 4.50172 3.79965 4.7666 3.16016C5.03153 2.52081 5.48023 1.97434 6.05566 1.58984C6.63121 1.20531 7.30781 1 8 1ZM8 2C7.33696 2 6.70126 2.26358 6.23242 2.73242C5.76358 3.20126 5.5 3.83696 5.5 4.5C5.5 4.9943 5.64636 5.47763 5.9209 5.88867C6.19554 6.2997 6.58629 6.62033 7.04297 6.80957C7.49965 6.99873 8.00249 7.04849 8.4873 6.95215C8.97226 6.85569 9.41795 6.61721 9.76758 6.26758C10.1172 5.91795 10.3557 5.47226 10.4521 4.9873C10.5485 4.50249 10.4987 3.99965 10.3096 3.54297C10.1203 3.08629 9.7997 2.69554 9.38867 2.4209C8.97763 2.14636 8.4943 2 8 2Z" fill="currentColor" />
  </svg>
);

const FolderIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 15H8V14H11.5V15ZM5.58496 2C5.71692 1.9999 5.84787 2.02554 5.96973 2.07617C6.09152 2.12679 6.20193 2.20139 6.29492 2.29492L8 4H14C14.2652 4 14.5195 4.10543 14.707 4.29297C14.8946 4.48051 15 4.73478 15 5V9H14V5H7.58496L7.29492 4.70508L5.58496 3H2V13H7V14H2C1.73478 14 1.48051 13.8946 1.29297 13.707C1.10543 13.5195 1 13.2652 1 13V3C1 2.73478 1.10543 2.48051 1.29297 2.29297C1.48051 2.10543 1.73478 2 2 2H5.58496ZM15 13H8V12H15V13ZM15 11H8V10H15V11Z" fill="currentColor" />
  </svg>
);

const WorkIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3H10.5V2C10.5 1.73478 10.3946 1.48051 10.207 1.29297C10.0195 1.10543 9.76522 1 9.5 1H6.5C6.23478 1 5.98051 1.10543 5.79297 1.29297C5.60543 1.48051 5.5 1.73478 5.5 2V3H2C1.73478 3 1.48051 3.10543 1.29297 3.29297C1.10543 3.48051 1 3.73478 1 4V14C1 14.2652 1.10543 14.5195 1.29297 14.707C1.48051 14.8946 1.73478 15 2 15H14C14.2652 15 14.5195 14.8946 14.707 14.707C14.8946 14.5195 15 14.2652 15 14V4C15 3.73478 14.8946 3.48051 14.707 3.29297C14.5195 3.10543 14.2652 3 14 3ZM6.5 2H9.5V3H6.5V2ZM2 4H14V14H2V4Z" fill="currentColor" />
  </svg>
);

interface DockProps {
  isInitialLoad?: boolean;
}

export default function Dock({ isInitialLoad = false }: DockProps) {
  const { openWindow, closeWindow, windows } = useWindowManager();

  const dockItems = [
    {
      type: "about",
      label: "About",
      icon: <UserIcon />,
    },
    {
      type: "ask",
      label: "Ask",
      icon: <ColorOrb dimension="18px" tones={{ base: "oklch(22.64% 0 0)" }} />,
    },
    {
      type: "work",
      label: "Work",
      icon: <FolderIcon />,
    },
  ];

  const getWindow = (itemType: string) => {
    return windows.find((w) => w.type === itemType);
  };

  const handleClick = (itemType: string, label: string) => {
    const existing = getWindow(itemType);
    if (existing) {
      closeWindow(existing.id);
    } else {
      openWindow(itemType as any, label);
    }
  };

  return (
    <motion.div
      initial={isInitialLoad ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        isInitialLoad
          ? { duration: 0.28, delay: 0.18, ease: "easeOut" }
          : { duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }
      }
      className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2"
    >
      <div className={styles.container}>
        {dockItems.map((item) => {
          const active = !!getWindow(item.type);
          return (
            <button
              key={item.type}
              type="button"
              onClick={() => handleClick(item.type, item.label)}
              className={`${styles.button} ${active ? styles.active : styles.inactive}`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

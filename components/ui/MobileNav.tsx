"use client";

import React from "react";
import { motion } from "framer-motion";
import { CloseFilled } from "@carbon/icons-react";
import styles from "./Dock.module.css";

interface MobileNavProps {
  activePanel: string | null;
  onSelect: (panel: string | null) => void;
  isInitialLoad?: boolean;
}

const navItems = [
  { id: "about", label: "About" },
  { id: "ask", label: "Ask" },
  { id: "work", label: "Work" },
];

export default function MobileNav({
  activePanel,
  onSelect,
  isInitialLoad = false,
}: MobileNavProps) {
  const handleTap = (id: string) => {
    onSelect(activePanel === id ? null : id);
  };

  return (
    <motion.nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: "calc(20px + env(safe-area-inset-bottom))",
        left: "20px",
        right: "20px",
        zIndex: 60,
      }}
      initial={isInitialLoad ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        isInitialLoad
          ? { duration: 0.28, delay: 0.18, ease: "easeOut" }
          : { duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className={styles.container} style={{ width: "100%" }}>
        {navItems.map((item) => {
          const isActive = activePanel === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTap(item.id)}
              className={`${styles.button} ${isActive ? styles.active : ""}`}
              style={{
                flex: 1,
                justifyContent: "center",
                position: "relative",
                paddingRight: isActive ? "30px" : undefined,
              }}
            >
              {item.label}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    right: "10px",
                    display: "flex",
                    alignItems: "center",
                    opacity: 0.55,
                  }}
                >
                  <CloseFilled size={13} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

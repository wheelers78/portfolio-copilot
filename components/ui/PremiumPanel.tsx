"use client";

import { ReactNode, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PremiumPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: "project" | "copilot" | "about";
  maxWidth?: string;
}

export default function PremiumPanel({
  isOpen,
  onClose,
  children,
  variant = "project",
  maxWidth = "max-w-3xl",
}: PremiumPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when panel is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.92,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 40,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop — subtle blur and dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/15 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Premium Panel Window */}
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 pointer-events-none"
          >
            <div
              className={`${maxWidth} w-full h-auto max-h-[85vh] pointer-events-auto`}
              style={{
                perspective: "1200px",
              }}
            >
              {/* Window surface with refined styling */}
              <div
                className={`
                  bg-[var(--background)]
                  rounded-3xl md:rounded-4xl
                  border border-[var(--border)]
                  shadow-2xl
                  overflow-hidden
                  flex flex-col
                  h-full
                  ${variant === "project" ? "ring-1 ring-[var(--surface)]" : ""}
                `}
                style={{
                  boxShadow:
                    "0 20px 60px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.1)",
                }}
              >
                {/* Content — scrollable interior */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

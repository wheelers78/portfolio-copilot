"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShiningText } from "@/components/ui/shining-text";

interface LoadingScreenProps {
  show: boolean;
}

export function LoadingScreen({ show }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <ShiningText text="P - W Loading" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

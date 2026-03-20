"use client";

import { motion } from "framer-motion";

interface PanelOverlayProps {
  onClose: () => void;
}

export default function PanelOverlay({ onClose }: PanelOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
      aria-hidden="true"
    />
  );
}

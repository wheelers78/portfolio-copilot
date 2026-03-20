"use client";

import React from "react";
import { motion } from "framer-motion";

export default function UtilityNav() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="absolute top-6 left-6 z-20"
    >
      <nav className="flex items-center gap-0 rounded-full border border-[#d4d4d0] bg-white px-2 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        <a href="#" className="flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium tracking-[0.01em] text-[#6b6b68] transition-colors hover:bg-[#f0f0f0]">
          P—W
        </a>
        <a href="#" className="flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium tracking-[0.01em] text-[#6b6b68] transition-colors hover:bg-[#f0f0f0]">
          Connect
        </a>
        <a href="#" className="flex items-center rounded-full px-3 py-1.5 text-[12px] font-medium tracking-[0.01em] text-[#6b6b68] transition-colors hover:bg-[#f0f0f0]">
          Resume
        </a>
      </nav>
    </motion.div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const audiences = [
  "Everyone",
  "Recruiters",
  "Design Directors",
  "Product Designers",
  "Product Managers",
  "Engineers",
];

export default function AudienceTabs() {
  const [active, setActive] = useState("Everyone");

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="absolute top-20 left-8 z-20"
    >
      <div className="flex items-center gap-2">
        {audiences.map((audience) => (
          <button
            key={audience}
            onClick={() => setActive(audience)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-all glass-base glass-button ${
              active === audience
                ? "bg-[#1a1a18] text-[#fafaf8]"
                : "text-[#6b6b68] hover:text-[#1a1a18]"
            }`}
          >
            {audience}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

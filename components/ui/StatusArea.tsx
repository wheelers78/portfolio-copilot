"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StatusArea() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="absolute top-6 right-6 z-20 text-xs text-[#6b6b68]"
    >
      <div className="flex items-center gap-3">
        <span>Good morning</span>
        <span className="text-[#d4d4d0]">·</span>
        <span>London</span>
        <span className="text-[#d4d4d0]">·</span>
        <span>18°C</span>
        <span className="text-[#d4d4d0]">·</span>
        <span>{time}</span>
      </div>
    </motion.div>
  );
}

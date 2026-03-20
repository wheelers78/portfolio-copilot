"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CenteredHeadline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-12"
    >
      <h1 className="font-sans text-6xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.01em] text-[#1a1a18] max-w-3xl mx-auto">
        Hi there, I'm <span className="font-sans font-normal">Paul</span> a designer working across systems, strategy, and craft.
      </h1>
    </motion.div>
  );
}

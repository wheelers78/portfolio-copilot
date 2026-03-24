"use client";

import React from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";

interface CaseStudyNavItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
}

export default function CaseStudyNavItem({
  project,
  isSelected,
  onSelect,
}: CaseStudyNavItemProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg transition-all duration-200 group cursor-pointer ${
        isSelected
          ? "bg-[var(--surface-muted)] border border-[var(--border)]"
          : "border border-transparent hover:bg-[var(--surface-muted)] hover:border-[var(--border-subtle)]"
      }`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-1.5">
          <p
            className={`text-sm font-semibold leading-snug transition-colors ${
              isSelected
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-primary)] group-hover:text-[var(--text-primary)]"
            }`}
          >
            {project.title}
          </p>
          <p className="text-xs leading-relaxed text-[var(--text-muted)] line-clamp-3">
            {project.summary}
          </p>
        </div>
        <div className="flex-shrink-0 pt-0.5 text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform">
          →
        </div>
      </div>
    </motion.button>
  );
}

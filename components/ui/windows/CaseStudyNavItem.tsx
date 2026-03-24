"use client";

import React from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";

interface CaseStudyNavItemProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onHoverChange?: (isHovered: boolean) => void;
}

export default function CaseStudyNavItem({
  project,
  isSelected,
  onSelect,
  onHoverChange,
}: CaseStudyNavItemProps) {
  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className="w-full text-left p-4 group cursor-pointer transition-colors duration-200"
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

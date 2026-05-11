"use client";

import React from "react";
import { motion } from "framer-motion";
import { type Project } from "@/data/projects";
import { ChevronRight } from "lucide-react";
import FadeImage from "../FadeImage";

interface CaseStudyNavItemProps {
  project: Project;
  isSelected: boolean;
  isHovered?: boolean;
  onSelect: () => void;
  onHoverChange?: (isHovered: boolean) => void;
}

export default function CaseStudyNavItem({
  project,
  isSelected,
  isHovered,
  onSelect,
  onHoverChange,
}: CaseStudyNavItemProps) {
  const thumbnailImage = project.images?.[0];
  const isComingSoon = project.status === "comingSoon";

  const sharedContent = (
    <>
      {/* Thumbnail image */}
      {thumbnailImage && (
        <div className="flex-shrink-0 w-8 h-8 rounded overflow-hidden">
          <FadeImage
            src={thumbnailImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs font-mono font-normal uppercase leading-[1.6]"
          style={{
            letterSpacing: "-0.12px",
            color: isComingSoon
              ? "var(--text-muted)"
              : isSelected || isHovered
              ? "var(--text-primary)"
              : "var(--text-muted)",
            fontWeight: 400,
          }}
        >
          {project.title}
        </p>
        {isComingSoon && (
          <p
            className="text-xs font-mono font-normal leading-[1.6]"
            style={{
              letterSpacing: "-0.12px",
              color: "var(--text-muted)",
              fontSize: "10px",
            }}
          >
            Coming Soon
          </p>
        )}
      </div>

      {/* Arrow icon - only visible on selected active items */}
      {isSelected && !isComingSoon && (
        <motion.div
          className="flex-shrink-0 ml-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
        </motion.div>
      )}
    </>
  );

  // Coming-soon items render as a plain div — no click, no hover, default cursor
  if (isComingSoon) {
    return (
      <div
        className="w-full text-left px-2 py-2 flex items-center gap-3 rounded-lg"
        style={{ cursor: "default", backgroundColor: "transparent" }}
      >
        {sharedContent}
      </div>
    );
  }

  return (
    <motion.button
      onClick={onSelect}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className="w-full text-left px-2 py-2 group cursor-pointer transition-colors duration-200 flex items-center gap-3 rounded-lg"
      style={{
        backgroundColor: isSelected
          ? "var(--nav-item-active-bg)"
          : isHovered
          ? "var(--nav-item-hover-bg)"
          : "transparent",
      }}
    >
      {sharedContent}
    </motion.button>
  );
}

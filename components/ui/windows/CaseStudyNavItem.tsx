"use client";

import React from "react";
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
    <button
      onClick={onSelect}
      className={`w-full text-left px-3 py-2.5 rounded-md transition-all duration-150 group ${
        isSelected
          ? "bg-[var(--surface-muted)] border border-[var(--border)]"
          : "border border-transparent hover:bg-[var(--surface-hover)]"
      }`}
    >
      <div className="flex flex-col gap-1">
        <p
          className={`text-[12px] font-medium leading-snug transition-colors ${
            isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
          }`}
        >
          {project.title}
        </p>
        <p className="text-[10px] text-[var(--text-muted)] opacity-60">
          {project.roleTitle} · {project.period}
        </p>
      </div>
    </button>
  );
}

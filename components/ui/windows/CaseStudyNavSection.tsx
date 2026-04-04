"use client";

import React from "react";

interface CaseStudyNavSectionProps {
  title: string;
}

export default function CaseStudyNavSection({ title }: CaseStudyNavSectionProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-3">
      {/* Section indicator square */}
      <div className="flex-shrink-0 w-2 h-2" style={{ backgroundColor: 'var(--text-primary)' }} />

      {/* Section title */}
      <p
        className="text-xs font-mono font-normal uppercase text-[var(--text-primary)] leading-[1.6]"
        style={{ letterSpacing: "-0.1px" }}
      >
        {title}
      </p>
    </div>
  );
}

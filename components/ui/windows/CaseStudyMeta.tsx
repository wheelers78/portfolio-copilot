"use client";

import React from "react";
import { type Project } from "@/data/projects";

interface CaseStudyMetaProps {
  project: Project;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[11px] font-medium text-[var(--text-muted)] uppercase">
      {children}
    </span>
  );
}

export default function CaseStudyMeta({ project }: CaseStudyMetaProps) {
  return (
    <div className="grid gap-x-6 gap-y-4" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
      <div className="space-y-2">
        <SectionLabel>Role</SectionLabel>
        <p className="text-[13px] leading-relaxed text-[var(--text-primary)]">
          {project.role}
        </p>
      </div>

      {project.period && (
        <div className="space-y-2">
          <SectionLabel>Period</SectionLabel>
          <p className="text-[13px] leading-relaxed text-[var(--text-primary)]">
            {project.period}
          </p>
        </div>
      )}

      {project.tags.length > 0 && (
        <div className="space-y-2">
          <SectionLabel>Tags</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-1 border border-[var(--border-subtle)] rounded text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

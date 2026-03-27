"use client";

import React from "react";
import { type Project } from "@/data/projects";

interface CaseStudyHeroProps {
  project: Project;
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <div className="border-b border-[var(--border-subtle)] bg-[var(--surface)] sticky top-0 z-10">
      <div className="px-12 py-8 space-y-4">
        <div className="space-y-2">
          <p className="text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--text-muted)] opacity-50">
            {project.roleTitle}
          </p>
          <h1
            className="font-sans leading-[1.2] text-[var(--text-primary)]"
            style={{ fontSize: "28px", letterSpacing: "-0.0em" }}
          >
            {project.title}
          </h1>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { projects } from "@/data/projects";
import CaseStudyNav from "./CaseStudyNav";
import CaseStudyDetail from "./CaseStudyDetail";

interface WorkWindowProps {
  initialSlug?: string;
}

export default function WorkWindow({ initialSlug }: WorkWindowProps) {
  const firstActiveProject = projects.find((p) => p.status !== "comingSoon");
  const initialSlugValue =
    initialSlug && projects.find((p) => p.slug === initialSlug && p.status !== "comingSoon")
      ? initialSlug
      : firstActiveProject?.slug ?? projects[0].slug;

  const [activeProjectSlug, setActiveProjectSlug] = useState(initialSlugValue);
  const scrollRef = useRef<HTMLDivElement>(null);

  // When opened from RecentWindow with a specific slug, navigate to it
  useEffect(() => {
    if (initialSlug && projects.find((p) => p.slug === initialSlug && p.status !== "comingSoon")) {
      setActiveProjectSlug(initialSlug);
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [initialSlug]);

  const activeProject = projects.find((p) => p.slug === activeProjectSlug) ?? projects[0];

  const playgroundSlugs = ["personal_site", "solana_trading_alerts"];
  const sectionLabel = playgroundSlugs.includes(activeProject.slug) ? "Playground" : "Case Studies";

  const handleSelectProject = (project: any) => {
    setActiveProjectSlug(project.slug);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="flex h-full bg-[var(--surface)]">
      {/* Left navigation rail */}
      <CaseStudyNav
        projects={projects}
        selectedSlug={activeProjectSlug}
        onSelectProject={handleSelectProject}
      />

      {/* Right content pane - single case study */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[var(--surface)]">
        <CaseStudyDetail project={activeProject} sectionLabel={sectionLabel} />
      </div>
    </div>
  );
}

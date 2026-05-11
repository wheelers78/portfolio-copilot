"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "@carbon/icons-react";
import { projects } from "@/data/projects";
import { type Project } from "@/data/projects";
import CaseStudyNav from "./CaseStudyNav";
import CaseStudyDetail from "./CaseStudyDetail";
import { FadeImage } from "@/components/ui/FadeImage";

interface WorkWindowProps {
  initialSlug?: string;
  isMobile?: boolean;
}

// ── Mobile project list ─────────────────────────────────────────────────────

function MobileProjectSection({ title }: { title: string }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--text-muted)",
        padding: "20px 24px 8px",
        opacity: 0.6,
      }}
    >
      {title}
    </p>
  );
}

function MobileProjectRow({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const isComingSoon = project.status === "comingSoon";
  const thumbnail = project.images?.[0];

  if (isComingSoon) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "14px 24px",
          opacity: 0.35,
          cursor: "default",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {thumbnail && (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <FadeImage
              src={thumbnail}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "2px",
            }}
          >
            {project.title}
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Coming Soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 24px",
        width: "100%",
        textAlign: "left",
        background: "none",
        border: "none",
        borderBottom: "1px solid var(--border-subtle)",
        cursor: "pointer",
      }}
    >
      {thumbnail && (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={thumbnail}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: "2px",
          }}
        >
          {project.title}
        </p>
        {project.role && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.01em",
            }}
          >
            {project.role}
          </p>
        )}
      </div>
      <ArrowRight
        size={16}
        style={{
          color: "var(--text-muted)",
          flexShrink: 0,
          marginLeft: "8px",
        }}
      />
    </button>
  );
}

function MobileProjectList({
  onSelect,
}: {
  onSelect: (project: Project) => void;
}) {
  const caseStudySlugs = [
    "wgsn_trends",
    "events_culture",
    "pulse_ai",
    "shorts",
    "catwalks",
    "sedna",
    "sedna_harbor",
  ];
  const playgroundSlugs = ["personal_site", "solana_trading_alerts"];

  const caseStudies = projects.filter((p) => caseStudySlugs.includes(p.slug));
  const playground = projects.filter((p) => playgroundSlugs.includes(p.slug));

  return (
    <div>
      <MobileProjectSection title="Case studies" />
      {caseStudies.map((project) => (
        <MobileProjectRow
          key={project.slug}
          project={project}
          onSelect={() => onSelect(project)}
        />
      ))}
      <MobileProjectSection title="Playground" />
      {playground.map((project) => (
        <MobileProjectRow
          key={project.slug}
          project={project}
          onSelect={() => onSelect(project)}
        />
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function WorkWindow({ initialSlug, isMobile = false }: WorkWindowProps) {
  const firstActiveProject = projects.find((p) => p.status !== "comingSoon");
  const initialSlugValue =
    initialSlug && projects.find((p) => p.slug === initialSlug && p.status !== "comingSoon")
      ? initialSlug
      : firstActiveProject?.slug ?? projects[0].slug;

  const [activeProjectSlug, setActiveProjectSlug] = useState(initialSlugValue);
  const [mobileView, setMobileView] = useState<"list" | "detail">("list");
  const scrollRef = useRef<HTMLDivElement>(null);

  // When opened from RecentWindow with a specific slug, navigate to it
  useEffect(() => {
    if (initialSlug && projects.find((p) => p.slug === initialSlug && p.status !== "comingSoon")) {
      setActiveProjectSlug(initialSlug);
      if (isMobile) setMobileView("detail");
      scrollRef.current?.scrollTo({ top: 0 });
    }
  }, [initialSlug, isMobile]);

  const activeProject = projects.find((p) => p.slug === activeProjectSlug) ?? projects[0];

  const playgroundSlugs = ["personal_site", "solana_trading_alerts"];
  const sectionLabel = playgroundSlugs.includes(activeProject.slug) ? "Playground" : "Case Studies";

  const handleSelectProject = (project: Project) => {
    setActiveProjectSlug(project.slug);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  // ── Mobile layout ──────────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <AnimatePresence mode="wait">
        {mobileView === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <MobileProjectList
              onSelect={(project) => {
                if (project.status !== "comingSoon") {
                  handleSelectProject(project);
                  setMobileView("detail");
                }
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Back button */}
            <button
              type="button"
              onClick={() => setMobileView("list")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "14px 24px",
                background: "none",
                border: "none",
                borderBottom: "1px solid var(--border-subtle)",
                cursor: "pointer",
                width: "100%",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                color: "var(--text-muted)",
                letterSpacing: "0.01em",
              }}
            >
              <span>←</span>
              <span>All work</span>
            </button>
            <CaseStudyDetail project={activeProject} sectionLabel={sectionLabel} isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────────────────

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

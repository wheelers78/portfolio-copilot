"use client";

import React, { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { useWindowManager } from "@/lib/useWindowManager";
import AnimatedBackground from "@/components/ui/animated-background";

const PREVIEW_WIDTH = 260;
const PREVIEW_GAP = 8;

interface HoverState {
  slug: string;
  rowTop: number;
  rowRight: number;
}

export default function RecentWindow() {
  const { openWindow, windows } = useWindowManager();
  const [pressing, setPressing] = useState<string | null>(null);
  const [hover, setHover] = useState<HoverState | null>(null);

  const openProjectSlugs = new Set(
    windows.filter((w) => w.type === "project").map((w) => w.data?.slug)
  );

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setHover({ slug, rowTop: rect.top, rowRight: rect.right });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHover(null);
    setPressing(null);
  }, []);

  const handleOpen = (slug: string, title: string) => {
    const project = projects.find((p) => p.slug === slug);
    if (!project) return;
    openWindow("project", title, project);
  };

  const hoveredProject = hover
    ? projects.find((p) => p.slug === hover.slug)
    : null;

  return (
    <>
      {/* ── Project list ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1">
        <AnimatedBackground
          enableHover
          className="bg-black/5"
          transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
        >
          {projects.map((project) => {
            const isOpen = openProjectSlugs.has(project.slug);
            return (
              <motion.button
                key={project.slug}
                data-id={project.slug}
                type="button"
                onMouseEnter={(e) => handleMouseEnter(e, project.slug)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={() => setPressing(project.slug)}
                onMouseUp={() => setPressing(null)}
                onClick={() => handleOpen(project.slug, project.title)}
                animate={{ scale: pressing === project.slug ? 0.98 : 1 }}
                transition={{ duration: 0.1 }}
                className={`group w-full rounded-md px-6 py-5 text-left transition-all duration-200 ${
                  isOpen ? "ring-1 ring-inset ring-black" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="truncate text-[24px] pb-2 font-sans leading-tight text-[var(--text-primary)]">
                        {project.title}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[14px] leading-relaxed line-clamp-2 text-[var(--text-primary)]">
                      {project.summary}
                    </p>
                  </div>
                  <div className={`shrink-0 transition-all duration-150 ${isOpen ? "text-black opacity-100" : "text-black opacity-20 group-hover:opacity-80"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5H4.5V19.5H19.5V12H21V19.5C20.9995 19.8977 20.8417 20.2794 20.5605 20.5605C20.2794 20.8417 19.8977 20.9995 19.5 21H4.5C4.10234 20.9995 3.72064 20.8417 3.43945 20.5605C3.15826 20.2794 3.00054 19.8977 3 19.5V4.5C3.00054 4.10234 3.15826 3.72064 3.43945 3.43945C3.72064 3.15826 4.10234 3.00054 4.5 3H12V4.5ZM22.5 1.5V9H21V4.06055L14.5605 10.5L13.5 9.43945L19.9395 3H15V1.5H22.5Z" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatedBackground>
      </div>

      {/* ── Row-anchored side preview — portaled to escape overflow ───── */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hover && hoveredProject?.images?.[0] && (
              <motion.div
                key="side-preview"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  left: hover.rowRight + PREVIEW_GAP,
                  top: hover.rowTop,
                  width: PREVIEW_WIDTH,
                  zIndex: 9999,
                  pointerEvents: "none",
                }}
              >
                <div
                  className="overflow-hidden rounded-md bg-[var(--surface-muted)]"
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.12), 0px 1px 8px rgba(0,0,0,0.20)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={hoveredProject.slug}
                      src={hoveredProject.images![0]}
                      alt={hoveredProject.title}
                      draggable={false}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      className="w-full h-auto block"
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

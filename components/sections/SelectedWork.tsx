"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

interface SelectedWorkProps {
  onAskAbout: (prompt: string) => void;
  copilotRef: React.RefObject<HTMLElement | null>;
}

export default function SelectedWork({ onAskAbout, copilotRef }: SelectedWorkProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const handleAsk = (prompt: string) => {
    onAskAbout(prompt);
    setTimeout(() => {
      copilotRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section id="work" className="px-6 md:px-12 lg:px-16 py-24 border-t border-[var(--border)]">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-16">
          <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)]">
            Selected Work
          </p>
          <div className="flex-1 h-px bg-[var(--border)]" />
          <p className="text-xs text-[var(--muted)] font-mono">{projects.length} projects</p>
        </div>

        {/* Project list */}
        <div className="divide-y divide-[var(--border)]">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
              className="group relative py-8 cursor-default"
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left: title + summary */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-xs text-[var(--subtle)] font-mono w-5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl md:text-2xl font-sans text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {project.title}
                    </h3>
                  </div>
                  <div className="ml-9">
                    <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 max-w-lg">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-0.5 border border-[var(--border)] rounded-full text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: metadata + CTA */}
                <div className="ml-9 md:ml-0 md:text-right flex flex-col items-start md:items-end gap-3 md:min-w-40">
                  <div>
                    <p className="text-xs text-[var(--muted)]">{project.company}</p>
                    <p className="text-xs text-[var(--subtle)] font-mono">{project.period}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleAsk(`Tell me about ${project.title}`)
                    }
                    className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-150 cursor-pointer whitespace-nowrap"
                  >
                    Ask about this →
                  </button>
                </div>
              </div>

              {/* Hover-revealed suggested questions */}
              <AnimatePresence>
                {hoveredSlug === project.slug && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-9 mt-4 flex flex-wrap gap-2 pb-1">
                      {project.suggestedQuestions.slice(0, 3).map((q) => (
                        <button
                          key={q}
                          onClick={() => handleAsk(q)}
                          className="text-xs px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-150 cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

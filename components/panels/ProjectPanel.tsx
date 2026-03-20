"use client";

import { usePortfolioState } from "@/lib/usePortfolioState";
import { projects } from "@/data/projects";
import PremiumPanel from "@/components/ui/PremiumPanel";

export default function ProjectPanel() {
  const { activeProjectSlug, closePanel, goBack, panelHistory } =
    usePortfolioState();

  const project = projects.find((p) => p.slug === activeProjectSlug);
  if (!project) return null;

  return (
    <PremiumPanel isOpen={!!activeProjectSlug} onClose={closePanel} variant="project">
      <div className="flex flex-col h-full">
        {/* Header — fixed at top */}
        <div className="sticky top-0 z-10 bg-[var(--background)]/98 backdrop-blur-sm border-b border-[var(--border)] px-8 md:px-10 py-7">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                  <p className="text-xs tracking-[0.16em] uppercase text-[var(--muted)]">
                    {project.company}
                  </p>
                  <span className="text-xs text-[var(--subtle)]">·</span>
                  <p className="text-xs font-mono text-[var(--subtle)]">
                    {project.period}
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-sans text-[var(--foreground)] leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-full text-[var(--muted)] bg-[var(--surface)]/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-10 py-8 space-y-10">
          {/* Summary */}
          <div>
            <p className="text-base md:text-lg leading-relaxed text-[var(--foreground)]">
              {project.summary}
            </p>
          </div>

          {/* Challenge */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                The Challenge
              </p>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed ml-4">
              {project.challenge}
            </p>
          </div>

          {/* Role */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                My Role
              </p>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed ml-4">
              {project.role}
            </p>
          </div>

          {/* Actions */}
          {project.actions.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                  What I Did
                </p>
              </div>
              <ul className="space-y-2.5 ml-4">
                {project.actions.map((action, i) => (
                  <li key={i} className="text-sm text-[var(--muted)] flex gap-3 leading-relaxed">
                    <span className="text-[var(--subtle)] flex-shrink-0 mt-0.5">→</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcomes */}
          {project.outcomes.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                  Why It Mattered
                </p>
              </div>
              <ul className="space-y-2.5 ml-4">
                {project.outcomes.map((outcome, i) => (
                  <li key={i} className="text-sm text-[var(--muted)] flex gap-3 leading-relaxed">
                    <span className="text-[var(--accent)] flex-shrink-0 mt-0.5">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Spacing */}
          <div className="h-4" />
        </div>

        {/* Footer — fixed at bottom */}
        <div className="sticky bottom-0 bg-[var(--background)]/98 backdrop-blur-sm border-t border-[var(--border)] px-8 md:px-10 py-5 flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-3 py-2"
            style={{ visibility: panelHistory.length > 0 ? "visible" : "hidden" }}
          >
            ← Back
          </button>
          <button
            onClick={closePanel}
            className="text-sm px-5 py-2.5 border border-[var(--border)] rounded-full text-[var(--muted)] hover:bg-[var(--surface)] hover:border-[var(--foreground)] hover:text-[var(--foreground)] transition-all"
          >
            ESC
          </button>
        </div>
      </div>
    </PremiumPanel>
  );
}

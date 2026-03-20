"use client";

import { usePortfolioState } from "@/lib/usePortfolioState";
import { experience, patternSummary } from "@/data/experience";
import PremiumPanel from "@/components/ui/PremiumPanel";

export default function ExperiencePanel() {
  const { closePanel, goBack, panelHistory, activePanel } = usePortfolioState();

  return (
    <PremiumPanel
      isOpen={activePanel === "experience"}
      onClose={closePanel}
      variant="project"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[var(--background)]/98 backdrop-blur-sm border-b border-[var(--border)] px-8 md:px-10 py-7">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <p className="text-xs tracking-[0.16em] uppercase text-[var(--muted)]">
              Career
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans text-[var(--foreground)]">
            Experience
          </h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-10 py-8 space-y-8">
          {/* Roles */}
          {experience.map((role) => (
            <div key={role.id} className="space-y-4 border-l border-[var(--border)] pl-6">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-base font-medium text-[var(--foreground)]">
                    {role.company}
                  </span>
                  <span className="text-sm text-[var(--muted)] ml-2">— {role.title}</span>
                </div>
                <span className="text-xs font-mono text-[var(--subtle)] flex-shrink-0">
                  {role.period}
                </span>
              </div>

              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {role.summary}
              </p>

              <ul className="space-y-1.5">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="text-xs text-[var(--muted)] flex items-start gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[var(--subtle)] flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Pattern recognition */}
          <div className="space-y-3 pt-6 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                Pattern Recognition
              </p>
            </div>
            <div className="space-y-2.5 ml-4 border-l border-[var(--border)] pl-4">
              {patternSummary.map((pattern, i) => (
                <p key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                  {pattern}
                </p>
              ))}
            </div>
          </div>

          <div className="h-4" />
        </div>

        {/* Footer */}
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

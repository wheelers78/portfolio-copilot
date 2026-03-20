"use client";

import { usePortfolioState } from "@/lib/usePortfolioState";
import PremiumPanel from "@/components/ui/PremiumPanel";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/paulwhelan" },
  { label: "CV", href: "/cv" },
  { label: "Email", href: "mailto:hello@paulwhelan.com" },
];

export default function AboutPanel() {
  const { closePanel, goBack, panelHistory, activePanel } = usePortfolioState();

  return (
    <PremiumPanel isOpen={activePanel === "about"} onClose={closePanel} variant="about">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[var(--background)]/98 backdrop-blur-sm border-b border-[var(--border)] px-8 md:px-10 py-7">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <p className="text-xs tracking-[0.16em] uppercase text-[var(--muted)]">
              About
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans text-[var(--foreground)]">
            Paul Whelan
          </h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-10 py-8 space-y-6">
          <div>
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              I'm a product design lead with a focus on systems, AI-powered tools, and
              platform experiences. My work sits at the intersection of design craft and
              strategic thinking — I care about both how things work and why they matter.
            </p>
          </div>

          <div>
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              I've spent the last several years at WGSN building design systems, leading
              AI product design, and shaping the platform experience for one of the world's
              leading trend intelligence companies.
            </p>
          </div>

          <div>
            <p className="text-base leading-relaxed text-[var(--foreground)]">
              Before that, I worked in programmatic advertising at MiQ and at Sedna, an
              early-stage B2B communication platform. What connects those experiences is a
              consistent interest in complex systems and the challenge of making them feel
              simple.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-3 pt-6 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                Get in Touch
              </p>
            </div>
            <div className="space-y-1.5 ml-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between text-sm py-2 px-3 rounded-lg hover:bg-[var(--surface)] transition-colors group"
                >
                  <span className="text-[var(--muted)] group-hover:text-[var(--foreground)]">
                    {link.label}
                  </span>
                  <span className="text-xs text-[var(--subtle)] group-hover:text-[var(--accent)]">
                    →
                  </span>
                </a>
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

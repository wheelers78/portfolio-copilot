"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePortfolioState } from "@/lib/usePortfolioState";
import { routeQuery } from "@/lib/queryRouter";
import { CopilotAnswer } from "@/data/copilot";
import { projects } from "@/data/projects";
import PremiumPanel from "@/components/ui/PremiumPanel";

type PanelState = "thinking" | "answer";

export default function CopilotPanelV2() {
  const { copilotQuery, closePanel, goBack, panelHistory } = usePortfolioState();
  const [state, setState] = useState<PanelState>("thinking");
  const [answer, setAnswer] = useState<CopilotAnswer | null>(null);
  const [secondary, setSecondary] = useState<CopilotAnswer | null>(null);
  const [confidence, setConfidence] = useState<"high" | "medium" | "low">("high");

  useEffect(() => {
    if (copilotQuery) {
      setState("thinking");
      const timer = setTimeout(() => {
        const result = routeQuery(copilotQuery);
        setAnswer(result.answer);
        setSecondary(result.secondary ?? null);
        setConfidence(result.confidence);
        setState("answer");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [copilotQuery]);

  if (!copilotQuery) return null;

  const getRelatedProjects = (slugs: string[]) =>
    slugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);

  return (
    <PremiumPanel isOpen={!!copilotQuery} onClose={closePanel} variant="copilot">
      <div className="flex flex-col h-full">
        {/* Header with query */}
        <div className="sticky top-0 z-10 bg-[var(--background)]/98 backdrop-blur-sm border-b border-[var(--border)] px-8 md:px-10 py-7">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <p className="text-xs tracking-[0.16em] uppercase text-[var(--muted)]">
                Knowledge Panel
              </p>
            </div>
            <p className="font-sans text-lg md:text-xl text-[var(--foreground)] italic">
              "{copilotQuery}"
            </p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 md:px-10 py-8">
          <AnimatePresence mode="wait">
            {state === "thinking" ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-64 flex flex-col items-center justify-center gap-4"
              >
                <ThinkingDots />
                <p className="text-sm text-[var(--muted)]">Synthesizing answer…</p>
              </motion.div>
            ) : answer ? (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-8"
              >
                {confidence === "low" && (
                  <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
                    <p className="text-xs text-[var(--muted)] font-mono">
                      ℹ Lower confidence match — try a more specific query
                    </p>
                  </div>
                )}

                {/* Main answer */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-sans text-[var(--foreground)] mb-4 leading-tight">
                    {answer.title}
                  </h2>
                  <p className="text-base md:text-lg leading-relaxed text-[var(--foreground)]">
                    {answer.summary}
                  </p>
                </div>

                {/* Detail paragraphs */}
                <div className="space-y-4">
                  {answer.detail.map((para, i) => (
                    <p key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Why it mattered */}
                {answer.whyItMattered && (
                  <div className="space-y-3 pt-6 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                        Significance
                      </p>
                    </div>
                    <p className="text-sm text-[var(--muted)] leading-relaxed ml-4">
                      {answer.whyItMattered}
                    </p>
                  </div>
                )}

                {/* Related work */}
                {answer.relatedProjects && answer.relatedProjects.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                        Related Work
                      </p>
                    </div>
                    <div className="space-y-2 ml-4">
                      {getRelatedProjects(answer.relatedProjects).map(
                        (project) =>
                          project && (
                            <p key={project.slug} className="text-sm text-[var(--muted)]">
                              · {project.title}
                            </p>
                          )
                      )}
                    </div>
                  </div>
                )}

                {/* Secondary answer — related topic */}
                {secondary && secondary.id !== "fallback" && (
                  <div className="space-y-3 pt-6 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] font-medium">
                        You might also explore
                      </p>
                    </div>
                    <div className="ml-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl space-y-1">
                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {secondary.title}
                      </p>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">
                        {secondary.summary}
                      </p>
                    </div>
                  </div>
                )}

                {/* Spacing */}
                <div className="h-4" />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {state === "answer" && answer && (
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
        )}
      </div>
    </PremiumPanel>
  );
}

function ThinkingDots() {
  return (
    <div className="flex gap-2 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--accent)]"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.25,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

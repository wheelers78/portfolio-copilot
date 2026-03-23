"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { routeQuery } from "@/lib/queryRouter";
import { CopilotAnswer, suggestedPrompts } from "@/data/copilot";
import { projects } from "@/data/projects";

type PanelState = "idle" | "thinking" | "answer";

interface CopilotPanelProps {
  initialQuery?: string;
  onQueryChange?: (q: string) => void;
}

const CopilotPanel = forwardRef<HTMLElement, CopilotPanelProps>(
  ({ initialQuery, onQueryChange }, ref) => {
    const [query, setQuery] = useState("");
    const [state, setState] = useState<PanelState>("idle");
    const [answer, setAnswer] = useState<CopilotAnswer | null>(null);
    const [confidence, setConfidence] = useState<"high" | "medium" | "low">("high");
    const inputRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLDivElement>(null);

    // Accept an externally triggered query (from Hero prompt chips)
    useEffect(() => {
      if (initialQuery && initialQuery !== query) {
        setQuery(initialQuery);
        handleQuery(initialQuery);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialQuery]);

    const handleQuery = (q: string) => {
      if (!q.trim()) return;

      setState("thinking");
      setAnswer(null);
      onQueryChange?.(q);

      // Simulate a brief "thinking" pause — feels considered, not instant
      setTimeout(() => {
        const result = routeQuery(q);
        setAnswer(result.answer);
        setConfidence(result.confidence);
        setState("answer");
        setTimeout(() => {
          answerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }, 700);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleQuery(query);
    };

    const handleFollowUp = (prompt: string) => {
      setQuery(prompt);
      handleQuery(prompt);
      inputRef.current?.focus();
      window.scrollTo({ top: inputRef.current?.getBoundingClientRect().top ?? 0 + window.scrollY - 100, behavior: "smooth" });
    };

    const handleClear = () => {
      setQuery("");
      setState("idle");
      setAnswer(null);
      inputRef.current?.focus();
    };

    const getRelatedProjects = (slugs: string[]) =>
      slugs.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);

    return (
      <section
        ref={ref as React.Ref<HTMLElement>}
        id="copilot"
        className="px-6 md:px-12 lg:px-16 py-24 border-t border-[var(--border)]"
      >
        <div className="max-w-5xl">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)]">
              Portfolio Copilot
            </p>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="relative mb-8">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about my work, process, or approach…"
              className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--foreground)] text-xl md:text-2xl py-4 pr-28 text-[var(--foreground)] placeholder-[var(--subtle)] outline-none transition-colors duration-200 font-sans font-light"
              aria-label="Ask about Paul's work"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-2 items-center">
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors px-2 py-1"
                  aria-label="Clear"
                >
                  clear
                </button>
              )}
              <button
                type="submit"
                disabled={!query.trim() || state === "thinking"}
                className="text-sm px-5 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-full disabled:opacity-30 hover:opacity-80 transition-opacity cursor-pointer disabled:cursor-default"
              >
                Ask
              </button>
            </div>
          </form>

          {/* Suggested prompts — show only in idle */}
          <AnimatePresence>
            {state === "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-2 mb-2"
              >
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setQuery(prompt);
                      handleQuery(prompt);
                    }}
                    className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-150 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thinking state */}
          <AnimatePresence>
            {state === "thinking" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="py-16 flex items-center gap-3"
              >
                <ThinkingDots />
                <span className="text-sm text-[var(--muted)]">Finding the best answer…</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer panel */}
          <AnimatePresence>
            {state === "answer" && answer && (
              <motion.div
                ref={answerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4"
              >
                {confidence === "low" && (
                  <p className="text-xs text-[var(--muted)] mb-5 font-mono">
                    Closest match — try a more specific query for better results
                  </p>
                )}

                <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
                  {/* Answer header */}
                  <div className="px-8 py-7 border-b border-[var(--border)] bg-[var(--surface)]">
                    <p className="text-xs tracking-[0.16em] uppercase text-[var(--muted)] mb-2">
                      {confidence === "high" ? "Relevant to your query" : "Best match"}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-sans text-[var(--foreground)] leading-snug">
                      {answer.title}
                    </h2>
                  </div>

                  <div className="px-8 py-8 grid md:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="md:col-span-2 space-y-6">
                      <p className="text-base text-[var(--foreground)] leading-relaxed">
                        {answer.summary}
                      </p>

                      {answer.detail.map((para, i) => (
                        <p key={i} className="text-sm text-[var(--muted)] leading-relaxed">
                          {para}
                        </p>
                      ))}

                      {answer.whyItMattered && (
                        <div className="pt-4 border-t border-[var(--border)]">
                          <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-2">
                            Why it mattered
                          </p>
                          <p className="text-sm text-[var(--foreground)] leading-relaxed">
                            {answer.whyItMattered}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                      {/* Related topics */}
                      {answer.relatedTopics && answer.relatedTopics.length > 0 && (
                        <div>
                          <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
                            Related topics
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {answer.relatedTopics.map((topic) => (
                              <span
                                key={topic}
                                className="text-xs px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--muted)]"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related projects */}
                      {answer.relatedProjects && answer.relatedProjects.length > 0 && (
                        <div>
                          <p className="text-xs tracking-[0.14em] uppercase text-[var(--muted)] mb-3">
                            Related work
                          </p>
                          <div className="space-y-2">
                            {getRelatedProjects(answer.relatedProjects).map(
                              (project) =>
                                project && (
                                  <a
                                    key={project.slug}
                                    href={`#work`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      document
                                        .getElementById("work")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[var(--subtle)] group-hover:bg-[var(--accent)] transition-colors" />
                                    {project.title}
                                  </a>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Follow-up prompts */}
                  {answer.followUpPrompts && answer.followUpPrompts.length > 0 && (
                    <div className="px-8 py-5 border-t border-[var(--border)] bg-[var(--surface)]">
                      <p className="text-xs text-[var(--muted)] mb-3">Follow up —</p>
                      <div className="flex flex-wrap gap-2">
                        {answer.followUpPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => handleFollowUp(prompt)}
                            className="text-xs px-3 py-1.5 border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-150 cursor-pointer"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }
);

CopilotPanel.displayName = "CopilotPanel";
export default CopilotPanel;

// Minimal animated thinking indicator
function ThinkingDots() {
  return (
    <div className="flex gap-1 items-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

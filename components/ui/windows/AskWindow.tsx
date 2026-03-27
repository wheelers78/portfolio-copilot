"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { routeQuery, RouteResult } from "@/lib/queryRouter";
import { CopilotAnswer, suggestedPrompts } from "@/data/copilot";

type AskState = "idle" | "thinking" | "answer";

const EXAMPLE_PROMPT = "What kind of designer are you?";

// ── Fade-in wrapper ─────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </div>
  );
}

// ── Thinking dots ──────────────────────────────────────────────────────────────

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-[4px]" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block h-[5px] w-[5px] rounded-full"
          style={{
            background: "var(--text-muted)",
            animation: "pulse 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </span>
  );
}

// ── Person icon ────────────────────────────────────────────────────────────────

function PersonIcon() {
  return (
    <div
      className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full"
      style={{ background: "var(--text-primary)" }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
          stroke="var(--window-bg)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="7"
          r="4"
          stroke="var(--window-bg)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ── Prompt card ────────────────────────────────────────────────────────────────
// Used for both the idle "Example" and the answer "You asked" states.

function AskPromptCard({
  label,
  prompt,
  onClick,
  showIcon = true,
}: {
  label: string;
  prompt: string;
  onClick?: () => void;
  showIcon?: boolean;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <div className="flex items-start gap-3 w-full text-left">
      {/* Card */}
      <Tag
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={[
          "flex flex-1 flex-col items-start gap-[8px] rounded-2xl px-5 py-4",
          onClick
            ? "cursor-pointer transition-all duration-150 hover:brightness-95 active:scale-[0.99]"
            : "",
        ].join(" ")}
        style={{ background: "var(--ask-prompt-bg)" }}
      >
        <span
          className="text-[9.5px] font-medium uppercase tracking-[0.14em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <p
          className="font-sans text-[18px] leading-[1.35] text-left"
          style={{ color: "var(--text-primary)" }}
        >
          {prompt}
        </p>
      </Tag>

      {/* Person icon — shown in answer/thinking states only */}
      {showIcon && (
        <div className="shrink-0 pt-[2px]">
          <PersonIcon />
        </div>
      )}
    </div>
  );
}

// ── Response content ───────────────────────────────────────────────────────────

function AskResponseContent({ answer }: { answer: CopilotAnswer }) {
  const hasImages = answer.images && answer.images.length > 0;
  // Show at most 2 detail items — enough to add depth without overwhelming
  const detailItems = (answer.detail ?? []).slice(0, 2);

  return (
    <div className="flex items-start gap-3">
      {/* Paul's avatar */}
      <img
        src="/images/profile.png"
        alt="Paul"
        className="h-[30px] w-[30px] shrink-0 rounded-full object-cover"
      />

      {/* Response card */}
      <div
        className="flex flex-col gap-[16px] rounded-2xl px-5 py-5 overflow-hidden"
        style={{ background: "var(--ask-card-bg)" }}
      >
        <h3
          className="font-sans text-[20px] font-medium leading-[1.15]"
          style={{ color: "var(--text-primary)" }}
        >
          {answer.title}
        </h3>
        <p
          className="text-[13px] leading-[1.7]"
          style={{ color: "var(--text-primary)" }}
        >
          {answer.summary}
        </p>

        {/* Detail items — supporting context, max 2 */}
        {detailItems.length > 0 && (
          <div className="flex flex-col gap-[5px]">
            {detailItems.map((item, i) => (
              <p
                key={i}
                className="text-[12px] leading-[1.65]"
                style={{ color: "#181818" }}
              >
                {item}
              </p>
            ))}
          </div>
        )}

        {/* Why it mattered — only if present */}
        {answer.whyItMattered && (
          <div
            className="flex flex-col gap-[5px] pt-[16px]"
            style={{ borderTop: "1px solid var(--accent)", opacity: 0.25 }}
          >
            <p
              className="text-[9px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "var(--accent)" }}
            >
              Why it matters
            </p>
            <p
              className="text-[12px] leading-[1.65]"
              style={{ color: "#181818" }}
            >
              {answer.whyItMattered}
            </p>
          </div>
        )}

        {/* Image grid — shown when answer has associated images */}
        {hasImages && (
          <div className="mt-1 grid grid-cols-2 gap-[6px]">
            {answer.images!.map((img, i) => (
              <div
                key={i}
                className={[
                  "relative overflow-hidden rounded-xl aspect-[4/3]",
                  // If odd number and last item, span full width
                  answer.images!.length % 2 !== 0 && i === answer.images!.length - 1
                    ? "col-span-2"
                    : "",
                ].join(" ")}
              >
                <img
                  src={img.src}
                  alt={img.alt ?? ""}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Follow-up list ─────────────────────────────────────────────────────────────

/** Normalise a string for deduplication — lowercase, trimmed, no trailing `?` */
function normaliseForCompare(s: string) {
  return s.toLowerCase().trim().replace(/\?+$/, "").trim();
}

function AskFollowUpList({
  prompts,
  currentQuery,
  onSelect,
}: {
  prompts: string[];
  /** The question the user just asked — excluded from follow-ups to avoid repetition */
  currentQuery: string;
  onSelect: (p: string) => void;
}) {
  const normalisedQuery = normaliseForCompare(currentQuery);
  // Filter out any prompt that is the same (case/punctuation insensitive) as the current query
  const filtered = prompts.filter(
    (p) => normaliseForCompare(p) !== normalisedQuery
  );

  if (!filtered.length) return null;
  return (
    <div>
      <p
        className="mb-1 text-[9.5px] font-medium uppercase tracking-[0.14em]"
        style={{ color: "var(--text-muted)" }}
      >
        Follow up
      </p>
      <div className="flex flex-col">
        {filtered.slice(0, 3).map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelect(prompt)}
            className="flex items-baseline gap-[9px] py-[5px] text-left text-[13px] transition-opacity duration-100 hover:opacity-55"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="shrink-0 text-[11px] leading-none" aria-hidden>
              →
            </span>
            <span>{prompt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Input bar ──────────────────────────────────────────────────────────────────
// Always anchored at the bottom of the window via `sticky bottom-0`.

function AskInputBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  inputRef,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (q: string) => void;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
}) {
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSubmit(value);
  };

  return (
    <div className="sticky bottom-0 relative">
      {/* Fade — bleeds upward over scrolling content */}
      <div
        className="pointer-events-none absolute left-0 right-0 -top-12 h-12"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--window-bg))",
        }}
      />
      <div
        className="flex flex-col px-6 pt-4 pb-5"
        style={{
          borderTop: "1px solid var(--border-subtle)",
          background: "var(--window-bg)",
        }}
      >
      {/* Input row */}
      <div className="flex items-center gap-[10px]">
        <span
          className="shrink-0 select-none text-[13px]"
          style={{ color: "var(--text-primary)" }}
          aria-hidden
        >
          →
        </span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-[13px] disabled:cursor-default"
          style={{
            color: "var(--text-primary)",
            outline: "none",
            boxShadow: "none",
            border: "none",
          }}
        />
        {value.trim() && !disabled && (
          <button
            type="button"
            onClick={() => onSubmit(value)}
            className="shrink-0 text-[11px] font-medium transition-opacity duration-100 hover:opacity-55"
            style={{ color: "var(--text-muted)" }}
          >
            Ask
          </button>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-3 -mx-6">
        <div
          className="mb-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        />
        <p
          className="px-6 text-[10px] leading-[1.5] text-left"
          style={{ color: "var(--text-muted)", opacity: 0.55 }}
        >
          A small window into how I think — still evolving, so not perfect, but a good place to start.
        </p>
      </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AskWindow() {
  const [askState, setAskState] = useState<AskState>("idle");
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [result, setResult] = useState<RouteResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const followUpRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    requestAnimationFrame(() => {
      const el = wrapperRef.current?.parentElement;
      if (el) el.scrollTop = 0;
    });
  }, []);

  useEffect(() => {
    if (askState === "idle") setTimeout(() => inputRef.current?.focus(), 80);
    if (askState === "answer") {
      scrollToTop();
      setTimeout(() => followUpRef.current?.focus(), 120);
    }
  }, [askState, scrollToTop]);

  const submit = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setSubmittedQuery(trimmed);
    setQuery("");
    setAskState("thinking");
    setTimeout(() => {
      const res = routeQuery(trimmed);
      setResult(res);
      setAskState("answer");
    }, 820);
  };

  const reset = () => {
    setAskState("idle");
    setQuery("");
    setSubmittedQuery("");
    setResult(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div ref={wrapperRef} className="flex min-h-full flex-col">

      {/* ── Idle ─────────────────────────────────────────────────────────── */}
      {askState === "idle" && (
        <>
          <div className="flex flex-1 flex-col px-6 pt-6 pb-5 gap-4">
            {/* Section label */}
            <p
              className="text-[9.5px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)" }}
            >
              Try asking
            </p>

            {/* Example card — no person icon, left-aligned */}
            <AskPromptCard
              label="Example"
              prompt={EXAMPLE_PROMPT}
              onClick={() => submit(EXAMPLE_PROMPT)}
              showIcon={false}
            />

            {/* Suggested prompts */}
            <div className="flex flex-col">
              {suggestedPrompts.slice(1, 4).map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submit(prompt)}
                  className="flex items-baseline gap-[9px] py-[6px] text-left text-[13px] transition-opacity duration-100 hover:opacity-55"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="shrink-0 text-[11px] leading-none" aria-hidden>→</span>
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
          <AskInputBar
            value={query}
            onChange={setQuery}
            onSubmit={submit}
            placeholder="Ask me anything"
            inputRef={inputRef}
          />
        </>
      )}

      {/* ── Thinking ─────────────────────────────────────────────────────── */}
      {askState === "thinking" && (
        <>
          <div className="flex flex-1 flex-col gap-5 px-6 pt-6 pb-3">
            <FadeIn delay={0}>
              <AskPromptCard label="You asked" prompt={submittedQuery} />
            </FadeIn>
            <FadeIn delay={80}>
              <div className="pl-1">
                <ThinkingDots />
              </div>
            </FadeIn>
          </div>
          <AskInputBar
            value=""
            onChange={() => {}}
            onSubmit={() => {}}
            placeholder="Thinking…"
            inputRef={inputRef}
            disabled
          />
        </>
      )}

      {/* ── Answer ───────────────────────────────────────────────────────── */}
      {askState === "answer" && result && (() => {
        const { answer, secondary } = result;
        return (
          <>
            <div className="flex flex-col gap-5 px-6 pt-6 pb-3">
              {/* Asked card */}
              <FadeIn delay={0}>
                <AskPromptCard label="You asked" prompt={submittedQuery} />
              </FadeIn>

              {/* Response */}
              <FadeIn delay={80}>
                <AskResponseContent answer={answer} />
              </FadeIn>

              {/* Follow-ups */}
              {(answer.followUpPrompts?.length ?? 0) > 0 && (
                <FadeIn delay={160}>
                  <>
                    <div
                      className="h-px shrink-0"
                      style={{ background: "var(--border-subtle)" }}
                    />
                    <div className="mt-6">
                      <AskFollowUpList
                        prompts={answer.followUpPrompts ?? []}
                        currentQuery={submittedQuery}
                        onSelect={submit}
                      />
                    </div>
                  </>
                </FadeIn>
              )}

              {/* Secondary answer — related topic */}
              {secondary && secondary.id !== "fallback" && (
                <FadeIn delay={220}>
                  <>
                    <div
                      className="h-px shrink-0"
                      style={{ background: "var(--border-subtle)" }}
                    />
                    <div className="mt-6">
                      <p
                        className="mb-2 text-[9.5px] font-medium uppercase tracking-[0.14em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        You might also explore
                      </p>
                      <button
                        type="button"
                        onClick={() => submit(secondary.title)}
                        className="w-full text-left rounded-xl px-4 py-3 transition-colors duration-150"
                        style={{ background: "var(--ask-prompt-bg)" }}
                      >
                        <p className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                          {secondary.title}
                        </p>
                        <p className="mt-1 text-[12px] leading-[1.5]" style={{ color: "var(--text-muted)" }}>
                          {secondary.summary}
                        </p>
                      </button>
                    </div>
                  </>
                </FadeIn>
              )}

              {/* New question link — sits below follow-ups */}
              <FadeIn delay={280}>
                <div className="pt-1 pb-1">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-[11px] transition-opacity duration-100 hover:opacity-55"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ← New question
                  </button>
                </div>
              </FadeIn>
            </div>

            <AskInputBar
              value={query}
              onChange={setQuery}
              onSubmit={submit}
              placeholder="Ask a follow-up…"
              inputRef={followUpRef}
            />
          </>
        );
      })()}
    </div>
  );
}

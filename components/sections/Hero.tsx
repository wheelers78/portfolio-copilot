"use client";

import { motion } from "framer-motion";
import { suggestedPrompts } from "@/data/copilot";

interface HeroProps {
  onPromptSelect: (prompt: string) => void;
  copilotRef: React.RefObject<HTMLElement | null>;
}

function fadeUpProps(delay: number) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" as const, delay },
  };
}

export default function Hero({ onPromptSelect, copilotRef }: HeroProps) {
  const handlePromptClick = (prompt: string) => {
    onPromptSelect(prompt);
    setTimeout(() => {
      copilotRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section className="min-h-[92vh] flex flex-col justify-end pb-20 px-6 md:px-12 lg:px-16 pt-32">
      <div className="max-w-5xl">
        {/* Eyebrow */}
        <motion.p
          {...fadeUpProps(0)}
          className="text-xs tracking-[0.18em] uppercase text-[var(--muted)] mb-10 font-sans"
        >
          Paul Whelan &nbsp;·&nbsp; Product Design Lead
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUpProps(0.1)}
          className="text-5xl md:text-7xl lg:text-8xl font-sans leading-[1.04] tracking-[-0.02em] text-[var(--foreground)] mb-8"
        >
          Designing systems,
          <br />
          <span className="italic text-[var(--muted)]">AI tools,</span>
          <br />
          and product experiences.
        </motion.h1>

        {/* Supporting copy */}
        <motion.p
          {...fadeUpProps(0.2)}
          className="text-base md:text-lg text-[var(--muted)] max-w-xl leading-relaxed mb-12"
        >
          I help teams turn complexity into clarity — through design systems,
          AI&#8209;powered discovery, and platform experiences that scale.
        </motion.p>

        {/* Proof line */}
        <motion.p
          {...fadeUpProps(0.28)}
          className="text-xs tracking-[0.12em] uppercase text-[var(--subtle)] mb-16 font-mono"
        >
          Currently Product Design Lead at WGSN
        </motion.p>

        {/* Suggested prompts — entry to the copilot */}
        <motion.div
          {...fadeUpProps(0.36)}
          className="flex flex-col gap-3"
        >
          <p className="text-xs text-[var(--muted)] tracking-wide mb-1">
            Ask me something —
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                onClick={() => handlePromptClick(prompt)}
                className="text-sm px-4 py-2 border border-[var(--border)] rounded-full text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-200 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

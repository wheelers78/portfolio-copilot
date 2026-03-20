"use client";

import { motion } from "framer-motion";

interface AboutProps {
  onCopilotPrompt: (prompt: string) => void;
  copilotRef: React.RefObject<HTMLElement | null>;
}

const links = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/paulwhelan",
    description: "Connect",
  },
  {
    label: "CV",
    href: "/cv",
    description: "Download",
  },
  {
    label: "Email",
    href: "mailto:hello@paulwhelan.com",
    description: "Say hello",
  },
];

export default function About({ onCopilotPrompt, copilotRef }: AboutProps) {
  const handlePrompt = (prompt: string) => {
    onCopilotPrompt(prompt);
    setTimeout(() => {
      copilotRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <section
      id="about"
      className="px-6 md:px-12 lg:px-16 py-24 border-t border-[var(--border)]"
    >
      <div className="max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)] mb-8">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-sans text-[var(--foreground)] leading-snug mb-6">
              Product designer.
              <br />
              <span className="italic text-[var(--muted)]">Systems thinker.</span>
            </h2>
            <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
              <p>
                I'm a product design lead with a focus on systems, AI-powered tools, and
                platform experiences. My work sits at the intersection of design craft and
                strategic thinking — I care about both how things work and why they matter.
              </p>
              <p>
                I've spent the last several years at WGSN building design systems, leading
                AI product design, and shaping the platform experience for one of the world's
                leading trend intelligence companies.
              </p>
              <p>
                Before that, I worked in programmatic advertising at MiQ and at Sedna, an
                early-stage B2B communication platform. What connects those experiences is a
                consistent interest in complex systems and the challenge of making them feel
                simple.
              </p>
            </div>

            {/* Links */}
            <div className="mt-10 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between text-sm py-3 border-b border-[var(--border)] text-[var(--foreground)] hover:text-[var(--accent)] transition-colors group"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                    {link.description} →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Final copilot CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div className="border border-[var(--border)] rounded-2xl p-8 h-full flex flex-col justify-between gap-8">
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-[var(--muted)] mb-5">
                  One more question?
                </p>
                <p className="text-xl md:text-2xl font-sans text-[var(--foreground)] leading-snug mb-4">
                  The copilot is still here.
                </p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  If something in my experience or work raised a question, ask it. The copilot
                  routes to the most relevant answer I can give.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  "What kind of teams do you work best in?",
                  "How do you think about design leadership?",
                  "What's your approach to AI product design?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePrompt(prompt)}
                    className="w-full text-left text-xs px-4 py-3 border border-[var(--border)] rounded-xl text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-150 cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer mark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-[var(--border)] flex items-center justify-between"
        >
          <p className="text-xs font-mono text-[var(--subtle)]">Paul Whelan</p>
          <p className="text-xs font-mono text-[var(--subtle)]">
            Product Design Lead · {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

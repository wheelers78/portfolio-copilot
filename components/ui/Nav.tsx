"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Thinking", href: "#thinking" },
  { label: "Experience", href: "#experience" },
  { label: "Notes", href: "#notes" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-16 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      {/* Wordmark */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
      >
        PW
      </a>

      {/* Nav links — hidden on small screens */}
      <nav className="hidden md:flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="text-xs tracking-wide text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Copilot CTA */}
      <a
        href="#copilot"
        onClick={(e) => scrollToSection(e, "#copilot")}
        className="text-xs px-4 py-2 border border-[var(--border)] rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-200"
      >
        Ask anything
      </a>
    </motion.header>
  );
}

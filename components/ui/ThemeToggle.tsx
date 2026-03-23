"use client";

import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="flex items-center justify-center w-9 h-9 rounded-full cursor-pointer transition-all duration-150 active:scale-90 glass-base glass-button"
      style={{ color: "var(--text-primary)" }}
    >
      {isDark ? (
        <Moon size={15} strokeWidth={1.6} />
      ) : (
        <Sun size={15} strokeWidth={1.6} />
      )}
    </button>
  );
}

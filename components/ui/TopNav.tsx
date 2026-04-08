"use client";

import React from "react";
import LondonStatus from "./LondonStatus";

interface TopNavProps {
  time?: string;
}

export default function TopNav({ time }: TopNavProps) {
  return (
    <div className="pointer-events-none absolute inset-x-6 top-5 z-30 flex items-center justify-between text-[13px] leading-none tracking-[0.01em] text-[var(--text-primary)] md:inset-x-8 lg:inset-x-10">
      <nav className="pointer-events-auto flex items-center gap-2.5 md:gap-3.5 whitespace-nowrap">
        <a className="transition-colors hover:text-[var(--text-muted)]" href="#">
          P—W
        </a>
        <a className="transition-colors font-mono hover:text-[var(--text-muted)]" href="https://www.linkedin.com/in/wheelers78/" target="_blank" rel="noopener noreferrer">
          Connect
        </a>
        <a className="transition-colors font-mono hover:text-[var(--text-muted)]" href="https://drive.google.com/file/d/12c80AbjI6Un9Imq64FS5XBXhYzxPV-O5/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </nav>

      <LondonStatus time={time} />
    </div>
  );
}

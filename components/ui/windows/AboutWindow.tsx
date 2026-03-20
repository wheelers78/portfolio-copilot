"use client";

import React from "react";

export default function AboutWindow() {
  return (
    <div className="space-y-4">
      <p className="text-[24px] text-center font-sans leading-snug text-[var(--text-primary)] pb-2">
        I'm a Product Design Lead with 15+ years' experience, turning complex problems into clear, meaningful experiences through systems thinking, strategy, and design craft.
      </p>

      <p className="text-[24px] font-sans text-center leading-snug text-[var(--text-primary)]">
        I collaborate closely with product, engineering, and senior stakeholders to turn insight into action, strategy into structure, and ideas into scalable experiences that deliver real business impact.
      </p>

      <div className="pt-4 flex justify-center">
        <img
          src="/images/profile.png"
          alt="Paul Whelan"
          className="h-80 w-80 rounded-full object-cover"
        />
      </div>

      <div className="pt-6 flex flex-col items-center gap-0">
        <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">Lets talk and connect</p>
      </div>

      <div className="flex flex-col items-center gap-0">
        <a
          href="#"
          className="font-sans text-[24px] text-[var(--text-primary)] transition-colors hover:text-[var(--text-muted)]"
        >
          LinkedIn
        </a>
        <a
            href="#"
            className="font-sans text-[24px] text-[var(--text-primary)] transition-colors hover:text-[var(--text-muted)]"
          >
            Email
      </a>
      </div>

      <div className="pt-12 flex flex-col items-center gap-0">
        <p className="text-[13px] leading-relaxed text-[var(--text-muted)]">Featured Experience</p>
      </div>

      <div className="flex flex-col items-center gap-0">
        <div className="pt-4 flex justify-center">
        <img
          src="/images/wgsn_logo.png"
          alt="Paul Whelan"
          className="h-56 w-80 object-cover"
        />
      </div>
        <p className="text-[24px] pt-8 pb-4 font-sans text-center leading-relaxed text-[var(--text-primary)] leading-snug">Product Design Lead</p>
        <p className="text-[13px] text-center leading-relaxed text-[var(--text-primary)]">
          As Lead Product Designer at WGSN, I drive end-to-end design across four engineering squads - from concept to rollout - delivering new features and platform improvements that elevate the user experience.</p>
      </div>

      <div className="flex flex-col items-center gap-0">
        <div className="pt-4 flex justify-center">
        <img
          src="/images/sedna_logo.png"
          alt="Paul Whelan"
          className="h-56 w-80 object-cover"
        />
      </div>
        <p className="text-[24px] pt-8 pb-4 font-sans text-center leading-relaxed text-[var(--text-primary)] leading-snug">Design Lead</p>
        <p className="text-[13px] text-center leading-relaxed text-[var(--text-primary)]">
          At SEDNA, I co-led and mentored a team of seven product designers, fostering a collaborative culture that encouraged experimentation and design excellence.  </p>
      </div>

      <div className="flex flex-col items-center gap-0">
        <div className="pt-4 flex justify-center">
        <img
          src="/images/miq_logo.png"
          alt="Paul Whelan"
          className="h-56 w-80 object-cover"
        />
      </div>
        <p className="text-[24px] pt-8 pb-4 font-sans text-center leading-relaxed text-[var(--text-primary)] leading-snug">Product Design Lead</p>
        <p className="text-[13px] text-center leading-relaxed text-[var(--text-primary)]">
           Over three years at MiQ, I helped evolve the company’s design practice from executional to strategic. I built and mentored a six-person design team, introduced design thinking and user-centred principles, and championed cross-functional collaboration across global offices.</p>
      </div>

    </div>
  );
}

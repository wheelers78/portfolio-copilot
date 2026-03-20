"use client";

import React from "react";

interface StageProps {
  children: React.ReactNode;
}

export default function Stage({ children }: StageProps) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#efefec]">
      {/* Outer page background */}
      <div className="absolute inset-0 bg-[#efefec]" />

      {/* Centered stage with margins */}
      <div className="absolute inset-8 md:inset-12 lg:inset-16 flex flex-col bg-[#fafaf8] rounded-lg shadow-sm border border-[#f5f5f3]">
        {/* Stage content area */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

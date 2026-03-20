"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface FloatingWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 240;

// Carbon-style icons as SVG components
const DragHandleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="1" fill="currentColor" />
    <circle cx="8" cy="4" r="1" fill="currentColor" />
    <circle cx="12" cy="4" r="1" fill="currentColor" />
    <circle cx="4" cy="8" r="1" fill="currentColor" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="8" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ResizeHandle = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 4L4 8M10 6L6 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export default function FloatingWindow({
  id,
  title,
  children,
  onClose,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 500, height: 600 },
}: FloatingWindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Drag handler
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    const header = headerRef.current;
    if (!header || !header.contains(e.target as Node)) return;

    // Don't drag if clicking close button
    if ((e.target as HTMLElement).closest("button")) return;

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Resize handler
  const handleResizeMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();

    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  // Drag effect
  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Resize effect
  React.useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      setSize({
        width: Math.max(MIN_WIDTH, resizeStart.width + deltaX),
        height: Math.max(MIN_HEIGHT, resizeStart.height + deltaY),
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, resizeStart]);

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      className="bg-[#fafaf8] border border-[#efefec] rounded-lg shadow-xl flex flex-col z-40 select-none"
    >
      {/* Window header */}
      <div
        ref={headerRef}
        onMouseDown={handleHeaderMouseDown}
        className="flex items-center gap-3 px-4 py-2.5 bg-[#1a1a18] rounded-t-lg cursor-grab active:cursor-grabbing border-b border-[#333] flex-shrink-0"
      >
        {/* Drag handle icon */}
        <div className="text-[#888] flex-shrink-0 hover:text-[#aaa] transition-colors">
          <DragHandleIcon />
        </div>

        {/* Title */}
        <h2 className="text-xs font-medium text-[#fafaf8] tracking-tight flex-1 truncate">
          {title}
        </h2>

        {/* Close button */}
        <button
          onClick={onClose}
          className="flex items-center justify-center w-4 h-4 text-[#888] hover:text-[#fafaf8] transition-colors flex-shrink-0"
          aria-label="Close window"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Window content */}
      <div className="flex-1 overflow-y-auto p-5 text-[#1a1a18] text-sm leading-relaxed">
        {children}
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        className={`absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-center justify-center text-[#888] hover:text-[#1a1a18] transition-colors group ${
          isResizing ? "text-[#1a1a18]" : ""
        }`}
        style={{ userSelect: "none" }}
      >
        <ResizeHandle />
      </div>
    </motion.div>
  );
}

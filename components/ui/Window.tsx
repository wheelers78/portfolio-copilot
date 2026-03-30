"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollContainerProvider } from "@/hooks/ScrollContainerContext";

const MIN_WIDTH = 320;
const MIN_HEIGHT = 200;
const SAFE_MARGIN = 20;

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  zIndex: number;
  isActive: boolean;
  contentClassName?: string;
  showScrollFade?: boolean;
}

export default function Window({
  title,
  children,
  onClose,
  onFocus,
  onPositionChange,
  onSizeChange,
  defaultPosition,
  defaultSize,
  zIndex,
  isActive,
  contentClassName = "px-12 py-1",
  showScrollFade = true,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0 });
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ── Drag ──────────────────────────────────────────────────────────────────

  const handleDragMouseDown = (event: React.MouseEvent) => {
    if (event.button !== 0) return;
    if (!headerRef.current?.contains(event.target as Node)) return;

    onFocus();
    setIsDragging(true);
    dragOffsetRef.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const onMove = (e: MouseEvent) => {
      const next = {
        x: e.clientX - dragOffsetRef.current.x,
        y: e.clientY - dragOffsetRef.current.y,
      };
      setPosition(next);
      onPositionChange(next);
    };

    const onUp = () => setIsDragging(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, onPositionChange]);

  // ── Resize ────────────────────────────────────────────────────────────────

  const handleResizeMouseDown = (event: React.MouseEvent) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    onFocus();
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      width: size.width,
      height: size.height,
    };
  };

  React.useEffect(() => {
    if (!isResizing) return;

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStartRef.current.mouseX;
      const dy = e.clientY - resizeStartRef.current.mouseY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      const next = {
        width: Math.max(MIN_WIDTH, resizeStartRef.current.width + dx),
        height: Math.max(MIN_HEIGHT, resizeStartRef.current.height + dy),
      };

      setSize(next);
      onSizeChange(next);
    };

    const onUp = () => setIsResizing(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [isResizing, position.x, position.y, onSizeChange]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={{
        opacity: 1,
        scale: isDragging ? 1.01 : 1,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex,
      }}
      onMouseDown={onFocus}
      className="absolute cursor-default"
      aria-label={title}
    >
      {/* Window chrome — fills article exactly, overflow-hidden clips to rounded corners */}
      <div
        className="flex h-full flex-col overflow-hidden rounded-[12px]"
        style={{
          background: isActive ? "var(--window-bg)" : "var(--window-bg-inactive)",
          borderWidth: "var(--window-border-width)",
          borderStyle: "solid",
          borderColor: isActive ? "var(--window-border-active)" : "var(--window-border)",
          boxShadow: isActive
            ? "0px 2px 1px -1px var(--window-shadow), 0px 1px 1px 0px var(--window-shadow), 0px 1px 3px 0px var(--window-shadow)"
            : "0px 0.5px 0.5px -1px var(--window-shadow), 0px 0px 0.5px 0px var(--window-shadow), 0px 0px 1px 0px var(--window-shadow)",
          backdropFilter: isActive ? "blur(100px)" : "none",
          filter: isActive ? "none" : "saturate(0.08) brightness(0.50) contrast(0.75)",
          transition: "box-shadow 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease, filter 200ms ease, background 200ms ease",
        }}
      >
        {/* Header */}
        <header
          ref={headerRef}
          onMouseDown={handleDragMouseDown}
          className="flex h-9 shrink-0 select-none items-center px-3"
          style={{
            background: "var(--window-header-bg)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <div className="grid grid-cols-2 gap-[2px] opacity-70">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="block h-[2px] w-[2px] bg-[var(--window-header-text)]" />
            ))}
          </div>

          <h2 className="flex-1 text-center font-mono text-[11px] font-normal text-[var(--window-header-text)]">
            {title}
          </h2>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="flex h-5 w-5 cursor-pointer items-center justify-center rounded text-[var(--window-header-text)] opacity-100 transition-all hover:opacity-60"
            aria-label="Close window"
          >
            <svg width="10" height="10" viewBox="0 0 8 8" fill="none">
              <path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        {/* Inactive window overlay */}
        {!isActive && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "var(--window-overlay)",
              top: "36px",
              height: "calc(100% - 36px)",
            }}
            aria-hidden="true"
          />
        )}

        {/* Scrollable content — flex-1 fills remaining height */}
        <div className="relative flex-1 min-h-0">
          <ScrollContainerProvider scrollContainerRef={scrollContainerRef}>
            <div
              ref={scrollContainerRef}
              className={`h-full overflow-y-auto overscroll-contain ${contentClassName} text-[13px] leading-relaxed text-[var(--text-primary)]`}
            >
              {children}
            </div>
          </ScrollContainerProvider>
          {showScrollFade && (
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-16"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--window-bg))",
              }}
            />
          )}
        </div>
      </div>

      {/* Resize handle — outside overflow-hidden chrome so cursor is always visible */}
      <div
        onMouseDown={handleResizeMouseDown}
        className="absolute bottom-1 right-1 z-10 flex h-5 w-5 items-end justify-end pb-1 pr-1"
        style={{ cursor: "nwse-resize" }}
        aria-hidden="true"
      >
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="currentColor"
          className="opacity-50 transition-opacity group-hover:opacity-80"
        >
          <circle cx="6.5" cy="6.5" r="1" />
          <circle cx="3.5" cy="6.5" r="1" />
          <circle cx="6.5" cy="3.5" r="1" />
        </svg>
      </div>
    </motion.article>
  );
}

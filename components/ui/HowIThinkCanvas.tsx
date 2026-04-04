"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ThinkingNode {
  id: string;
  label: string;
  angle: number; // degrees clockwise from 12 o'clock
  copy: string;
}

const CENTRE_TEXT = "Turn complexity\ninto clarity";

const NODES: ThinkingNode[] = [
  {
    id: "systems",
    label: "Systems",
    angle: 0,
    copy: "Designing foundations that scale across teams, products, and platforms — not just individual screens.",
  },
  {
    id: "ai",
    label: "AI",
    angle: 72,
    copy: "Shaping intelligent experiences that are useful, usable, and grounded in real value — not novelty.",
  },
  {
    id: "product",
    label: "Product",
    angle: 144,
    copy: "Connecting user needs, business goals, and execution into clear, actionable product direction.",
  },
  {
    id: "craft",
    label: "Craft",
    angle: 216,
    copy: "High attention to detail in interaction, hierarchy, and UI — ensuring ideas hold up in production.",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    angle: 288,
    copy: "Working closely with engineering and stakeholders to turn strong ideas into shipped outcomes.",
  },
];

// ─── SVG geometry ─────────────────────────────────────────────────────────────

const VW = 1000;
const VH = 860;
const CX = 500;
const CY = 430;
const CENTRE_R = 152;
const ORBIT_R = 410;
const LABEL_R = 448;
const NODE_R = 6;
const REVOLUTION_MS = 120000; // very slow drift — almost imperceptible

function svgPos(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

function labelAnchor(angleDeg: number): "middle" | "start" | "end" {
  const s = Math.sin((angleDeg * Math.PI) / 180);
  if (Math.abs(s) < 0.25) return "middle";
  return s > 0 ? "start" : "end";
}

// ─── Component ───────────────────────────────────────────────────────────────

interface HowIThinkCanvasProps {
  onClose: () => void;
}

export function HowIThinkCanvas({ onClose }: HowIThinkCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);

  const spinGroupRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // The active node: hover wins over click for live feedback
  const activeId = hoveredId ?? clickedId;
  const activeNode = NODES.find((n) => n.id === activeId) ?? null;
  const activeIndex = NODES.findIndex((n) => n.id === activeId);

  // Theme
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => obs.disconnect();
  }, []);

  // ESC to close
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  // Slow orbital drift
  useEffect(() => {
    const tick = (now: number) => {
      const dt = lastTimeRef.current === null ? 0 : now - lastTimeRef.current;
      lastTimeRef.current = now;
      rotationRef.current =
        (rotationRef.current + (dt / REVOLUTION_MS) * 360) % 360;
      const r = rotationRef.current;

      spinGroupRef.current?.setAttribute("transform", `rotate(${r}, ${CX}, ${CY})`);

      NODES.forEach((node, i) => {
        const lbl = svgPos(node.angle, LABEL_R);
        labelRefs.current[i]?.setAttribute(
          "transform",
          `rotate(${-r}, ${lbl.x}, ${lbl.y})`
        );
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const hasActive = activeId !== null;
  const centreTextColor = isDark ? "#181818" : "#ffffff";
  const orbitStroke = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.07)";
  const dotDefault = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.18)";
  const dotActive = "var(--text-primary)";
  const dotInactive = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const lblDefault = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.28)";
  const lblActive = "var(--text-primary)";
  const lblInactive = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed inset-0 z-50"
      style={{
        background: isDark
          ? "rgba(12, 12, 12, 0.94)"
          : "rgba(246, 246, 243, 0.94)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 24,
          right: 28,
          zIndex: 10,
          width: 30,
          height: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid rgba(0,0,0,0.07)",
          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
          cursor: "pointer",
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        ×
      </button>

      {/* Orbit — centred, height-first so description fits below */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ paddingBottom: 140 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Orbit diagram */}
        <div
          style={{
            position: "relative",
            // Height-driven sizing: fills viewport minus description space
            height: "min(calc(100vh - 220px), 780px)",
            aspectRatio: `${VW} / ${VH}`,
            maxWidth: "min(90vw, 900px)",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              overflow: "visible",
            }}
            aria-label="How I Think — design approach"
            role="img"
          >
            <g ref={spinGroupRef}>
              {/* Orbit ring — solid thin stroke */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R}
                fill="none"
                stroke={orbitStroke}
                strokeWidth="1"
              />

              {NODES.map((node, i) => {
                const dot = svgPos(node.angle, ORBIT_R);
                const lbl = svgPos(node.angle, LABEL_R);
                const isActive = node.id === activeId;

                const dotFill = hasActive
                  ? isActive ? dotActive : dotInactive
                  : dotDefault;
                const lblFill = hasActive
                  ? isActive ? lblActive : lblInactive
                  : lblDefault;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setClickedId((prev) =>
                        prev === node.id ? null : node.id
                      );
                    }}
                  >
                    {/* Hit area */}
                    <circle cx={dot.x} cy={dot.y} r={26} fill="transparent" />

                    {/* Active outer ring */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={NODE_R + 8}
                      fill="none"
                      stroke="var(--text-primary)"
                      strokeWidth="1"
                      style={{
                        opacity: isActive ? 0.35 : 0,
                        transition: "opacity 0.2s ease",
                      }}
                    />

                    {/* Node dot */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={isActive ? NODE_R + 1.5 : NODE_R}
                      fill={dotFill}
                      style={{ transition: "fill 0.22s ease, r 0.22s ease" }}
                    />

                    {/* Label */}
                    <text
                      ref={(el) => {
                        labelRefs.current[i] = el;
                      }}
                      x={lbl.x}
                      y={lbl.y}
                      textAnchor={labelAnchor(node.angle)}
                      dominantBaseline="middle"
                      fontSize="12"
                      fontFamily="inherit"
                      letterSpacing="0.03em"
                      fill={lblFill}
                      fontWeight={isActive ? "500" : "400"}
                      style={{ transition: "fill 0.22s ease" }}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Centre circle — outside spin group so it stays fixed */}
            <circle
              cx={CX}
              cy={CY}
              r={CENTRE_R}
              fill="var(--text-primary)"
              style={{ transition: "fill 0.3s ease" }}
            />
          </svg>

          {/* Centre text — HTML overlay */}
          <div
            style={{
              position: "absolute",
              left: `${(CX / VW) * 100}%`,
              top: `${(CY / VH) * 100}%`,
              width: `${((CENTRE_R * 2) / VW) * 100}%`,
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "9%",
              pointerEvents: "none",
            }}
          >
            <p
              style={{
                fontSize: "clamp(13px, 1.3vw, 19px)",
                lineHeight: 1.3,
                color: centreTextColor,
                fontWeight: 400,
                letterSpacing: "-0.025em",
                whiteSpace: "pre-line",
                transition: "color 0.3s ease",
              }}
            >
              {CENTRE_TEXT}
            </p>
          </div>
        </div>
      </div>

      {/* Node description — absolutely pinned to bottom of overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 44,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ width: "min(460px, 78vw)", textAlign: "center" }}>
          <AnimatePresence mode="wait">
            {activeNode && (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <p
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    fontFamily: "var(--font-geist-mono)",
                    opacity: 0.6,
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </p>
                <h3
                  style={{
                    fontSize: "clamp(20px, 2.2vw, 30px)",
                    fontWeight: 500,
                    lineHeight: 1.05,
                    color: "var(--text-primary)",
                    marginBottom: 10,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {activeNode.label}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(12px, 1vw, 14px)",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                  }}
                >
                  {activeNode.copy}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

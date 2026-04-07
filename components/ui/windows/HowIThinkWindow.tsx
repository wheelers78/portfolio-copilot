"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ThinkingNode {
  id: string;
  label: string;
  angle: number;
  copy: string;
}

const CENTRE_TEXT = "Turn\ncomplexity\ninto\nclarity";

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

// Tick mark vertical positions (matching Figma design)
const TICK_POSITIONS = [9504, 9631, 9727, 9823, 9919, 10015, 10111, 10207, 10303, 10399];

// ─── SVG geometry ─────────────────────────────────────────────────────────────

const VW = 900;
const VH = 860;
const CX = 450;
const CY = 430;
const CENTRE_R = 160;
const ORBIT_R = 240;
const LABEL_R = 380;
const NODE_R = 10;
const REVOLUTION_MS = 120000;

function svgPos(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

function labelAnchor(angleDeg: number): "middle" | "start" | "end" {
  const s = Math.sin((angleDeg * Math.PI) / 180);
  if (Math.abs(s) < 0.22) return "middle";
  return s > 0 ? "start" : "end";
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HowIThinkWindow() {
  const [activeId, setActiveId] = useState<string>("systems");
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const spinGroupRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeNode = NODES.find((n) => n.id === activeId)!;
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

  const orbitStroke = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)";
  const dotActive = "var(--text-primary)";
  const dotInactive = isDark ? "rgba(150,150,150,1)" : "rgba(180,180,180,1)";
  const lblActive = "var(--text-primary)";
  const lblInactive = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.65)";
  const centreTextColor = isDark ? "#181818" : "#ffffff";
  const panelDivider = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const lineColor = "var(--text-primary)";

  // Watch container width for responsive stacking
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setContainerWidth(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isNarrow = containerWidth < 700;

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", display: "flex", flexDirection: isNarrow ? "column" : "row", overflow: "hidden", minHeight: 0 }}>

      {/* ── Left: editorial nav panel with grid system ────────────────────────────────── */}
      <div
        style={{
          width: isNarrow ? "100%" : "42%",
          minWidth: 224,
          flexShrink: 0,
          padding: "28px 28px 28px 24px",
          display: "grid",
          gridTemplateColumns: "40px 1fr",
          gridAutoRows: "16px",
          gap: "0 12px",
          alignContent: "start",
          overflow: isNarrow ? "auto" : undefined,
        }}
      >
        {/* Spine column */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1 / -1",
            position: "relative",
          }}
        >
          {/* Black ticks at item positions */}
          {NODES.map((node, idx) => {
            const isActive = node.id === activeId;
            return (
              <div
                key={`tick-${node.id}`}
                style={{
                  position: "absolute",
                  left: 8,
                  top: `calc(${idx * 5} * 16px + 8px - 2px)`,
                  height: 1,
                  width: isActive ? 24 : 8,
                  backgroundColor: lineColor,
                  transition: "width 0.22s ease",
                }}
              />
            );
          })}

          {/* Grey lines in between items */}
          {NODES.flatMap((node, idx) =>
            idx < NODES.length - 1
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={`grey-${idx}-${i}`}
                    style={{
                      position: "absolute",
                      left: 9,
                      top: `calc(${idx * 5 + i} * 16px + 8px - 2px)`,
                      height: 1,
                      width: 8,
                      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
                    }}
                  />
                ))
              : []
          )}
        </div>

        {/* Content items */}
        {NODES.map((node, idx) => {
          const isActive = node.id === activeId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveId(node.id)}
              onMouseEnter={() => setHoverId(node.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{
                gridColumn: "2",
                gridRow: `${idx * 5 + 1}`,
                textAlign: "left",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Label */}
              <motion.p
                animate={{
                  fontSize: isActive ? "clamp(20px, 2.5vw, 24px)" : "clamp(14px, 1.6vw, 16px)",
                  fontWeight: isActive ? 500 : 500,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  lineHeight: 1.2,
                  letterSpacing: "-0.3px",
                  color: "var(--text-primary)",
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {node.label}
              </motion.p>
            </button>
          );
        })}

        {/* Description text spans multiple rows */}
        <AnimatePresence mode="wait">
          {NODES.map((node, idx) => {
            const isActive = node.id === activeId;
            return (
              isActive && (
                <motion.p
                  key={`desc-${node.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    gridColumn: "2",
                    gridRow: `${idx * 5 + 2} / span 4`,
                    fontSize: "clamp(13px, 1.1vw, 14px)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.02px",
                    color: isDark ? "rgba(255,255,255,0.68)" : "rgba(0,0,0,0.72)",
                    marginTop: 8,
                    marginBottom: 0,
                    fontWeight: 400,
                  }}
                >
                  {node.copy}
                </motion.p>
              )
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Right: orbit diagram ──────────────────────────────────────── */}
      {!isNarrow && (
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            aspectRatio: `${VW} / ${VH}`,
            maxWidth: "100%",
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
              {/* Orbit ring */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R}
                fill="none"
                stroke={orbitStroke}
                strokeWidth="1"
                strokeDasharray="6,4"
              />

              {NODES.map((node, i) => {
                const dot = svgPos(node.angle, ORBIT_R);
                const lbl = svgPos(node.angle, LABEL_R);
                const isActive = node.id === activeId;

                return (
                  <g
                    key={node.id}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setActiveId(node.id)}
                    onClick={() => setActiveId(node.id)}
                  >
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
                        opacity: isActive ? 0.4 : 0,
                        transition: "opacity 0.2s ease",
                      }}
                    />

                    {/* Node dot */}
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r={isActive ? NODE_R + 1.50 : NODE_R}
                      fill={isActive ? dotActive : dotInactive}
                      style={{ transition: "fill 0.22s ease" }}
                    />

                    {/* Label — clean sans-serif */}
                    <text
                      ref={(el) => { labelRefs.current[i] = el; }}
                      x={lbl.x}
                      y={lbl.y}
                      textAnchor={labelAnchor(node.angle)}
                      dominantBaseline="middle"
                      fontSize="15"
                      fontFamily="var(--font-geist), system-ui, -apple-system, sans-serif"
                      letterSpacing="-0.02em"
                      fill={isActive ? lblActive : lblInactive}
                      fontWeight="400"
                      style={{
                        textTransform: "uppercase",
                        transition: "fill 0.22s ease",
                      }}
                    >
                      {node.label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Centre circle */}
            <circle
              cx={CX}
              cy={CY}
              r={CENTRE_R}
              fill="var(--text-primary)"
              style={{ transition: "fill 0.3s ease" }}
            />

            {/* Centre text - inside SVG */}
            <text
              x={CX}
              y={CY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="32"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="400"
              letterSpacing="-0.01em"
              fill={centreTextColor}
              style={{ transition: "fill 0.3s ease", whiteSpace: "pre-line", lineHeight: 1.3 }}
            >
              {CENTRE_TEXT.split("\n").map((line, i) => (
                <tspan key={i} x={CX} dy={i === 0 ? "-1.5em" : "1.3em"}>
                  {line}
                </tspan>
              ))}
            </text>
          </svg>
        </div>
      </div>
      )}
    </div>
  );
}

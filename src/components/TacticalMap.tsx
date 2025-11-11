"use client";

import React, { useEffect, useRef, useState } from "react";

export type Point = { x: number; y: number };
export type UnitSide = "friendly" | "enemy" | "neutral";
export type Unit = {
  id: string;
  name: string;
  side: UnitSide;
  path: Point[];
};
 
type Props = {
  units: Unit[];
  height?: number; // px
  showGrid?: boolean;
  speedMs?: number; // interval per step
};

export default function TacticalMap({ units, height = 300, showGrid = true, speedMs = 800 }: Props) {
  const [indices, setIndices] = useState<number[]>(units.map(() => 0));
  const timerRef = useRef<number | null>(null);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    timerRef.current = window.setInterval(() => {
      setIndices((prev) => prev.map((idx, i) => (idx + 1) % Math.max(units[i].path.length, 1)));
    }, speedMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running, speedMs, units]);

  const sideColor = (side: UnitSide) => {
    switch (side) {
      case "friendly":
        return "#4caf50"; // success
      case "enemy":
        return "#f44336"; // danger
      default:
        return "#ffc107"; // warning
    }
  };

  // Simple grid generator for 0..100 space
  const gridLines = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  return (
    <div style={{ height, borderRadius: 8, background: "#0b1220", border: "1px dashed var(--border)", position: "relative" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        {/* Grid */}
        {showGrid && (
          <g opacity={0.25}>
            {gridLines.map((v) => (
              <line key={`v-${v}`} x1={v} y1={0} x2={v} y2={100} stroke="#34415f" strokeWidth={0.2} />
            ))}
            {gridLines.map((h) => (
              <line key={`h-${h}`} x1={0} y1={h} x2={100} y2={h} stroke="#34415f" strokeWidth={0.2} />
            ))}
          </g>
        )}

        {/* Units and paths */}
        {units.map((u, i) => {
          const idx = indices[i] ?? 0;
          const current = u.path[idx] ?? u.path[0] ?? { x: 50, y: 50 };
          const color = sideColor(u.side);
          const pathPoints = u.path.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <g key={u.id}>
              {/* Path */}
              {u.path.length > 1 && (
                <polyline points={pathPoints} fill="none" stroke={color} strokeWidth={0.8} opacity={0.7} />
              )}
              {/* Unit marker */}
              <circle cx={current.x} cy={current.y} r={1.5} fill={color} />
              {/* Label */}
              <text x={current.x + 1.5} y={current.y - 1.5} fontSize={3} fill="#c9d7f2">
                {u.id}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Controls */}
      <div style={{ position: "absolute", left: 8, bottom: 8, display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setRunning((r) => !r)}>{running ? "Duraklat" : "Başlat"}</button>
        <label className="chip">Birimler: {units.length}</label>
      </div>
    </div>
  );
}
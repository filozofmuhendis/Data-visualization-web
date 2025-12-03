"use client";

import React, { useEffect, useRef, useState } from "react";
import * as mgrs from "mgrs";
import UTMLatLng from "utm-latlng";
import proj4 from "proj4";

export type Point = { x: number; y: number };
export type UnitSide = "friendly" | "enemy" | "neutral" | "suspect" | "joker" | "unknown";
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
  showPaths?: boolean;
  showLabels?: boolean;
  showControls?: boolean;
  speedMs?: number; // interval per step
  mapBounds?: { topLeft: { lat: number; lon: number }; bottomRight: { lat: number; lon: number } };
  targetCRS?: string; // ör. 'EPSG:3857'
};

export default function TacticalMap({ units, height = 300, showGrid = true, showPaths = true, showLabels = true, showControls = false, speedMs = 800, mapBounds, targetCRS }: Props) {
  const [indices, setIndices] = useState<number[]>(units.map(() => 0));
  const timerRef = useRef<number | null>(null);
  const [running, setRunning] = useState(true);
  const [gridOn, setGridOn] = useState(showGrid);
  const [pathsOn, setPathsOn] = useState(showPaths);
  const [labelsOn, setLabelsOn] = useState(showLabels);
  const [symbology, setSymbology] = useState<"dot" | "app6">("dot");
  const [weatherOn, setWeatherOn] = useState(false);
  const [heatOn, setHeatOn] = useState(false);
  const [clickPos, setClickPos] = useState<Point | null>(null);
  const [sigma, setSigma] = useState(8);
  const [gridSize, setGridSize] = useState(10);
  const [historySteps, setHistorySteps] = useState(5);
  const [posHistory, setPosHistory] = useState<Point[][]>([]);
  const [frameMode, setFrameMode] = useState<"stroke" | "fill" | "both">("stroke");
  const [sideFilter, setSideFilter] = useState<UnitSide | "all">("all");
  const [decayLambda, setDecayLambda] = useState(0.3); // zaman ağırlığı (0 = pasif)
  const [crs, setCrs] = useState<string | undefined>(targetCRS);

  useEffect(() => {
    if (!running) return;
    timerRef.current = window.setInterval(() => {
      setIndices((prev) => prev.map((idx, i) => (idx + 1) % Math.max(units[i].path.length, 1)));
    }, speedMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [running, speedMs, units]);

  // Konum geçmişi: son N adımı sakla
  useEffect(() => {
    const positions = units.map((u, i) => {
      const idx = indices[i] ?? 0;
      return u.path[idx] ?? u.path[0] ?? { x: 50, y: 50 };
    });
    setPosHistory((prev) => {
      const next = [...prev, positions];
      const keep = Math.max(1, historySteps);
      return next.slice(-keep);
    });
  }, [indices, units, historySteps]);

  const sideColor = (side: UnitSide, mode: "dot" | "app6") => {
    if (mode === "app6") {
      switch (side) {
        case "friendly":
          return "#0ea5e9"; // mavi ton (APP-6 friendly)
        case "enemy":
          return "#ef4444"; // kırmızı (hostile)
        case "suspect":
          return "#f59e0b"; // turuncu (suspect)
        case "joker":
          return "#a855f7"; // mor (joker/exercise)
        case "unknown":
          return "#eab308"; // sarı (unknown)
        default:
          return "#22c55e"; // yeşil (neutral)
      }
    }
    switch (side) {
      case "friendly":
        return "#4caf50";
      case "enemy":
        return "#f44336";
      case "suspect":
        return "#ff9800";
      case "joker":
        return "#9c27b0";
      case "unknown":
        return "#ffc107";
      default:
        return "#ffc107";
    }
  };

  // Simple grid generator for 0..100 space
  const gridLines = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);

  const renderMarker = (x: number, y: number, side: UnitSide) => {
    const color = sideColor(side, symbology);
    const s = 2;
    const useStroke = frameMode === "stroke" || frameMode === "both";
    const useFill = frameMode === "fill" || frameMode === "both";
    const fillColor = symbology === "app6" ? `${color}33` : color; // şeffaf dolgu
    if (symbology === "dot") {
      return <circle cx={x} cy={y} r={1.5} fill={color} />;
    }
    if (side === "friendly") {
      const points = `${x},${y - s} ${x - s},${y + s} ${x + s},${y + s}`;
      return <polygon points={points} fill={useFill ? fillColor : "none"} stroke={useStroke ? color : "none"} strokeWidth={0.8} />;
    }
    if (side === "enemy") {
      const points = `${x},${y - s} ${x - s},${y} ${x},${y + s} ${x + s},${y}`;
      return <polygon points={points} fill={useFill ? fillColor : "none"} stroke={useStroke ? color : "none"} strokeWidth={0.8} />;
    }
    if (side === "suspect") {
      const points = `${x},${y - s} ${x - s},${y} ${x},${y + s} ${x + s},${y}`;
      return <polygon points={points} fill={useFill ? fillColor : "none"} stroke={useStroke ? color : "none"} strokeWidth={0.8} strokeDasharray="2 1" />;
    }
    if (side === "joker") {
      const pts = [
        [x, y - s],
        [x - 0.6 * s, y + 0.2 * s],
        [x - s, y + s],
        [x, y + 0.5 * s],
        [x + s, y + s],
        [x + 0.6 * s, y + 0.2 * s],
      ]
        .map((p) => p.join(","))
        .join(" ");
      return <polyline points={pts} fill={useFill ? fillColor : "none"} stroke={useStroke ? color : "none"} strokeWidth={0.8} />;
    }
    if (side === "unknown") {
      return <circle cx={x} cy={y} r={s} fill={useFill ? fillColor : "none"} stroke={useStroke ? color : "none"} strokeWidth={0.8} strokeDasharray="2 1" />;
    }
    return <rect x={x - s} y={y - s} width={s * 2} height={s * 2} fill={useFill ? fillColor : "none"} stroke={useStroke ? color : "none"} strokeWidth={0.8} />;
  };

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setClickPos({ x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) });
  };

  // KDE/grid tabanlı ısı haritası ve gerçek koordinat formatlayıcılar
  const cellSize = 100 / gridSize;
  const twoSigma2 = 2 * sigma * sigma;

  const currentPositions = units.map((u, i) => {
    const idx = indices[i] ?? 0;
    return u.path[idx] ?? u.path[0] ?? { x: 50, y: 50 };
  });

  const steps = posHistory.length ? posHistory : [currentPositions];
  const heatCells = Array.from({ length: gridSize * gridSize }, (_, k) => {
    const gx = k % gridSize;
    const gy = Math.floor(k / gridSize);
    const cx = (gx + 0.5) * cellSize;
    const cy = (gy + 0.5) * cellSize;
    let intensity = 0;
    for (let sIdx = 0; sIdx < steps.length; sIdx++) {
      const positions = steps[sIdx];
      const age = steps.length - 1 - sIdx;
      const recency = Math.exp(-(decayLambda ?? 0) * age);
      positions.forEach((p, idx) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist2 = dx * dx + dy * dy;
        const w = Math.exp(-dist2 / twoSigma2);
        const side = units[idx % units.length]?.side ?? "neutral";
        const factor = side === "enemy" ? 1.0 : side === "suspect" ? 0.8 : 0.5;
        intensity += recency * w * factor;
      });
    }
    return { gx, gy, intensity };
  });
  const maxIntensity = Math.max(...heatCells.map((c) => c.intensity), 0.0001);

  const MAP_BOUNDS = mapBounds ?? {
    topLeft: { lat: 41.05, lon: 28.9 },
    bottomRight: { lat: 40.95, lon: 29.1 },
  };
  const utm = new UTMLatLng();

  const toLatLon = (p: Point) => {
    const lat = MAP_BOUNDS.topLeft.lat + (p.y / 100) * (MAP_BOUNDS.bottomRight.lat - MAP_BOUNDS.topLeft.lat);
    const lon = MAP_BOUNDS.topLeft.lon + (p.x / 100) * (MAP_BOUNDS.bottomRight.lon - MAP_BOUNDS.topLeft.lon);
    return { lat, lon };
  };

  const formatLatLon = (p: Point) => {
    const { lat, lon } = toLatLon(p);
    return `${lat.toFixed(5)}°, ${lon.toFixed(5)}°`;
  };

  const formatUTM = (p: Point) => {
    const { lat, lon } = toLatLon(p);
    const out = utm.ConvertLatLngToUtm(lat, lon, 1);
    if (typeof out === "string") return out;
    return `${out.ZoneNumber}${out.ZoneLetter} E:${Math.round(out.Easting)} N:${Math.round(out.Northing)}`;
  };

  const formatMGRS = (p: Point) => {
    const { lat, lon } = toLatLon(p);
    return mgrs.forward([lon, lat], 4);
  };
  const formatProjected = (p: Point) => {
    const target = crs ?? targetCRS;
    if (!target) return null;
    try {
      const { lat, lon } = toLatLon(p);
      const [x, y] = proj4("EPSG:4326", target, [lon, lat]);
      return `${target}: X:${Math.round(x)} Y:${Math.round(y)}`;
    } catch {
      return null;
    }
  };

  return (
    <div style={{ height, borderRadius: 8, background: "#0b1220", border: "1px dashed var(--border)", position: "relative" }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }} onClick={handleClick}>
        {/* Grid */}
        {gridOn && (
          <g opacity={0.25}>
            {gridLines.map((v) => (
              <line key={`v-${v}`} x1={v} y1={0} x2={v} y2={100} stroke="#34415f" strokeWidth={0.2} />
            ))}
            {gridLines.map((h) => (
              <line key={`h-${h}`} x1={0} y1={h} x2={100} y2={h} stroke="#34415f" strokeWidth={0.2} />
            ))}
          </g>
        )}

        {/* Heatmap (KDE/grid under units) */}
        {heatOn && (
          <g>
            {heatCells.map((c, i) => {
              const x = c.gx * cellSize;
              const y = c.gy * cellSize;
              const alpha = Math.min(0.6, (c.intensity / maxIntensity) * 0.6);
              return (
                <rect key={`cell-${i}`} x={x} y={y} width={cellSize} height={cellSize} fill="#ef4444" opacity={alpha} />
              );
            })}
          </g>
        )}

        {/* Units and paths */}
        {units.map((u, i) => {
          if (!(sideFilter === "all" || u.side === sideFilter)) return null;
          const idx = indices[i] ?? 0;
          const current = u.path[idx] ?? u.path[0] ?? { x: 50, y: 50 };
          const color = sideColor(u.side, symbology);
          const pathPoints = u.path.map((p) => `${p.x},${p.y}`).join(" ");
          return (
            <g key={u.id}>
              {/* Path */}
              {pathsOn && u.path.length > 1 && (
                <polyline points={pathPoints} fill="none" stroke={color} strokeWidth={0.8} opacity={0.7} />
              )}
              {/* Unit marker */}
              {renderMarker(current.x, current.y, u.side)}
              {/* Label */}
              {labelsOn && (
                <text x={current.x + 1.5} y={current.y - 1.5} fontSize={3} fill="#c9d7f2">
                  {u.id}
                </text>
              )}
            </g>
          );
        })}

        {/* Weather overlay (above units) */}
        {weatherOn && (
          <g opacity={0.35}>
            <path d="M 0 20 C 30 18, 70 22, 100 20" stroke="#60a5fa" strokeWidth={1} fill="none" />
            <path d="M 0 50 C 30 48, 70 52, 100 50" stroke="#60a5fa" strokeWidth={1} fill="none" />
            <path d="M 0 75 C 30 73, 70 77, 100 75" stroke="#60a5fa" strokeWidth={1} fill="none" />
          </g>
        )}
      </svg>

      {/* Controls */}
      <div style={{ position: "absolute", left: 8, bottom: 8, display: "flex", gap: 8 }}>
        <button className="btn" onClick={() => setRunning((r) => !r)}>{running ? "Duraklat" : "Başlat"}</button>
        <label className="chip">Birimler: {units.length}</label>
        {clickPos && (
          <>
            <label className="chip">Koordinat: {clickPos.x}, {clickPos.y}</label>
            <label className="chip">Lat/Lon: {formatLatLon(clickPos)}</label>
            <label className="chip">UTM: {formatUTM(clickPos)}</label>
            <label className="chip">MGRS: {formatMGRS(clickPos)}</label>
            {targetCRS && formatProjected(clickPos) && (
              <label className="chip">Projeksiyon: {formatProjected(clickPos)}</label>
            )}
          </>
        )}
      </div>

      {showControls && (
        <div className="panel" style={{ position: "absolute", right: 8, top: 8, padding: 8, minWidth: 300 }}>
          <div className="panel-header">
            <strong style={{ fontSize: 12, color: "#c9d7f2" }}>Harita Kontrolleri</strong>
            <label className="chip" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={gridOn} onChange={(e) => setGridOn(e.target.checked)} /> Izgara
            </label>
            <label className="chip" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={pathsOn} onChange={(e) => setPathsOn(e.target.checked)} /> Yollar
            </label>
            <label className="chip" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={labelsOn} onChange={(e) => setLabelsOn(e.target.checked)} /> Etiketler
            </label>
            <label className="chip" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={heatOn} onChange={(e) => setHeatOn(e.target.checked)} /> Isı Haritası
            </label>
            <label className="chip" style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={weatherOn} onChange={(e) => setWeatherOn(e.target.checked)} /> Hava Durumu
            </label>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Semboloji:
              <label style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="radio" name="symbology" value="dot" checked={symbology === "dot"} onChange={() => setSymbology("dot")} /> Dot
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="radio" name="symbology" value="app6" checked={symbology === "app6"} onChange={() => setSymbology("app6")} /> APP-6
              </label>
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Çerçeve:
              <label style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="radio" name="frame" value="stroke" checked={frameMode === "stroke"} onChange={() => setFrameMode("stroke")} /> Çizgi
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="radio" name="frame" value="fill" checked={frameMode === "fill"} onChange={() => setFrameMode("fill")} /> Dolgu
              </label>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <input type="radio" name="frame" value="both" checked={frameMode === "both"} onChange={() => setFrameMode("both")} /> Her ikisi
              </label>
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Yan Filtresi:
              <select className="input" value={sideFilter} onChange={(e) => setSideFilter(e.target.value as any)} aria-label="Yan filtresi" style={{ minWidth: 140 }}>
                <option value="all">Tümü</option>
                <option value="friendly">Friendly</option>
                <option value="enemy">Enemy</option>
                <option value="neutral">Neutral</option>
                <option value="suspect">Suspect</option>
                <option value="unknown">Unknown</option>
                <option value="joker">Joker</option>
              </select>
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Sigma:
              <input type="range" min={4} max={20} value={sigma} onChange={(e) => setSigma(Number(e.target.value))} aria-label="Isı haritası sigma" />
              <span>{sigma}</span>
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Grid:
              <input type="number" min={6} max={24} value={gridSize} onChange={(e) => setGridSize(Math.max(6, Math.min(24, Number(e.target.value))))} aria-label="Grid boyutu" style={{ width: 56 }} />
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Zaman Penceresi:
              <input type="number" min={1} max={20} value={historySteps} onChange={(e) => setHistorySteps(Math.max(1, Math.min(20, Number(e.target.value))))} aria-label="Zaman penceresi" style={{ width: 56 }} />
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Zaman Ağırlığı:
              <input type="range" min={0} max={1} step={0.05} value={decayLambda} onChange={(e) => setDecayLambda(Number(e.target.value))} aria-label="Zaman ağırlığı" />
              <span>{decayLambda.toFixed(2)}</span>
            </span>
            <span className="chip" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              Projeksiyon:
              <select className="input" value={crs ?? ""} onChange={(e) => setCrs(e.target.value || undefined)} aria-label="Projeksiyon seçimi" style={{ minWidth: 140 }}>
                <option value="">Yok</option>
                <option value="EPSG:4326">EPSG:4326</option>
                <option value="EPSG:3857">EPSG:3857 (Web Mercator)</option>
                <option value="EPSG:32635">EPSG:32635 (UTM 35N)</option>
              </select>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

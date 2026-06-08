"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";

interface RotatingEarthProps {
  width?: number;
  height?: number;
  className?: string;
}

type LandMass = {
  lng: number;
  lat: number;
  rx: number;
  ry: number;
  tilt?: number;
};

const landMasses: LandMass[] = [
  { lng: -102, lat: 48, rx: 48, ry: 24, tilt: -0.35 },
  { lng: -64, lat: -15, rx: 25, ry: 43, tilt: 0.2 },
  { lng: 15, lat: 5, rx: 32, ry: 38, tilt: -0.15 },
  { lng: 72, lat: 48, rx: 74, ry: 25, tilt: 0.08 },
  { lng: 78, lat: 20, rx: 18, ry: 24, tilt: -0.1 },
  { lng: 113, lat: -25, rx: 20, ry: 13, tilt: 0.2 },
  { lng: -42, lat: 74, rx: 16, ry: 9, tilt: -0.2 },
];

const routes: Array<[[number, number], [number, number]]> = [
  [[76.27, 9.93], [72.87, 19.07]],
  [[76.27, 9.93], [77.59, 12.97]],
  [[76.27, 9.93], [55.27, 25.2]],
  [[76.27, 9.93], [51.53, 25.28]],
  [[76.27, 9.93], [-0.12, 51.5]],
  [[76.27, 9.93], [103.85, 1.29]],
];

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function isInsideLandMass(lng: number, lat: number, land: LandMass) {
  const angle = land.tilt ?? 0;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = lng - land.lng;
  const dy = lat - land.lat;
  const rotatedX = dx * cos - dy * sin;
  const rotatedY = dx * sin + dy * cos;

  return (rotatedX * rotatedX) / (land.rx * land.rx) + (rotatedY * rotatedY) / (land.ry * land.ry) <= 1;
}

function makeLandDots() {
  const dots: Array<[number, number]> = [];

  for (let lng = -178; lng <= 178; lng += 3.5) {
    for (let lat = -58; lat <= 78; lat += 3.5) {
      const inside = landMasses.some((land) => isInsideLandMass(lng, lat, land));
      if (!inside) continue;

      const seed = Math.round((lng + 180) * 13 + (lat + 90) * 7);
      dots.push([
        lng + (seededUnit(seed) - 0.5) * 0.9,
        lat + (seededUnit(seed + 17) - 0.5) * 0.9,
      ]);
    }
  }

  return dots;
}

export default function RotatingEarth({
  width = 560,
  height = 460,
  className = "",
}: RotatingEarthProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width, height });
  const landDots = useMemo(() => makeLandDots(), []);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      const nextWidth = Math.max(280, Math.min(width, rect.width || width));
      const nextHeight = Math.max(300, Math.min(height, nextWidth * 0.84));
      setDimensions({ width: nextWidth, height: nextHeight });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [height, width]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const canvasWidth = dimensions.width;
    const canvasHeight = dimensions.height;
    const radius = Math.min(canvasWidth, canvasHeight) / 2.55;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([canvasWidth / 2, canvasHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath(projection, context);
    const graticule = d3.geoGraticule10();
    let rotation = -64;
    let frameId = 0;
    let isDragging = false;
    let startX = 0;
    let startRotation = rotation;

    const drawRoute = (from: [number, number], to: [number, number], alpha: number) => {
      const interpolate = d3.geoInterpolate(from, to);
      context.beginPath();

      for (let i = 0; i <= 48; i += 1) {
        const point = interpolate(i / 48);
        const projected = projection(point);
        if (!projected) continue;
        if (i === 0) context.moveTo(projected[0], projected[1]);
        else context.lineTo(projected[0], projected[1]);
      }

      context.strokeStyle = `rgba(255,207,114,${alpha})`;
      context.lineWidth = 1.35;
      context.stroke();
    };

    const render = () => {
      projection.rotate([rotation, -12, 0]);
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const cx = canvasWidth / 2;
      const cy = canvasHeight / 2;
      const gradient = context.createRadialGradient(cx - radius * 0.35, cy - radius * 0.5, radius * 0.12, cx, cy, radius * 1.25);
      gradient.addColorStop(0, "#204d8f");
      gradient.addColorStop(0.48, "#10294d");
      gradient.addColorStop(1, "#060b17");

      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      context.strokeStyle = "rgba(255,255,255,0.55)";
      context.lineWidth = 1.5;
      context.stroke();

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.clip();

      context.beginPath();
      path(graticule);
      context.strokeStyle = "rgba(255,255,255,0.16)";
      context.lineWidth = 0.8;
      context.stroke();

      routes.forEach((route, index) => drawRoute(route[0], route[1], 0.22 + index * 0.05));

      landDots.forEach(([lng, lat], index) => {
        const projected = projection([lng, lat]);
        if (!projected) return;

        const visible = d3.geoDistance([lng, lat], [-rotation, 12]) < Math.PI / 2;
        if (!visible) return;

        context.beginPath();
        context.arc(projected[0], projected[1], index % 5 === 0 ? 1.45 : 1.05, 0, Math.PI * 2);
        context.fillStyle = index % 7 === 0 ? "rgba(255,207,114,0.92)" : "rgba(255,255,255,0.72)";
        context.fill();
      });

      context.restore();

      context.beginPath();
      context.arc(cx, cy, radius * 1.03, 0, Math.PI * 2);
      context.strokeStyle = "rgba(255,207,114,0.2)";
      context.lineWidth = 8;
      context.stroke();

      if (!isDragging) rotation += 0.22;
      frameId = window.requestAnimationFrame(render);
    };

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      startX = event.clientX;
      startRotation = rotation;
      canvas.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging) return;
      rotation = startRotation + (event.clientX - startX) * 0.45;
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDragging = false;
      canvas.releasePointerCapture(event.pointerId);
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [dimensions.height, dimensions.width, landDots]);

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <canvas
        ref={canvasRef}
        className="mx-auto block max-w-full cursor-grab rounded-[18px] active:cursor-grabbing"
        aria-label="Rotating dotted placement globe"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-[8px] border border-white/10 bg-black/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/70 backdrop-blur">
        Drag to rotate
      </div>
    </div>
  );
}

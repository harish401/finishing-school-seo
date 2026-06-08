"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import {
  getFinishingProgramCategory,
  type ProgramCategoryKey,
} from "@/lib/finishing-school-programs";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────
   Theme map
───────────────────────────────────────── */
const themes: Record<
  ProgramCategoryKey,
  {
    accent: string;
    accentBg: string;
    accentHover: string;
    stroke: string;
    glow: string;
    pillBg: string;
    sectionBg: string;
    gradFrom: string;
    gradTo: string;
  }
> = {
  schools: {
    accent: "text-[#e21b2f]",
    accentBg: "bg-[#e21b2f]",
    accentHover: "hover:bg-[#b91525]",
    stroke: "#e21b2f",
    glow: "rgba(226,27,47,0.25)",
    pillBg: "bg-[#fff1e5]",
    sectionBg: "bg-gradient-to-br from-[#fff8ee] to-[#ffeee0]",
    gradFrom: "#e21b2f",
    gradTo: "#ff9f60",
  },
  colleges: {
    accent: "text-[#008b7d]",
    accentBg: "bg-[#008b7d]",
    accentHover: "hover:bg-[#006f66]",
    stroke: "#008b7d",
    glow: "rgba(0,139,125,0.25)",
    pillBg: "bg-[#e5fbf6]",
    sectionBg: "bg-gradient-to-br from-[#effffb] to-[#d9f7f2]",
    gradFrom: "#008b7d",
    gradTo: "#36d6a0",
  },
  healthcare: {
    accent: "text-[#057bd2]",
    accentBg: "bg-[#057bd2]",
    accentHover: "hover:bg-[#0568b1]",
    stroke: "#057bd2",
    glow: "rgba(5,123,210,0.25)",
    pillBg: "bg-[#e8f6ff]",
    sectionBg: "bg-gradient-to-br from-[#f0f9ff] to-[#daeeff]",
    gradFrom: "#057bd2",
    gradTo: "#5bc0f8",
  },
  "professional-development": {
    accent: "text-[#bd168e]",
    accentBg: "bg-[#bd168e]",
    accentHover: "hover:bg-[#981173]",
    stroke: "#bd168e",
    glow: "rgba(189,22,142,0.25)",
    pillBg: "bg-[#fff0fa]",
    sectionBg: "bg-gradient-to-br from-[#fff4fb] to-[#fdddf4]",
    gradFrom: "#bd168e",
    gradTo: "#f05cb9",
  },
};

/* ─────────────────────────────────────────
   Mascot tips per program category
───────────────────────────────────────── */
const mascotTips: Record<ProgramCategoryKey, string[]> = {
  schools: [
    "Let's get started! Group challenges teach you to work together — speak up, share ideas, and lead with kindness!",
    "It's never too early to explore! Discover your unique strengths and find which career paths spark your curiosity.",
    "Routines are superpowers! Plan a focus routine that makes study time easier and gives you more time to play.",
    "You did it! Speak clearly, step onto any stage without hesitation, and show off that confidence. You're ready!",
  ],
  colleges: [
    "Welcome to the transition! Master corporate manners and communication so you walk into any office ready to succeed.",
    "A sharp budget is the foundation of freedom! Build healthy saving and investing habits before your first paycheck arrives.",
    "Let's polish that resume and perfect your introduction. We'll make sure you shine in every interview and group discussion!",
    "Take ownership! Real leaders listen, collaborate, and take initiative. Let's unlock your executive presence.",
  ],
  healthcare: [
    "Your medical journey starts here! Let's map your professional goals and discover where you fit best.",
    "Plan your international destination pathways and licensure milestones. Preparation is key to a global career!",
    "Sharpen your study habits! Build structured study plans and documentation awareness to ace your licensure exams.",
    "Patient care is all about connection. Master the communication skills and bedside etiquette that set great caregivers apart.",
    "Ready for the world? Get personalized guidance on eligibility, application routes, and your next international steps.",
  ],
  "professional-development": [
    "Step up your game! Develop planning, delegation, and management confidence to handle any team challenge.",
    "Communicate with impact! From presentations to high-stakes conversations, structure your words for success.",
    "Presence is power! Polish your executive etiquette, meeting behavior, and grooming for a perfect first impression.",
    "Your path is in your hands! Map your career goals, prepare for promotion talks, and secure your next growth move.",
    "Stand out and get noticed! Refine your LinkedIn profile, build high-value connections, and tell your professional story.",
  ],
};

/* ─────────────────────────────────────────
   SVG path geometry (viewBox 700 × 320)
   Returns node centres + cubic bezier path
───────────────────────────────────────── */
function buildPath(count: number) {
  const nodes4 = [
    { x: 80, y: 240 },
    { x: 240, y: 80 },
    { x: 420, y: 240 },
    { x: 620, y: 80 },
  ];
  const nodes5 = [
    { x: 60, y: 250 },
    { x: 185, y: 80 },
    { x: 315, y: 250 },
    { x: 455, y: 80 },
    { x: 630, y: 220 },
  ];
  const nodes = count === 4 ? nodes4 : nodes5;

  // Build a smooth cubic bezier through the nodes
  let d = `M ${nodes[0].x},${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const cur = nodes[i];
    const cpX = (prev.x + cur.x) / 2;
    d += ` C ${cpX},${prev.y} ${cpX},${cur.y} ${cur.x},${cur.y}`;
  }
  return { nodes, d };
}

/* Sample a point on a multi-segment cubic bezier (t in [0,1]) */
function sampleBezier(
  nodes: { x: number; y: number }[],
  t: number
): { x: number; y: number } {
  const segCount = nodes.length - 1;
  const scaledT = t * segCount;
  const segIdx = Math.min(Math.floor(scaledT), segCount - 1);
  const localT = scaledT - segIdx;

  const p0 = nodes[segIdx];
  const p3 = nodes[segIdx + 1];
  const cpX = (p0.x + p3.x) / 2;
  const p1 = { x: cpX, y: p0.y };
  const p2 = { x: cpX, y: p3.y };

  const mt = 1 - localT;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * localT * p1.x + 3 * mt * localT * localT * p2.x + localT * localT * localT * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * localT * p1.y + 3 * mt * localT * localT * p2.y + localT * localT * localT * p3.y,
  };
}

/* ─────────────────────────────────────────
   Mascot image selection
───────────────────────────────────────── */
function getMascotSrc(idx: number, count: number) {
  if (idx === 0) return "/brand/pencil-character.png";       // side waving
  if (idx === count - 1) return "/brand/pencil-character.png";          // front waving
  return "/brand/pencil-character.png";                          // top-down
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
export function ProgramAboutSection({
  categoryKey,
}: {
  categoryKey: ProgramCategoryKey;
}) {
  const category = getFinishingProgramCategory(categoryKey);
  const t = themes[categoryKey];
  const milestones = category.programs;
  const count = milestones.length;

  const { nodes, d: pathD } = buildPath(count);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Motion value for smooth mascot position along path (0→1)
  const pathProgress = useMotionValue(0);
  const mascotX = useMotionValue(nodes[0].x);
  const mascotY = useMotionValue(nodes[0].y);

  // Track total path length for stroke-dashoffset animation
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  /* Smoothly animate mascot to a new node */
  const goToNode = useCallback(
    (idx: number) => {
      const target = idx / (count - 1); // t in [0,1]
      animate(pathProgress, target, {
        duration: 1.1,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (v) => {
          const pos = sampleBezier(nodes, v);
          mascotX.set(pos.x);
          mascotY.set(pos.y);
        },
      });
      setActiveIdx(idx);
    },
    [count, nodes, pathProgress, mascotX, mascotY]
  );

  /* Auto-advance */
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % count;
        goToNode(next);
        return next;
      });
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlaying, count, goToNode]);

  /* ── Derived stroke progress for the path line ── */
  const dashOffset = useTransform(
    pathProgress,
    [0, 1],
    [pathLength, 0]
  );

  /* ── SVG viewBox ── */
  const VW = 700;
  const VH = 320;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden py-12 sm:py-20 lg:py-24",
        t.sectionBg
      )}
    >
      {/* Subtle dot grid */}
      <svg
        className="absolute inset-0 h-full w-full -z-10 opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`dots-${categoryKey}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.1" fill="#888" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dots-${categoryKey})`} />
      </svg>

      <div className="container-main">
        {/* ── Section header ── */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.15em] shadow-md border border-white/60",
              t.accent
            )}
          >
            Learning Journey Map
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-4 font-heading text-3xl font-black leading-tight tracking-tight text-[#1a0a1a] sm:text-4xl lg:text-5xl"
          >
            Your step-by-step path to growth
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-4 text-sm font-medium leading-relaxed text-[#5a4a5a] sm:text-lg"
          >
            Follow the mascot through every milestone as it guides you from where
            you are today to where you want to be.
          </motion.p>
        </div>

        {/* ── Main workspace ── */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:items-center xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">

          {/* ── LEFT: Info Panel ── */}
          <div className="min-w-0 space-y-5">
            {/* Progress bar + controls */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-white/50 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className={cn("h-full rounded-full", t.accentBg)}
                  animate={{ width: `${((activeIdx + 1) / count) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
              <span className="text-xs font-black text-[#4a3a4a] tabular-nums whitespace-nowrap">
                {activeIdx + 1} / {count}
              </span>
              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-all hover:scale-110",
                  t.accentBg
                )}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                className="rounded-[8px] border border-white/60 bg-white p-5 shadow-2xl shadow-black/8 backdrop-blur sm:p-6"
              >
                {/* Focus badge */}
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-[10px] font-black uppercase tracking-widest sm:text-[11px]",
                    t.accent,
                    t.pillBg
                  )}
                  style={{ borderColor: t.stroke + "44" }}
                >
                  {milestones[activeIdx].focus}
                </span>

                <h3 className="mt-4 font-heading text-2xl font-black leading-snug text-[#1a0a1a] sm:text-[1.65rem]">
                  {milestones[activeIdx].title}
                </h3>

                <p className="mt-3 text-sm sm:text-base font-medium leading-relaxed text-[#5a4a5a]">
                  {milestones[activeIdx].description}
                </p>

                {/* Mascot speech bubble */}
                <div className="mt-5 flex gap-3 rounded-[8px] border border-slate-100 bg-slate-50 p-4">
                  {/* Mini mascot thumbnail */}
                  <div className="shrink-0 relative">
                    <div
                      className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden shadow-inner"
                      style={{ background: `radial-gradient(circle, ${t.glow} 0%, white 100%)` }}
                    >
                      <img
                        src={getMascotSrc(activeIdx, count)}
                        alt="mascot"
                        className="h-11 w-auto object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Mascot says…
                    </p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold italic leading-relaxed text-slate-700">
                      "{mascotTips[categoryKey][activeIdx]}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next buttons + dot nav */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => { const n = Math.max(0, activeIdx - 1); goToNode(n); }}
                disabled={activeIdx === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all hover:scale-105 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600" />
              </button>

              {/* Dot indicators */}
              <div className="flex flex-1 items-center justify-center gap-2">
                {milestones.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToNode(i)}
                    className="group relative flex h-6 w-6 items-center justify-center"
                    aria-label={`Go to milestone ${i + 1}`}
                  >
                    <motion.div
                      animate={{
                        width: i === activeIdx ? 28 : 10,
                        height: 10,
                        backgroundColor: i <= activeIdx ? t.stroke : "#cbd5e1",
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-full"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => { const n = Math.min(count - 1, activeIdx + 1); goToNode(n); }}
                disabled={activeIdx === count - 1}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm transition-all hover:scale-105 disabled:opacity-30",
                  t.accentBg
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-2 md:hidden">
              {milestones.map((milestone, i) => {
                const active = i === activeIdx;

                return (
                  <button
                    key={milestone.title}
                    onClick={() => {
                      setIsPlaying(false);
                      goToNode(i);
                    }}
                    className={cn(
                      "flex min-w-0 items-center gap-3 rounded-[8px] border p-3 text-left shadow-sm transition-all duration-300",
                      active
                        ? "border-transparent bg-white"
                        : "border-white/70 bg-white/60"
                    )}
                    style={{
                      boxShadow: active ? `0 16px 34px ${t.glow}` : undefined,
                    }}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-sm font-black",
                        active ? "text-white" : t.accent
                      )}
                      style={{
                        background: active ? t.stroke : "rgba(255,255,255,0.75)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-black leading-tight text-[#1a0a1a]">
                        {milestone.title}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-[10px] font-black uppercase leading-snug tracking-[0.12em]",
                          active ? t.accent : "text-slate-500"
                        )}
                      >
                        {milestone.focus}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Animated SVG Canvas ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative hidden min-w-0 overflow-hidden rounded-[8px] border border-white/70 bg-white shadow-2xl shadow-black/8 md:block"
          >
            {/* Subtle radial glow behind SVG */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${t.glow} 0%, transparent 75%)`,
              }}
            />

            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full h-auto relative z-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Gradient for the active path stroke */}
                <linearGradient
                  id={`pathGrad-${categoryKey}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor={t.gradFrom} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={t.gradTo} stopOpacity="0.8" />
                </linearGradient>

                {/* Drop shadow for mascot */}
                <filter id={`mascotShadow-${categoryKey}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor={t.stroke} floodOpacity="0.22" />
                </filter>

                {/* Glow filter for nodes */}
                <filter id={`nodeGlow-${categoryKey}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Track: dashed grey background path ── */}
              <path
                d={pathD}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="8 10"
              />

              {/* ── Track: animated coloured progress path ── */}
              <motion.path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke={`url(#pathGrad-${categoryKey})`}
                strokeWidth="5.5"
                strokeLinecap="round"
                style={{
                  pathLength: pathProgress,
                  strokeDasharray: pathLength || 1,
                  strokeDashoffset: dashOffset,
                }}
              />

              {/* ── Animated sparkle particles along path ── */}
              {[0.25, 0.5, 0.75].map((frac, pi) => {
                const pos = sampleBezier(nodes, Math.min(frac, activeIdx / (count - 1)));
                const show = frac <= (activeIdx / (count - 1));
                return (
                  <motion.g
                    key={`spark-${pi}`}
                    animate={show ? { opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] } : { opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.2, delay: pi * 0.6 }}
                    style={{ originX: pos.x, originY: pos.y }}
                  >
                    <circle cx={pos.x} cy={pos.y} r="4" fill={t.stroke} opacity="0.55" />
                  </motion.g>
                );
              })}

              {/* ── Milestone Nodes ── */}
              {nodes.map((node, i) => {
                const isActive = i === activeIdx;
                const isVisited = i < activeIdx;

                return (
                  <g
                    key={`node-${i}`}
                    className="cursor-pointer"
                    onClick={() => goToNode(i)}
                    style={{ filter: isActive ? `url(#nodeGlow-${categoryKey})` : "none" }}
                  >
                    {/* Pulsing ring for active node */}
                    {isActive && (
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r="28"
                        fill="none"
                        stroke={t.stroke}
                        strokeWidth="2"
                        animate={{ r: [24, 34, 24], opacity: [0.7, 0, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      />
                    )}

                    {/* Second softer pulse */}
                    {isActive && (
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        fill={t.stroke}
                        animate={{ opacity: [0.15, 0.05, 0.15] }}
                        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                      />
                    )}

                    {/* Main node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="20"
                      fill={isActive ? t.stroke : isVisited ? t.stroke : "white"}
                      stroke={isActive || isVisited ? t.stroke : "#d1d5db"}
                      strokeWidth="3"
                      opacity={isActive ? 1 : isVisited ? 0.7 : 1}
                      className="transition-all duration-500"
                    />

                    {/* Checkmark for visited */}
                    {isVisited && !isActive && (
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fill="white"
                        fontWeight="900"
                        className="select-none pointer-events-none"
                      >
                        ✓
                      </text>
                    )}

                    {/* Step number */}
                    {!isVisited && (
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="900"
                        fill={isActive ? "white" : "#94a3b8"}
                        className="select-none pointer-events-none"
                        fontFamily="system-ui, sans-serif"
                      >
                        {i + 1}
                      </text>
                    )}

                    {/* Label below each node */}
                    <foreignObject
                      x={node.x - 70}
                      y={node.y + 28}
                      width="140"
                      height="44"
                    >
                      <div
                        className={cn(
                          "text-center text-[10px] font-black uppercase tracking-wider leading-tight px-1",
                          isActive
                            ? t.accent
                            : isVisited
                              ? "text-slate-500"
                              : "text-slate-400"
                        )}
                      >
                        {milestones[i].title.length > 22
                          ? milestones[i].title.slice(0, 22) + "…"
                          : milestones[i].title}
                      </div>
                    </foreignObject>

                    {/* Invisible tap target */}
                    <circle cx={node.x} cy={node.y} r="32" fill="transparent" />
                  </g>
                );
              })}

              {/* ── Animated Mascot ── */}
              <motion.g
                style={{ x: mascotX, y: mascotY }}
                filter={`url(#mascotShadow-${categoryKey})`}
              >
                {/* Shadow ellipse on ground */}
                <motion.ellipse
                  cx={0}
                  cy={22}
                  rx={28}
                  ry={7}
                  fill={t.stroke}
                  opacity={0.18}
                  animate={{ scaleX: [1, 0.9, 1], opacity: [0.18, 0.1, 0.18] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                />

                {/* Mascot image via foreignObject — bob animation */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                >
                  <foreignObject x="-44" y="-100" width="88" height="108">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`mascot-img-${activeIdx}`}
                        initial={{ opacity: 0, scale: 0.7, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -6 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="w-full h-full flex items-end justify-center"
                      >
                        <img
                          src={getMascotSrc(activeIdx, count)}
                          alt="guide mascot"
                          className="h-[90px] w-auto object-contain drop-shadow-xl select-none"
                          draggable={false}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </foreignObject>

                  {/* Floating "Guide" chip above mascot */}
                  <foreignObject x="-34" y="-122" width="68" height="26">
                    <div
                      className="flex items-center justify-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md"
                      style={{ background: t.stroke }}
                    >
                      <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-.99L12 2z" />
                      </svg>
                      {activeIdx === count - 1 ? "Done!" : "Guide"}
                    </div>
                  </foreignObject>
                </motion.g>
              </motion.g>
            </svg>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

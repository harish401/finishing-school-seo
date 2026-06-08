"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimate,
  stagger,
} from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const shifts = [
  {
    id: "voice",
    number: "01",
    label: "Communication",
    title: "From hesitation\nto a confident voice.",
    quote: "Knowing the answer is only half of it. Being heard is the other half.",
    before: "Waits for someone else to speak first, even when they know the answer.",
    practice: "Short introductions, paired speaking, group discussion drills, daily feedback loops.",
    output: "Clearer, calmer expression in classrooms, interviews, and public settings.",
    image: "/imagesclor/chatgpt-image-1.png",
    accent: "#057bd2",
    accentLight: "#e8f6ff",
    accentDark: "#044d85",
    tag: "Confidence",
    photoBg: "linear-gradient(160deg,#f5efe6 0%,#ede4d6 55%,#e8dfd0 100%)",
    photoFloor: "#ddd4c6",
    photoAccentCircle: "rgba(5,123,210,0.14)",
    stat: { value: "3×", label: "faster speaker confidence" },
    keywords: ["clarity", "voice", "listening", "expression"],
  },
  {
    id: "routine",
    number: "02",
    label: "Discipline",
    title: "From scattered effort\nto focused routines.",
    quote: "Discipline is not about doing more. It is about doing the right things, repeatedly.",
    before: "Studies hard, but without a repeatable system or a real focus habit.",
    practice: "Time blocks, exam planning, attention rituals, weekly review sessions.",
    output: "Stronger study discipline, far less last-minute pressure and anxiety.",
    image: "/imagesclor/chatgpt-image-2.png",
    accent: "#008b7d",
    accentLight: "#e5fbf6",
    accentDark: "#005a50",
    tag: "Productivity",
    photoBg: "linear-gradient(160deg,#e8f6f0 0%,#d8f0e8 55%,#cde8df 100%)",
    photoFloor: "#b8ddd2",
    photoAccentCircle: "rgba(0,139,125,0.15)",
    stat: { value: "84%", label: "reduction in exam anxiety" },
    keywords: ["focus", "systems", "planning", "habits"],
  },
  {
    id: "presence",
    number: "03",
    label: "Presence",
    title: "From good marks\nto undeniable presence.",
    quote: "The room does not remember your grade. It remembers how you carried yourself.",
    before: "Has real potential, but first impressions do not yet reflect it.",
    practice: "Body language, grooming, etiquette, professional scenario rehearsals.",
    output: "A more confident, polished way of entering rooms and holding conversations.",
    image: "/imagesclor/chatgpt-image-3.png",
    accent: "#bd168e",
    accentLight: "#fff0fa",
    accentDark: "#7a0d5c",
    tag: "Executive Presence",
    photoBg: "linear-gradient(160deg,#f9f0ea 0%,#f2e6dc 55%,#ecddd2 100%)",
    photoFloor: "#e0d0c4",
    photoAccentCircle: "rgba(189,22,142,0.12)",
    stat: { value: "91%", label: "interview success rate" },
    keywords: ["posture", "polish", "etiquette", "impression"],
  },
  {
    id: "direction",
    number: "04",
    label: "Clarity",
    title: "From pressure\nto purposeful direction.",
    quote: "Choosing your future is easier when you have seen enough of it first.",
    before: "Feels pressure to commit to a path without enough real exposure to options.",
    practice: "Career maps, pathway comparisons, mentoring conversations, industry exposure.",
    output: "More informed, confident choices for study paths, placements, and career moves.",
    image: "/imagesclor/chatgpt-image-4.png",
    accent: "#c8420a",
    accentLight: "#fff1e5",
    accentDark: "#8a2d06",
    tag: "Career Direction",
    photoBg: "linear-gradient(160deg,#eaeaf0 0%,#dddde8 55%,#d4d4e0 100%)",
    photoFloor: "#c8c8d8",
    photoAccentCircle: "rgba(200,66,10,0.12)",
    stat: { value: "2.4×", label: "clearer career decisions" },
    keywords: ["purpose", "direction", "mentoring", "pathways"],
  },
];

/* ─────────────────────────────────────────────────────────────
   MAGNETIC TILT HOOK
───────────────────────────────────────────────────────────── */
function useMagneticTilt(strength = 6) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg = { stiffness: 150, damping: 22 };
  const springX = useSpring(rawX, cfg);
  const springY = useSpring(rawY, cfg);
  const rotateX = useTransform(springY, [-1, 1], [strength, -strength]);
  const rotateY = useTransform(springX, [-1, 1], [-strength, strength]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0); rawY.set(0);
  }, [rawX, rawY]);

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ─────────────────────────────────────────────────────────────
   COUNT-UP
───────────────────────────────────────────────────────────── */
function CountUp({ value, active }: { value: string; active: boolean }) {
  const [display, setDisplay] = useState("0");
  const numericMatch = value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : null;
  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = value.match(/[^\d.]+$/)?.[0] ?? "";

  useEffect(() => {
    if (!active) return;
    if (numeric === null) { setDisplay(value); return; }
    const dur = 900;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = numeric * eased;
      setDisplay(
        prefix +
        (Number.isInteger(numeric) ? Math.round(cur).toString() : cur.toFixed(1)) +
        suffix
      );
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, active, numeric, prefix, suffix]);

  return <>{display}</>;
}

/* ─────────────────────────────────────────────────────────────
   WAVEFORM
───────────────────────────────────────────────────────────── */
function Waveform({ accent, playing }: { accent: string; playing: boolean }) {
  const bars = [3, 7, 5, 10, 6, 9, 4, 8, 5, 7, 3, 6];
  return (
    <div className="flex items-center gap-[3px]" style={{ height: 22 }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 3, backgroundColor: accent, height: `${h * 2}px` }}
          animate={playing
            ? { scaleY: [1, h / 4, 1, h / 6, 1], opacity: [0.5, 1, 0.6, 0.9, 0.5] }
            : { scaleY: 0.25, opacity: 0.2 }}
          transition={{ duration: 1.3 + i * 0.06, repeat: Infinity, delay: i * 0.055, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PARTICLE BURST
───────────────────────────────────────────────────────────── */
function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function ParticleBurst({ accent, trigger }: { accent: string; trigger: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * 360;
          const seed = trigger * 37 + i * 19 + 1;
          const dist = 50 + seededUnit(seed) * 70;
          const rad = (angle * Math.PI) / 180;
          const size = 3 + seededUnit(seed + 101) * 4;
          const duration = 0.65 + seededUnit(seed + 211) * 0.35;
          return (
            <motion.div
              key={`${trigger}-${i}`}
              className="absolute rounded-full"
              style={{
                width: size, height: size,
                backgroundColor: accent,
                top: "50%", left: "50%",
                x: "-50%", y: "-50%",
              }}
              initial={{ opacity: 0.9, scale: 1, x: "-50%", y: "-50%" }}
              animate={{
                opacity: 0, scale: 0.2,
                x: `calc(-50% + ${Math.cos(rad) * dist}px)`,
                y: `calc(-50% + ${Math.sin(rad) * dist}px)`,
              }}
              transition={{ duration, ease: "easeOut" }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   KEYWORD TAGS
───────────────────────────────────────────────────────────── */
function KeywordTags({ keywords, accent, accentLight }: {
  keywords: string[];
  accent: string;
  accentLight: string;
}) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate("span",
      { opacity: [0, 1], y: [8, 0], scale: [0.85, 1] },
      { duration: 0.32, delay: stagger(0.06), ease: [0.22, 1, 0.36, 1] }
    );
  }, [keywords, animate]);

  return (
    <div ref={scope} className="flex flex-wrap gap-1.5 mt-4">
      {keywords.map((kw) => (
        <motion.span
          key={kw}
          className="rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.14em] border cursor-default"
          style={{ backgroundColor: accentLight, color: accent, borderColor: `${accent}30` }}
          whileHover={{ backgroundColor: accent, color: "#fff", scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          transition={{ duration: 0.16 }}
        >
          {kw}
        </motion.span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STAT BADGE
───────────────────────────────────────────────────────────── */
function StatBadge({ stat, accent, show }: {
  stat: { value: string; label: string };
  accent: string;
  show: boolean;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.8, rotate: -4 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: -14, scale: 0.85, rotate: 3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="absolute right-3 bottom-20 z-30 rounded-xl sm:rounded-2xl bg-white/96 backdrop-blur-md px-3 py-2.5 sm:px-5 sm:py-4 min-w-[110px] sm:min-w-[140px] border border-white/70"
          style={{ boxShadow: `0 12px 40px ${accent}30` }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <p className="text-xl sm:text-[2rem] font-black leading-none tabular-nums" style={{ color: accent }}>
            <CountUp value={stat.value} active={show} />
          </p>
          <p className="text-[9px] sm:text-[10px] text-[#7a6a7a] font-semibold mt-0.5 leading-tight max-w-[100px]">
            {stat.label}
          </p>
          <div className="absolute -top-1.5 -right-1.5">
            <span className="relative flex h-3.5 w-3.5 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: accent }} />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white" style={{ backgroundColor: accent }} />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   ANIMATED TITLE (line reveal)
───────────────────────────────────────────────────────────── */
function AnimatedTitle({ title, accent }: { title: string; accent: string }) {
  const lines = title.split("\n");
  return (
    <div className="mt-3 font-heading font-black leading-[1.08] tracking-tight text-[#1a0a1a]"
      style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}>
      {lines.map((line, li) => (
        <div key={`${line}-${li}`} className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.52, delay: li * 0.1 + 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            {li === 1
              ? <span style={{ color: accent }}>{line}</span>
              : line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ORBIT RINGS SVG
───────────────────────────────────────────────────────────── */
function OrbitRings({ accent }: { accent: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 580" preserveAspectRatio="xMidYMid slice">
      {[{ r: 160, spd: 26, dash: "6 10", op: 0.32, dir: 1 },
      { r: 220, spd: 40, dash: "3 16", op: 0.18, dir: -1 },
      { r: 285, spd: 58, dash: "2 20", op: 0.10, dir: 1 }
      ].map(({ r, spd, dash, op, dir }, i) => (
        <motion.circle key={i} cx="240" cy="310" r={r}
          fill="none" stroke={accent} strokeWidth={0.9 - i * 0.25}
          strokeDasharray={dash} opacity={op}
          animate={{ rotate: [0, 360 * dir] }}
          transition={{ duration: spd, repeat: Infinity, ease: "linear" }}
          style={{ originX: "240px", originY: "310px" }}
        />
      ))}
      {[[22, 22], [458, 22], [22, 558], [458, 558]].map(([cx, cy], i) => (
        <motion.circle key={`d${i}`} cx={cx} cy={cy} r={3.5} fill={accent}
          animate={{ opacity: [0.1, 0.45, 0.1], r: [3.5, 5, 3.5] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   BPO GRID
───────────────────────────────────────────────────────────── */
function BPOGrid({ active }: { active: typeof shifts[0] }) {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(".bpo-cell",
      { opacity: [0, 1], y: [14, 0], scale: [0.96, 1] },
      { duration: 0.38, delay: stagger(0.08), ease: [0.22, 1, 0.36, 1] }
    );
  }, [active.id, animate]);

  const cells = [
    { label: "Before", num: "01", value: active.before, dimmed: true, highlight: false },
    { label: "Practice", num: "02", value: active.practice, dimmed: false, highlight: true },
    { label: "Output", num: "03", value: active.output, dimmed: false, highlight: false },
  ];

  return (
    <div ref={scope} className="mt-4 sm:mt-6 grid grid-cols-3 rounded-xl sm:rounded-[14px] border border-[#ede5ed] overflow-hidden divide-x divide-[#f0e8f0]">
      {cells.map(({ label, num, value, dimmed, highlight }) => (
        <motion.div
          key={label}
          className="bpo-cell px-2.5 py-3 sm:px-4 sm:py-5 relative overflow-hidden cursor-default"
          style={{ backgroundColor: highlight ? active.accentLight : "#fff" }}
          whileHover={{ backgroundColor: highlight ? active.accentLight : "#f7f2f7", y: -1 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: "100%", opacity: 0.06 }}
            transition={{ duration: 0.5 }}
            style={{ background: `linear-gradient(90deg,transparent,${active.accent},transparent)` }}
          />
          {highlight && (
            <motion.div
              className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: active.accent }}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.16em] mb-1.5"
            style={{ color: highlight ? active.accent : "#9a7e9a" }}>
            {num} {label}
          </p>
          <p className={cn("text-[10px] sm:text-[12px] font-semibold leading-snug", dimmed ? "text-[#9a7e9a]" : "text-[#1a0a1a]")}>
            {value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VERTICAL TIMELINE (desktop only)
───────────────────────────────────────────────────────────── */
function VerticalTimeline({ activeIndex, onChange }: {
  activeIndex: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="hidden xl:flex flex-col items-center absolute -left-10 top-1/2 -translate-y-1/2 gap-0 z-20">
      {shifts.map((s, i) => (
        <button key={s.id} onClick={() => onChange(i)} className="group relative flex flex-col items-center">
          {i > 0 && (
            <motion.div className="w-px" style={{ height: 48 }}
              animate={{ backgroundColor: i <= activeIndex ? s.accent : "#e0d5e0" }}
              transition={{ duration: 0.4 }}
            />
          )}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="h-3 w-3 rounded-full border-2 border-white z-10"
              animate={{
                backgroundColor: i === activeIndex ? s.accent : i < activeIndex ? s.accentDark : "#d5c8d5",
                scale: i === activeIndex ? 1.45 : 1,
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 18 }}
            />
            {i === activeIndex && (
              <>
                <motion.div className="absolute rounded-full"
                  animate={{ scale: [1, 2.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 12, height: 12, backgroundColor: s.accent }}
                />
                <motion.div className="absolute rounded-full"
                  animate={{ scale: [1, 3.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                  style={{ width: 12, height: 12, backgroundColor: s.accent }}
                />
              </>
            )}
          </div>
          {/* Tooltip */}
          <div className="absolute right-7 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-xl whitespace-nowrap"
              style={{ backgroundColor: s.accent }}>
              {s.label}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export function WhyFinishingSchool() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [showBadge, setShowBadge] = useState(true);
  const tilt = useMagneticTilt(5);
  const active = shifts[activeIndex];

  const advance = useCallback(() => {
    setActiveIndex((p) => (p + 1) % shifts.length);
    setBurstKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!isPlaying || hovered) return;
    const t = setInterval(advance, 5500);
    return () => clearInterval(t);
  }, [isPlaying, hovered, advance]);

  const handleChange = useCallback((i: number) => {
    setShowBadge(false);
    setTimeout(() => {
      setActiveIndex(i);
      setBurstKey((k) => k + 1);
      setIsPlaying(false);
      setShowBadge(true);
    }, 80);
  }, []);

  useEffect(() => {
    setShowBadge(false);
    const t = setTimeout(() => setShowBadge(true), 120);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <section className="relative flex flex-col bg-[#faf8f6] overflow-hidden"
      style={{ minHeight: "100dvh" }}>

      {/* ── Animated radial sweep background ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ background: `radial-gradient(ellipse 70% 60% at 80% 50%, ${active.accentLight}, transparent 75%)` }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* ── Floating orbs ── */}
      {[
        { cx: "10%", cy: "15%", size: 280, delay: 0 },
        { cx: "88%", cy: "78%", size: 220, delay: 2.5 },
        { cx: "55%", cy: "5%", size: 180, delay: 5 },
      ].map((orb, i) => (
        <motion.div key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: orb.size, height: orb.size,
            left: orb.cx, top: orb.cy,
            x: "-50%", y: "-50%",
            background: `radial-gradient(circle, ${active.accent}12 0%, transparent 70%)`,
          }}
          animate={{ x: ["-50%", "-44%", "-50%"], y: ["-50%", "-56%", "-50%"] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
        />
      ))}

      {/* ── Top accent stripe ── */}
      <motion.div className="absolute inset-x-0 top-0 h-[3px] z-10"
        animate={{ backgroundColor: active.accent }}
        transition={{ duration: 0.6 }}
      />

      {/* ── CONTENT WRAPPER — fills screen ── */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-6 sm:py-8 lg:py-10">

        {/* ── HEADER ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-4 sm:mb-6 lg:mb-8 shrink-0">
          <div className="max-w-2xl">
            <motion.p
              className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em]"
              animate={{ color: active.accent }}
              transition={{ duration: 0.4 }}
            >
              Why Finishing School?
            </motion.p>

            <h2 className="mt-2 font-heading font-black leading-tight tracking-tight text-[#1a0a1a]"
              style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)" }}>
              Real skills only stick when learners{" "}
              <motion.em className="not-italic relative inline-block"
                animate={{ color: active.accent }}
                transition={{ duration: 0.4 }}
              >
                rehearse
                <svg className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
                  viewBox="0 0 100 8" preserveAspectRatio="none" height="7">
                  <motion.path
                    d="M0 5 Q25 1 50 5 Q75 9 100 5"
                    fill="none" strokeWidth="2.5" strokeLinecap="round"
                    animate={{ stroke: active.accent }}
                    transition={{ duration: 0.4 }}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                  />
                </svg>
              </motion.em>{" "}
              them.
            </h2>
          </div>

          {/* Desktop tab pills */}
          <div className="hidden lg:flex flex-wrap gap-1.5 justify-end max-w-xs shrink-0">
            {shifts.map((s, i) => (
              <motion.button key={s.id}
                onClick={() => handleChange(i)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 340, damping: 20 }}
                className={cn(
                  "relative rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest overflow-hidden",
                  i === activeIndex ? "border-transparent text-white" : "border-[#e8dde8] bg-white text-[#7a6a7a] hover:border-[#c0a8c0]"
                )}
                style={i === activeIndex ? { backgroundColor: s.accent, boxShadow: `0 4px 18px ${s.accent}45` } : {}}
              >
                {i === activeIndex && (
                  <motion.span className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: s.accent }}
                    animate={{ scale: [1, 1.7], opacity: [0.35, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── MAIN PANEL — grows to fill remaining space ── */}
        <div className="relative flex-1 min-h-0 xl:pl-12">

          {/* Vertical timeline */}
          <VerticalTimeline activeIndex={activeIndex} onChange={handleChange} />

          {/* 3D tilt card */}
          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            onMouseEnter={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformPerspective: 1100,
              transformStyle: "preserve-3d",
              height: "100%",
            }}
            className="relative overflow-hidden rounded-2xl sm:rounded-[24px] border border-[#ede5ed] bg-white shadow-2xl shadow-black/10"
          >
            <ParticleBurst accent={active.accent} trigger={burstKey} />

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col lg:grid lg:grid-cols-[1fr_38%] xl:grid-cols-[1fr_40%] h-full"
              >
                {/* ── LEFT: Content ── */}
                <div className="relative flex flex-col justify-between p-5 sm:p-7 lg:p-8 xl:p-10 overflow-hidden">

                  {/* Watermark */}
                  <motion.span
                    className="pointer-events-none absolute -top-4 -left-2 font-heading font-black leading-none select-none"
                    style={{ fontSize: "clamp(6rem,14vw,13rem)", color: active.accent, opacity: 0.04 }}
                    animate={{ opacity: [0.03, 0.07, 0.03] }}
                    transition={{ duration: 4.5, repeat: Infinity }}
                  >
                    {active.number}
                  </motion.span>

                  {/* Top: label + title + quote + keywords */}
                  <div className="relative z-10">
                    <motion.div className="flex items-center gap-2.5 mb-3"
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 }}
                    >
                      <Waveform accent={active.accent} playing={isPlaying && !hovered} />
                      <motion.span
                        className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em]"
                        animate={{ color: active.accent }}
                      >
                        {active.label}
                      </motion.span>
                    </motion.div>

                    <AnimatedTitle title={active.title} accent={active.accent} />

                    <motion.blockquote
                      className="mt-3 sm:mt-4 pl-4 text-xs sm:text-sm font-semibold italic leading-relaxed text-[#5a4a5a] border-l-[3px]"
                      style={{ borderColor: active.accent }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {active.quote}
                    </motion.blockquote>

                    <KeywordTags keywords={active.keywords} accent={active.accent} accentLight={active.accentLight} />
                  </div>

                  {/* Middle: BPO grid */}
                  <BPOGrid active={active} />

                  {/* Bottom: controls */}
                  <div className="relative z-10 mt-4 sm:mt-5 flex items-center justify-between flex-wrap gap-2">
                    {/* Progress pills */}
                    <div className="flex items-center gap-2">
                      {shifts.map((s, i) => (
                        <button key={s.id}
                          onClick={() => handleChange(i)}
                          className="relative h-[3px] rounded-full overflow-hidden bg-[#e8dde8] transition-all duration-300"
                          style={{ width: i === activeIndex ? 36 : 10 }}
                        >
                          {i === activeIndex && (
                            <motion.div
                              className="absolute inset-y-0 left-0 rounded-full"
                              style={{ backgroundColor: active.accent }}
                              initial={{ width: "0%" }}
                              animate={{ width: "100%" }}
                              key={`fill-${activeIndex}`}
                              transition={{ duration: isPlaying && !hovered ? 5.5 : 0, ease: "linear" }}
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <motion.button
                        whileHover={{ scale: 1.12, x: -2 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handleChange((activeIndex - 1 + shifts.length) % shifts.length)}
                        className="h-8 w-8 rounded-full border border-[#e8dde8] bg-white flex items-center justify-center text-[#7a6a7a] text-sm font-black hover:shadow-md transition-shadow"
                      >‹</motion.button>
                      <motion.button
                        whileHover={{ scale: 1.12, x: 2 }} whileTap={{ scale: 0.9 }}
                        onClick={() => handleChange((activeIndex + 1) % shifts.length)}
                        className="h-8 w-8 rounded-full border border-[#e8dde8] bg-white flex items-center justify-center text-[#7a6a7a] text-sm font-black hover:shadow-md transition-shadow"
                      >›</motion.button>
                      <motion.button
                        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}
                        onClick={() => setIsPlaying((p) => !p)}
                        className="h-8 px-3 rounded-full border border-[#e8dde8] bg-white text-[9px] font-black uppercase tracking-widest text-[#9a7e9a] hover:shadow-md transition-shadow"
                      >
                        {isPlaying ? "⏸" : "▶"}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Photo panel ── */}
                <div
                  className="relative flex items-end justify-center overflow-hidden"
                  style={{
                    background: active.photoBg,
                    minHeight: "clamp(220px, 35vw, 100%)",
                  }}
                >
                  {/* Floor vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-32 z-10 pointer-events-none"
                    style={{ background: `linear-gradient(to top, ${active.photoFloor}cc 0%, transparent 100%)` }}
                  />

                  {/* Radial glow */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    animate={{
                      background: `radial-gradient(circle, ${active.photoAccentCircle} 0%, transparent 70%)`,
                      scale: [1, 1.08, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "120%", height: "120%" }}
                  />

                  <OrbitRings accent={active.accent} />
                  <StatBadge stat={active.stat} accent={active.accent} show={showBadge} />

                  {/* Tag chip */}
                  <motion.div
                    className="absolute left-3 top-3 sm:left-5 sm:top-5 z-30 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.18em] text-white shadow-lg"
                    style={{ backgroundColor: active.accent }}
                    initial={{ opacity: 0, y: -10, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.16, type: "spring", stiffness: 280, damping: 18 }}
                    whileHover={{ scale: 1.08 }}
                  >
                    {active.tag}
                  </motion.div>

                  {/* Number watermark */}
                  <motion.span
                    className="pointer-events-none absolute bottom-3 left-4 z-10 font-heading font-black leading-none select-none"
                    style={{ fontSize: "clamp(3.5rem,8vw,6rem)", color: active.accent, opacity: 0.07 }}
                    animate={{ opacity: [0.05, 0.12, 0.05] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    {active.number}
                  </motion.span>

                  {/* Photo */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`photo-${active.id}`}
                      className="absolute inset-0 z-20"
                      initial={{ opacity: 0, scale: 1.06, x: 28, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.96, x: -22, filter: "blur(4px)" }}
                      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={active.image}
                        alt={active.tag}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1280px) 40vw, 500px"
                        className="object-cover object-top"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom progress bar */}
            <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#f0e8f0] z-40">
              <motion.div
                className="h-full rounded-full"
                animate={{ width: `${((activeIndex + 1) / shifts.length) * 100}%`, backgroundColor: active.accent }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>

        {/* ── MOBILE TABS ── */}
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 lg:hidden [&::-webkit-scrollbar]:hidden shrink-0">
          {shifts.map((s, i) => (
            <motion.button key={s.id}
              onClick={() => handleChange(i)}
              whileTap={{ scale: 0.93 }}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300",
                i === activeIndex ? "border-transparent text-white" : "border-[#e8dde8] bg-white text-[#7a6a7a]"
              )}
              style={i === activeIndex ? { backgroundColor: s.accent, boxShadow: `0 3px 12px ${s.accent}40` } : {}}
            >
              {s.label}
            </motion.button>
          ))}
        </div>

        {/* ── Footer footnote ── */}
        <motion.p
          className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a7e9a] shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Four pillars · One transformation · Every student
        </motion.p>

      </div>
    </section>
  );
}

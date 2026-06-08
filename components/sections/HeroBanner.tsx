"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  GraduationCap,
  MessageCircle,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { PencilMascot } from "@/components/brand/PencilMascot";
import {
  finishingProgramList,
  type ProgramCategoryKey,
  type ProgramTheme,
} from "@/lib/finishing-school-programs";
import { cn } from "@/lib/utils";

const theme: Record<
  ProgramTheme,
  {
    accent: string;
    accentText: string;
    border: string;
    gradient: string;
    panel: string;
    wipe: string;
  }
> = {
  red: {
    accent: "bg-[#e21b2f]",
    accentText: "text-[#e21b2f]",
    border: "border-[#ff7561]",
    gradient: "from-[#c90d1f] via-[#0b6fa6] to-[#9f257d]",
    panel: "bg-[#c90d1f]",
    wipe: "bg-[#e21b2f]",
  },
  teal: {
    accent: "bg-[#008b7d]",
    accentText: "text-[#008b7d]",
    border: "border-[#41d7c7]",
    gradient: "from-[#006f66] via-[#0b6fa6] to-[#9f257d]",
    panel: "bg-[#008b7d]",
    wipe: "bg-[#008b7d]",
  },
  blue: {
    accent: "bg-[#057bd2]",
    accentText: "text-[#057bd2]",
    border: "border-[#55bfff]",
    gradient: "from-[#0b5f99] via-[#057bd2] to-[#1d438a]",
    panel: "bg-[#057bd2]",
    wipe: "bg-[#057bd2]",
  },
  magenta: {
    accent: "bg-[#bd168e]",
    accentText: "text-[#bd168e]",
    border: "border-[#ff77d5]",
    gradient: "from-[#8f1c72] via-[#bd168e] to-[#e66d2e]",
    panel: "bg-[#bd168e]",
    wipe: "bg-[#bd168e]",
  },
};

const categoryIcons: Record<ProgramCategoryKey, LucideIcon> = {
  schools: BookOpenCheck,
  colleges: GraduationCap,
  healthcare: Stethoscope,
  "professional-development": BriefcaseBusiness,
};

const guideVisuals: Record<
  ProgramCategoryKey,
  {
    image: string;
    label: string;
  }
> = {
  schools: {
    image: "/imagesclor/image copy 2.png",
    label: "Confidence starts in the classroom",
  },
  colleges: {
    image: "/imagesclor/image copy 11.png",
    label: "Money habits and campus readiness",
  },
  healthcare: {
    image: "/imagesclor/image copy 12.png",
    label: "Healthcare pathways made clearer",
  },
  "professional-development": {
    image: "/imagesclor/image.png",
    label: "Resume, presence, and career growth",
  },
};

const proofPoints = [
  ["4", "pathways"],
  ["20", "modules"],
  ["13-22", "core age"],
];

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeProgram = finishingProgramList[activeIndex];
  const activeTheme = theme[activeProgram.theme];
  const ActiveIcon = categoryIcons[activeProgram.key];
  const activeGuide = guideVisuals[activeProgram.key];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % finishingProgramList.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0b5f99] pt-24 text-white sm:pt-28 lg:pt-32">
      {/* Full Screen Wipe Backgrounds */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProgram.theme}
          className={cn(
            "absolute inset-0 -z-20 bg-gradient-to-br",
            activeTheme.gradient
          )}
          initial={{ clipPath: "circle(0% at 10% 90%)", opacity: 0.8 }}
          animate={{ clipPath: "circle(150% at 10% 90%)", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        />
      </AnimatePresence>

      <motion.div
        className="absolute inset-y-0 right-0 -z-10 w-[62%] bg-[#9f257d]/78 mix-blend-multiply"
        style={{ clipPath: "polygon(26% 0, 100% 0, 100% 100%, 0 100%)" }}
        animate={{ x: shouldReduceMotion ? 0 : [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-[#008b7d] mix-blend-overlay"
        style={{ clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 100%)" }}
        animate={{ y: shouldReduceMotion ? 0 : [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Geometry */}
      <div className="absolute inset-0 -z-10 opacity-[0.16] pointer-events-none">
        <motion.div
          className="absolute left-[4%] top-16 h-80 w-96 bg-white"
          style={{ clipPath: "polygon(0 20%, 64% 0, 100% 62%, 30% 100%)" }}
          animate={{ rotate: shouldReduceMotion ? 0 : [-2, 2, -2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[15%] top-28 h-96 w-[34rem] bg-white"
          style={{ clipPath: "polygon(20% 0, 100% 16%, 80% 100%, 0 78%)" }}
          animate={{ rotate: shouldReduceMotion ? 0 : [3, -2, 3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-main relative z-10 flex min-h-[calc(100svh-6rem)] items-center py-8 sm:py-10">
        <div className="grid w-full gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-white/14 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white ring-1 ring-white/24 backdrop-blur shadow-lg shadow-black/10">
              {/* <Sparkles className="h-4 w-4 text-[#ffcf72]" /> */}
              Sharpening Skills
            </span>

            <h1 className="mt-5 max-w-4xl font-heading text-4xl font-black leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Finishing school that feels alive, practical, and memorable.
            </h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeProgram.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-white/84 sm:text-lg"
              >
                {activeProgram.description}
              </motion.p>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={activeProgram.href}
                className="inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-extrabold text-[#1b1230] shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ffefe8]"
              >
                Explore {activeProgram.shortTitle}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-[8px] border border-white/45 bg-white/8 px-5 py-3 text-sm font-extrabold text-white backdrop-blur shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14"
              >
                <MessageCircle className="h-4 w-4" />
                Talk to a Mentor
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {proofPoints.map(([value, label]) => (
                <div key={label} className="border-l border-white/25 pl-4">
                  <p className="font-heading text-2xl font-black text-white sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-white/68">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="relative min-h-[560px] lg:min-h-[640px]"
          >
            <motion.div
              className="absolute left-2 right-2 top-0 rounded-[8px] border border-white/22 bg-white/12 p-3 shadow-2xl backdrop-blur"
              animate={{
                y: shouldReduceMotion ? 0 : [0, -8, 0],
              }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative aspect-[25/8] overflow-hidden rounded-[8px] bg-[#092f59]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProgram.heroImage}
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeProgram.heroImage}
                      alt={activeProgram.heroAlt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover opacity-60 mix-blend-screen"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Dynamic Interactive Overlays */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGuide.image}
                initial={{ opacity: 0, x: 46, rotate: 4, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, x: -28, rotate: -3, scale: 0.96 }}
                transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-28 w-[42%] overflow-hidden rounded-[8px] border border-white/24 bg-white shadow-2xl sm:w-[34%] lg:top-32 group"
              >
                <Image
                  src={activeGuide.image}
                  alt=""
                  width={562}
                  height={888}
                  sizes="(max-width: 768px) 42vw, 18vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProgram.key + "mascot"}
                initial={{ opacity: 0, x: -30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -10, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-[2%] top-[25%] z-20 w-28 sm:left-[8%] sm:w-36 lg:w-44"
              >
                <PencilMascot className="w-full drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)]" />
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="absolute bottom-28 left-0 right-6 rounded-[8px] border border-white/22 bg-white p-5 text-[#251324] shadow-2xl sm:right-24 lg:bottom-32"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProgram.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] text-white shadow-lg",
                        activeTheme.accent
                      )}
                    >
                      <ActiveIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p
                        className={cn(
                          "text-xs font-black uppercase tracking-[0.16em]",
                          activeTheme.accentText
                        )}
                      >
                        {activeProgram.eyebrow}
                      </p>
                      <h2 className="mt-2 font-heading text-2xl font-black leading-tight text-[#251324] sm:text-3xl">
                        {activeProgram.title}
                      </h2>
                      <p className="mt-2 text-sm font-bold leading-relaxed text-[#6b5a6b]">
                        {activeGuide.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-2 z-30">
              {finishingProgramList.map((program, index) => {
                const Icon = categoryIcons[program.key];
                const itemTheme = theme[program.theme];
                const active = activeIndex === index;

                return (
                  <button
                    key={program.key}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "group min-h-[76px] rounded-[8px] border p-2 text-left transition-all duration-300 hover:-translate-y-0.5 sm:p-3 relative overflow-hidden",
                      active
                        ? cn("bg-white text-[#1b1230] shadow-2xl", itemTheme.border)
                        : "border-white/18 bg-[#092f59]/58 text-white backdrop-blur hover:bg-white/14"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 relative z-10",
                        active ? itemTheme.accentText : "text-white/72"
                      )}
                    />
                    <span className="mt-2 block text-xs font-black leading-tight relative z-10">
                      {program.shortTitle}
                    </span>
                    <span className="mt-2 block h-1 overflow-hidden rounded-full bg-current/14 relative z-10">
                      {active && (
                        <motion.span
                          className={cn("block h-full rounded-full", itemTheme.panel)}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6, ease: "linear" }}
                        />
                      )}
                    </span>
                    {active && (
                      <motion.div
                        className={cn("absolute inset-0 opacity-10", itemTheme.accent)}
                        layoutId="activeTabGlow"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

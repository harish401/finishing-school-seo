"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PencilLine } from "lucide-react";
import { PencilMascot } from "@/components/brand/PencilMascot";
import { cn } from "@/lib/utils";
import {
  finishingProgramList,
  type ProgramCategoryKey,
  type ProgramTheme,
} from "@/lib/finishing-school-programs";

const theme: Record<
  ProgramTheme,
  {
    accent: string;
    accentText: string;
    wash: string;
    border: string;
  }
> = {
  red: {
    accent: "bg-[#e21b2f]",
    accentText: "text-[#e21b2f]",
    wash: "bg-[#fff1e5]",
    border: "border-[#ffb7a8]",
  },
  teal: {
    accent: "bg-[#008b7d]",
    accentText: "text-[#008b7d]",
    wash: "bg-[#e5fbf6]",
    border: "border-[#9be7dc]",
  },
  blue: {
    accent: "bg-[#057bd2]",
    accentText: "text-[#057bd2]",
    wash: "bg-[#e8f6ff]",
    border: "border-[#9bd7ff]",
  },
  magenta: {
    accent: "bg-[#bd168e]",
    accentText: "text-[#bd168e]",
    wash: "bg-[#fff0fa]",
    border: "border-[#f0addd]",
  },
};

export function ProgramShowcase() {
  const [activeKey, setActiveKey] = useState<ProgramCategoryKey>("schools");
  const active =
    finishingProgramList.find((program) => program.key === activeKey) ??
    finishingProgramList[0];
  const activeTheme = theme[active.theme];

  return (
    <section className="bg-[#f3fbff] py-16 sm:py-20 lg:py-24">
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-[#0b5f99] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
              <PencilLine className="h-4 w-4 text-[#ffcf72]" />
              Programs
            </span>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-black leading-tight tracking-tight text-[#251324] sm:text-4xl lg:text-5xl">
              Four pathways, each drawn for a different learner.
            </h2>
            <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-[#6c5a6c]">
              Move through the tracks to see how the same finishing-school
              method changes for school curiosity, campus transition,
              healthcare planning, and professional polish.
            </p>

            <div className="mt-7 grid gap-2">
              {finishingProgramList.map((program, index) => {
                const itemTheme = theme[program.theme];
                const isActive = program.key === activeKey;

                return (
                  <button
                    key={program.key}
                    onClick={() => setActiveKey(program.key)}
                    className={cn(
                      "group grid grid-cols-[2.75rem_1fr_auto] items-center gap-3 rounded-[8px] border p-3 text-left transition-all duration-300 hover:-translate-y-0.5",
                      isActive
                        ? cn(itemTheme.border, itemTheme.wash)
                        : "border-[#d9e8f2] bg-white hover:border-[#b9d8e8]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-[8px] text-sm font-black text-white",
                        itemTheme.accent
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-sm font-black text-[#251324]">
                        {program.navLabel}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-[10px] font-black uppercase tracking-[0.13em]",
                          isActive ? itemTheme.accentText : "text-[#8a788a]"
                        )}
                      >
                        {program.programs.length} modules
                      </span>
                    </span>
                    <span
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-125",
                        itemTheme.accent
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <PencilMascot className="absolute -right-3 -top-12 z-20 hidden w-28 lg:block" compact />
            <div
              className={cn(
                "overflow-hidden rounded-[8px] border bg-white shadow-xl",
                activeTheme.border
              )}
            >
              <div className="relative bg-[#092f59] p-3">
                <div className="relative aspect-[25/8] overflow-hidden rounded-[8px] bg-[#092f59]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.key}
                      initial={{ opacity: 0, x: 26, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -18, scale: 0.98 }}
                      transition={{ duration: 0.42, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={active.heroImage}
                        alt={active.heroAlt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-6 sm:p-8"
                >
                  <p
                    className={cn(
                      "text-xs font-black uppercase tracking-[0.16em]",
                      activeTheme.accentText
                    )}
                  >
                    {active.eyebrow}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-black leading-tight text-[#251324] sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-4 text-sm font-medium leading-relaxed text-[#604f60] sm:text-base">
                    {active.description}
                  </p>

                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {active.programs.slice(0, 4).map((program) => (
                      <div
                        key={program.title}
                        className="flex items-start gap-3 rounded-[8px] border border-[#eadbea] bg-[#fffaf5] p-3"
                      >
                        <CheckCircle2
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            activeTheme.accentText
                          )}
                        />
                        <div>
                          <p className="text-sm font-black text-[#251324]">
                            {program.title}
                          </p>
                          <p className="mt-1 text-xs font-medium leading-relaxed text-[#725f72]">
                            {program.focus}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={active.href}
                    className={cn(
                      "mt-7 inline-flex min-h-12 items-center gap-2 rounded-[8px] px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5",
                      activeTheme.accent
                    )}
                  >
                    Open pathway
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

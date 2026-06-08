"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Compass,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  MessageCircle,
  Network,
  Presentation,
  Rocket,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { PencilMascot } from "@/components/brand/PencilMascot";
import { ProgramAboutSection } from "@/components/sections/ProgramAboutSection";
import { cn } from "@/lib/utils";
import {
  getFinishingProgramCategory,
  type ProgramCategoryKey,
  type ProgramTheme,
} from "@/lib/finishing-school-programs";

const theme: Record<
  ProgramTheme,
  {
    page: string;
    accent: string;
    accentHover: string;
    accentText: string;
    wash: string;
    border: string;
    heroBand: string;
    deep: string;
    poster: string;
  }
> = {
  red: {
    page: "bg-[#fff8ee]",
    accent: "bg-[#e21b2f]",
    accentHover: "hover:bg-[#b91525]",
    accentText: "text-[#e21b2f]",
    wash: "bg-[#fff1e5]",
    border: "border-[#ffb7a8]",
    heroBand: "from-[#c90d1f] via-[#e21b2f] to-[#9f257d]",
    deep: "bg-[#250f25]",
    poster: "bg-[#c90d1f]",
  },
  teal: {
    page: "bg-[#effffb]",
    accent: "bg-[#008b7d]",
    accentHover: "hover:bg-[#006f66]",
    accentText: "text-[#008b7d]",
    wash: "bg-[#e5fbf6]",
    border: "border-[#9be7dc]",
    heroBand: "from-[#006f66] via-[#008b7d] to-[#0b6fa6]",
    deep: "bg-[#092f59]",
    poster: "bg-[#008b7d]",
  },
  blue: {
    page: "bg-[#f0f9ff]",
    accent: "bg-[#057bd2]",
    accentHover: "hover:bg-[#0568b1]",
    accentText: "text-[#057bd2]",
    wash: "bg-[#e8f6ff]",
    border: "border-[#9bd7ff]",
    heroBand: "from-[#0b5f99] via-[#057bd2] to-[#1d438a]",
    deep: "bg-[#092f59]",
    poster: "bg-[#057bd2]",
  },
  magenta: {
    page: "bg-[#fff4fb]",
    accent: "bg-[#bd168e]",
    accentHover: "hover:bg-[#981173]",
    accentText: "text-[#bd168e]",
    wash: "bg-[#fff0fa]",
    border: "border-[#f0addd]",
    heroBand: "from-[#8f1c72] via-[#bd168e] to-[#e66d2e]",
    deep: "bg-[#250f25]",
    poster: "bg-[#bd168e]",
  },
};

const programIcons: Record<ProgramCategoryKey, LucideIcon[]> = {
  schools: [Rocket, Compass, Clock, MessageCircle],
  colleges: [BriefcaseBusiness, WalletCards, FileText, Users],
  healthcare: [Stethoscope, Globe2, ClipboardCheck, BadgeCheck, Compass],
  "professional-development": [
    Presentation,
    MessageCircle,
    Sparkles,
    Trophy,
    Network,
  ],
};

const categoryIcons: Record<ProgramCategoryKey, LucideIcon> = {
  schools: BookOpenCheck,
  colleges: GraduationCap,
  healthcare: Stethoscope,
  "professional-development": BriefcaseBusiness,
};

const methodSteps = ["Discover", "Rehearse", "Apply"];

interface ProgramLandingProps {
  categoryKey: ProgramCategoryKey;
  hideHero?: boolean;
}

export function ProgramLanding({ categoryKey, hideHero = false }: ProgramLandingProps) {
  const category = getFinishingProgramCategory(categoryKey);
  const pageTheme = theme[category.theme];
  const CategoryIcon = categoryIcons[category.key];
  const [activeProgramIndex, setActiveProgramIndex] = useState(0);
  const activeProgram = category.programs[activeProgramIndex];
  const ActiveProgramIcon =
    programIcons[category.key][activeProgramIndex] ?? Target;

  return (
    <div className={cn("overflow-hidden", pageTheme.page)}>
      {!hideHero ? (
      <section className="relative pt-20 sm:pt-24 lg:pt-32">
          <div className="container-main pb-10 sm:pb-14 lg:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, ease: "easeOut" }}
              className={cn(
                "relative isolate overflow-hidden rounded-[8px] bg-gradient-to-br p-4 text-white shadow-2xl sm:p-6 lg:p-10",
                pageTheme.heroBand
              )}
            >
              <div
                className="absolute inset-y-0 right-0 -z-10 hidden w-[56%] bg-[#9f257d]/42 sm:block"
                style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-[#008b7d]/70 sm:h-24"
                style={{ clipPath: "polygon(0 48%, 100% 0, 100% 100%, 0 100%)" }}
              />
              <div className="absolute -right-2 -top-16 z-20 hidden lg:block">
                <PencilMascot className="w-32 xl:w-40" compact />
              </div>

              <div className="grid gap-7 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
                <div className="min-w-0">
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-[8px] px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-white shadow-lg sm:text-xs sm:tracking-[0.16em]",
                      pageTheme.accent
                    )}
                  >
                    <CategoryIcon className="h-4 w-4" />
                    {category.eyebrow}
                  </span>

                  <h1 className="mt-5 max-w-4xl font-heading text-3xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    {category.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-sm font-semibold leading-relaxed text-white/86 sm:mt-5 sm:text-lg">
                    {category.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                    <Link
                      href="/contact"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-white px-5 py-3 text-sm font-extrabold text-[#251324] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fff1e5] sm:w-auto"
                    >
                      {category.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/courses"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] border border-white/45 bg-white/8 px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/14 sm:w-auto"
                    >
                      Browse Courses
                    </Link>
                  </div>

                  <div className="mt-7 grid gap-2 sm:mt-8 sm:grid-cols-2">
                    {category.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 border-t border-white/24 pt-3"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#ffcf72]" />
                        <p className="text-sm font-bold text-white/88">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-w-0">
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden rounded-[8px] border border-white/26 bg-[#092f59] shadow-2xl"
                  >
                    <div className="relative aspect-[4/3] min-h-[220px] bg-[#092f59] sm:aspect-[16/9] lg:aspect-[25/8] lg:min-h-0">
                      <Image
                        src={category.heroImage}
                        alt={category.heroAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </motion.div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {category.programs.slice(0, 3).map((program, index) => (
                      <button
                        key={program.title}
                        onClick={() => setActiveProgramIndex(index)}
                        className={cn(
                          "min-h-16 rounded-[8px] border px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 sm:min-h-20",
                          activeProgramIndex === index
                            ? "border-white bg-white text-[#251324]"
                            : "border-white/18 bg-white/10 text-white hover:bg-white/16"
                        )}
                      >
                        <span
                          className={cn(
                            "block text-[10px] font-black uppercase tracking-[0.14em]",
                            activeProgramIndex === index
                              ? pageTheme.accentText
                              : "text-white/62"
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block text-sm font-black leading-tight">
                          {program.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
      </section>
      ) : null}

      <ProgramAboutSection categoryKey={categoryKey} />

      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="container-main">
          <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <span
                className={cn(
                  "inline-flex rounded-[8px] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white",
                  pageTheme.accent
                )}
              >
                Program Menu
              </span>
              <h2 className="mt-4 font-heading text-2xl font-black leading-tight text-[#251324] sm:text-4xl">
                Choose the module that matches the learner.
              </h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-[#695969]">
                Built for {category.audience.toLowerCase()}, with a clear focus
                area and practical output for every module.
              </p>

              <div className="mt-7 hidden rounded-[8px] border border-[#d9e8f2] bg-[#f1fbff] p-4 lg:block">
                <div className="flex items-center gap-4">
                  <PencilMascot className="w-20" compact />
                  <p className="text-sm font-bold leading-relaxed text-[#265067]">
                    The pencil marks the training rhythm: try it, sharpen it,
                    show it.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeProgram.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={cn(
                    "grid gap-6 rounded-[8px] border bg-[#fffaf5] p-4 sm:p-6 lg:grid-cols-[0.76fr_1.24fr] lg:gap-8",
                    pageTheme.border
                  )}
                >
                  <div>
                    <div
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-[8px] text-white",
                        pageTheme.accent
                      )}
                    >
                      <ActiveProgramIcon className="h-6 w-6" />
                    </div>
                    <p
                      className={cn(
                        "mt-5 text-xs font-black uppercase tracking-[0.16em]",
                        pageTheme.accentText
                      )}
                    >
                      Active Module
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-black leading-tight text-[#251324] sm:text-3xl">
                      {activeProgram.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-base font-semibold leading-relaxed text-[#4f3f4f] sm:text-lg">
                      {activeProgram.description}
                    </p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                      {methodSteps.map((step, index) => (
                        <div
                          key={step}
                          className="rounded-[8px] border border-[#eadbea] bg-white p-4"
                        >
                          <span
                            className={cn(
                              "text-xs font-black uppercase tracking-[0.14em]",
                              pageTheme.accentText
                            )}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="mt-1 text-sm font-black text-[#251324]">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p
                      className={cn(
                        "mt-6 text-sm font-black uppercase tracking-[0.14em]",
                        pageTheme.accentText
                      )}
                    >
                      {activeProgram.focus}
                    </p>
                  </div>
                </motion.article>
              </AnimatePresence>

              <div className="grid gap-3 sm:grid-cols-2">
                {category.programs.map((program, index) => (
                  <button
                    key={program.title}
                    onClick={() => setActiveProgramIndex(index)}
                    className={cn(
                      "group rounded-[8px] border p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                      activeProgramIndex === index
                        ? cn(pageTheme.border, pageTheme.wash)
                        : "border-[#eadbea] bg-white hover:border-[#d8c1d8]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span>
                        <span className="block text-sm font-black text-[#251324]">
                          {program.title}
                        </span>
                        <span
                          className={cn(
                            "mt-2 block text-[10px] font-black uppercase tracking-[0.13em]",
                            activeProgramIndex === index
                              ? pageTheme.accentText
                              : "text-[#8a788a]"
                          )}
                        >
                          {program.focus}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-1 h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125",
                          pageTheme.accent
                        )}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#0b5f99] py-14 text-white sm:py-16 lg:py-20">
        <div
          className="absolute inset-y-0 right-0 -z-10 w-[56%] bg-[#9f257d]/64"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-[#008b7d]"
          style={{ clipPath: "polygon(0 45%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <div className="container-main">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <span
                className={cn(
                  "inline-flex rounded-[8px] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white",
                  pageTheme.accent
                )}
              >
                Outcomes
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black leading-tight text-white sm:text-4xl">
                What learners walk away with.
              </h2>
            </div>

            <div className="grid gap-3 lg:col-span-8">
              {category.outcomes.map((outcome, index) => (
                <motion.div
                  key={outcome}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="grid gap-3 rounded-[8px] border border-white/18 bg-white/12 p-4 backdrop-blur sm:grid-cols-[4rem_1fr] sm:items-center sm:gap-4 sm:p-5"
                >
                  <span className="font-heading text-3xl font-black text-[#ffcf72] sm:text-4xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base font-bold leading-relaxed text-white">
                    {outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 lg:py-20">
        <div className="container-main">
          <div className="relative isolate grid gap-6 overflow-hidden rounded-[8px] bg-[#251324] p-5 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <Image
              src="/brand/um-calendar-cover.png"
              alt=""
              fill
              sizes="100vw"
              className="-z-10 object-cover opacity-[0.18]"
            />
            <div className="absolute inset-y-0 right-0 -z-10 hidden w-80 bg-[#0b5f99]/88 lg:block" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#ffcf72]">
                Ready to build the next batch?
              </p>
              <h2 className="mt-3 max-w-3xl font-heading text-2xl font-black leading-tight text-white sm:text-4xl">
                Bring {category.eyebrow.toLowerCase()} to your learners.
              </h2>
            </div>
            <Link
              href="/contact"
              className={cn(
                "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 sm:w-auto",
                pageTheme.accent,
                pageTheme.accentHover
              )}
            >
              Contact Unique Mentors
              <Handshake className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

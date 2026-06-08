"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Pillar = {
  num: string;
  title: string;
  desc: string;
  tags?: string[];
};

type ShuffleSquare = {
  id: number;
  src: string;
  pillar: number;
  label: string;
};

type PillarShuffleHeroProps = {
  pillars: Pillar[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

const pillarThemes = [
  {
    dot: "bg-primary",
    tint: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
    ring: "ring-primary/45",
  },
  {
    dot: "bg-emerald-500",
    tint: "bg-emerald-500/10",
    text: "text-emerald-700",
    border: "border-emerald-500/20",
    ring: "ring-emerald-500/45",
  },
  {
    dot: "bg-rose-500",
    tint: "bg-rose-500/10",
    text: "text-rose-700",
    border: "border-rose-500/20",
    ring: "ring-rose-500/45",
  },
];

const squareData: ShuffleSquare[] = [
  {
    id: 1,
    pillar: 0,
    label: "Global classroom",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 2,
    pillar: 1,
    label: "Mentor discussion",
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 3,
    pillar: 2,
    label: "Career milestone",
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 4,
    pillar: 0,
    label: "Future-ready learning",
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 5,
    pillar: 1,
    label: "Healthcare guidance",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 6,
    pillar: 2,
    label: "Student community",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 7,
    pillar: 0,
    label: "Leadership practice",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 8,
    pillar: 1,
    label: "Exam readiness",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 9,
    pillar: 2,
    label: "Presentation coaching",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 10,
    pillar: 0,
    label: "International career plan",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 11,
    pillar: 1,
    label: "Personal mentorship",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 12,
    pillar: 2,
    label: "Trusted outcomes",
    src: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 13,
    pillar: 0,
    label: "Focused preparation",
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 14,
    pillar: 1,
    label: "Financial clarity",
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 15,
    pillar: 2,
    label: "Team progress",
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop",
  },
  {
    id: 16,
    pillar: 0,
    label: "Confident graduate",
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&auto=format&fit=crop",
  },
];

function shuffleSquares(items: ShuffleSquare[]) {
  const next = [...items];

  for (let currentIndex = next.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [next[currentIndex], next[randomIndex]] = [
      next[randomIndex],
      next[currentIndex],
    ];
  }

  return next;
}

export function PillarShuffleHero({
  pillars,
  activeIndex,
  onActiveIndexChange,
}: PillarShuffleHeroProps) {
  const activePillar = pillars[activeIndex] ?? pillars[0];
  const activeTheme = pillarThemes[activeIndex] ?? pillarThemes[0];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-2 rounded-[8px] border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-primary">
          Our Pillars
        </span>
        <h2 className="mt-5 max-w-xl font-heading text-3xl font-black leading-tight tracking-tight text-on-surface sm:text-4xl lg:text-5xl">
          A clear foundation behind every transformation.
        </h2>
        <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-on-surface-variant">
          Our vision, mission, and decade of experience work together like one
          living campus board: practical training, personal guidance, and
          outcomes students can actually carry forward.
        </p>

        <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
          {pillars.map((pillar, index) => {
            const theme = pillarThemes[index] ?? pillarThemes[0];
            const isActive = activeIndex === index;

            return (
              <button
                key={pillar.num}
                type="button"
                onClick={() => onActiveIndexChange(index)}
                onMouseEnter={() => onActiveIndexChange(index)}
                className={cn(
                  "rounded-[8px] border bg-white p-3 text-left shadow-sm transition-all duration-300",
                  isActive
                    ? `${theme.border} ring-2 ${theme.ring}`
                    : "border-outline-variant/25 hover:border-primary/30 hover:bg-surface-container-lowest"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-[11px] font-black text-white",
                    theme.dot
                  )}
                >
                  {pillar.num}
                </span>
                <span className="mt-3 block text-sm font-black leading-tight text-on-surface">
                  {pillar.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[8px] border border-outline-variant/20 bg-[#fffaf5] p-5 shadow-sm sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.num}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span
                className={cn(
                  "inline-flex rounded-[6px] border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]",
                  activeTheme.tint,
                  activeTheme.text,
                  activeTheme.border
                )}
              >
                Pillar {activePillar.num}
              </span>
              <h3 className="mt-4 font-heading text-2xl font-black leading-tight text-on-surface">
                {activePillar.title}
              </h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-on-surface-variant sm:text-base">
                {activePillar.desc}
              </p>

              {activePillar.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {activePillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "rounded-[6px] border px-2.5 py-1 text-xs font-bold",
                        activeTheme.tint,
                        activeTheme.text,
                        activeTheme.border
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <Link
          href="/programs"
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-primary px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container"
        >
          Explore our programs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <ShuffleGrid
        activeIndex={activeIndex}
        onActiveIndexChange={onActiveIndexChange}
      />
    </div>
  );
}

function ShuffleGrid({
  activeIndex,
  onActiveIndexChange,
}: {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [squares, setSquares] = useState<ShuffleSquare[]>(squareData);

  useEffect(() => {
    const shuffle = () => {
      setSquares(shuffleSquares(squareData));
      timeoutRef.current = setTimeout(shuffle, 3200);
    };

    timeoutRef.current = setTimeout(shuffle, 600);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
      className="relative"
    >
      <div className="grid h-[340px] grid-cols-4 grid-rows-4 gap-1.5 sm:h-[460px] lg:h-[520px]">
        {squares.map((square, index) => {
          const isActive = activeIndex === square.pillar;
          const theme = pillarThemes[square.pillar] ?? pillarThemes[0];
          const showLabel = index === 0 || index === 6 || index === 11;

          return (
            <motion.button
              key={square.id}
              type="button"
              layout
              transition={{ duration: 1.1, type: "spring", bounce: 0.18 }}
              onClick={() => onActiveIndexChange(square.pillar)}
              onMouseEnter={() => onActiveIndexChange(square.pillar)}
              onFocus={() => onActiveIndexChange(square.pillar)}
              aria-label={square.label}
              className={cn(
                "group relative h-full w-full overflow-hidden rounded-[6px] bg-surface-container shadow-sm outline-none ring-offset-2 ring-offset-white transition-all duration-300",
                isActive ? `ring-2 ${theme.ring}` : "hover:ring-2 hover:ring-outline-variant/40"
              )}
              style={{
                backgroundImage: `url(${square.src})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              <span className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/0" />
              {showLabel ? (
                <span className="absolute inset-x-1.5 bottom-1.5 rounded-[5px] bg-white/92 px-2 py-1 text-left text-[10px] font-black uppercase tracking-[0.12em] text-on-surface shadow-sm backdrop-blur">
                  {square.label}
                </span>
              ) : null}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-on-surface-variant">
          Hover or tap the image grid
        </p>
        <div className="flex items-center gap-2">
          {pillarThemes.map((theme, index) => (
            <button
              key={theme.dot}
              type="button"
              aria-label={`Show pillar ${index + 1}`}
              onClick={() => onActiveIndexChange(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                activeIndex === index ? `w-8 ${theme.dot}` : "w-2.5 bg-outline-variant/70"
              )}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PillarShuffleHero;

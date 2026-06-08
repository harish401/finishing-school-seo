"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  GraduationCap,
  Handshake,
  MessageCircle,
  Presentation,
  Sparkles,
  WalletCards,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: string;
  label: string;
  icon: ComponentType<LucideProps>;
  image: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: "confidence",
    label: "Confidence Labs",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
    description:
      "Practice-heavy sessions that help learners speak, present, and participate with more ease.",
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageCircle,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Structured speaking, listening, group discussion, and feedback exercises for real settings.",
  },
  {
    id: "placement",
    label: "Placement Prep",
    icon: BriefcaseBusiness,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    description:
      "Resume clinics, interview practice, and workplace readiness mapped to campus hiring needs.",
  },
  {
    id: "financial",
    label: "Financial Literacy",
    icon: WalletCards,
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
    description:
      "Simple, practical money habits for budgeting, saving, credit awareness, and first salaries.",
  },
  {
    id: "leadership",
    label: "Leadership Labs",
    icon: GraduationCap,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
    description:
      "Team challenges that build ownership, decision-making, initiative, and presentation maturity.",
  },
  {
    id: "etiquette",
    label: "Etiquette",
    icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    description:
      "Professional presence, meeting behavior, first impressions, and everyday workplace manners.",
  },
  {
    id: "study",
    label: "Study Systems",
    icon: BookOpenCheck,
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
    description:
      "Study routines, time management, attention habits, and exam planning for school learners.",
  },
  {
    id: "career",
    label: "Career Clarity",
    icon: ClipboardCheck,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    description:
      "Guided reflection and pathway mapping so learners can make clearer academic and career choices.",
  },
  {
    id: "certification",
    label: "Progress Review",
    icon: BadgeCheck,
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Trainer feedback and review checkpoints that make improvement visible after every module.",
  },
  {
    id: "presentations",
    label: "Presentation Skills",
    icon: Presentation,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1200&auto=format&fit=crop",
    description:
      "Pitching, classroom presentations, formal introductions, and confident stage presence.",
  },
];

const autoPlayInterval = 3200;
const itemHeight = 65;

const wrap = (min: number, max: number, value: number) => {
  const rangeSize = max - min;
  return ((((value - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentIndex = ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((current) => current + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((current) => current + diff);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(nextStep, autoPlayInterval);
    return () => window.clearInterval(interval);
  }, [isPaused, nextStep]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const length = features.length;
    let normalizedDiff = diff;

    if (diff > length / 2) normalizedDiff -= length;
    if (diff < -length / 2) normalizedDiff += length;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[24px] border border-outline-variant/35 bg-white shadow-xl lg:aspect-video lg:flex-row lg:rounded-[32px]">
        <div className="relative z-30 flex min-h-[350px] w-full flex-col items-start justify-center overflow-hidden bg-primary px-8 md:min-h-[450px] md:px-16 lg:h-full lg:w-[40%] lg:pl-16">
          <div className="absolute inset-x-0 top-0 z-40 h-14 bg-gradient-to-b from-primary via-primary/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-40 h-14 bg-gradient-to-t from-primary via-primary/85 to-transparent" />

          <div className="relative z-20 flex h-full w-full items-center justify-center lg:justify-start">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: itemHeight,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * itemHeight,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.24,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    type="button"
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "group relative flex items-center gap-4 rounded-full border px-6 py-3.5 text-left transition-all duration-500 md:px-10 md:py-5 lg:px-8 lg:py-4",
                      isActive
                        ? "z-10 border-white bg-white text-primary"
                        : "border-white/20 bg-transparent text-white/62 hover:border-white/45 hover:text-white"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors duration-500",
                        isActive ? "text-primary" : "text-white/45"
                      )}
                    />
                    <span className="whitespace-nowrap text-sm font-bold uppercase tracking-tight md:text-[15px]">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden border-t border-outline-variant/20 bg-surface-container-low/45 px-6 py-16 md:min-h-[600px] md:px-12 md:py-24 lg:h-full lg:border-l lg:border-t-0 lg:px-10 lg:py-16">
          <div className="relative flex aspect-[4/5] w-full max-w-[420px] items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -100 : isNext ? 100 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className={cn(
                    "absolute inset-0 origin-center overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-2xl md:rounded-[36px] md:border-8",
                    !isActive && "pointer-events-none"
                  )}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "h-full w-full object-cover transition-all duration-700",
                      isActive
                        ? "blur-0 grayscale-0"
                        : "blur-[2px] grayscale brightness-75"
                    )}
                  />

                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/45 to-transparent p-8 pt-28 md:p-10 md:pt-32"
                      >
                        <div className="mb-3 w-fit rounded-full border border-white/25 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface shadow-lg">
                          {index + 1} / {feature.label}
                        </div>
                        <p className="text-xl font-semibold leading-tight tracking-tight text-white drop-shadow-md md:text-2xl">
                          {feature.description}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute left-8 top-8 flex items-center gap-3 transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">
                      Live Session
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;

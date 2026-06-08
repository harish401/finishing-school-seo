"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroScrubProps {
  eyebrow?: string;
  title: string;
  titleTop: string;
  titleBottom: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  features?: string[];
  accentHex?: string;
  imagePosition?: string;
  className?: string;
}

export function HeroScrub({
  eyebrow = "School Programs",
  title,
  titleTop,
  titleBottom,
  subtitle,
  imageUrl,
  imageAlt,
  primaryButtonText = "Partner With Us",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Browse Courses",
  secondaryButtonHref = "/courses",
  features = [],
  accentHex = "#e21b2f",
  imagePosition = "center",
  className,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.72, 1],
    [0.78, 1, 1.66, 0.84]
  );
  const cardRadius = useTransform(
    scrollYProgress,
    [0, 0.16, 0.72, 1],
    [18, 14, 0, 18]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.72, 1],
    [1.06, 1.01, 1.06]
  );
  const topX = useTransform(
    scrollYProgress,
    [0, 0.16, 0.72, 1],
    ["0vw", "-10vw", "-62vw", "0vw"]
  );
  const bottomX = useTransform(
    scrollYProgress,
    [0, 0.16, 0.72, 1],
    ["0vw", "10vw", "62vw", "0vw"]
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.48, 0.74, 1],
    [1, 1, 0, 0, 1]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.82, 1],
    [1, 0.85, 0, 0, 1]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55, 0.82, 1],
    [0, -8, -18, 18, 0]
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-[420svh] w-full overflow-hidden bg-[#fff8ef] text-[#251324]",
        className
      )}
      aria-label={title}
    >
      <h1 className="sr-only">{title}</h1>

      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: accentHex }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#fff8ef]/94" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(#e21b2f_1px,transparent_1px)] opacity-[0.08] [background-size:22px_22px]"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 h-[clamp(340px,72vw,780px)] w-[clamp(340px,72vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/58 shadow-[inset_0_0_0_1px_rgba(226,27,47,0.08)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/78 to-transparent"
          aria-hidden="true"
        />

        <motion.div
          style={{
            opacity: reduced ? 1 : contentOpacity,
            y: reduced ? 0 : contentY,
          }}
          className="pointer-events-none absolute left-0 right-0 top-[clamp(5rem,8vw,7rem)] z-20 px-4"
        >
          <div className="container-main flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-[24rem]">
              <p className="inline-flex rounded-[8px] border border-[#f0c8bc] bg-white/86 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#e21b2f] shadow-sm backdrop-blur">
                {eyebrow}
              </p>
              <p className="mt-3 text-sm font-bold leading-relaxed text-[#6c5a6c] sm:text-base">
                {subtitle}
              </p>
            </div>

            <div className="pointer-events-auto flex w-full flex-col gap-2 sm:w-auto sm:min-w-[16rem]">
              <Link
                href={primaryButtonHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#e21b2f] px-5 py-3 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#b91525]"
              >
                {primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondaryButtonHref}
                className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[#f0c8bc] bg-white/88 px-5 py-3 text-sm font-extrabold text-[#251324] shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                {secondaryButtonText}
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 px-3 sm:gap-4">
          <motion.p
            aria-hidden="true"
            style={{
              x: reduced ? 0 : topX,
              opacity: reduced ? 1 : titleOpacity,
            }}
            className="font-heading text-[clamp(3.4rem,13vw,11rem)] font-black uppercase leading-[0.85] tracking-normal text-[#251324]"
          >
            {titleTop}
          </motion.p>

          <motion.div
            style={{
              scale: reduced ? 1 : cardScale,
              borderRadius: reduced ? 18 : cardRadius,
            }}
            className="relative w-[min(94vw,calc(72svh*1.62))] overflow-hidden border border-white/70 bg-white shadow-[0_24px_90px_rgba(37,19,36,0.24)] ring-1 ring-[#e21b2f]/10 will-change-transform"
          >
            <div className="relative aspect-[16/9]">
              <motion.div
                style={{ scale: reduced ? 1 : imageScale }}
                className="absolute inset-0"
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="94vw"
                  className="object-cover"
                  style={{ objectPosition: imagePosition }}
                />
              </motion.div>
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-black/32"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_rgba(37,19,36,0.24)]"
                aria-hidden="true"
              />
              <motion.div
                style={{ opacity: reduced ? 1 : contentOpacity }}
                className="absolute bottom-3 left-3 right-3 grid gap-2 sm:bottom-4 sm:left-4 sm:right-4 sm:grid-cols-3"
              >
                {features.slice(0, 3).map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 rounded-[8px] border border-white/38 bg-white/86 px-3 py-2 text-xs font-extrabold leading-tight text-[#251324] shadow-sm backdrop-blur"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#e21b2f]" />
                    {feature}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.p
            aria-hidden="true"
            style={{
              x: reduced ? 0 : bottomX,
              opacity: reduced ? 1 : titleOpacity,
            }}
            className="font-heading text-[clamp(3.4rem,13vw,11rem)] font-black uppercase leading-[0.85] tracking-normal text-[#251324]"
          >
            {titleBottom}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

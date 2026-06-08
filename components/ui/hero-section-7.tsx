"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PencilLine } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
}

export interface FloatingSchoolHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  images?: FloatingImageProps[]; // Kept for interface compatibility
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  features?: string[];
  className?: string;
}

function Swirls() {
  return (
    <>
      <svg
        className="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 text-[#ffd5cc] opacity-40 pointer-events-none"
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M515.266 181.33C377.943 51.564 128.537 136.256 50.8123 293.565C-26.9127 450.874 125.728 600 125.728 600"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-[#dbeafe] opacity-40 pointer-events-none"
        width="700"
        height="700"
        viewBox="0 0 700 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M26.8838 528.274C193.934 689.816 480.051 637.218 594.397 451.983C708.742 266.748 543.953 2.22235 543.953 2.22235"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    </>
  );
}

// 8 Creative Custom SVGs representing learning, ideas, creativity, and leadership
const illustrations = [
  // 0. Knowledge Stack of Books
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="25" y="72" width="70" height="18" rx="3" fill="#0b5f99" />
      <rect x="25" y="72" width="60" height="18" fill="#1d4ed8" opacity="0.15" />
      <path d="M95 75H25V87H95V75Z" fill="white" opacity="0.85" />
      <rect x="30" y="54" width="60" height="18" rx="3" fill="#e21b2f" />
      <path d="M90 57H30V69H90V57Z" fill="white" opacity="0.85" />
      <rect x="35" y="36" width="50" height="18" rx="3" fill="#ffcf72" />
      <path d="M85 39H35V51H85V39Z" fill="white" opacity="0.85" />
      <path d="M48 36V48L53 44L58 48V36H48Z" fill="#bd168e" />
      <circle cx="85" cy="24" r="3.5" fill="#ffcf72" />
      <circle cx="102" cy="50" r="2.5" fill="#0b5f99" />
      <path d="M20 40L22 44L26 45L22 46L20 50L18 46L14 45L18 44L20 40Z" fill="#ffcf72" />
    </svg>
  ),
  // 1. Launch Rocket (Career takeoff)
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 20C75 40 75 80 75 85H45C45 80 45 40 60 20Z" fill="#e21b2f" />
      <path d="M60 20C67.5 40 67.5 80 67.5 85H45C45 80 45 40 60 20Z" fill="#b91525" opacity="0.15" />
      <path d="M60 20C67.5 35 67.5 40 67.5 40H52.5C52.5 35 52.5 30 60 20Z" fill="#251324" />
      <path d="M45 75C40 75 35 85 35 90H45V75Z" fill="#0b5f99" />
      <path d="M75 75C80 75 85 85 85 90H75V75Z" fill="#0b5f99" />
      <path d="M54 85C54 98 60 106 60 106C60 106 66 98 66 85H54Z" fill="#f97316" />
      <path d="M57 85C57 93 60 98 60 98C60 98 63 93 63 85H57Z" fill="#ffcf72" />
      <circle cx="60" cy="55" r="7" fill="white" stroke="#251324" strokeWidth="2" />
      <circle cx="58" cy="53" r="3" fill="#e8f6ff" />
      <path d="M95 30L97 34L101 35L97 36L95 40L93 36L89 35L93 34L95 30Z" fill="#ffcf72" />
      <circle cx="28" cy="40" r="3.5" fill="#ffcf72" />
    </svg>
  ),
  // 2. Mindset & Creativity (Idea bulb)
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 25C43 25 35 38 35 55C35 68 47 75 47 85H73C73 75 85 68 85 55C85 38 77 25 60 25Z" fill="#ffcf72" opacity="0.9" />
      <rect x="50" y="85" width="20" height="5" rx="1.5" fill="#94a3b8" />
      <rect x="52" y="90" width="16" height="5" rx="1.5" fill="#64748b" />
      <path d="M55 95C55 98 65 98 65 95H55Z" fill="#475569" />
      <path d="M60 12V18M60 102V108M17 55H23M97 55H103M30 30L35 35M90 30L85 35" stroke="#ffcf72" strokeWidth="3" strokeLinecap="round" />
      <circle cx="60" cy="55" r="9" stroke="#bd168e" strokeWidth="2" />
      <path d="M60 42V45M60 65V68M47 55H50M70 55H73M51 46L53 48M69 62L67 64M51 64L53 62M69 48L67 46" stroke="#bd168e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  // 3. Academic Achievement (Graduation Cap & Scroll)
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 75C30 70 45 68 60 68C75 68 90 70 90 75C90 80 75 82 60 82C45 82 30 80 30 75Z" fill="#fff" stroke="#64748b" strokeWidth="2" />
      <path d="M60 68V82" stroke="#e21b2f" strokeWidth="3" />
      <rect x="58" y="70" width="4" height="12" rx="1" fill="#e21b2f" />
      <path d="M60 55L30 40L60 25L90 40L60 55Z" fill="#251324" />
      <path d="M42 46.5V57C42 62 50 64 60 64C70 64 78 62 78 57V46.5" fill="#3a1d33" />
      <path d="M60 40C68 40 76 43 82 46V56" stroke="#ffcf72" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="80" y="55" width="4" height="6" fill="#ffcf72" />
      <path d="M100 24L102 27L105 28L102 29L100 32L98 29L95 28L98 27L100 24Z" fill="#0b5f99" />
      <circle cx="22" cy="28" r="3.5" fill="#ffcf72" />
    </svg>
  ),
  // 4. Creative Pencil Motif
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 90 L85 35 A 8 8 0 0 1 97 47 L 42 102 Z" fill="#ffcf72" />
      <path d="M85 35 L97 47 L105 39 A 6 6 0 0 0 97 31 Z" fill="#e21b2f" />
      <path d="M30 90 L42 102 L20 110 Z" fill="#e8dfd8" />
      <path d="M20 110 L25 105 L23 103 Z" fill="#251324" />
      <path d="M72 48 L84 60" stroke="#0b5f99" strokeWidth="3" strokeLinecap="round" />
      <circle cx="95" cy="85" r="4" fill="#0b5f99" />
      <circle cx="106" cy="70" r="2.5" fill="#e21b2f" />
    </svg>
  ),
  // 5. Award Medal / Certificate Badge
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="50" r="26" fill="#ffcf72" stroke="#eab308" strokeWidth="2.5" />
      <circle cx="60" cy="50" r="20" fill="none" stroke="#e21b2f" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M48 70 L40 100 L55 92 L62 100 L58 73" fill="#0b5f99" />
      <path d="M72 70 L80 100 L65 92 L58 100 L62 73" fill="#0b5f99" />
      <path d="M60 38 L63 45 L70 45 L65 49 L67 56 L60 52 L53 56 L55 49 L50 45 L57 45 Z" fill="#251324" />
    </svg>
  ),
  // 6. Navigation Compass / Career Direction
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="32" stroke="#0b5f99" strokeWidth="4.5" fill="#fff" />
      <path d="M60 28 L60 34" stroke="#e21b2f" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M60 86 L60 92" stroke="#0b5f99" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M28 60 L34 60" stroke="#0b5f99" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M86 60 L92 60" stroke="#0b5f99" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M60 60 L72 38 L60 52 L48 38 Z" fill="#e21b2f" />
      <path d="M60 60 L48 82 L60 68 L72 82 Z" fill="#0b5f99" />
      <circle cx="60" cy="60" r="5" fill="#251324" />
    </svg>
  ),
  // 7. Dynamic Thought Bubble (Expression/Public Speaking)
  () => (
    <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 50 C20 32 40 25 60 25 C80 25 100 32 100 50 C100 68 80 75 60 75 C52 75 48 77 40 82 C42 74 38 72 35 70 C25 65 20 58 20 50 Z" fill="#e8f6ff" stroke="#d9e8f2" strokeWidth="2.5" />
      <path d="M50 48 H70" stroke="#0b5f99" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M42 56 H62" stroke="#0b5f99" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="78" cy="56" r="3" fill="#bd168e" />
      <circle cx="102" cy="85" r="5.5" fill="#ffcf72" />
      <circle cx="112" cy="94" r="3" fill="#bd168e" />
    </svg>
  )
];

// Position vectors and float anim variants to layout 8 floating SVGs nicely around the content
const floatingItems = [
  { // 0. Books
    className: "left-[3%] sm:left-[6%] top-[12%] sm:top-[16%] w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
    animation: "animate-float-slow"
  },
  { // 1. Rocket
    className: "right-[4%] sm:right-[6%] top-[10%] sm:top-[12%] w-18 h-18 sm:w-26 sm:h-26 lg:w-30 lg:h-30",
    animation: "animate-float-fast"
  },
  { // 2. Idea Bulb
    className: "right-[3%] sm:right-[6%] bottom-[12%] sm:bottom-[15%] w-18 h-18 sm:w-26 sm:h-26 lg:w-30 lg:h-30",
    animation: "animate-float-sway"
  },
  { // 3. Graduation Cap
    className: "left-[3%] sm:left-[6%] bottom-[10%] sm:bottom-[12%] w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32",
    animation: "animate-float-slow"
  },
  { // 4. Creative Pencil
    className: "left-[13%] sm:left-[16%] top-[40%] sm:top-[44%] w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
    animation: "animate-float-fast"
  },
  { // 5. Award Medal
    className: "right-[13%] sm:right-[16%] top-[42%] sm:top-[46%] w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22",
    animation: "animate-float-slow"
  },
  { // 6. Compass Direction
    className: "left-[22%] sm:left-[26%] bottom-[5%] sm:bottom-[8%] w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
    animation: "animate-float-sway"
  },
  { // 7. Thought Bubble
    className: "right-[22%] sm:right-[26%] top-[8%] sm:top-[10%] w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16",
    animation: "animate-float-fast"
  }
];

export function FloatingSchoolHero({
  eyebrow = "School Programs",
  title,
  description,
  primaryButtonText = "Partner With Us",
  primaryButtonHref = "/contact",
  secondaryButtonText = "Browse Courses",
  secondaryButtonHref = "/courses",
  features = [],
  className,
}: FloatingSchoolHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[92svh] w-full items-center justify-center overflow-hidden bg-white px-4 pb-16 pt-28 sm:px-6 lg:min-h-[96svh] lg:px-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#e21b2f_1px,transparent_1px)] opacity-[0.05] [background-size:22px_22px] pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Swirls />
      </div>

      {/* Floating SVGs (no bounding white cards, direct organic transparency and interactive hover reactions) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {floatingItems.map((item, index) => {
          const RenderIcon = illustrations[index];
          return (
            <div
              key={`svg-${index}`}
              className={cn(
                "absolute pointer-events-auto",
                item.className
              )}
            >
              <motion.div
                className={cn("w-full h-full cursor-pointer", item.animation)}
                style={{ animationDelay: `${index * 260}ms` }}
                whileHover={{ scale: 1.15, rotate: 6, filter: "brightness(1.03)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <RenderIcon />
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="relative z-20 mx-auto max-w-3xl text-center">
        <p className="inline-flex rounded-[8px] border border-[#f0c8bc] bg-white/86 px-4 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#e21b2f] shadow-sm backdrop-blur sm:text-xs">
          <PencilLine className="h-4 w-4 mr-2" />
          {eyebrow}
        </p>

        <h1 className="mt-6 font-heading text-[clamp(2.8rem,9vw,6.75rem)] font-black leading-[0.95] tracking-tight text-[#251324] text-balance">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed text-[#6c5a6c] sm:text-lg">
          {description}
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={primaryButtonHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[#bd168e] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#981173]"
          >
            {primaryButtonText}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryButtonHref}
            className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[#f0c8bc] bg-white/90 px-6 py-3 text-sm font-extrabold text-[#251324] shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            {secondaryButtonText}
          </Link>
        </div>

        {features.length > 0 ? (
          <div className="mx-auto mt-8 grid max-w-3xl gap-2 sm:grid-cols-3">
            {features.slice(0, 3).map((feature) => (
              <div
                key={feature}
                className="flex items-center justify-center gap-2 rounded-[8px] border border-[#f0c8bc] bg-white/82 px-3 py-3 text-sm font-extrabold leading-tight text-[#523f4f] shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#e21b2f]" />
                {feature}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  eyebrow?: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  imageUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 22, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.56,
      ease: "easeOut",
    },
  },
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title,
      subtitle,
      eyebrow,
      primaryButtonText,
      primaryButtonHref,
      secondaryButtonText,
      secondaryButtonHref,
      imageUrl,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative flex h-screen w-full items-center justify-center overflow-hidden bg-inverse-surface px-4 pb-16 pt-28 text-white sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${imageUrl}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/35"
          aria-hidden="true"
        />

        <motion.div
          className="relative z-10 mx-auto flex max-w-5xl flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {eyebrow ? (
            <motion.p
              variants={itemVariants}
              className="inline-flex rounded-[8px] border border-white/25 bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur"
            >
              {eyebrow}
            </motion.p>
          ) : null}

          <motion.h1
            className="mt-5 max-w-5xl font-heading text-4xl font-black leading-[1.04] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            variants={itemVariants}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-base font-semibold leading-relaxed text-white/86 md:text-xl"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={primaryButtonHref}>
                {primaryButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full bg-white/90 text-[#16212a] hover:bg-white sm:w-auto"
            >
              <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };

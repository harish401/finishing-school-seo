"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const IMG_PADDING = 12;

interface TextParallaxContentProps {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  imagePosition?: string;
}

interface StickyImageProps {
  imgUrl: string;
  imagePosition?: string;
  overlayClassName?: string;
}

interface OverlayCopyProps {
  subheading: string;
  heading: string;
}

export function TextParallaxContent({
  imgUrl,
  subheading,
  heading,
  children,
  className,
  overlayClassName,
  imagePosition = "center",
}: TextParallaxContentProps) {
  return (
    <section
      className={cn("bg-white", className)}
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[130svh] min-h-[760px] sm:h-[145svh]">
        <StickyImage
          imgUrl={imgUrl}
          imagePosition={imagePosition}
          overlayClassName={overlayClassName}
        />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </section>
  );
}

function StickyImage({
  imgUrl,
  imagePosition = "center",
  overlayClassName,
}: StickyImageProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: imagePosition,
        height: `calc(100svh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-[8px] bg-[#092f59] shadow-2xl"
    >
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-[#051829]/80 via-[#092f59]/58 to-[#03111d]/84",
          overlayClassName
        )}
        style={{ opacity }}
      />
    </motion.div>
  );
}

function OverlayCopy({ subheading, heading }: OverlayCopyProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [220, -220]);
  const opacity = useTransform(scrollYProgress, [0.22, 0.48, 0.78], [0, 1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center px-5 text-center text-white"
    >
      <p className="mb-3 rounded-[8px] border border-white/22 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/84 backdrop-blur sm:mb-5 sm:text-sm">
        {subheading}
      </p>
      <h2 className="max-w-5xl font-heading text-4xl font-black leading-[1.03] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl">
        {heading}
      </h2>
    </motion.div>
  );
}

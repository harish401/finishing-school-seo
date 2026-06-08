"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PencilMascotProps {
  className?: string;
  compact?: boolean;
}

export function PencilMascot({ className, compact = false }: PencilMascotProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none relative h-auto w-36", className)}
      initial={{ opacity: 0, y: 16, rotate: -4 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      animate={{
        y: compact ? [0, -4, 0] : [0, -8, 0],
        rotate: compact ? [0, 1.4, 0] : [0, 2, 0],
      }}
      transition={{
        opacity: { duration: 0.45 },
        y: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 4.4, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Image
        src="/brand/pencil-character.png"
        alt=""
        width={438}
        height={620}
        sizes="(max-width: 768px) 112px, 160px"
        className="h-auto w-full drop-shadow-2xl"
      />
      <svg
        viewBox="0 0 160 24"
        className="absolute -bottom-1 left-1/2 h-6 w-28 -translate-x-1/2 text-[#101821]/24"
      >
        <motion.path
          d="M12 15 C46 24 104 24 148 14"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

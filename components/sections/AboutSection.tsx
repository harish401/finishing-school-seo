"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Mic2,
  PencilLine,
  Repeat2,
  type LucideIcon,
} from "lucide-react";
import { PencilMascot } from "@/components/brand/PencilMascot";

const rhythm: {
  title: string;
  detail: string;
  icon: LucideIcon;
  color: string;
}[] = [
    {
      title: "Diagnose",
      detail: "Quick prompts reveal confidence, clarity, habits, and readiness gaps.",
      icon: ClipboardCheck,
      color: "bg-[#057bd2]",
    },
    {
      title: "Rehearse",
      detail: "Learners practise introductions, discussions, etiquette, and decisions.",
      icon: Mic2,
      color: "bg-[#e21b2f]",
    },
    {
      title: "Repeat",
      detail: "Every module ends with feedback, reflection, and a visible next action.",
      icon: Repeat2,
      color: "bg-[#008b7d]",
    },
  ];

export function AboutSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div
        className="absolute inset-y-0 left-0 -z-10 w-[42%] bg-[#e8f6ff]"
        style={{ clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)" }}
      />
      <div className="container-main">
        <div className="grid gap-12 lg:grid-cols-[0.44fr_0.56fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative min-h-[580px]"
          >
            {/* Dynamic Grid Layout */}
            
            {/* Top Left Image */}
            <motion.div
              className="absolute left-0 top-0 w-[55%] overflow-hidden rounded-[16px] border-[4px] border-white bg-white shadow-2xl z-10"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -6, rotate: -2, scale: 1.02 }}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/imagesclor/image copy 8.png"
                  alt="Student learning moment"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Top Right Image */}
            <motion.div
              className="absolute right-0 top-12 w-[48%] overflow-hidden rounded-[16px] border-[4px] border-white bg-white shadow-xl z-20"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -6, rotate: 2, scale: 1.02 }}
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/imagesclor/image copy 11.png"
                  alt="Campus readiness"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Bottom Image */}
            <motion.div
              className="absolute bottom-8 left-[10%] w-[75%] overflow-hidden rounded-[16px] border-[4px] border-white bg-white shadow-2xl z-30"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ y: -6, rotate: -1, scale: 1.02 }}
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/imagesclor/image copy 4.png"
                  alt="Professional development"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.7 }}
              className="absolute -right-4 bottom-20 z-40 w-32 sm:w-40 drop-shadow-[0_15px_15px_rgba(0,0,0,0.25)]"
            >
              <PencilMascot className="w-full" />
            </motion.div>
          </motion.div>

          <div>
            <span className="inline-flex items-center gap-2 rounded-[8px] bg-[#0b5f99] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-white">
              <PencilLine className="h-4 w-4 text-[#ffcf72]" />
              Brand Motif
            </span>
            <h2 className="mt-5 max-w-xl font-heading text-3xl font-black leading-tight tracking-tight text-[#251324] sm:text-4xl lg:text-5xl">
              The pencil becomes the guide through every learning moment.
            </h2>
            <p className="mt-5 max-w-lg text-base font-medium leading-relaxed text-[#675667] sm:text-lg">
              It keeps the finishing school friendly for students while still
              feeling polished for institutions. The same mark appears around
              practice, feedback, progress, and module selection, so the brand
              feels intentional across the page.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {rhythm.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.08 * index,
                    ease: "easeOut",
                  }}
                  className="rounded-[8px] border border-[#d9e8f2] bg-[#fffaf5] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b9d8e8] shadow-sm"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-[8px] text-white ${item.color} shadow-md`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-black text-[#251324]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-[#6f5c6f]">
                    {item.detail}
                  </p>
                </motion.article>
              ))}
            </div>

            <Link
              href="/programs/schools"
              className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[#bd168e] px-5 py-3 text-sm font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#981173] hover:shadow-lg hover:shadow-[#bd168e]/30"
            >
              View the learning tracks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

export function TrainingExperienceCarousel() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container-main">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="inline-flex rounded-[8px] bg-primary-light px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-primary"
          >
            Training Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-4 font-heading text-3xl font-black leading-tight tracking-tight text-on-surface sm:text-4xl lg:text-5xl"
          >
            The modules are practical, visible, and easy to remember.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-on-surface-variant"
          >
            Browse a few of the learning moments students experience across
            school, college, healthcare, and professional development tracks.
          </motion.p>
        </div>

        <FeatureCarousel />
      </div>
    </section>
  );
}

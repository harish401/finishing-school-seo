"use client";

import { motion } from "framer-motion";
import { Quote, ShieldCheck } from "lucide-react";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import type { TestimonialData } from "@/types";

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const carouselTestimonials = testimonials.map((testimonial, index) => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role,
    description: testimonial.content,
    rating: testimonial.rating,
    avatar: testimonial.avatar?.url || fallbackAvatars[index % fallbackAvatars.length],
  }));

  return (
    <section className="section-padding relative overflow-hidden border-y border-outline-variant/15 bg-surface-container-low/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(37,99,235,0.08),transparent_28%),radial-gradient(circle_at_82%_64%,rgba(91,89,140,0.08),transparent_32%)]" />

      <div className="container-main relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="chip border border-primary/10 bg-primary/10 text-xs font-semibold uppercase tracking-wider text-primary">
                Alumni Impact
              </span>
            </motion.div>

            <motion.h2
              className="mt-5 font-heading text-3xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Real stories from learners who found their voice.
            </motion.h2>

            <motion.p
              className="mt-4 text-base leading-relaxed text-on-surface-variant"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
            >
              Drag through verified reviews from school pupils, college graduates, and young professionals who trained with Unique Mentors.
            </motion.p>

            <motion.div
              className="mt-8 grid gap-3 sm:grid-cols-2"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              <div className="rounded-lg border border-outline-variant/20 bg-white p-4 shadow-sm">
                <Quote className="h-6 w-6 text-primary" />
                <p className="mt-3 text-sm font-bold leading-relaxed text-on-surface">
                  Confidence, communication, and placement readiness in one practical track.
                </p>
              </div>
              <div className="rounded-lg border border-outline-variant/20 bg-white p-4 shadow-sm">
                <ShieldCheck className="h-6 w-6 text-success" />
                <p className="mt-3 text-sm font-bold leading-relaxed text-on-surface">
                  Review-led coaching with visible progress after every module.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" />
            <TestimonialCarousel
              testimonials={carouselTestimonials}
              className="relative mx-auto max-w-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

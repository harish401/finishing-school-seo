"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { TestimonialData } from '@/types';

interface TestimonialsProps {
  testimonials: TestimonialData[];
}

const fallbackAvatars = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200", // Female professional
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200", // Male professional
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200", // Female student
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="section-padding bg-surface-container-low/40 relative overflow-hidden border-t border-b border-outline-variant/15">
      {/* Decorative background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary-container/5 blur-3xl pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <span className="chip bg-primary/10 text-primary border border-primary/10 uppercase tracking-wider text-xs font-semibold">
              ALUMNI IMPACT
            </span>
          </motion.div>
          
          <motion.h2 
            className="font-heading text-3xl font-extrabold text-on-surface sm:text-4xl lg:text-5xl leading-tight tracking-tight mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our Students Say
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-base text-on-surface-variant leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore verified reviews and graduation reports from our past school pupils, college graduates, and corporate professionals.
          </motion.p>
        </div>

        {/* Dynamic Asymmetric Testimonial Grid */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => {
            const avatarUrl = testimonial.avatar?.url || fallbackAvatars[index % fallbackAvatars.length];
            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  'rounded-3xl bg-surface-container-lowest p-8 border border-outline-variant/15 shadow-sm',
                  'hover:shadow-md hover:border-primary/25 transition-all duration-300 flex flex-col justify-between relative group card-lift'
                )}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
              >
                <div>
                  {/* High-End Visual Header: Quote & Star Rating */}
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="h-10 w-10 text-primary-light/50 shrink-0 transform -translate-x-2" />
                    
                    {testimonial.rating && (
                      <div className="flex gap-0.5 mt-2 bg-warning/5 px-2.5 py-1 rounded-md border border-warning/15">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              i < testimonial.rating!
                                ? 'fill-warning text-warning'
                                : 'text-outline-variant'
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm sm:text-base leading-relaxed text-on-surface-variant italic font-medium">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                {/* Author Info block */}
                <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border border-primary/20 shrink-0">
                    <Image
                      src={avatarUrl}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-extrabold text-on-surface group-hover:text-primary transition-colors">
                        {testimonial.name}
                      </p>
                      <ShieldCheck className="h-4 w-4 text-success shrink-0" />
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
